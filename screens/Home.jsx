import {StyleSheet, Text} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import BottomNav from '../components/BottomNav';
import Chapter from './Chapter';
import Setting from './Setting';
import Bookmark from './Bookmark';

const Home = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 22,
              marginTop: 6,
              color: '#000',
              fontFamily: 'Inter-SemiBold',
            }}>
            GitaVerse
          </Text>
        );
      },
    });
  }, [navigation]);
  const [active, setActive] = useState('home');
  return (
    <>
      {active === 'home' && <Chapter />}
      {active === 'bookmark' && <Bookmark />}
      {active === 'settings' && <Setting />}
      <BottomNav active={active} setActive={setActive} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
