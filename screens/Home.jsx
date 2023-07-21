import {StyleSheet, Text, View} from 'react-native';
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
        dispatch(setBookmarkHandler(JSON.parse(bookmark)));
      }
      const Translation = await AsyncStorage.getItem('Translation');
      if (Translation !== null) {
        dispatch(setTranslationhandler(JSON.parse(Translation)));
      }
      const Commentary = await AsyncStorage.getItem('Commentary');
      if (Commentary !== null) {
        dispatch(setCommentaryhandler(JSON.parse(Commentary)));
      }
      const Pitch = await AsyncStorage.getItem('Pitch');
      if (Pitch !== null) {
        dispatch(setSpeechPitchHandler(Pitch));
      }
      const Rate = await AsyncStorage.getItem('Rate');
      if (Rate !== null) {
        dispatch(setSpeechRateHandler(Rate));
      }
      const Language = await AsyncStorage.getItem('Language');
      if (Language !== null) {
        dispatch(setLanguageHandler(Language));
      }
      const LastRead = await AsyncStorage.getItem('Last Read');
      if (LastRead !== null) {
        dispatch(setLastReadHandler(JSON.parse(LastRead)));
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
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
