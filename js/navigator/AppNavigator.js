import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import Home from '../page/Home';
import Welcome from '../page/Welcome';
import Detail from '../page/Detail';

const InitNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    },
  },
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      // header: null,
    },
  },
});

const IndexNavigate = createSwitchNavigator(
  {
    Init: InitNavigator,
    Main: MainNavigator,
  },
  {
    navigationOptions: {
      header: null,
    },
    initialRouteName: 'Init',
  },
);

export default createAppContainer(IndexNavigate);
