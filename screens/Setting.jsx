import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
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
  setLanguageHandler,
  setSpeechPitchHandler,
  setSpeechRateHandler,
  setTranslationhandler,
} from '../redux/actions';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    Tts.setDefaultRate(Number(rate));
    Tts.setDefaultPitch(Number(pitch));
    Tts.speak('श्रीमद्भगवदगीता');
  };

  const resetHandler = async () => {
    dispatch(
      setTranslationhandler({
        author: 'Swami Adidevananda',
        language: 'English',
        id: 3,
      }),
    );
    dispatch(
      setCommentaryhandler({
        author: 'Swami Sivananda',
        language: 'English',
        id: 16,
      }),
    );
    dispatch(setSpeechPitchHandler(1.0));
    dispatch(setSpeechRateHandler(0.5));
    dispatch(setLanguageHandler('English'));
    try {
      await AsyncStorage.setItem(
        'Translation Source',
        JSON.stringify({author: 'Swami Adidevananda', language: 'english'}),
      );
      await AsyncStorage.setItem(
        'Commentary Source',
        JSON.stringify({author: 'Swami Sivananda', language: 'english'}),
      );
      await AsyncStorage.setItem('Pitch', '1.0');
      await AsyncStorage.setItem('Rate', '0.5');
      await AsyncStorage.setItem('Langauge', 'English');
    } catch (error) {
      ToastAndroid.show('Error In Loading Data', ToastAndroid.BOTTOM);
    }
    ToastAndroid.show('Reset Done!', ToastAndroid.CENTER);
  };

  const confirmAlert = () => {
    Alert.alert(
      'Are You Sure?',
      'Reset settings will set all changes to default',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => resetHandler(),
        },
      ],
      {cancelable: false},
    );
  };

  const pitchHandler = async value => {
    dispatch(setSpeechPitchHandler(value));
    await AsyncStorage.setItem('Pitch', JSON.stringify(value));
  };

  const rateHandler = async value => {
    dispatch(setSpeechRateHandler(value));
    await AsyncStorage.setItem('Rate', JSON.stringify(value));
  };

  return (
    <SafeAreaView style={styles.container}>
      {translationData && commentaryData && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Text
            style={[
              styles.sectionTitle,
              langauageData === 'Hindi' && {fontSize: 17},
            ]}>
            {langauageData === 'Hindi' ? 'अनुवाद स्रोत' : 'Translation Source'}
          </Text>
          <TouchableOpacity
            style={styles.selectedBtn}
            onPress={() =>
              navigation.navigate('LangChange', {
                type: 'Translation',
              })
            }>
            <Text style={styles.selectedTxt}>
              {translationData.author} ({translationData.type})
            </Text>
            <Ionicons
              name={'chevron-down-outline'}
              color="#00000080"
              size={20}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.sectionTitle,
              langauageData === 'Hindi' && {fontSize: 17},
            ]}>
            {langauageData === 'Hindi' ? 'टिप्पणी स्रोत' : 'Commentary Source'}
          </Text>
          <TouchableOpacity
            style={styles.selectedBtn}
            onPress={() =>
              navigation.navigate('LangChange', {
                type: 'Commentary',
              })
            }>
            <Text style={styles.selectedTxt}>
              {commentaryData.author} ({commentaryData.type})
            </Text>
            <Ionicons
              name={'chevron-down-outline'}
              color="#00000080"
              size={20}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.sectionTitle,
              langauageData === 'Hindi' && {fontSize: 17},
            ]}>
            {langauageData === 'Hindi' ? 'भाषा चुने' : 'Select Language'}
          </Text>
          <TouchableOpacity
            style={styles.selectedBtn}
            onPress={() =>
              navigation.navigate('LangChange', {
                type: 'language',
              })
            }>
            <Text style={styles.selectedTxt}>{langauageData}</Text>
            <Ionicons
              name={'chevron-down-outline'}
              color="#00000080"
              size={20}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.sectionTitle,
              langauageData === 'Hindi' && {fontSize: 17},
              {marginTop: 14},
            ]}>
            {langauageData === 'Hindi'
              ? 'भाषण की गति निर्धारित करें'
              : 'Set Speech Speed'}
          </Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Slider
              style={{width: '88%', height: 45}}
              minimumValue={0.01}
              maximumValue={2.0}
              minimumTrackTintColor="#dc2626"
              maximumTrackTintColor="#450a0a"
              thumbTintColor="#dc2626"
              step={0.01}
              value={Number(rate)}
              onValueChange={value => rateHandler(value)}
            />
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.checkBtn}
              onPress={checkVoiceHandler}>
              <Ionicons name="volume-high-outline" color="#000000" size={24} />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.sectionTitle,
              langauageData === 'Hindi' && {fontSize: 17},
            ]}>
            {langauageData === 'Hindi'
              ? 'भाषण पिच सेट करें'
              : 'Set Speech Pitch'}
          </Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Slider
              style={{width: '88%', height: 45}}
              minimumValue={0.5}
              maximumValue={2.0}
              minimumTrackTintColor="#dc2626"
              maximumTrackTintColor="#450a0a"
              thumbTintColor="#dc2626"
              step={0.1}
              value={Number(pitch)}
              onValueChange={value => pitchHandler(value)}
            />
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.checkBtn}
              onPress={checkVoiceHandler}>
              <Ionicons name="volume-high-outline" color="#000000" size={24} />
            </TouchableOpacity>
          </View>
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
              onPress={() => Linking.openURL('https://bhagavadgita.io/api/')}>
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
      )}
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.resetBtn}
        onPress={confirmAlert}>
        <Ionicons name="refresh-outline" color="#fff" size={24} />
      </TouchableOpacity>
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
    position: 'absolute',
    padding: 16,
    backgroundColor: '#dc2626',
    borderRadius: 50,
    bottom: 30,
    right: 35,
    elevation: 10,
    shadowColor: '#dc2626',
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
