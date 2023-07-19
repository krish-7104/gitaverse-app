import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const Chapter = () => {
  const navigation = useNavigation();
  const [chapters, setChapters] = useState([]);
  const language = useSelector(state => state.language);
  useEffect(() => {
    getAllChapters();
  }, []);
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
      {!chapters && (
        <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="#e11d48" />
        </View>
      )}
      {chapters && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{width: '94%'}}>
          {chapters.map(chap => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={chap.chapter_number}
                style={styles.mainChapDiv}
                onPress={() =>
                  navigation.navigate('Verse', {
                    chap_no: chap.chapter_number,
                    versed: chap.verses_count,
                    name: language === 'Hindi' ? chap.name : chap.translation,
                  })
                }>
                <View style={styles.chapCountDiv}>
                  <Text style={styles.chapCountTxt}>{chap.chapter_number}</Text>
                </View>
                <View style={styles.chapDataDiv}>
                  <Text style={styles.chapDataTitle}>
                    {language === 'Hindi' ? chap.name : chap.translation}
                  </Text>
                  <Text style={styles.chapDataSubtitle}>
                    {chap.verses_count}{' '}
                    {language === 'Hindi' ? 'छंद' : 'verses'}
                  </Text>
                </View>
                <View style={styles.rightIcon}>
                  <Ionicons
                    name="chevron-forward-outline"
                    color="#00000080"
                    size={18}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  quoteDiv: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  quoteTitle: {
    color: 'black',
    fontFamily: 'Inter-Bold',
  },
  quoteTxt: {
    color: 'black',
    fontFamily: 'Inter-Medium',
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
    fontFamily: 'Inter-Medium',
    color: '#dc2626',
    fontSize: 16,
  },
  chapDataDiv: {
    marginLeft: 20,
    width: '70%',
  },
  chapDataTitle: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
  },
  chapDataSubtitle: {
    color: '#00000090',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  rightIcon: {
    width: '10%',
    padding: 10,
  },
});
