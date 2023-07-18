import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const Bookmark = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}></ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;

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
});
