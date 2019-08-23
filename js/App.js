/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import AppNavigation from './navigator/AppNavigator';
// import {createStackNavigator, createAppContainer} from 'react-navigation';
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
export default App;
