import React from 'react/addons';
import {connect} from 'react-redux';
import { History } from 'react-router'
import * as actionCreators from '../action_creators';

export const Users = React.createClass({
  mixins: [React.addons.PureRenderMixin, History],

  newUser(){
    let {newUser, location} = this.props;
    newUser();
    this.history.pushState(null, `${location.pathname}/new` );
  },

  render: function() {
    let users = <li>No Users!</li>;
    if(this.props.users != null) {
      users = this.props.users.map((user)=> {
        return <li key={user.get('_id')}>{user.get('username')}, {user.get('email')}</li>
      });
    }
    return (
      <div>
      <h1>Users</h1>
        <ul>
          {users}
        </ul>
        <hr/>
        <button type='button' onClick={this.newUser}>New User</button>
        <hr/>
        {this.props.children}
    </div>);

  }
});

function mapStateToProps(state) {
  console.log('---- 5. Users state change ');
  return {
    users: state.users.get('users')
  };
}

export const UsersContainer = connect(
  mapStateToProps,
  actionCreators
)(Users);