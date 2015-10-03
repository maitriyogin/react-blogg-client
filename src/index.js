import React from 'react';
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
const store = createStoreWithMiddleware(reducer);
console.log('---- about to connect!');
socket.on('state', state => {
    store.dispatch(setState(state))
  }
);

// ---- websockets, end

import routes from './routes'

// ---- bootstrap
React.render((routes(store)), document.getElementById('app'))