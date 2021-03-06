/**
 Data Flow
 1. you call store.dispatch(action)
 2. redux store calls the reducer function you gave it
    the reducer function will return a new state
 3. root reducer may combine the output of multiple reducers into a single state tree
 4. the redux store saves the complete state tree returned  by the root reducer
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

import {setState} from './action_creators';

//import remoteActionMiddleware from './remote_action_middleware';
import logActionMiddleware from './log_action_middleware';
import createSagaMiddleware from 'redux-saga'

import {postsSagas} from './sagas/saga_posts'

import reducer from './reducer';
import io from 'socket.io-client';

const herokuUrl = 'https://mighty-stream-4777.herokuapp.com';
const localUrl = `${location.protocol}//${location.hostname}:8090`;
const url = location.hostname == 'localhost' ? localUrl : herokuUrl;

const sagaMiddleware = createSagaMiddleware(postsSagas);

const reduxRouterMiddleware = syncHistory(hashHistory);

//console.log(`Websocket connection is using : ${url}`);

// ---- websockets, start
//const socket = io(url);
let finalCreateStore;
if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
  const { persistState } = require('redux-devtools');
  const DevTools = require('./containers/DevTools').default;
  console.log('-- store ' + DevTools.instrument());
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      reduxRouterMiddleware
    ),
    DevTools.instrument()
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      reduxRouterMiddleware
    )
  )(createStore);
}

export const store = finalCreateStore(reducer);


//socket.on('state', state => {
//    console.log('---- 1. recieve state');
//
//    console.log('---- 2. dispatch setState Action');
//    store.dispatch(setState(state))
//  }
//)
