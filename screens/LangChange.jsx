import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import data from '../data.json';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCommentaryhandler,
  setLanguageHandler,
  setTranslationhandler,
} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LangChange = ({navigation, route}) => {
  const languageData = useSelector(state => state.language);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: languageData === 'Hindi' ? 20 : 18,
              marginTop: 6,
              marginLeft: -16,
              color: '#000',
              fontFamily: 'Inter-SemiBold',
            }}>
            {route.params.type === 'Commentary'
              ? languageData === 'Hindi'
                ? 'टिप्पणी स्रोत'
                : 'Verse Commentary Source'
              : route.params.type === 'language'
              ? languageData === 'Hindi'
                ? 'भाषा चुने'
                : 'Select Language'
              : languageData === 'Hindi'
              ? 'अनुवाद स्रोत'
              : 'Verse Translation Source'}
          </Text>
        );
      },
    });
  }, [navigation]);
  const dispatch = useDispatch();
  const changeHandler = async (author, langaugeType, type, id) => {
    if (type === 'Translation') {
      dispatch(setTranslationhandler({author, type: langaugeType, id}));
      try {
        await AsyncStorage.setItem(
          'Translation',
          JSON.stringify({author, type: langaugeType, id}),
        );
      } catch (error) {
        ToastAndroid.show('Something Went Wrong!', ToastAndroid.BOTTOM);
      }
    } else {
      dispatch(setCommentaryhandler({author, type: langaugeType, id}));
      try {
        await AsyncStorage.setItem(
          'Commentary',
          JSON.stringify({author, type: langaugeType, id}),
        );
      } catch (error) {
        ToastAndroid.show('Something Went Wrong!', ToastAndroid.BOTTOM);
      }
    }
    navigation.goBack();
  };
  const changeLangHandler = lang => {
    dispatch(setLanguageHandler(lang));
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {data &&
          route.params.type !== 'language' &&
          Object.keys(data[route.params.type]).map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  changeHandler(
                    data[route.params.type][item].author_name,
                    data[route.params.type][item].language,
                    route.params.type === 'Commentary'
                      ? 'Commentary'
                      : 'Translation',
                    data[route.params.type][item].id,
                  )
                }
                style={styles.nameCard}
                key={index}>
                <Text style={styles.textArea}>
                  {data[route.params.type][item].language}{' '}
                  {route.params.type === 'Commentary'
                    ? 'Commentary'
                    : 'Translation'}{' '}
                  By {data[route.params.type][item].author_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        {data && route.params.type === 'language' && (
          <>
            <TouchableOpacity
              style={styles.nameCard}
              onPress={() => changeLangHandler('English')}>
              <Text style={styles.textArea}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nameCard}
              onPress={() => changeLangHandler('Hindi')}>
              <Text style={styles.textArea}>Hindi</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LangChange;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mainTitle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginVertical: 16,
  },
  nameCard: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginVertical: 2,
    borderBottomColor: '#e7e7e790',
    borderBottomWidth: 1.2,
  },
  textArea: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: 'black',
    textAlign: 'left',
    width: '100%',
  },
});
