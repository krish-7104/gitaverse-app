import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const Chapter = () => {
  const navigation = useNavigation();
  const [chapters, setChapters] = useState();
  const [lastReadData, setLastReadData] = useState();
  const language = useSelector(state => state.language);
  const lastRead = useSelector(state => state.lastread);
  const translationData = useSelector(state => state.translation);

  useEffect(() => {
    getAllChapters();
  }, []);

  useEffect(() => {
    lastRead && getLastReadData();
  }, [lastRead]);

  const getAllChapters = async () => {
    try {
      const response = await fetch('http://bhagavadgitaapi.in/chapters');
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
      console.error(error);
    }
  };

  const getLastReadData = async () => {
    try {
      const response = await fetch(
        `http://bhagavadgitaapi.in/slok/${
          lastRead.split('.')[0] + '/' + lastRead.split('.')[1]
        }`,
      );

      if (!response.ok) {
        throw new Error('Error fetching data from API');
      }

      const data = await response.json();
      setLastReadData(data);
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
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
          {lastReadData && (
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.lastReadCard}
              onPress={() =>
                navigation.push('Verse', {
                  chap_no: Number(lastRead.split('.')[0]),
                  versed: chapters[lastRead.split('.')[0] - 1].verses_count,
                  name:
                    language === 'Hindi'
                      ? chapters[lastRead.split('.')[0] - 1].name
                      : chapters[lastRead.split('.')[0] - 1].translation,
                  current: Number(lastRead.split('.')[1]),
                })
              }>
              <View style={styles.lastreadTopDiv}>
                <Text
                  style={[
                    styles.lastReadLabel,
                    language === 'Hindi' && {fontSize: 16},
                  ]}>
                  {language === 'Hindi' ? 'अंतिम वाचन' : 'Last Read'}
                </Text>
                <Text
                  style={[
                    styles.lastReadVerse,
                    language === 'Hindi' && {fontSize: 16},
                  ]}>
                  {language === 'Hindi' ? 'स्लोक' : 'Verse'} {lastRead}
                </Text>
              </View>
              <Text style={styles.lastReadSlok} numberOfLines={4}>
                {JSON.stringify(
                  lastReadData?.[translationData?.author]?.[
                    translationData?.type
                  ],
                )}
              </Text>
            </TouchableOpacity>
          )}
          {chapters.map(chap => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={chap.chapter_number}
                style={styles.mainChapDiv}
                onPress={() =>
                  navigation.push('Verse', {
                    chap_no: chap.chapter_number,
                    versed: chap.verses_count,
                    name: language === 'Hindi' ? chap.name : chap.translation,
                  })
                }>
                <View style={styles.chapCountDiv}>
                  <Text style={styles.chapCountTxt}>{chap.chapter_number}</Text>
                </View>
                <View style={styles.chapDataDiv}>
                  <Text
                    style={[
                      styles.chapDataTitle,
                      language === 'Hindi' && {fontSize: 18},
                    ]}>
                    {language === 'Hindi' ? chap.name : chap.translation}
                  </Text>
                  <Text
                    style={[
                      styles.chapDataSubtitle,
                      language === 'Hindi' && {fontSize: 16},
                    ]}>
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
  mainChapDiv: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    paddingVertical: 14,
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
    fontSize: 14,
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
    marginTop: 2,
  },
  rightIcon: {
    width: '10%',
    padding: 10,
  },
  lastReadCard: {
    backgroundColor: 'white',
    marginTop: 16,
    borderBottomColor: '#18181870',
    borderBottomWidth: 1.5,
    paddingBottom: 16,
    paddingHorizontal: 6,
  },
  lastreadTopDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lastReadLabel: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#dc2626',
  },
  lastReadVerse: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
  },
  lastReadSlok: {
    marginTop: 10,
    color: 'black',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
});
