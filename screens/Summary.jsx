import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import apiKey from '../apiKey';
const Summary = () => {
  const [data, setData] = useState();
  const languageData = useSelector(state => state.language);
  const navigation = useNavigation();
  useEffect(() => {
    getAllChapters();
  }, []);

  const getAllChapters = async () => {
    const url = 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?limit=18';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {!data && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#e11d48" />
        </View>
      )}
      {data && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{width: '94%'}}>
          {data.map(chap => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={chap.chapter_number}
                style={styles.mainChapDiv}
                onPress={() => {
                  navigation.push('SummaryView', {
                    data: chap,
                  });
                }}>
                <View style={styles.chapDataDiv}>
                  <Text
                    style={[
                      styles.chapDataTitle,
                      languageData === 'Hindi' && {fontSize: 18},
                    ]}>
                    {chap.chapter_number}.{' '}
                    {languageData === 'Hindi'
                      ? chap.name
                      : chap.name_translated}
                  </Text>
                  <Text
                    style={[
                      styles.chapDataSubtitle,
                      languageData === 'Hindi' && {fontSize: 16},
                    ]}
                    numberOfLines={2}>
                    {languageData === 'Hindi'
                      ? chap.chapter_summary_hindi
                      : chap.chapter_summary_hindi}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10,
  },
  scrollContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
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
  mainChapDiv: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  chapDataDiv: {
    width: '100%',
  },
  chapDataTitle: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  chapDataSubtitle: {
    color: '#00000090',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 6,
  },
});
