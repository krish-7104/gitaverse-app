import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';

const Home = ({navigation}) => {
  const [chapters, setChapters] = useState([]);
  const [randomSlok, setRandomSlok] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    getAllChapters();
  }, []);

  const getAllChapters = async () => {
    try {
      const response = await axios.get('https://bhagavadgitaapi.in/chapters');
      const data = response.data;
      setChapters(data);
      // getRandomSlok();
    } catch (error) {
      console.error(error);
    }
  };

  // const getRandomSlok = async () => {
  //   try {
  //     let random = Math.floor(Math.random() * 18) + 1;
  //     const response = await axios.get(
  //       `https://bhagavadgitaapi.in/slok/${random}/${
  //         Math.floor(Math.random() * chapters[random - 1].verses_count) + 1
  //       }`,
  //     );
  //     const data = response.data;
  //     setRandomSlok(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.mainChap}>
        <View style={styles.chapDiv}>
          <Text style={styles.chapTitle}>Chapters</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chapters &&
            chapters.map(chap => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={chap.chapter_number}
                  style={styles.mainChapDiv}
                  onPress={() =>
                    navigation.navigate('Verse', {
                      chap_no: chap.chapter_number,
                      versed: chap.verses_count,
                    })
                  }>
                  <View style={styles.chapCountDiv}>
                    <Text style={styles.chapCountTxt}>
                      {chap.chapter_number}
                    </Text>
                  </View>
                  <View style={styles.chapDataDiv}>
                    <Text style={styles.chapDataTitle}>{chap.translation}</Text>
                    <Text style={styles.chapDataSubtitle}>
                      {chap.verses_count} verses
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainChap: {
    width: '90%',
    height: '100%',
  },
  chapDiv: {
    marginBottom: 4,
  },
  chapTitle: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 24,
    marginTop: 10,
  },
  mainChapDiv: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#00000020',
    borderBottomWidth: 1.4,
  },
  chapCountDiv: {
    backgroundColor: '#fee2e2',
    width: 26,
    height: 26,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapCountTxt: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#dc2626',
    fontSize: 14,
  },
  chapDataDiv: {
    marginLeft: 20,
  },
  chapDataTitle: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  chapDataSubtitle: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
