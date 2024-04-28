import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';
const SummaryView = ({navigation, route}) => {
  const languageData = useSelector(state => state.language);
  const [play, setPlay] = useState(false);
  const rateData = useSelector(state => state.rate);
  const pitchData = useSelector(state => state.pitch);
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
            {languageData === 'Hindi'
              ? `${route.params.data.chapter_number} अध्याय का सारांश`
              : `Summary of Chapter ${route.params.data.chapter_number}`}
          </Text>
        );
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings');
          }}
          style={{marginRight: 10}}
          activeOpacity={0.4}>
          <Ionicons
            name="settings-outline"
            size={20}
            color="black"
            style={{padding: 2}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, languageData]);

  useEffect(() => {
    Tts.addEventListener('tts-finish', () => setPlay(false));
  }, []);
  const startSpeechHandler = () => {
    setPlay(true);
    Tts.setDefaultRate(rateData);
    Tts.setDefaultPitch(pitchData);
    Tts.setDefaultLanguage(`${languageData === 'Hindi' ? 'hi' : 'en'}-IN`);
    Tts.speak(
      `${
        languageData === 'Hindi'
          ? route.params.data.name_translated
          : route.params.data.name
      }${
        languageData === 'Hindi'
          ? route.params.data.chapter_summary_hindi
          : route.params.data.chapter_summary
      } `,
    );
  };

  const stopSpeechHandler = () => {
    Tts.stop();
    setPlay(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Text
          style={[
            styles.sectionTitle,
            languageData === 'Hindi' && {fontSize: 18},
          ]}>
          {languageData === 'Hindi' ? `शीर्षक` : `Title`}
        </Text>
        <Text
          style={[
            styles.sectionTxt,
            languageData === 'Hindi' && {
              fontSize: 20,
              letterSpacing: 2,
              lineHeight: 34,
            },
          ]}>
          {languageData === 'Hindi'
            ? route.params.data.name
            : route.params.data.name_translated}
        </Text>
        {/* <Text
          style={[
            styles.sectionTitle,
            languageData === 'Hindi' && {fontSize: 18},
          ]}>
          {languageData === 'Hindi' ? 'अर्थ' : 'Meaning'}
        </Text>
        <Text
          style={[
            styles.sectionTxt,
            languageData === 'Hindi' && {
              fontSize: 20,
              letterSpacing: 2,
              lineHeight: 34,
            },
          ]}>
          {languageData === 'Hindi'
            ? route.params.data.chapter_summary_hindi
            : route.params.data.chapter_summary}
        </Text> */}
        <Text
          style={[
            styles.sectionTitle,
            languageData === 'Hindi' && {fontSize: 18},
          ]}>
          {languageData === 'Hindi' ? 'सारांश' : 'Summary'}
        </Text>
        <Text
          style={[
            styles.sectionTxt,
            languageData === 'Hindi' && {
              fontSize: 19,
              letterSpacing: 2,
              lineHeight: 34,
            },
          ]}>
          {languageData === 'Hindi'
            ? route.params.data.chapter_summary_hindi
            : route.params.data.chapter_summary}
        </Text>
      </ScrollView>
      {play && (
        <TouchableOpacity
          onPress={stopSpeechHandler}
          style={styles.bottomBtnDiv}
          activeOpacity={0.9}>
          <Ionicons name="stop-outline" color="#fff" size={22} />
        </TouchableOpacity>
      )}
      {!play && (
        <TouchableOpacity
          onPress={startSpeechHandler}
          style={styles.bottomBtnDiv}
          activeOpacity={0.9}>
          <Ionicons name="play-outline" color="#fff" size={22} />
        </TouchableOpacity>
      )}
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
    paddingBottom: 70,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    marginVertical: 14,
    letterSpacing: 1,
  },
  sectionTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 26,
    paddingHorizontal: 20,
    marginBottom: 10,
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
    position: 'absolute',
    padding: 16,
    backgroundColor: '#dc2626',
    borderRadius: 50,
    bottom: 30,
    right: 35,
    elevation: 10,
    shadowColor: '#dc2626',
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
