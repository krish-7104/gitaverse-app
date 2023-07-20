import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';

const SummaryView = ({navigation, route}) => {
  const languageData = useSelector(state => state.language);
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
            Summary of Chapter {route.params.data.chapter_number}
          </Text>
        );
      },
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>
          {languageData === 'Hindi' ? `शीर्षक` : `Title`}
        </Text>
        <Text style={styles.sectionTxt}>
          {languageData === 'Hindi'
            ? route.params.data.name
            : route.params.data.translation}
        </Text>
        <Text style={styles.sectionTitle}>
          {languageData === 'Hindi' ? 'अर्थ' : 'Meaning'}
        </Text>
        <Text style={styles.sectionTxt}>
          {languageData === 'Hindi'
            ? route.params.data.meaning.hi
            : route.params.data.meaning.en}
        </Text>
        <Text style={styles.sectionTitle}>
          {languageData === 'Hindi' ? 'सारांश' : 'Summary'}
        </Text>
        <Text style={styles.sectionTxt}>
          {languageData === 'Hindi'
            ? route.params.data.summary.hi
            : route.params.data.summary.en}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SummaryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  scrollContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '96%',
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
    borderBottomColor: '#00000020',
    borderBottomWidth: 1.4,
  },
  chapDataDiv: {
    width: '98%',
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
});
