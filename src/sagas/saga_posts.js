import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as actions from '../action_creators'
import * as gqlProxy from 'gql_proxy'

// worker Saga : will be fired on USER_FETCH_REQUESTED actions
function* fetchPosts(action) {
  try {
    const response = yield call(gqlProxy.allPosts);
    if(response && response.data && response.data.posts){
      yield put(actions.setPosts(fromJS(response.data.posts)));
    } else {
      yield put(actions.postsFetchFailure('no posts'));
    }
  } catch (e) {
    yield put(actions.postsFetchFailure(e.message));
  }
}

/*
 starts fetchUser on each dispatched `POSTS_FETCH_REQUESTED` action
 Allow concurrent fetches of user
 */
function* postsSagas() {
  yield* takeEvery("POSTS_FETCH_REQUESTED", fetchPosts);
}

/*
 Alternatively you may use takeLatest

 Do not allow concurrent fetches of posts, If "POSTS_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run
 */
export function* postsSagas() {
  yield* takeLatest("POSTS_FETCH_REQUESTED", fetchPosts);
}