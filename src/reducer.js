/**
 * The reducer, a pure function with state, action signature.
 * It describes how an action transforms the state to the next state.
 * This is passed into the store
 * When the stores state updates all listeners are updated with the new state.
 *
 * reducer must be pure!
 * Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 *
 */
import { combineReducers } from 'redux';
import {List, Map} from 'immutable';
import posts from './reducer_posts';
import users from './reducer_users';
import { routerStateReducer } from 'redux-router';

function setState(state, newState) {
  return state.merge(newState);
}

const bloggsApp = combineReducers({
  router : routerStateReducer,
  posts,
  users
});

export default bloggsApp;
