import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Verse = ({route}) => {
  const [versed, setVersed] = useState([]);
  useEffect(() => {
    getAllChapters();
  }, []);
  const getAllChapters = async () => {
    console.log(route.params.chap_no);
    try {
      const response = await axios.get(
        `https://bhagavadgitaapi.in/slok/${route.params.chap_no}/1`,
      );
      const data = response.data;
      setVersed(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        {versed && (
          <>
            <Text style={styles.chapSlokNum}>
              {route.params.chap_no}.{1}
            </Text>
            <Text style={styles.slokTxt}>{versed.slok}</Text>
            <Text style={styles.transliterationTitle}>Transliteration</Text>
            <Text style={styles.transliterationTxt}>
              {versed.transliteration}
            </Text>
            {/* <Text>{versed.adi.author}</Text> */}
            {/* <Text>{versed.adi.et}</Text> */}
          </>
        )}
      </View>
      <View style={styles.bottomNavDiv}>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default Verse;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapSlokNum: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 15,
  },
  slokTxt: {
    color: '#dc2626',
    fontFamily: 'Poppins-Medium',
    lineHeight: 30,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  transliterationTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  transliterationTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 15,
    lineHeight: 27,
  },
});
