import {StyleSheet, SafeAreaView, View, Image} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';

const Splash = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/bg.jpg')}
        style={{height: '100%', objectFit: 'cover', position: 'absolute'}}
      />
      <Image
        source={require('../assets/logo.png')}
        style={{height: 140, objectFit: 'contain'}}
      />
    </SafeAreaView>
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
});
