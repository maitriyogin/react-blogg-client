import React from 'react';
import routes from './routes'
import {store} from './store'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

// ---- bootstrap
React.render((routes(store)), document.getElementById('app'))