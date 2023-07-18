import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import data from '../data.json';
const LangChange = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Verse Commentary Source</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {route.params.type &&
          Object.keys(data[route.params.type]).map(item => {
            return (
              <TouchableOpacity style={styles.nameCard}>
                <Text style={styles.textArea}>
                  {data[route.params.type][item].language} Commentary By{' '}
                  {data[route.params.type][item].author}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.mainBtnDiv} activeOpacity={0.8}>
          <Text style={styles.mainBtnTxt}>Save Changes</Text>
        </TouchableOpacity>
      </View>
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
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginVertical: 16,
  },
  nameCard: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginVertical: 2,
  },
  textArea: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  btnArea: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  mainBtnDiv: {
    backgroundColor: '#dc2626',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#dc2626',
    elevation: 20,
  },
  mainBtnTxt: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
  },
});
