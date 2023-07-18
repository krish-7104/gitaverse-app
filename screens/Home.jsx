import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';
import RightIcon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
const Home = ({navigation}) => {
  const [chapters, setChapters] = useState([]);
  const [randomSlok, setRandomSlok] = useState([]);
  const language = useSelector(state => state.language);
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
          <Text style={styles.chapTitle}>
            {language === 'hindi' ? 'सभी अध्याय' : 'Chapters'}
          </Text>
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
                    navigation.navigate('Chapter', {
                      chap_no: chap.chapter_number,
                      versed: chap.verses_count,
                      name: language === 'hindi' ? chap.name : chap.translation,
                    })
                  }>
                  <View style={styles.chapCountDiv}>
                    <Text style={styles.chapCountTxt}>
                      {chap.chapter_number}
                    </Text>
                  </View>
                  <View style={styles.chapDataDiv}>
                    <Text style={styles.chapDataTitle}>
                      {language === 'hindi' ? chap.name : chap.translation}
                    </Text>
                    <Text style={styles.chapDataSubtitle}>
                      {chap.verses_count}{' '}
                      {language === 'hindi' ? 'छंद' : 'verses'}
                    </Text>
                  </View>
                  <View style={styles.rightIcon}>
                    <RightIcon
                      name="chevron-forward-outline"
                      color="#00000080"
                      size={18}
                    />
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
    backgroundColor: 'white',
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
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
  chapCountTxt: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#dc2626',
    fontSize: 16,
  },
  chapDataDiv: {
    marginLeft: 20,
    width: '70%',
  },
  chapDataTitle: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  chapDataSubtitle: {
    color: '#00000090',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  rightIcon: {
    width: '10%',
    padding: 10,
  },
});
