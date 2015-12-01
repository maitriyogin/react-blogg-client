import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';

import { ReduxRouter } from 'redux-router';
import App from './components/App';
import {PostsContainer} from './components/Posts';
import {PostContainer} from './components/Post';
import {CommentsContainer} from './components/Comments';
import {UsersContainer} from './components/Users';
import {UserContainer} from './components/User';

export default (store) => {
  let DevTools;
  if (__DEVTOOLS__ && !window.devToolsExtension) {
    DevTools = require('./containers/DevTools');
  }
  return (
    <Provider store={store}>
      <div>
      <ReduxRouter>
          <Route path="/" component={App}>
            <IndexRoute component={PostsContainer} />
            <Route path="posts" component={PostsContainer} >
              <Route path=":postId" component={PostContainer} >
                <Route path="comments" component={CommentsContainer} />
              </Route>
            </Route>
            <Route path="users" component={UsersContainer} >
              <Route path="new" component={UserContainer} />
            </Route>
          </Route>
        </ReduxRouter>
      {DevTools &&  <DevTools />}
        </div>
    </Provider>)
}


