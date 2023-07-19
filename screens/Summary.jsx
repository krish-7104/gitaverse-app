import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Octiocon from 'react-native-vector-icons/Octicons';

const Summary = ({navigation}) => {
  const [data, setData] = useState([]);
  const languageData = useSelector(state => state.language);
  useEffect(() => {
    getAllChapters();
  }, []);
  const [count, setCount] = useState(0);
  const getAllChapters = async () => {
    try {
      const response = await axios.get('https://bhagavadgitaapi.in/chapters');
      const respData = response.data;
      setData(respData);
    } catch (error) {
      console.error(error);
    }
  };
  const increment = () => {
    if (count !== 17) {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count !== 0) {
      setCount(count - 1);
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
      <View style={styles.bottomNavDiv}>
        <TouchableOpacity
          disabled={count === 0 ? true : false}
          style={styles.bottomBtnDiv}
          activeOpacity={0.9}
          onPress={decrement}>
          <Octiocon
            name="chevron-left"
            color={count === 0 ? '#00000040' : '#000000'}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={count === 17 ? true : false}
          style={styles.bottomBtnDiv}
          activeOpacity={0.9}
          onPress={increment}>
          <Octiocon
            name="chevron-right"
            color={count === 17 ? '#00000040' : '#000000'}
            size={22}
          />
        </TouchableOpacity>
      </View>
      {data && Object.keys(data).length !== 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>
            {languageData === 'Hindi'
              ? `अध्याय ${count + 1}`
              : `Chapter ${count + 1}`}
          </Text>
          <Text style={styles.sectionTxt}>
            {languageData === 'Hindi'
              ? data[count].name
              : data[count].translation}
          </Text>
          <Text style={styles.sectionTitle}>
            {languageData === 'Hindi' ? 'अर्थ' : 'Meaning'}
          </Text>
          <Text style={styles.sectionTxt}>
            {languageData === 'Hindi'
              ? data[count].meaning.hi
              : data[count].meaning.en}
          </Text>
          <Text style={styles.sectionTitle}>
            {languageData === 'Hindi' ? 'सारांश' : 'Summary'}
          </Text>
          <Text style={styles.sectionTxt}>
            {languageData === 'Hindi'
              ? data[count].summary.hi
              : data[count].summary.en}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  scrollContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '96%',
    paddingVertical: 16,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Inter-ExtraBold',
    textTransform: 'uppercase',
    marginVertical: 14,
    letterSpacing: 1,
  },
  sectionTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  bottomNavDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 22,
    position: 'absolute',
    zIndex: 10,
  },
  bottomBtnDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
