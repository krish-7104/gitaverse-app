import {StyleSheet, Text, View, Image, Alert, Linking} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import link from '../util';
const Splash = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    checkUpdate();
  }, []);

  const checkUpdate = async () => {
    const data = await fetch(link);
    const jsonData = await data.json();
    if (jsonData.Update.Update && jsonData.Update.Version === 1) {
      Alert.alert(
        'Update Available',
        'Update app to get more features and better experience',
        [
          {
            text: 'Later',
            onPress: () => navigation.replace('Home'),
            style: 'cancel',
          },
          {
            text: 'Update Now',
            onPress: () => Linking.openURL(jsonData.Update.Link),
          },
        ],
        {cancelable: false},
      );
    } else {
      setTimeout(() => {
        navigation.replace('Home');
      }, 1200);
    }
  };

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
