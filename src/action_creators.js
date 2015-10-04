import { Map} from 'immutable';

export function setState(state) {
  return {
    type: 'SET_STATE',
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