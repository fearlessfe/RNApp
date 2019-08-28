import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

import DynamicTabNavigator from '../navigator/DynamicTabNavigator';

// import NavigationUtil from '../navigator/NavigationUtil';

const Home = props => {
  // 兼容安卓物理键返回
  const onBackPress = () => {
    const {dispatch, nav} = props;
    if (nav.routes[1].index === 0) return false;
    dispatch(NavigationActions.back());
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  // 存储外层的navigation，是的内层的页面也能跳转到外层的navigation
  // NavigationUtil.navigation = props.navigation;
  return <DynamicTabNavigator navigation={props.navigation} />;
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(Home);
