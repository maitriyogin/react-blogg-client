import { Map, fromJS} from 'immutable';
require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import * as gqlProxy from 'gql_proxy'

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
export function setPosts(posts) {
  return {
    meta: {remote: false},
    type: 'SET_POSTS',
    posts
  };
}

export function setCurrentPost(post) {
  return {
    meta: {remote: false},
    type: 'SET_CURRENT_POST',
    post: post
  };
}

export function setComments(comments) {
  return {
    meta: {remote: false},
    type: 'SET_COMMENTS',
    comments: comments
  };
}

export function addToComments(comment) {
  return {
    meta: {remote: false},
    type: 'ADD_TO_COMMENTS',
    comment: comment
  };
}

export function setCurrentComment(comment) {
  return {
    meta: {remote: false},
    type: 'SET_CURRENT_COMMENT',
    comment: comment
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
    return gqlProxy.allPosts().then(response=> {
        return response && response.data && response.data.posts ? response.data.posts : response;
      })
      // turn the json payload into an immutable
      .then(json => dispatch(setPosts(fromJS(json))))
  };
}

export function getPost(id) {
  return dispatch => {
    return gqlProxy.getPost(id).then(response=> {
        return response && response.data && response.data.posts ? response.data.posts : response;
      })
      // turn the json payload into an immutable
      .then(json => {
        if(json instanceof Array && json.length > 0){
          json = json[0];
        }
        dispatch(setCurrentPost(fromJS(json)))
      })
  };
}

export function updatePost(post) {
  return dispatch => {
    return gqlProxy.updatePost(post).then(response=> {
        return response && response.data && response.data.updatePost ? response.data.updatePost : response;
      })
      // turn the json payload into an immutable
      .then(json => {
        if(json instanceof Array && json.length > 0){
          json = json[0];
        }
        dispatch(setCurrentPost(fromJS(json)))
      })
  };
}

export function getCommentsForPost(postid) {
  return dispatch => {
    return gqlProxy.getCommentsForPost(postid).then(response=> {
        return response && response.data && response.data.comments ? response.data.comments : response;
      })
      // turn the json payload into an immutable
      .then(json => dispatch(setComments(fromJS(json))))
  };
}


// ---- Comments
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

// -- asynch
export function addComment(comment, postId, userId = 1) {
  return dispatch => {
    return gqlProxy.addComment(comment, postId, userId).then(response=> {
        return response && response.data && response.data.addComment ? response.data.addComment : response;
      })
      // turn the json payload into an immutable
      .then(json => dispatch(addToComments(fromJS(json))))
  };
}



// ---- Users
// -- asynch
export function getUsers() {
  return dispatch => {
    return gqlProxy.allUsers().then(response=> {
        return response && response.data && response.data.users ? response.data.users : response;
      })
      // turn the json payload into an immutable
      .then(json => dispatch(setUsers(fromJS(json))))
  };
}

export function createUser(user) {
  return dispatch => {
    return gqlProxy.createUser(user).then(response=> {
        return response && response.data && response.data.createUser ? response.data.createUser : response;
      })
      // turn the json payload into an immutable
      .then(json => {
        if(json instanceof Array && json.length > 0){
          json = json[0];
        }
        dispatch(addToUsers(fromJS(json)))
      })
  };
}

export function addToUsers(user) {
  return {
    meta: {remote: false},
    type: 'ADD_TO_USERS',
    user: user
  };
}

export function setUsers(users) {
  return {
    meta: {remote: false},
    type: 'SET_USERS',
    users: users
  };
}

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