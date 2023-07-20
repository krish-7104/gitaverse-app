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

const Summary = () => {
  const [data, setData] = useState([]);
  const languageData = useSelector(state => state.language);
  const navigation = useNavigation();
  useEffect(() => {
    getAllChapters();
  }, []);

  const [count, setCount] = useState(0);

  const getAllChapters = async () => {
    try {
      const response = await fetch('http://bhagavadgitaapi.in/chapters');
      const data = await response.json();
      setData(data);
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
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
                  <Text style={styles.chapDataTitle}>
                    {chap.chapter_number}.{' '}
                    {languageData === 'Hindi' ? chap.name : chap.translation}
                  </Text>
                  <Text style={styles.chapDataSubtitle} numberOfLines={2}>
                    {languageData === 'Hindi'
                      ? chap.summary.hi
                      : chap.summary.en}
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
    fontSize: 17,
  },
  chapDataSubtitle: {
    color: '#00000090',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    marginTop: 6,
  },
});
