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
    getSettingsData();
  }, []);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('BookMark');
      if (data !== null) {
        dispatch(setBookmarkHandler(JSON.parse(data)));
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  const getSettingsData = async () => {
    try {
      const data = await AsyncStorage.getItem('Settings');
      if (data !== null) {
        dispatch(setSpeechPitchHandler(JSON.parse(data)?.pitch));
        dispatch(setSpeechRateHandler(JSON.parse(data)?.rate));
        dispatch(setLastReadHandler(JSON.parse(data)?.lastRead));
        dispatch(setTranslationhandler(JSON.parse(data)?.translation));
        dispatch(setCommentaryhandler(JSON.parse(data)?.commentary));
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
