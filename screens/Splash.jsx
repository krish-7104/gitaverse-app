import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLastReadHandler} from '../redux/actions';

const Splash = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('lastRead');
      if (data !== null) {
        dispatch(setLastReadHandler(data));
      }
      setTimeout(() => {
        navigation.replace('Home');
      }, 3000);
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.mainTxt}>GitaVerse</Text>
      <Text style={styles.subTxt}>The Ultimate Gyan Of Gita</Text>
      <TouchableOpacity
        style={styles.footer}
        activeOpacity={0.8}
        onPress={() => Linking.openURL('https://krishjotaniya.netlify.app')}>
        <Text style={styles.footerTxt}>App By Krish Jotaniya</Text>
      </TouchableOpacity>
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
  },
  mainTxt: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 40,
    color: '#dc2626',
  },
  subTxt: {
    fontFamily: 'Inter-Medium',
    fontSize: 22,
    color: '#00000090',
    marginTop: -12,
  },
  footer: {
    position: 'absolute',
    bottom: 14,
  },
  footerTxt: {
    fontFamily: 'Inter-Regular',
    color: '#00000090',
    fontSize: 16,
  },
});
