import React from 'react/addons';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {utils} from '../utils';

export const Post = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  post : {},

  getPost(props){

  },

  componentWillMount: function() {
    let {selectPost, state} = this.props;
    let{postId} = this.props.params;
    console.log('--- componentWillMount postId : ' + postId);
    selectPost(state, postId);
  },

  componentWillReceiveProps: function(nextProps) {
    let {selectPost, state} = nextProps;
    let postId = nextProps.params.postId;
    let currentPostId = this.props.params.postId;
    let post = this.props.currentPost;
    console.log('------ currentPostId :' + currentPostId + ', new postId ' + postId);
    if(currentPostId !== postId || post == null) {
      console.log('--- componentWillReceiveProps postid' + postId);
      selectPost(state, postId);
    }
  },


  render: function() {
    console.log('+++++++++');
    // get the post
    let {currentPost, state} = this.props;
    //let currentPostId = this.props.params.postId;
    let post = utils.getItem(state, 'posts', currentPost);

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
    state: state,
    currentPost: state.get('currentPost')
  };
}

export const PostContainer = connect(
  mapStateToProps,
  actionCreators
)(Post);