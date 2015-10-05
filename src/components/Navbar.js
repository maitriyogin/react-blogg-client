/**
 * Created by stephenwhite on 05/10/15.
 */
import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component{

  render() {

    return (
      <div className='SECTION__Navbar'>
        <h1>React - Blogg</h1>
        <ul>
          <li><Link className='SECTION__Navbar__posts' to="/posts">Posts</Link></li>
          <li><Link className='SECTION__Navbar__users' to="/users">Users</Link></li>
        </ul>
        {/*
         next we replace `<Child>` with `this.props.children`
         the router will figure out the children for us
         */}
        {this.props.children}
      </div>
    )
  }
}

export default Navbar;
