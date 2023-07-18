import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import data from '../data.json';
import {useSelector} from 'react-redux';
import BottomNav from '../components/BottomNav';
const Setting = ({navigation}) => {
  const commentaryData = useSelector(state => state.commentary);
  const translationData = useSelector(state => state.translation);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Commentary Source</Text>
        <TouchableOpacity
          style={styles.selectedBtn}
          onPress={() =>
            navigation.navigate('LangChange', {
              type: 'verse_commentary_sources',
            })
          }>
          <Text style={styles.selectedTxt}>
            {data.verse_commentary_sources[commentaryData.author].language}{' '}
            Commentary By{' '}
            {data.verse_commentary_sources[commentaryData.author].author}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  scrollContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 18,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 6,
  },
  selectedBtn: {
    borderColor: '#00000040',
    borderWidth: 1.4,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectedTxt: {
    color: '#00000090',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});
