/**
 Data Flow
 1. you call store.dispatch(action)
 2. redux store calls the reducer function you gave it
    the reducer function will return a new state
 3. root reducer may combine the output of multiple reducers into a single state tree
 4. the redux store saves the complete state tree returned  by the root reducer
 */
import {createStore, applyMiddleware} from 'redux';

import {setState} from './action_creators';

import remoteActionMiddleware from './remote_action_middleware';
import reducer from './reducer';
import io from 'socket.io-client';

// ---- websockets, start
const socket = io(`${location.protocol}//${location.hostname}:8090`);

// ---- apply middleware to store
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

// export the store
export const store = createStoreWithMiddleware(reducer);

console.log('---- about to connect!');
socket.on('state', state => {
    store.dispatch(setState(state))
  }
)
