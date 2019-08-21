import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import NavigationUtil from '../navigator/NavigationUtil';

import Popular from './Popular';
import Trending from './Trending';
import Favorite from './Favorite';
import My from './My';

const Home = props => {
  const Tab = createAppContainer(
    createBottomTabNavigator({
      Popular: {
        screen: Popular,
        navigationOptions: {
          tabBarLabel: '最热',
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialIcons
              name={'whatshot'}
              size={26}
              style={{color: tintColor}}
            />
          ),
        },
      },
      Trending: {
        screen: Trending,
        navigationOptions: {
          tabBarLabel: '趋势',
          tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
              name={'md-trending-up'}
              size={26}
              style={{color: tintColor}}
            />
          ),
        },
      },
      Favorite: {
        screen: Favorite,
        navigationOptions: {
          tabBarLabel: '收藏',
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialIcons
              name={'favorite'}
              size={26}
              style={{color: tintColor}}
            />
          ),
        },
      },
      My: {
        screen: My,
        navigationOptions: {
          tabBarLabel: '我的',
          tabBarIcon: ({tintColor, focused}) => (
            <Entypo name={'user'} size={26} style={{color: tintColor}} />
          ),
        },
      },
    }),
  );
  // 存储外层的navigation，是的内层的页面也能跳转到外层的navigation
  NavigationUtil.navigation = props.navigation;
  return <Tab />;
};

export default Home;
