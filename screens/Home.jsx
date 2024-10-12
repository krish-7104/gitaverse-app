import React, {useLayoutEffect, useEffect} from 'react';
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
  setTranslationhandler,
} from '../redux/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ToastAndroid} from 'react-native';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language);
  const Tab = createMaterialTopTabNavigator();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: language === 'Hindi' ? 'गीतावर्स' : 'GitaVerse',
    });
  }, [navigation, language]);

  useEffect(() => {
    const getData = async () => {
      try {
        const bookmark = await AsyncStorage.getItem('BookMark');
        if (bookmark) {
          dispatch(setBookmarkHandler(JSON.parse(bookmark)));
        }

        const translation = await AsyncStorage.getItem('Translation Source');
        if (translation) {
          dispatch(setTranslationhandler(JSON.parse(translation)));
        }

        const commentary = await AsyncStorage.getItem('Commentary Source');
        if (commentary) {
          dispatch(setCommentaryhandler(JSON.parse(commentary)));
        }

        const language = await AsyncStorage.getItem('Language');
        if (language) {
          dispatch(setLanguageHandler(language));
        }

        const lastRead = await AsyncStorage.getItem('Last Read');
        if (lastRead) {
          dispatch(setLastReadHandler(lastRead));
        }
      } catch (error) {
        ToastAndroid.show('Error in Loading Data', ToastAndroid.BOTTOM);
      }
    };

    getData();
  }, [dispatch]);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          switch (route.name) {
            case 'GitaVerse':
            case 'गीतावर्स':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Settings':
            case 'सेटिंग्स':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Summary':
            case 'सारांश':
              iconName = focused ? 'bulb' : 'bulb-outline';
              break;
            case 'Bookmarks':
            case 'बुकमार्क':
              iconName = focused ? 'bookmark' : 'bookmark-outline';
              break;
            default:
              iconName = 'home-outline';
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: '#e11d48',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: {
          backgroundColor: '#e11d48',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          textTransform: 'capitalize',
          fontSize: 12,
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
  );
};

export default Home;
