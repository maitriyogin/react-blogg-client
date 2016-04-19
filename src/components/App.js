import React from 'react';
import {List, Map} from 'immutable';
import {Navbar} from './Navbar'
import {store} from '../store';
import '../styles/base.scss';

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar/>
        {this.props.children}

      </div>
    )
  }
})
