import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setBookmarkHandler} from '../redux/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bookmark = () => {
  const [data, setData] = useState(null);
  const bookmarkData = useSelector(state => state.bookmark);
  const languageData = useSelector(state => state.language);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    getAllChapters();
  }, [bookmarkData]);

  const removeBookMarkHandler = async key => {
    try {
      const updatedBookmarkData = {...bookmarkData};
      delete updatedBookmarkData[key];
      await AsyncStorage.setItem(
        'BookMark',
        JSON.stringify(updatedBookmarkData),
      );
      dispatch(setBookmarkHandler(updatedBookmarkData));
      setData(prevData => {
        const newData = {...prevData};
        delete newData[key];
        return newData;
      });
      ToastAndroid.show('Bookmark Removed!', ToastAndroid.CENTER);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const getData = async () => {
    if (!bookmarkData) {
      setData(null);
      return;
    }
  };

  const [chapters, setChapters] = useState();

  const getAllChapters = async () => {
    try {
      const response = await fetch('http://bhagavadgitaapi.in/chapters');
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
    }

    const requests = Object.keys(bookmarkData).map(key => {
      const [chap_no, verse_no] = key.split('.');
      return fetch(`http://bhagavadgitaapi.in/slok/${chap_no}/${verse_no}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => console.error(error));
    });

    try {
      const responses = await Promise.all(requests);
      const data = responses.reduce((acc, responseData, index) => {
        const key = Object.keys(bookmarkData)[index];
        acc[key] = responseData;
        return acc;
      }, {});
      setData(data);
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!data && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#e11d48" />
        </View>
      )}

      {data && Object.keys(data).length === 0 && (
        <Text style={styles.noBookTxt}>No Bookmarks!</Text>
      )}

      {data && Object.keys(data).length !== 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {Object.keys(data).map(key => {
            const item = data[key];
            return (
              <TouchableOpacity
                key={`Verse ${item.chapter}.${item.verse}`}
                style={styles.bookmarkCard}
                activeOpacity={0.4}
                onPress={() =>
                  navigation.navigate('Verse', {
                    chap_no: item.chapter,
                    versed: chapters[item.chapter - 1].verses_count,
                    name:
                      languageData === 'Hindi'
                        ? item.chapter.name
                        : item.chapter.translation,
                    current: item.verse,
                  })
                }>
                <Text
                  style={
                    styles.bookmarkLabelTxt
                  }>{`Verse ${item.chapter}.${item.verse}`}</Text>
                <Text style={styles.bookmarkTxt}>{item.slok}</Text>
                <TouchableOpacity
                  style={styles.bottomBtnDiv}
                  activeOpacity={0.9}
                  onPress={() => removeBookMarkHandler(key)}>
                  <FontAwesome name="bookmark" color="#000000" size={24} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scrollContainer: {
    alignSelf: 'center',
    marginVertical: 18,
    width: '90%',
  },
  bookmarkCard: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 12,
    elevation: 20,
    shadowColor: '#00000030',
    width: '100%',
    position: 'relative',
  },
  bookmarkLabelTxt: {
    fontFamily: 'Inter-ExtraBold',
    color: '#e11d48',
    fontSize: 14,
    textTransform: 'uppercase',
    width: '100%',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: -4,
  },
  bookmarkTxt: {
    marginTop: 8,
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 17,
    lineHeight: 28,
    textAlign: 'center',
    paddingTop: 5,
  },
  noBookTxt: {
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomBtnDiv: {
    position: 'absolute',
    right: 10,
    top: 6,
    padding: 8,
  },
});
