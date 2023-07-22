import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import BottomNav from '../components/BottomNav';
import Chapter from './Chapter';
import Setting from './Setting';
import Bookmark from './Bookmark';
import Summary from './Summary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBookmarkHandler,
  setCommentaryhandler,
  setLanguageHandler,
  setLastReadHandler,
  setSpeechPitchHandler,
  setSpeechRateHandler,
  setTranslationhandler,
} from '../redux/actions';
const Home = ({navigation}) => {
  const langauge = useSelector(state => state.langauge);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const [active, setActive] = useState('home');
  const navTitle = {
    home: 'GitaVerse',
    bookmark: 'Bookmarks',
    summary: 'Summary of All Chapters',
    settings: 'Settings',
  };
  const navTitleHindi = {
    home: 'GitaVerse',
    bookmark: 'बुकमार्क',
    summary: 'सभी अध्यायों का सारांश',
    settings: 'सेटिंग्स',
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const bookmark = await AsyncStorage.getItem('BookMark');
      if (bookmark !== null) {
        try {
          dispatch(setBookmarkHandler(JSON.parse(bookmark)));
        } catch (error) {
          ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
        }
      }

      const Translation = await AsyncStorage.getItem('Translation');
      if (Translation !== null) {
        try {
          dispatch(setTranslationhandler(JSON.parse(Translation)));
        } catch (error) {
          ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
        }
      }

      const Commentary = await AsyncStorage.getItem('Commentary');
      if (Commentary !== null) {
        try {
          dispatch(setCommentaryhandler(JSON.parse(Commentary)));
        } catch (error) {
          ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
        }
      }

      const Pitch = await AsyncStorage.getItem('Pitch');
      if (Pitch !== null) {
        try {
          dispatch(setSpeechPitchHandler(Number(Pitch)));
        } catch (error) {
          ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
        }
      }

      const Rate = await AsyncStorage.getItem('Rate');
      if (Rate !== null) {
        try {
          dispatch(setSpeechRateHandler(Number(Rate)));
        } catch (error) {
          ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
        }
      }
      const Language = await AsyncStorage.getItem('Language');
      if (Language !== null) {
        try {
          dispatch(setLanguageHandler(Language));
        } catch (error) {
          ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
        }
      }

      const LastRead = await AsyncStorage.getItem('Last Read');
      if (LastRead !== null) {
        try {
          dispatch(setLastReadHandler(LastRead));
        } catch (error) {
          ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
        }
      }
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
    }
  };
  return (
    <>
      <View style={styles.navDiv}>
        <Text style={styles.navTitle}>
          {langauge === 'Hindi' ? navTitleHindi[active] : navTitle[active]}
        </Text>
      </View>
      {active === 'home' && <Chapter />}
      {active === 'bookmark' && <Bookmark />}
      {active === 'summary' && <Summary />}
      {active === 'settings' && <Setting />}
      <BottomNav active={active} setActive={setActive} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  navDiv: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 10,
    zIndex: 20,
    shadowColor: '#00000095',
  },
  navTitle: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
  },
});
