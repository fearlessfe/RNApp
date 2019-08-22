import React from 'react';

import DynamicTabNavigator from '../navigator/DynamicTabNavigator';

// import NavigationUtil from '../navigator/NavigationUtil';

const Home = props => {
  // 存储外层的navigation，是的内层的页面也能跳转到外层的navigation
  // NavigationUtil.navigation = props.navigation;
  return <DynamicTabNavigator navigation={props.navigation} />;
};

export default Home;
