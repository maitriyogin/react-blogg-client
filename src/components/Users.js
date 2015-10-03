import React from 'react/addons';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Users = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function() {
    let users = <li>No Users!</li>;
    if(this.props.users != null) {
      users = this.props.users.map((user)=> {
        return <li>{user.get('username')}</li>
      });
    }
    return (
      <div>
      <h1>Users</h1>
        <ul>
          {users}
        </ul>
    </div>);

  }
});

function mapStateToProps(state) {
  return {
    users: state.get('users')
  };
}

export const UsersContainer = connect(
  mapStateToProps,
  actionCreators
)(Users);