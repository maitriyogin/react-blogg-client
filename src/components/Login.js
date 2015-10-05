import React from 'react/addons';
import {connect} from 'react-redux';
import { History } from 'react-router'
import * as actionCreators from '../action_creators';
import {utils} from '../utils';

export const User = React.createClass({
  mixins: [React.addons.PureRenderMixin, History],

  // --- lifecycle
  componentWillMount: function() {
    let {newLoginUser} = this.props;
    console.log('login componentWillMount user : ' + this.props.user)
    if(this.props.user == null){
      newLoginUser();
    }
  },

  // --- utils

  // --- actions
  login(){
    let {saveUser,clearViewUser} = this.props;
    let user = this.props.user;
    // remote action
    saveUser(user);
  },

  onNameChange(e){
    let {updateViewUser} = this.props;
    let mutUser = {username: e.target.value};
    updateLoginUser(mutUser);
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

      userMu =
        <div>

          <p><input type='text' ref='username' width='50' value={username} onChange={this.onNameChange}/></p>
          <button type='button' onClick={this.saveUser}>Login</button>

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
    user : state.get('loginUser')
  };
}

export const UserContainer = connect(
  mapStateToProps,
  actionCreators
)(User);