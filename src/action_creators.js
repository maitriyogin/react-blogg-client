import { Map} from 'immutable';

export function setState(state) {
  return {
    meta: {remote: false},
    type: 'SET_STATE',
    state
  };
}

export function resetState(state) {
  return {
    meta: {remote: true},
    type: 'RESET_STATE',
    state
  };
}

export function selectPost(postId) {
  return {
    meta: {remote: false},
    type: 'SELECT_POST',
    postId : postId
  };
}

export function addComment(comment, postId, userId = 1) {
  return {
    meta: {remote: true},
    type: 'ADD_COMMENT',
    comment : Map({body: comment, date: new Date(), post: postId, user: userId})
  };
}

export function updateClientComment(comment) {
  return {
    meta: {remote: false},
    type: 'UPDATE_CLIENT_COMMENT',
    comment : comment
  };
}

export function clearClientComment() {
  return {
    meta: {remote: false},
    type: 'CLEAR_CLIENT_COMMENT'
  };
}

export function toggleEdit() {
  return {
    meta: {remote: false},
    type: 'TOGGLE_EDIT'
  };
}

export function setPostEdit(edit = true) {
  return {
    meta: {remote: false},
    type: 'SET_EDIT',
    edit : edit
  };
}

export function updatePost(postId, postText){
  return {
    meta: {remote: true},
    type: 'UPDATE_POST_TEXT',
    postId : postId,
    postText : postText
  };
}

export function newUser(){
  return {
    meta: {remote: false},
    type: 'NEW_USER'
  };
}

export function updateViewUser(user){
  return {
    meta: {remote: false},
    type: 'UPDATE_VIEW_USER',
    user
  };
}

export function clearViewUser(){
  return {
    meta: {remote: false},
    type: 'CLEAR_VIEW_USER'
  };
}

export function saveUser(user){
  return {
    meta: {remote: true},
    type: 'UPDATE_USER',
    user : user
  };
}