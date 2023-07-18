import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

const Verse = ({route, navigation}) => {
  const translationData = useSelector(state => state.translation);
  const commentaryData = useSelector(state => state.commentary);
  const [versed, setVersed] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    getData();
  }, [count]);
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
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://bhagavadgitaapi.in/slok/${route.params.chap_no}/${count}`,
      );
      const data = response.data;
      setVersed(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handlerDecrement = () => {
    setCount(count - 1);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={styles.container}>
        {translationData && commentaryData && versed && (
          <>
            <Text style={styles.chapSlokNum}>
              {route.params.chap_no}.{count}
            </Text>
            <Text style={styles.slokTxt}>{versed?.slok}</Text>
            <Text style={styles.sectionTitle}>Transliteration</Text>
            <Text style={styles.sectionTxt}>{versed?.transliteration}</Text>
            <Text style={styles.sectionTitle}>Translation</Text>
            <Text style={styles.sectionTxt}>
              {versed?.[translationData?.author]?.[translationData?.type]}
            </Text>
            <Text style={styles.sectionTitle}>Commentary</Text>
            <Text style={styles.sectionTxt}>
              {versed?.[commentaryData?.author]?.[commentaryData?.type]}
            </Text>
          </>
        )}
      </View>
      <View style={styles.bottomNavDiv}>
        <TouchableOpacity onPress={handlerDecrement}>
          <Text style={{color: 'black'}}>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleIncrement}>
          <Text style={{color: 'black'}}>Increment</Text>
        </TouchableOpacity>
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
    fontSize: 22,
    marginVertical: 12,
  },
  slokTxt: {
    color: '#dc2626',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 38,
    fontSize: 17,
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
    marginVertical: 15,
  },
  sectionTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 27,
  },
  bottomNavDiv: {},
});
