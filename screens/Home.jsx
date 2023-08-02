import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import Chapter from './Chapter';
import Setting from './Setting';
import Bookmark from './Bookmark';
import Summary from './Summary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  setBookmarkHandler,
  setCommentaryhandler,
  setLanguageHandler,
  setLastReadHandler,
  setSpeechPitchHandler,
  setSpeechRateHandler,
  setTranslationhandler,
} from '../redux/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const language = useSelector(state => state.language);
  const dispatch = useDispatch();

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

      const Translation = await AsyncStorage.getItem('Translation Source');
      if (Translation !== null) {
        try {
          dispatch(setTranslationhandler(JSON.parse(Translation)));
        } catch (error) {
          ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
        }
      }

      const Commentary = await AsyncStorage.getItem('Commentary Source');
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
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'GitaVerse' || route.name === 'गीतावर्स') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings' || route.name === 'सेटिंग्स') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'सारांश' || route.name === 'Summary') {
              iconName = focused ? 'bulb' : 'bulb-outline';
            } else if (
              route.name === 'Bookmarks' ||
              route.name === 'बुकमार्क'
            ) {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: '#e11d48',
          tabBarInactiveTintColor: 'gray',
          gestureEnabled: true,
          swipeEnabled: true,
          tabBarStyle: {
            height: 60,
            padding: 10,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontFamily: 'Inter-Medium',
          },
        })}>
        <Tab.Screen
          name={language === 'Hindi' ? 'गीतावर्स' : 'GitaVerse'}
          component={Chapter}
        />
        <Tab.Screen
          name={language === 'Hindi' ? 'बुकमार्क' : 'Bookmarks'}
          component={Bookmark}
        />
        <Tab.Screen
          name={language === 'Hindi' ? 'सारांश' : 'Summary'}
          component={Summary}
        />
        <Tab.Screen
          name={language === 'Hindi' ? 'सेटिंग्स' : 'Settings'}
          component={Setting}
        />
      </Tab.Navigator>
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
