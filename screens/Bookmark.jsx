import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setBookmarkHandler} from '../redux/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authorData from '../data.json';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import {BOOKMARK, BOOKMARK_BANNER} from '../utils/apiKey';

const Bookmark = () => {
  const [data, setData] = useState(null);
  const bookmarkData = useSelector(state => state.bookmark);
  const languageData = useSelector(state => state.language);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const translationData = useSelector(state => state.translation);
  const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : BOOKMARK;
  const adUnitIdBanner = __DEV__ ? TestIds.BANNER : BOOKMARK_BANNER;
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    interstitial.load();
    return unsubscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      headerTitle: () => (
        <Text
          style={{
            fontSize: languageData === 'Hindi' ? 20 : 18,
            marginTop: 6,
            color: '#000',
            fontFamily: 'Inter-SemiBold',
          }}>
          {languageData === 'Hindi' ? 'बुकमार्क' : 'Bookmarks'}
        </Text>
      ),
      headerStyle: {
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    });
  }, [navigation, languageData]);

  useEffect(() => {
    getData();
    getAllChapters();
  }, [bookmarkData]);

  const removeBookMarkHandler = async key => {
    try {
      const updatedBookmarkData = {...bookmarkData};
      delete updatedBookmarkData[key];
      await AsyncStorage.setItem(
        'BookMark',
        JSON.stringify(updatedBookmarkData),
      );
      dispatch(setBookmarkHandler(updatedBookmarkData));
      setData(prevData => {
        const newData = {...prevData};
        delete newData[key];
        return newData;
      });
      ToastAndroid.show('Bookmark Removed!', ToastAndroid.CENTER);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const getData = async () => {
    if (!bookmarkData) {
      setData(null);
      return;
    }
  };

  const [chapters, setChapters] = useState();

  const getAllChapters = async () => {
    const url = 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?limit=18';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setChapters(result);
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
      console.error(error);
    }
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
    };
    try {
      const requests = Object.keys(bookmarkData).map(key => {
        const [chap_no, verse_no] = key.split('.');
        const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chap_no}/verses/${verse_no}/`;
        return fetch(url, {headers})
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch(error => console.error(error));
      });
      const responses = await Promise.all(requests);
      const data = responses.reduce((acc, responseData, index) => {
        const key = Object.keys(bookmarkData)[index];
        acc[key] = responseData;
        return acc;
      }, {});
      setData(prevData => ({...prevData, ...data}));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {!data && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#e11d48" />
          </View>
        )}
        {data && Object.keys(data).length === 0 && (
          <Text style={styles.noBookTxt}>
            {languageData === 'Hindi' ? 'कोई बुकमार्क नहीं' : 'No Bookmarks'}
          </Text>
        )}
        {data && Object.keys(data).length !== 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
            {Object.keys(data).map(key => {
              const item = data[key];
              return (
                <TouchableOpacity
                  key={`Verse ${item.chapter_number}.${item.verse_number}`}
                  style={styles.bookmarkCard}
                  activeOpacity={0.4}
                  onPress={() =>
                    navigation.push('Verse', {
                      chap_no: item.chapter_number,
                      versed: chapters[item.chapter_number - 1].verses_count,
                      name:
                        languageData === 'Hindi'
                          ? chapters[item.chapter_number - 1].name_translated
                          : chapters[item.chapter_number - 1].name,
                      current: item.verse_number,
                    })
                  }>
                  <Text
                    style={[
                      styles.bookmarkLabelTxt,
                      languageData === 'Hindi' && {fontSize: 17},
                    ]}>{`${languageData === 'Hindi' ? 'स्लोक' : 'Verse'} ${
                    item.chapter_number
                  }.${item.verse_number}`}</Text>
                  <Text style={styles.bookmarkTxt} numberOfLines={4}>
                    {item.translations[
                      authorData.Translation.findIndex(
                        item => item.id === translationData.id,
                      )
                    ].description
                      .replace(
                        `।।${item.chapter_number}.${item.verse_number}।।`,
                        '',
                      )
                      .trim()}
                  </Text>
                  <TouchableOpacity
                    style={styles.bottomBtnDiv}
                    activeOpacity={0.9}
                    onPress={() => removeBookMarkHandler(key)}>
                    <FontAwesome name="bookmark" color="#000000" size={24} />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
      <View>
        <BannerAd
          unitId={adUnitIdBanner}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    alignSelf: 'center',
    marginVertical: 18,
    width: '90%',
  },
  bookmarkCard: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 12,
    elevation: 20,
    shadowColor: '#00000030',
    width: '100%',
    position: 'relative',
  },
  bookmarkLabelTxt: {
    fontFamily: 'Inter-ExtraBold',
    color: '#e11d48',
    fontSize: 14,
    textTransform: 'uppercase',
    width: '100%',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: -4,
  },
  bookmarkTxt: {
    marginTop: 12,
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 15,
    lineHeight: 24,
    paddingHorizontal: 6,
  },
  noBookTxt: {
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomBtnDiv: {
    position: 'absolute',
    right: 10,
    top: 6,
    padding: 8,
  },
});
