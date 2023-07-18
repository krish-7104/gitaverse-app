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
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Setting = () => {
  const commentaryData = useSelector(state => state.commentary);
  const translationData = useSelector(state => state.translation);
  const langauageData = useSelector(state => state.language);
  const navigation = useNavigation();
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
          <Ionicons name={'chevron-down-outline'} color="#00000080" size={20} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Translation Source</Text>
        <TouchableOpacity
          style={styles.selectedBtn}
          onPress={() =>
            navigation.navigate('LangChange', {
              type: 'verse_translation_sources',
            })
          }>
          <Text style={styles.selectedTxt}>
            {data.verse_translation_sources[translationData.author].language}{' '}
            Translation By{' '}
            {data.verse_translation_sources[translationData.author].author}
          </Text>
          <Ionicons name={'chevron-down-outline'} color="#00000080" size={20} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Select Language</Text>
        <TouchableOpacity
          style={styles.selectedBtn}
          onPress={() =>
            navigation.navigate('LangChange', {
              type: 'language',
            })
          }>
          <Text style={styles.selectedTxt}>{langauageData}</Text>
          <Ionicons name={'chevron-down-outline'} color="#00000080" size={20} />
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
    marginTop: 18,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 6,
    marginTop: 10,
  },
  selectedBtn: {
    borderColor: '#00000040',
    borderWidth: 1.4,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedTxt: {
    color: '#00000090',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});
