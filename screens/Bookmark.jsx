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
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Bookmark = () => {
  const [data, setData] = useState([]);
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
    for (let i = 0; i < Object.keys(bookmarkData).length; i++) {
      requests.push(
        axios.get(
          `https://bhagavadgitaapi.in/slok/${
            Object.keys(bookmarkData)[i].split('.')[0]
          }/${Object.keys(bookmarkData)[i].split('.')[1]}`,
        ),
      );
    }
    try {
      const responses = await Promise.all(requests);
      const data = responses.reduce((acc, response, index) => {
        acc[index + 1] = response.data;
        return acc;
      }, {});
      setData(prev => ({...prev, ...data}));
    } catch (error) {
      console.error(error);
    }
  };

  const getAllChapters = async () => {
    try {
      const response = await axios.get('https://bhagavadgitaapi.in/chapters');
      const data = response.data;
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
                activeOpacity={0.5}
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
                <Text style={styles.bookmarkTxt}>
                  {(data[item]?.[translationData?.author]?.[
                    translationData?.type
                  ])
                    .replace(data[item].chapter + '.' + data[item].verse, '')
                    .slice(0, 100)}
                </Text>
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
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 12,
    elevation: 10,
    shadowColor: '#00000010',
    width: '94%',
  },
  bookmarkLabelTxt: {
    fontFamily: 'Inter-Bold',
    marginLeft: 2,
    color: '#e11d48',
    fontSize: 12,
    textTransform: 'uppercase',
    width: '100%',
    letterSpacing: 1,
  },
  bookmarkTxt: {
    marginTop: 4,
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 15,
    lineHeight: 24,
  },
  noBookTxt: {
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
  },
});
