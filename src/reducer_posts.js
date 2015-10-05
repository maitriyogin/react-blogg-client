/**
 * The reducer, a pure function with state, action signature.
 * It describes how an action transforms the state to the next state.
 * This is passed into the store
 * When the stores state updates all listeners are updated with the new state.
 */
import {utils} from './utils';
import {List, Map} from 'immutable';

function selectPost(state,postId){
  return state.set('currentPost', postId);
}

export default function(state = Map({posts:null, comments:null}), action = {type:null}) {
  console.log('***** Posts Reducer action ' + action.type);
  if(action.type == 'TOGGLE_EDIT'){
    console.log('++++++++++ 3. store takes toggle_edit and passes it to its reducers');
  }
  switch (action.type) {
    case 'SET_STATE':
      state = state.merge({posts:action.state.posts, comments:action.state.comments});
      console.log('---- 3. Posts setState :' + JSON.stringify(state, null, 2));
      //console.log('*** posts set state' + JSON.stringify(state, null, 2));
      return state;
    case 'SELECT_POST':
      state = selectPost(state, action.postId);
      return state;
    case 'TOGGLE_EDIT':
      console.log('++++++++++ 4. reducer handles toggle_edit and mutates the state');
      state = state.set('postEdit', !state.get('postEdit'));
      return state;
    case 'SET_EDIT':
      state = state.set('postEdit', action.edit);
      return state;
    default :
      return state;
  }
}