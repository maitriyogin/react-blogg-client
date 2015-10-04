import React from 'react/addons';
import {connect} from 'react-redux';
import { History } from 'react-router'
import * as actionCreators from '../action_creators';
import {utils} from '../utils';

export const Post = React.createClass({
  mixins: [React.addons.PureRenderMixin, History],

  // --- lifecycle
  /**
   * Called only once before rendering
   */
  componentWillMount: function() {
    let {selectPost} = this.props;
    let{postId} = this.props.params;
    console.log('--- componentWillMount postId : ' + postId);
    selectPost(postId);
  },

  /**
   * Called everytime props or state change before render.
   * @param nextProps
   */
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

    // ---- DONT BREAK THE WEB ...
    this.updatePostEditQuery(nextProps, this.props);
    this.updateStateOnPostEditQuery(nextProps, this.props);
    // ---- DONT BREAK THE WEB ...
  },

  // --- utils
  updatePostEditQuery(nextProps, previousProps){
    let previousEdit = previousProps.edit;
    let {location,edit}= nextProps;
    if((location.query.postEdit == null && edit != null) || previousEdit != edit){
      // get the postEdit from the state
      this.history.replaceState(null, location.pathname,{postEdit:edit} );
    }
  },

  updateStateOnPostEditQuery(nextProps, previousProps){
    let {location,edit}= nextProps;
    if(location.query.postEdit != null && edit == null){
      let {setPostEdit} = previousProps;
      let postEdit = JSON.parse(location.query.postEdit);
      setPostEdit(postEdit);
    }
  },

  // --- actions
  doToggleEdit(){
    let {toggleEdit} = this.props;
    toggleEdit();
  },

  savePost(){
    let {updatePost} = this.props;
    let postText = React.findDOMNode(this.refs.postTextArea);
    let text = postText.value;
    let postId = parseInt(this.props.params.postId);
    updatePost(postId, text);
  },

  // --- render!
  render: function() {
    console.log('+++++++++');
    // get the post
    let {post,edit}= this.props;

    console.log('post render : ' + this.props.post);
    let postMu = <li>No Post!</li>;
    if(post != null) {

      let postText = post.get('body');

      postMu =
        <div>
          <h2>{post.get('title')}</h2>
          <div>
              {edit ? (
                <div>
                  <button type='button' onClick={this.doToggleEdit}>View</button>
                  <button type='button' onClick={this.savePost}>Save</button>
                <p><textarea ref='postTextArea' width='60' rows='6'>{postText}</textarea></p></div>):
                (<div><button type='button' onClick={this.doToggleEdit}>Edit</button><p>{postText}</p></div>)}
            </div>
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
    post : utils.getItem(state, 'posts', state.get('currentPost')),
    edit : state.get('postEdit')
  };
}

export const PostContainer = connect(
  mapStateToProps,
  actionCreators
)(Post);