import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octiocon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setBookmarkHandler, setLastReadHandler} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';
const Verse = ({route, navigation}) => {
  const translationData = useSelector(state => state.translation);
  const commentaryData = useSelector(state => state.commentary);
  const bookmarkData = useSelector(state => state.bookmark);
  const langaugeData = useSelector(state => state.language);
  const rateData = useSelector(state => state.rate);
  const pitchData = useSelector(state => state.pitch);
  const dispatch = useDispatch();
  const [versed, setVersed] = useState({});
  const [count, setCount] = useState(1);
  const [play, setPlay] = useState(false);
  const scrollViewRef = useRef();
  const [showList, setShowList] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 18,
              marginTop: 6,
              marginLeft: -8,
              color: '#000',
              fontFamily: 'Poppins-SemiBold',
            }}>
            {langaugeData === 'Hindi'
              ? `अध्याय ${route.params.chap_no}`
              : `Chapter ${route.params.chap_no}`}
          </Text>
        );
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setShowList(!showList);
          }}
          style={{marginRight: 10}}
          activeOpacity={0.4}>
          <Octiocon
            name={showList ? 'x' : 'rows'}
            size={showList ? 26 : 20}
            color="black"
            style={{padding: 2}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, showList, langaugeData]);

  useEffect(() => {
    Tts.addEventListener('tts-finish', () => setPlay(false));
  }, []);

  const startSpeechHandler = () => {
    setPlay(true);
    Tts.setDefaultRate(rateData);
    Tts.setDefaultPitch(pitchData);
    Tts.setDefaultLanguage('hi-IN');

    const verseText = `Verse ${route.params.chap_no}.${count}\n\nSlok ${versed[
      count
    ]?.slok.slice(0, versed[count]?.slok.length - 7)}`;

    const translationText = `${
      langaugeData === 'Hindi' ? 'अनुवाद' : 'Translation'
    }\n${versed[count]?.[translationData?.author]?.[translationData?.type]
      .replace(`${route.params.chap_no}.${count}`, '')
      .replaceAll('  ', ' ')}`;

    const commentaryText = `${
      langaugeData === 'Hindi' ? 'टीका' : 'Commentary'
    } ${
      versed[count]?.[commentaryData?.author]?.[commentaryData?.type].includes(
        'Commentary',
      )
        ? !versed[count]?.[commentaryData?.author]?.[
            commentaryData?.type
          ].includes('No Commentary')
          ? versed[count]?.[commentaryData?.author]?.[
              commentaryData?.type
            ].split('Commentary')[1]
          : `No Commentary By ${[
              versed[count]?.[commentaryData?.author].author,
            ]}`
        : versed[count]?.[commentaryData?.author]?.[commentaryData?.type]
    }`;

    const fullText = `${verseText}\n\n${translationText}\n\n${commentaryText}`;
    Tts.speak(fullText);
  };

  const stopSpeechHandler = () => {
    Tts.stop();
    setPlay(false);
  };

  const versesPerPage = 4;

  useEffect(() => {
    lastReadHandler(`${route?.params?.chap_no}.${count}`);
  }, [count]);

  useEffect(() => {
    const current = route?.params?.current;
    if (current && current >= 1 && current <= route.params.versed) {
      setCount(current);
      const start = Math.max(current - Math.floor(versesPerPage / 2), 1);
      const end = Math.min(start + versesPerPage - 1, route.params.versed);
      fetchData(start, end);
    } else {
      fetchData(1, versesPerPage);
    }
  }, []);

  const fetchData = async (start, end) => {
    try {
      const {chap_no} = route.params;
      const requests = [];
      for (let i = start; i <= end; i++) {
        requests.push(
          fetch(`http://bhagavadgitaapi.in/slok/${chap_no}/${i}`).then(
            response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            },
          ),
        );
      }
      const responses = await Promise.all(requests);
      const data = responses.reduce((acc, responseData, index) => {
        acc[start + index] = responseData;
        return acc;
      }, {});
      setVersed(prevData => ({...prevData, ...data}));
    } catch (error) {
      console.error(error);
    }
  };

  const lastReadHandler = async value => {
    await AsyncStorage.setItem('Last Read', value);
    dispatch(setLastReadHandler(value));
  };

  const handleIncrement = () => {
    if (count + 1 <= route.params.versed) {
      stopSpeechHandler();
      setCount(count + 1);
      const nextPageStart = count + 1;
      const nextPageEnd = Math.min(
        nextPageStart + versesPerPage - 1,
        route.params.versed,
      );
      fetchData(nextPageStart, nextPageEnd);
      scrollViewRef?.current?.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  const handlerDecrement = () => {
    if (count - 1 >= 1) {
      stopSpeechHandler();
      setCount(count - 1);
      const prevPageStart = count - versesPerPage;
      const prevPageEnd = count - 1;
      fetchData(prevPageStart, prevPageEnd);
      scrollViewRef?.current?.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  const removeBookMarkHandler = async () => {
    const updatedBookmarkData = {...bookmarkData};
    delete updatedBookmarkData[route.params.chap_no + '.' + count];
    dispatch(setBookmarkHandler(updatedBookmarkData));
    try {
      await AsyncStorage.setItem('BookMark', JSON.stringify(bookmarkData));
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
    }
  };

  const addBookMarkhandler = async () => {
    dispatch(
      setBookmarkHandler({
        ...bookmarkData,
        [route.params.chap_no + '.' + count]: {
          slok: versed[count]?.slok,
          title: versed[count]?.title,
        },
      }),
    );
    try {
      await AsyncStorage.setItem(
        'BookMark',
        JSON.stringify({
          ...bookmarkData,
          [route.params.chap_no + '.' + count]: {
            slok: versed[count]?.slok,
            title: versed[count]?.title,
          },
        }),
      );
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
    }
  };

  const selectVerseFromTable = i => {
    stopSpeechHandler();
    const current = i;
    if (current && current >= 1 && current <= route.params.versed) {
      setCount(current);
      const start = Math.max(current - Math.floor(versesPerPage / 2), 1);
      const end = Math.min(start + versesPerPage - 1, route.params.versed);
      fetchData(start, end);
    } else {
      fetchData(1, versesPerPage);
    }
    setShowList(false);
  };

  const VerseTableTxt = () => {
    let arr = [];
    for (let i = 1; i <= route.params.versed; i++) {
      arr.push(
        <View style={styles.verseNumDiv} key={i}>
          <Text
            onPress={() => selectVerseFromTable(i)}
            style={
              count === i
                ? [styles.verseNumTxt, styles.verseNumSelected]
                : styles.verseNumTxt
            }>
            {i}
          </Text>
          {count === i && <View style={styles.dot}></View>}
        </View>,
      );
    }
    return arr;
  };

  return (
    <>
      {!versed[count] && (
        <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="#e11d48" />
        </View>
      )}
      {!showList &&
        translationData &&
        commentaryData &&
        versed &&
        versed[count] && (
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              paddingBottom: 10,
              minHeight: '95%',
            }}>
            <View style={styles.container}>
              <Text style={styles.chapSlokNum}>
                {route.params.chap_no}.{count}
              </Text>
              <Text style={styles.slokTxt}>{versed[count]?.slok}</Text>
              <Image
                source={require('../assets/flower.png')}
                style={styles.image}
              />
              <Text
                style={[
                  styles.sectionTitle,
                  langaugeData === 'Hindi' && {fontSize: 18},
                ]}>
                {langaugeData === 'Hindi' ? 'लिप्यंतरण' : 'Transliteration'}
              </Text>
              <Text style={styles.sectionTxt}>
                {versed[count]?.transliteration}
              </Text>
              <Text
                style={[
                  styles.sectionTitle,
                  langaugeData === 'Hindi' && {fontSize: 18},
                ]}>
                {langaugeData === 'Hindi' ? 'अनुवाद' : 'Translation'}
              </Text>
              <Text style={styles.sectionTxt}>
                {versed[count]?.[translationData?.author]?.[
                  translationData?.type
                ]
                  ?.replace(`${route.params.chap_no}.${count}`, '')
                  .replaceAll('  ', ' ')}
              </Text>
              <Text
                style={[
                  styles.sectionTitle,
                  langaugeData === 'Hindi' && {fontSize: 18},
                ]}>
                {langaugeData === 'Hindi' ? 'टीका' : 'Commentary'}
              </Text>
              <Text
                style={[
                  styles.sectionTxt,
                  commentaryData?.type === 'hc' && {
                    fontSize: 18,
                    lineHeight: 30,
                  },
                ]}>
                {versed[count]?.[commentaryData?.author]?.[
                  commentaryData?.type
                ].includes('Commentary')
                  ? !versed[count]?.[commentaryData?.author]?.[
                      commentaryData?.type
                    ].includes('No Commentary')
                    ? versed[count]?.[commentaryData?.author]?.[
                        commentaryData?.type
                      ].split('Commentary')[0] +
                      '\n\n' +
                      versed[count]?.[commentaryData?.author]?.[
                        commentaryData?.type
                      ].split('Commentary')[1]
                    : `No Commentary By ${[
                        versed[count]?.[commentaryData?.author].author,
                      ]}`
                  : versed[count]?.[commentaryData?.author]?.[
                      commentaryData?.type
                    ]}
              </Text>
            </View>
          </ScrollView>
        )}
      {!showList && (
        <View style={styles.bottomNavDiv}>
          <TouchableOpacity
            onPress={handlerDecrement}
            style={styles.bottomBtnDiv}
            activeOpacity={0.9}>
            <Octiocon
              name="chevron-left"
              color={count === 1 ? '#00000040' : '#000000'}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomBtnDiv}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Settings')}>
            <Octiocon name="gear" color="#000000" size={20} />
          </TouchableOpacity>
          {play && (
            <TouchableOpacity
              onPress={stopSpeechHandler}
              style={styles.bottomBtnDiv}
              activeOpacity={0.9}>
              <Ionicons name="stop-outline" color="#000000" size={22} />
            </TouchableOpacity>
          )}
          {!play && (
            <TouchableOpacity
              onPress={startSpeechHandler}
              style={styles.bottomBtnDiv}
              activeOpacity={0.9}>
              <Ionicons name="play-outline" color="#000000" size={22} />
            </TouchableOpacity>
          )}
          {Object.keys(bookmarkData).includes(
            route.params.chap_no + '.' + count,
          ) ? (
            <TouchableOpacity
              style={styles.bottomBtnDiv}
              activeOpacity={0.9}
              onPress={removeBookMarkHandler}>
              <FontAwesome name="bookmark" color="#000000" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.bottomBtnDiv}
              activeOpacity={0.9}
              onPress={addBookMarkhandler}>
              <FontAwesome name="bookmark-o" color="#000000" size={20} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.bottomBtnDiv}
            activeOpacity={0.9}>
            <Octiocon
              name="chevron-right"
              color={count === route.params.versed ? '#00000040' : '#000000'}
              size={22}
            />
          </TouchableOpacity>
        </View>
      )}
      {showList && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            backgroundColor: 'white',
            paddingBottom: 10,
            minHeight: '100%',
          }}>
          <Text style={styles.verseNumTitle}>{route.params.versed} Verses</Text>
          <View style={styles.verseNumCard}>
            <VerseTableTxt />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Verse;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapSlokNum: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    marginVertical: 12,
  },
  image: {
    width: '40%',
    height: 50,
    objectFit: 'contain',
  },
  slokTxt: {
    color: '#dc2626',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 38,
    fontSize: 17,
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    marginVertical: 14,
    letterSpacing: 1,
  },
  sectionTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 28,
  },
  bottomNavDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 22,
    shadowColor: 'black',
    elevation: 30,
    shadowOffset: {
      width: -10,
      height: -5,
    },
  },
  bottomBtnDiv: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumTitle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 1,
    marginTop: 30,
  },
  verseNumCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 20,
    rowGap: 20,
    marginHorizontal: 10,
  },
  verseNumDiv: {
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumTxt: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    display: 'flex',
    position: 'relative',
    padding: 4,
  },
  verseNumSelected: {
    color: '#dc2626',
    fontFamily: 'Inter-SemiBold',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 20,
    backgroundColor: '#dc2626',
    position: 'absolute',
    bottom: -5,
  },
});
