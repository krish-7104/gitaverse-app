import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Bookmark = () => {
  const [data, setData] = useState();
  const [chapters, setChapters] = useState([]);
  const bookmarkData = useSelector(state => state.bookmark);
  const translationData = useSelector(state => state.translation);
  const languageData = useSelector(state => state.language);
  const navigation = useNavigation();
  useEffect(() => {
    getData();
    getAllChapters();
  }, []);
  const getData = async () => {
    const requests = [];
    for (const key of Object.keys(bookmarkData)) {
      const [chap_no, verse_no] = key.split('.');
      requests.push(
        fetch(`http://bhagavadgitaapi.in/slok/${chap_no}/${verse_no}`).then(
          response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          },
        ),
      );
    }
    try {
      const responses = await Promise.all(requests);
      const data = responses.reduce((acc, responseData, index) => {
        acc[index + 1] = responseData;
        return acc;
      }, {});
      setData(prev => ({...prev, ...data}));
    } catch (error) {
      console.error(error);
    }
  };

  const getAllChapters = async () => {
    try {
      const response = await fetch('http://bhagavadgitaapi.in/chapters');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setChapters(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!data && (
        <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
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
          {Object.keys(data).map(item => {
            return (
              <TouchableOpacity
                key={'Verse ' + data[item].chapter + '.' + data[item].verse}
                style={styles.bookmarkCard}
                activeOpacity={0.4}
                onPress={() =>
                  navigation.navigate('Verse', {
                    chap_no: data[item].chapter,
                    versed: chapters[data[item].chapter - 1].verses_count,
                    name:
                      languageData === 'Hindi'
                        ? chapters[data[item].chapter - 1].name
                        : chapters[data[item].chapter - 1].translation,
                    current: data[item].verse,
                  })
                }>
                <Text style={styles.bookmarkLabelTxt}>
                  {'Verse ' + data[item].chapter + '.' + data[item].verse}
                </Text>
                <Text style={styles.bookmarkTxt}>{data[item].slok}</Text>
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
  scrollContainer: {
    alignSelf: 'center',
    marginVertical: 18,
    width: '100%',
    alignItems: 'center',
  },
  bookmarkCard: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 12,
    elevation: 20,
    shadowColor: '#00000030',
    width: '90%',
  },
  bookmarkLabelTxt: {
    fontFamily: 'Inter-ExtraBold',
    marginLeft: 2,
    color: '#e11d48',
    fontSize: 13,
    textTransform: 'uppercase',
    width: '100%',
    letterSpacing: 1,
    textAlign: 'center',
  },
  bookmarkTxt: {
    marginTop: 4,
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    paddingTop: 5,
  },
  noBookTxt: {
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
  },
});
