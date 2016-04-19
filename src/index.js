import React from 'react';
import routes from './routes'
import {store} from './store'

require("babel-core/register");
require("babel-polyfill");

// ---- bootstrap
React.render((routes(store)), document.getElementById('app'))