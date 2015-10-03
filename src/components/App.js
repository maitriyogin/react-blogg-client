import React from 'react';
import {List, Map} from 'immutable';


export default React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})