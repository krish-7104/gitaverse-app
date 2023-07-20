import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octiocon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setBookmarkHandler} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';

const Verse = ({route, navigation}) => {
  const translationData = useSelector(state => state.translation);
  const commentaryData = useSelector(state => state.commentary);
  const bookmarkData = useSelector(state => state.bookmark);
  const langaugeData = useSelector(state => state.language);
  const dispatch = useDispatch();
  const [versed, setVersed] = useState({});
  const [count, setCount] = useState(1);
  const [play, setPlay] = useState(false);
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
              fontFamily: 'Inter-SemiBold',
            }}>
            {route.params.chap_no}. {route.params.name}
          </Text>
        );
      },
    });
  }, [navigation]);

  const startSpeechHandler = () => {
    setPlay(!play);
    Tts.setDefaultLanguage('hi-IN');
    Tts.setDefaultRate(0.35);
    Tts.setDefaultPitch(0.8);
    Tts.speak(`Verse ${route.params.chap_no}.${count}`);
    Tts.speak(
      `Slok ${versed[count]?.slok.slice(0, versed[count]?.slok.length - 7)}`,
    );
    Tts.speak(`${langaugeData === 'Hindi' ? 'अनुवाद' : 'Translation'}
    ${versed[count]?.[translationData?.author]?.[translationData?.type].replace(
      `${route.params.chap_no}.${count}`,
      '',
    )}`);
    Tts.speak(`${langaugeData === 'Hindi' ? 'टीका' : 'Commentary'}
    ${versed[count]?.[commentaryData?.author]?.[commentaryData?.type]}`);
  };

  const stopSpeechHandler = () => {
    Tts.stop();
    setPlay(!play);
  };

  const versesPerPage = 4;

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

  const handleIncrement = () => {
    if (count + 1 <= route.params.versed) {
      setCount(count + 1);
      const nextPageStart = count + 1;
      const nextPageEnd = Math.min(
        nextPageStart + versesPerPage - 1,
        route.params.versed,
      );
      fetchData(nextPageStart, nextPageEnd);
    }
  };

  const handlerDecrement = () => {
    if (count - 1 >= 1) {
      setCount(count - 1);
      const prevPageStart = count - versesPerPage;
      const prevPageEnd = count - 1;
      fetchData(prevPageStart, prevPageEnd);
    }
  };

  const removeBookMarkHandler = async () => {
    const updatedBookmarkData = {...bookmarkData};
    delete updatedBookmarkData[route.params.chap_no + '.' + count];
    dispatch(setBookmarkHandler(updatedBookmarkData));
    try {
      await AsyncStorage.setItem('BookMark', JSON.stringify(bookmarkData));
      console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const addBookMarkhandler = async () => {
    dispatch(
      setBookmarkHandler({
        ...bookmarkData,
        [route.params.chap_no + '.' + count]: {
          slok: versed[count]?.slok,
          transliteration: versed[count]?.transliteration,
          translation: versed[count]?.translation,
          title: versed[count]?.title,
        },
      }),
    );
    try {
      await AsyncStorage.setItem('BookMark', JSON.stringify(bookmarkData));
      console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  return (
    <>
      {!versed[count] && (
        <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="#e11d48" />
        </View>
      )}
      {translationData && commentaryData && versed && versed[count] && (
        <ScrollView
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
            <Text style={styles.slokTxt}>
              {versed[count]?.slok.slice(0, versed[count]?.slok.length - 7)}
            </Text>
            <Image
              source={require('../assets/flower.png')}
              style={styles.image}
            />
            <Text style={styles.sectionTitle}>
              {langaugeData === 'Hindi' ? 'लिप्यंतरण' : 'Transliteration'}
            </Text>
            <Text style={styles.sectionTxt}>
              {versed[count]?.transliteration}
            </Text>
            <Text style={styles.sectionTitle}>
              {langaugeData === 'Hindi' ? 'अनुवाद' : 'Translation'}
            </Text>
            <Text style={styles.sectionTxt}>
              {versed[count]?.[translationData?.author]?.[
                translationData?.type
              ].replace(`${route.params.chap_no}.${count}`, '')}
            </Text>
            <Text style={styles.sectionTitle}>
              {langaugeData === 'Hindi' ? 'टीका' : 'Commentary'}
            </Text>
            <Text style={styles.sectionTxt}>
              {versed[count]?.[commentaryData?.author]?.[commentaryData?.type]}
            </Text>
          </View>
        </ScrollView>
      )}
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
    fontFamily: 'Inter-ExtraBold',
    textTransform: 'uppercase',
    marginVertical: 14,
    letterSpacing: 1,
  },
  sectionTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
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
});
