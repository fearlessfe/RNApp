import {middleware} from '../navigator/AppNavigator';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

const middlewares = [middleware, thunk];

export default createStore(reducers, applyMiddleware(...middlewares));
