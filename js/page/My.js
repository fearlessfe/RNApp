import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NavigationBar from '../common/NavigationBar';

const THEME_COLOR = '#678';

let statusBar = {
  backgroundColor: THEME_COLOR,
  barStyle: 'light-content',
};

const My = () => {
  const getRightButton = () => (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
        <View style={{padding: 5, marginRight: 8}}>
          <Feather name={'search'} size={24} style={{color: 'white'}} />
        </View>
      </TouchableOpacity>
    </View>
  );
  const getLeftButton = cb => (
    <TouchableOpacity style={{padding: 8, paddingLeft: 12}} onPress={cb}>
      <View style={{padding: 5, marginRight: 8}}>
        <Ionicons name={'ios-arrow-back'} size={24} style={{color: 'white'}} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        rightButton={getRightButton()}
        leftButton={getLeftButton()}
      />
      <Text>My</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});

export default My;
