import React from 'react';
import {List, Map} from 'immutable';
import {Navbar} from './Navbar'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import {store} from '../store';
import 'styles/base';

export default React.createClass({
  render() {
    console.log('--- store:' + JSON.stringify(store, null, 2));
    return (
      <div>
        <Navbar/>

        {/*
         next we replace `<Child>` with `this.props.children`
         the router will figure out the children for us
         */}
        <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor}
                    visibleOnLoad={true} />
        </DebugPanel>

        {this.props.children}
      </div>
    )
  }
})
