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
      <TouchableOpacity
        style={styles.bottomBtnDiv}
        activeOpacity={0.9}
        onPress={() => setActive('summary')}>
        <Ionicons
          name={active === 'summary' ? 'bulb' : 'bulb-outline'}
          color={active === 'summary' ? '#dc2626' : '#000000'}
          size={24}
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
    shadowColor: 'black',
    elevation: 10,
    shadowOffset: {
      width: -10,
      height: 20,
    },
    flex: 0,
  },
  bottomBtnDiv: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
