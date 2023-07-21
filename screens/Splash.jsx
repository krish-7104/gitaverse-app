import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLastReadHandler} from '../redux/actions';
import apiLink from '../util';
const Splash = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const dispatch = useDispatch();
  const checkUpdate = async () => {
    const data = await fetch(apiLink);
    const jsonData = await data.json();
    if (jsonData.Update.Available && jsonData.Update.Version === 1) {
      navigation.replace('Update');
    } else {
      setTimeout(() => {
        navigation.replace('Home');
      }, 1200);
    }
  };
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('lastRead');
      if (data !== null) {
        dispatch(setLastReadHandler(data));
      }
      checkUpdate();
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{height: 140, objectFit: 'contain'}}
      />
      <Text style={styles.mainTxt}>GitaVerse</Text>
      <Text style={styles.subTxt}>The Ultimate Gyan Of Bhagavad Gita</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 40,
    color: '#dc2626',
  },
  subTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#00000090',
    marginTop: -10,
  },
});
