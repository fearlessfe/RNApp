import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {RootNavigator} from '../navigator/AppNavigator';
import {combineReducers} from 'redux';

import themeReducer from './theme';
import popularReducer from './popular';
import trendingReducer from './trending';

const navReducer = createNavigationReducer(RootNavigator);

export default combineReducers({
  nav: navReducer,
  theme: themeReducer,
  popular: popularReducer,
  trending: trendingReducer,
});
