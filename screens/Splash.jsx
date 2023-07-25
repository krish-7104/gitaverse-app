import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Linking,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {firebaseLink} from '../apiKey';
const Splash = ({navigation}) => {
  const [data, setData] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    checkUpdate();
  }, []);

  const checkUpdate = async () => {
    const data = await fetch(firebaseLink);
    const jsonData = await data.json();
    setData(jsonData.NewUpdate);
    if (jsonData.NewUpdate.Update) {
      setModalVisible(true);
    } else {
      goToHome();
    }
  };

  const goToHome = () => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/bg.jpg')}
        style={{height: '100%', objectFit: 'cover', position: 'absolute'}}
      />
      <Image
        source={require('../assets/logo.png')}
        style={{height: 140, objectFit: 'contain'}}
      />
      <Text style={styles.mainTxt}>GitaVerse</Text>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Available</Text>
            <Text style={styles.modalSubTitle}>
              Update app to get more features and better experience
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL(data.Link)}>
              <Text style={styles.updateBtn}>Update Now</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToHome}>
              <Text style={styles.closeButton}>Update Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 40,
    color: '#dc2626',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  modalSubTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#00000090',
    marginVertical: 6,
  },
  updateBtn: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
    marginVertical: 6,
    backgroundColor: '#ef4444',
    textAlign: 'center',
    padding: 8,
    borderRadius: 10,
  },
  closeButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#000',
    marginVertical: 4,
    textAlign: 'center',
  },
});
