import React from 'react';
import {List, Map} from 'immutable';
import {Navbar} from './Navbar'

import 'styles/base';

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar/>

        {/*
         next we replace `<Child>` with `this.props.children`
         the router will figure out the children for us
         */}

        {this.props.children}
      </div>
    )
  }
})