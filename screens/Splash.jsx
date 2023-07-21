import {StyleSheet, Text, View, Image} from 'react-native';
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
    }, 1300);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{height: 140, objectFit: 'contain'}}
      />
      <Text style={styles.mainTxt}>GitaVerse</Text>
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
});
