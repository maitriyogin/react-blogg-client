import React from 'react';
import routes from './routes'
import {store} from './store'
// Do this once before any other code in your app
import 'babel-core/polyfill';

// ---- bootstrap
React.render((routes(store)), document.getElementById('app'))