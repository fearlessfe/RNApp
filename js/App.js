/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';
import Navigation from './navigator/AppNavigator';
// import {createStackNavigator, createAppContainer} from 'react-navigation';

const App = () => {
  return (
    <View>
      <Navigation />
    </View>
  );
};
// const AppNavigator = createStackNavigator({Home: {screen: App}});
// export default createAppContainer(AppNavigator);
export default App;
