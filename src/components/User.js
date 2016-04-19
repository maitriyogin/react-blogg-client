import React from 'react';
import {connect} from 'react-redux';
import { History } from 'react-router'
import * as actionCreators from '../action_creators';

export const User = React.createClass({
  mixins: [React.addons.PureRenderMixin, History],

  // --- lifecycle
  componentWillMount: function() {
    let {newUser} = this.props;
    console.log('user componentWillMount user : ' + this.props.user)
    if(this.props.user == null){
      console.log('user componentWillMount newUser')
      newUser();
    }
  },

  // --- actions
  saveUser(){
    let {createUser,clearViewUser} = this.props;
    let user = this.props.user;
    //console.log('user to save --' + JSON.stringify(user, null, 2));
    // remote action
    createUser(user);
    // view action
    clearViewUser();
    this.history.pushState(null, '/users' );
  },

  onNameChange(e){
    let {updateViewUser} = this.props;
    let mutUser = {username: e.target.value};
    updateViewUser(mutUser);
  },

  onEmailChange(e){
    let {updateViewUser} = this.props;
    let mutUser = {email: e.target.value};
    updateViewUser(mutUser);
  },

  // --- render!
  render: function() {
    console.log('+++++++++');
    // get the user
    let {user}= this.props;

    console.log('user render : ' + this.props.user);
    let userMu = <li>No User!</li>;
    if(user != null) {

      let username = user.get('username');
      let email = user.get('email');

      userMu =
        <div>

          <p><input type='text' ref='username' width='50' value={username} onChange={this.onNameChange}/></p>
          <p><input type='text' ref='email' width='50' value={email} onChange={this.onEmailChange}/></p>
          <button type='button' onClick={this.saveUser}>Save User</button>

        </div>
      ;
    }
    return (
      <div>
        <h1>User</h1>
          {userMu}
      </div>);
  }
});

function mapStateToProps(state) {
  //console.log('---- User : ' + JSON.stringify(state.get('currentUser'), null, 2));
  return {
    user : state.users != null ? state.users.get('newUser') : null
  };
}

export const UserContainer = connect(
  mapStateToProps,
  actionCreators
)(User);