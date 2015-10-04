import React from 'react/addons';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {utils} from '../utils';

export const Post = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  componentWillMount: function() {
    let {selectPost} = this.props;
    let{postId} = this.props.params;
    console.log('--- componentWillMount postId : ' + postId);
    selectPost(postId);
  },

  componentWillReceiveProps: function(nextProps) {
    let {selectPost} = nextProps;
    let postId = nextProps.params.postId;
    let currentPostId = this.props.params.postId;
    let post = this.props.post;
    console.log('------ currentPostId :' + currentPostId + ', new postId ' + postId);
    if(currentPostId !== postId || post == null) {
      console.log('--- componentWillReceiveProps postid' + postId);
      selectPost(postId);
    }
  },


  render: function() {
    console.log('+++++++++');
    // get the post
    let post = this.props.post;

    console.log('post render : ' + this.props.post);
    let postMu = <li>No Post!</li>;

    if(post != null) {
      postMu =
        <div>
          <h2>{post.get('title')}</h2>
          <p>{post.get('body')}</p>
        </div>
      ;
    }
    return (
      <div>
        <h1>Post</h1>
          {postMu}
        <hr/>
        {this.props.children}
      </div>);
  }
});

function mapStateToProps(state) {
  //console.log('---- Post : ' + JSON.stringify(state.get('currentPost'), null, 2));
  return {
    post : utils.getItem(state, 'posts', state.get('currentPost'))
  };
}

export const PostContainer = connect(
  mapStateToProps,
  actionCreators
)(Post);