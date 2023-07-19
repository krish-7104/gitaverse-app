import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import data from '../data.json';
import {useDispatch} from 'react-redux';
import {
  setCommentaryhandler,
  setLanguageHandler,
  setTranslationhandler,
} from '../redux/actions';
const LangChange = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 18,
              marginTop: 6,
              marginLeft: -16,
              color: '#000',
              fontFamily: 'Inter-SemiBold',
            }}>
            {route.params.type === 'verse_commentary_sources'
              ? 'Verse Commentary Source'
              : 'Verse Translation Source'}
          </Text>
        );
      },
    });
  }, [navigation]);
  const dispatch = useDispatch();
  const changeHandler = (author, langaugeType, type) => {
    if (type === 'Translation') {
      dispatch(setTranslationhandler({author, type: langaugeType}));
    } else {
      dispatch(setCommentaryhandler({author, type: langaugeType}));
    }
    navigation.replace('Setting');
  };
  const changeLangHandler = lang => {
    dispatch(setLanguageHandler(lang));
    navigation.replace('Setting');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {data &&
          route.params.type !== 'language' &&
          Object.keys(data[route.params.type]).map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  changeHandler(
                    item,
                    data[route.params.type][item].symbol,
                    route.params.type === 'verse_commentary_sources'
                      ? 'Commentary'
                      : 'Translation',
                  )
                }
                style={styles.nameCard}
                key={index}>
                <Text style={styles.textArea}>
                  {data[route.params.type][item].language}{' '}
                  {route.params.type === 'verse_commentary_sources'
                    ? 'Commentary'
                    : 'Translation'}{' '}
                  By {data[route.params.type][item].author}
                </Text>
              </TouchableOpacity>
            );
          })}
        {data && route.params.type === 'language' && (
          <>
            <TouchableOpacity
              style={styles.nameCard}
              onPress={() => changeLangHandler('English')}>
              <Text style={styles.textArea}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nameCard}
              onPress={() => changeLangHandler('Hindi')}>
              <Text style={styles.textArea}>Hindi</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LangChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainTitle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginVertical: 16,
  },
  nameCard: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginVertical: 2,
    borderBottomColor: '#e7e7e790',
    borderBottomWidth: 1.2,
  },
  textArea: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: 'black',
  },
});
