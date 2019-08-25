import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {RootNavigator} from '../navigator/AppNavigator';
import {combineReducers} from 'redux';

import themeReducer from './theme';
import popularReducer from './popular';

// const navState = RootNavigator.router.getStateForAction(
//   RootNavigator.router.getActionForPathAndParams(rootRouter),
// );

const navReducer = createNavigationReducer(RootNavigator);
// const navReducer = (state = navState, action) => {
//   const nextState = RootNavigator.router.getStateForAction(action, state);
//   return nextState || state;
// };

export default combineReducers({
  nav: navReducer,
  theme: themeReducer,
  popular: popularReducer,
});
