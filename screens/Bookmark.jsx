import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
const Bookmark = ({navigation}) => {
  const [data, setData] = useState([]);
  const bookmarkData = useSelector(state => state.bookmark);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const requests = [];
    for (let i = 0; i < bookmarkData.length; i++) {
      requests.push(
        axios.get(`https://bhagavadgitaapi.in/slok/${bookmarkData[i]}`),
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {data &&
          Object.keys(data).map(item => {
            return (
              <View style={styles.bookmarkCard}>
                <Text style={styles.bookmarkLabel}>
                  {'Verse ' + data[item].chapter + '.' + data[item].verse}
                </Text>
                <Text style={styles.bookmarkTxt}>
                  {data[item].transliteration}
                </Text>
              </View>
            );
          })}
      </ScrollView>
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
    width: '94%',
    alignSelf: 'center',
    marginVertical: 18,
  },
  bookmarkCard: {
    width: '100%',
    borderBottomWidth: 1.4,
    paddingVertical: 12,
    borderBottomColor: '#00000020',
    borderBottomWidth: 1.4,
  },
  bookmarkLabel: {
    fontFamily: 'Inter-SemiBold',
    color: '#00000080',
    fontSize: 14,
  },
  bookmarkTxt: {
    fontFamily: 'Inter-Medium',
    color: '#000000',
    fontSize: 15,
  },
});
