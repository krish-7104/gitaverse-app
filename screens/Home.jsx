import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import BottomNav from '../components/BottomNav';
import Chapter from './Chapter';
import Setting from './Setting';
import Bookmark from './Bookmark';
import Summary from './Summary';

const Home = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const [active, setActive] = useState('home');
  const navTitle = {
    home: 'GitaVerse',
    bookmark: 'Bookmarks',
    summary: 'Summary',
    settings: 'Settings',
  };
  return (
    <>
      <View style={styles.navDiv}>
        <Text style={styles.navTitle}>{navTitle[active]}</Text>
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
