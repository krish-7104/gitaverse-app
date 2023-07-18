import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useLayoutEffect} from 'react';

const Setting = ({navigation}) => {
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
            Settings
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
        <Text style={styles.sectionTitle}>Commentary Source</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.picker}>
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Picker>
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
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
