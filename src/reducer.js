import {List, Map} from 'immutable';

import {utils} from './utils';

function setState(state, newState) {
  return state.merge(newState);
}

function selectPost(state,postId){
  console.log('------- select post');
  return state.set('currentPost', postId);
}

function newUser(state){
  let user = Map({
    username: '',
    email: '',
    posts: List.of(),
    comments: List.of()
  });
  return state.set('newUser', user);
}

function updateUser(state, mutUser){
  let user = state.get('newUser');
  if(mutUser.username != null){
    user = user.set('username', mutUser.username);
  }
  if(mutUser.email != null) {
    user = user.set('email', mutUser.email);
  }
  return state.set('newUser', user);
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
    case 'CLEAR_VIEW_USER':
      state = state.delete('newUser');
      return state;
    case 'UPDATE_VIEW_USER':
      state = updateUser(state, action.user);
      return state;
    case 'NEW_USER':
      state = newUser(state);
      return state;
    case 'LATEST_USER':
      state = latestUser(state);
      return state;
  }
  return state;
}