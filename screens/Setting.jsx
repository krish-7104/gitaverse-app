import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import data from '../data.json';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import {
  setCommentaryhandler,
  setSpeechPitchHandler,
  setSpeechRateHandler,
  setTranslationhandler,
} from '../redux/actions';
import Tts from 'react-native-tts';
const Setting = () => {
  const commentaryData = useSelector(state => state.commentary);
  const translationData = useSelector(state => state.translation);
  const langauageData = useSelector(state => state.language);
  const navigation = useNavigation();
  const pitch = useSelector(state => state.pitch);
  const rate = useSelector(state => state.rate);
  const dispatch = useDispatch();

  const checkVoiceHandler = () => {
    Tts.setDefaultLanguage('hi-IN');
    Tts.setDefaultRate(rate);
    Tts.setDefaultPitch(pitch);
    Tts.speak('श्रीमद्भगवदगीता');
  };

  const resetHandler = () => {
    dispatch(setTranslationhandler({author: 'adi', type: 'et'}));
    dispatch(setCommentaryhandler({author: 'siva', type: 'ec'}));
    dispatch(setSpeechPitchHandler(1.0));
    dispatch(setSpeechRateHandler(0.5));
    ToastAndroid.show('Reset Done!', ToastAndroid.CENTER);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
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
        <Text style={[styles.sectionTitle, {marginTop: 14}]}>
          Set Speech Rate
        </Text>
        <Slider
          style={{width: '100%', height: 45}}
          minimumValue={0.01}
          maximumValue={2.0}
          minimumTrackTintColor="#dc2626"
          maximumTrackTintColor="#450a0a"
          thumbTintColor="#dc2626"
          step={0.01}
          value={rate}
          onValueChange={value => dispatch(setSpeechRateHandler(value))}
        />
        <Text style={styles.sectionTitle}>Set Pitch Value</Text>
        <Slider
          style={{width: '100%', height: 45}}
          minimumValue={0.5}
          maximumValue={2.0}
          minimumTrackTintColor="#dc2626"
          maximumTrackTintColor="#450a0a"
          thumbTintColor="#dc2626"
          step={0.1}
          value={pitch}
          onValueChange={value => dispatch(setSpeechPitchHandler(value))}
        />
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.checkBtn}
          onPress={checkVoiceHandler}>
          <Text style={styles.checktxt}>Click To Check Voice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.resetBtn}
          onPress={resetHandler}>
          <Text style={styles.resetTxt}>Reset Settings</Text>
        </TouchableOpacity>
        <View style={styles.contactArea}>
          <Text
            style={styles.contactTxt}
            onPress={() =>
              Linking.openURL(
                'https://krishjotaniya.netlify.app/contactme?ref=GitaVerse',
              )
            }>
            Give Feedback
          </Text>
          <Text
            style={styles.contactTxt}
            onPress={() =>
              Linking.openURL('https://krishjotaniya.netlify.app/')
            }>
            Developed By{' '}
            <Text
              style={{
                color: '#dc2626',
              }}>
              Krish Jotaniya
            </Text>
          </Text>
          <Text
            style={styles.contactTxt}
            onPress={() => Linking.openURL('https://bhagavadgitaapi.in/')}>
            Data By{' '}
            <Text
              style={{
                color: '#dc2626',
              }}>
              Bhagavad Gita API
            </Text>
          </Text>
        </View>
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
    marginTop: 10,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-Medium',
  },
  checkBtn: {
    marginTop: 8,
    borderRadius: 6,
    borderColor: '#dc2626',
    borderWidth: 1.4,
  },
  checktxt: {
    paddingVertical: 6,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#dc2626',
    textAlign: 'center',
  },
  resetBtn: {
    marginTop: 30,
    borderRadius: 6,
    backgroundColor: '#dc2626',
  },
  resetTxt: {
    paddingVertical: 8,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    textAlign: 'center',
  },
  contactArea: {
    paddingVertical: 30,
  },
  contactTxt: {
    color: 'black',
    fontSize: 16,
    marginBottom: 14,
    fontFamily: 'Poppins-Medium',
    borderLeftColor: '#dc2626',
    borderLeftWidth: 7,
    paddingLeft: 16,
  },
});
