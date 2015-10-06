/**
 * Created by stephenwhite on 05/10/15.
 */
import React from 'react/addons';
import { Link } from 'react-router';

export const Navbar = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function(){
    return (
      <div className='SECTION__Navbar'>
        <h1>Redux Bloggs App</h1>
        <ul>
          <li><Link className='SECTION__Navbar__posts' to="/posts">Posts</Link></li>
          <li><Link className='SECTION__Navbar__users' to="/users">Users</Link></li>
        </ul>
      </div>
    );
  }
});
