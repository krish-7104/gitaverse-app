import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import axios from 'axios';

const Chapter = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 18,
              marginTop: 6,
              color: '#000',
              fontFamily: 'Poppins-SemiBold',
            }}>
            {route.params.chap_no}. {route.params.name}
          </Text>
        );
      },
    });
  }, [navigation]);
  const [chapData, setChapData] = useState();
  useEffect(() => {
    getChapterData();
  }, []);

  const getChapterData = async () => {
    try {
      const response = await axios.get(
        `https://bhagavadgitaapi.in/chapter/${route.params.chap_no}`,
      );
      const data = response.data;
      setChapData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        {chapData && (
          <>
            <Text style={styles.sectionTitle}>Meaning</Text>
            <Text style={styles.mainText}>{chapData.meaning.en}</Text>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.mainText}>{chapData.summary.en}</Text>
            <TouchableOpacity
              style={styles.mainBtnDiv}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Verse', {
                  ...route.params,
                })
              }>
              <Text style={styles.mainBtnTxt}>Read Verses</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
    marginVertical: 14,
    color: '#dc2626',
    letterSpacing: 1,
  },
  mainText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
  },
  mainBtnDiv: {
    backgroundColor: '#dc2626',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#dc2626',
    elevation: 20,
    marginVertical: 14,
  },
  mainBtnTxt: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
  },
});
