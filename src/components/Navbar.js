/**
 * Created by stephenwhite on 05/10/15.
 */
import React from 'react/addons';
import { Link } from 'react-router';
import 'styles/components/Navbar';

export const Navbar = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function(){
    return (
      <div className='SECTION__Navbar'>
        <h1>Redux Bloggs App With GraphQL !!</h1>
        <ul>
          <li><Link to="/posts" activeClassName="__link--active">Posts</Link></li>
          <li><Link to="/users" activeClassName="__link--active">Users</Link></li>
        </ul>
        <hr/>
      </div>
    );
  }
});
