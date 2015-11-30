import { Map, fromJS} from 'immutable';
require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

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
export function updatePost(postId, postText) {
  return {
    meta: {remote: true},
    type: 'UPDATE_POST_TEXT',
    postId: postId,
    postText: postText
  };
}

export function selectPost(postId) {
  return {
    meta: {remote: false},
    type: 'SELECT_POST',
    postId: postId
  };
}

export function updateClientPost(postText, postId) {
  return {
    meta: {remote: false},
    type: 'UPDATE_CLIENT_POST',
    postText: postText,
    postId: postId
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
    edit: edit
  };
}

export function clearClientPost() {
  return {
    meta: {remote: false},
    type: 'CLEAR_CLIENT_POST'
  };
}

// asynch
export function getPosts() {
  return dispatch => {
    return fetch('http://localhost:3000/api/posts')
      .then(response=> {
        console.log(response.headers.get('Content-Type'))
        console.log(response.status)
        console.log(response.statusText)
        return response.json()
      })
      // turn the json payload into an immutable
      .then(json => dispatch(recievePosts(fromJS(json))))
  };
}

export function recievePosts(posts) {
  return {
    meta: {remote: false},
    type: 'RECEIVE_POSTS',
    posts
  };
}


// ---- Comments
export function addComment(comment, postId, userId = 1) {
  return {
    meta: {remote: true},
    type: 'ADD_COMMENT',
    comment: Map({body: comment, date: new Date(), post: postId, user: userId})
  };
}

export function updateClientComment(comment) {
  return {
    meta: {remote: false},
    type: 'UPDATE_CLIENT_COMMENT',
    comment: comment
  };
}

export function clearClientComment() {
  return {
    meta: {remote: false},
    type: 'CLEAR_CLIENT_COMMENT'
  };
}


// ---- Users
export function saveUser(user) {
  return {
    meta: {remote: true},
    type: 'UPDATE_USER',
    user: user
  };
}

export function newUser() {
  return {
    meta: {remote: false},
    type: 'NEW_USER'
  };
}

export function updateViewUser(user) {
  return {
    meta: {remote: false},
    type: 'UPDATE_VIEW_USER',
    user
  };
}

export function clearViewUser() {
  return {
    meta: {remote: false},
    type: 'CLEAR_VIEW_USER'
  };
}