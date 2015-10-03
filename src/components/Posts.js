import React from 'react/addons';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {PostContainer} from './Post';
import { Link } from 'react-router';

export const Posts = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  render: function() {
    console.log('+++++++++');
    console.log('posts render : ' + this.props.posts);
    let posts = <li>No Posts!</li>
    if(this.props.posts != null) {
      posts = this.props.posts.map((post)=> {
        let id = post.get('_id');
        let postsLink = `/posts/${id}/comments`;
        return <li key={post.get('_id')}><Link to={postsLink}> {post.get('title')} </Link></li>
      });
    }
    return (
      <div>
        <h1>Posts</h1>
          <ul>
            {posts}
          </ul>
        <hr/>
        {this.props.children}
      </div>
    );
  }
});

function mapStateToProps(state) {
  //console.log('---- Posts : ' + JSON.stringify(state, null, 2));
  return {
    posts: state.get('posts')
  };
}

export const PostsContainer = connect(
  mapStateToProps,
  actionCreators
)(Posts);