import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const BottomNav = ({active, setActive}) => {
  return (
    <View style={styles.bottomNavDiv}>
      <TouchableOpacity
        style={styles.bottomBtnDiv}
        activeOpacity={0.9}
        onPress={() => setActive('home')}>
        <Ionicons
          name={active === 'home' ? 'home' : 'home-outline'}
          color={active === 'home' ? '#dc2626' : '#000000'}
          size={22}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBtnDiv}
        activeOpacity={0.9}
        onPress={() => setActive('bookmark')}>
        <Ionicons
          name={active === 'bookmark' ? 'bookmarks' : 'bookmarks-outline'}
          color={active === 'bookmark' ? '#dc2626' : '#000000'}
          size={22}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBtnDiv} activeOpacity={0.9}>
        <Ionicons
          name={active === 'share' ? 'share-social' : 'share-social-outline'}
          color={active === 'share' ? '#dc2626' : '#000000'}
          size={22}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBtnDiv}
        activeOpacity={0.9}
        onPress={() => setActive('settings')}>
        <Ionicons
          name={active === 'settings' ? 'settings' : 'settings-outline'}
          color={active === 'settings' ? '#dc2626' : '#000000'}
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bottomNavDiv: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 22,
    shadowColor: 'black',
    elevation: 30,
    shadowOffset: {
      width: -10,
      height: -5,
    },
  },
  bottomBtnDiv: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
