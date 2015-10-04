import React from 'react';
import routes from './routes'
import {store} from './store'

// ---- bootstrap
React.render((routes(store)), document.getElementById('app'))