import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Octiocon from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setBookmarkHandler} from '../redux/actions';

const Verse = ({route, navigation}) => {
  const translationData = useSelector(state => state.translation);
  const commentaryData = useSelector(state => state.commentary);
  const bookmarkData = useSelector(state => state.bookmark);
  const dispatch = useDispatch();
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
              marginLeft: -8,
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
    if (count !== route.params.versed) {
      setCount(count + 1);
    }
  };

  const handlerDecrement = () => {
    if (count !== 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingBottom: 10,
        }}>
        <View style={styles.container}>
          {translationData && commentaryData && versed && (
            <>
              <Text style={styles.chapSlokNum}>
                {route.params.chap_no}.{count}
              </Text>
              <Text style={styles.slokTxt}>{versed?.slok}</Text>
              <Image
                source={require('../assets/flower.png')}
                style={styles.image}
              />
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
      </ScrollView>
      <View style={styles.bottomNavDiv}>
        <TouchableOpacity
          onPress={handlerDecrement}
          style={styles.bottomBtnDiv}
          activeOpacity={0.9}>
          <Octiocon name="chevron-left" color="#000000" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBtnDiv}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Setting')}>
          <Octiocon name="gear" color="#000000" size={20} />
        </TouchableOpacity>
        {bookmarkData.includes(route.params.chap_no + '.' + count) ? (
          <TouchableOpacity
            style={styles.bottomBtnDiv}
            activeOpacity={0.9}
            onPress={() =>
              dispatch(
                setBookmarkHandler(
                  bookmarkData.filter(
                    item => item !== route.params.chap_no + '.' + count,
                  ),
                ),
              )
            }>
            <FontAwesome name="bookmark" color="#000000" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.bottomBtnDiv}
            activeOpacity={0.9}
            onPress={() =>
              dispatch(
                setBookmarkHandler([
                  ...bookmarkData,
                  route.params.chap_no + '.' + count,
                ]),
              )
            }>
            <FontAwesome name="bookmark-o" color="#000000" size={20} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleIncrement}
          style={styles.bottomBtnDiv}
          activeOpacity={0.9}>
          <Octiocon name="chevron-right" color="#000000" size={22} />
        </TouchableOpacity>
      </View>
    </>
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
  image: {
    width: '40%',
    height: 50,
    objectFit: 'contain',
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
    lineHeight: 28,
  },
  bottomNavDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 22,
    shadowColor: 'black',
    elevation: 30,
    shadowOffset: {
      width: -10,
      height: -5,
    },
  },
  bottomBtnDiv: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
