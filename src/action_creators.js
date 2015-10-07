import { Map} from 'immutable';

// ---- State
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

// ---- Posts
export function updatePost(postId, postText){
  return {
    meta: {remote: true},
    type: 'UPDATE_POST_TEXT',
    postId : postId,
    postText : postText
  };
}

export function selectPost(postId) {
  return {
    meta: {remote: false},
    type: 'SELECT_POST',
    postId : postId
  };
}

export function updateClientPost(postText, postId) {
  return {
    meta: {remote: false},
    type: 'UPDATE_CLIENT_POST',
    postText : postText,
    postId : postId
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

export function clearClientPost() {
  return {
    meta: {remote: false},
    type: 'CLEAR_CLIENT_POST'
  };
}


// ---- Comments
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


// ---- Users
export function saveUser(user){
  return {
    meta: {remote: true},
    type: 'UPDATE_USER',
    user : user
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