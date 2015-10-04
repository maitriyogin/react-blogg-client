import {List, Map} from 'immutable';

import {utils} from './utils';

function setState(state, newState) {
  return state.merge(newState);
}

function selectPost(state,postId){
  console.log('------- select post');
  return state.set('currentPost', postId);
}


export default function(state = Map(), action = {type:null}) {
  console.log('------- Reducer action ' + action.type);
  switch (action.type) {
    case 'SET_STATE':
      state = setState(state, action.state);
      return state;
    case 'SELECT_POST':
      state = selectPost(state, action.postId);
      return state;
    case 'TOGGLE_EDIT':
      state = state.set('postEdit', !state.get('postEdit'));
      return state;
    case 'SET_EDIT':
      state = state.set('postEdit', action.edit);
      return state;
  }
  return state;
}