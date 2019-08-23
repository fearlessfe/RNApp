import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import {connect} from 'react-redux';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import Home from '../page/Home';
import Welcome from '../page/Welcome';
import Detail from '../page/Detail';

export const rootRouter = 'Init';

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

export const RootNavigator = createAppContainer(IndexNavigate);

export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);

const App = createReduxContainer(RootNavigator);

const mapStateToProps = state => ({
  state: state.nav,
});

export default connect(mapStateToProps)(App);
