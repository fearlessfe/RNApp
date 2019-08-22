import React, {PureComponent, useState} from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {BottomTabBar} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import NavigationUtil from '../navigator/NavigationUtil';

import Popular from '../page/Popular';
import Trending from '../page/Trending';
import Favorite from '../page/Favorite';
import My from '../page/My';

const TABS = {
  Popular: {
    screen: Popular,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}} />
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
        <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}} />
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
};

const DynamicTabNavigator = props => {
  const {Popular, Trending, Favorite, My} = TABS;
  const tabs = {Popular, Trending, Favorite, My};
  const Tab = createAppContainer(
    createBottomTabNavigator(tabs, {
      tabBarComponent: TabBarComponent,
    }),
  );
  // 存储外层的navigation，是的内层的页面也能跳转到外层的navigation
  NavigationUtil.navigation = props.navigation;
  return <Tab />;
};

const TabBarComponent = props => {
  const [defaultTheme, setDefaultTheme] = useState({
    tintColor: props.activeTintColor,
    updateTime: new Date().getTime(),
  });
  const {routes, index} = props.navigation.state;
  if (routes[index].params) {
    const {theme} = routes[index].params;
    console.log(theme);
    // 以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
    if (theme && theme.updateTime > defaultTheme.updateTime) {
      setDefaultTheme(theme);
    }
  }
  console.log(defaultTheme);
  return (
    <BottomTabBar
      {...props}
      activeTintColor={defaultTheme.tintColor || props.activeTintColor}
    />
  );
};

export default DynamicTabNavigator;
