import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import NavigationUtil from '../navigator/NavigationUtil';

const Welcome = props => {
  useEffect(() => {
    let timer = setTimeout(() => {
      NavigationUtil.resetHome(props);
    }, 500);
    return function clrearTimer() {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
};

export default Welcome;
