import React from 'react/addons';
import {connect} from 'react-redux';
import { History } from 'react-router'
import * as actionCreators from '../action_creators';
import {utils} from '../utils';
import showdown from 'showdown';
const converter = new showdown.Converter();

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
    let {toggleEdit, edit} = this.props;
    if(edit){
      console.log('********** 1. about to save post edits');
    } else {
      console.log('++++++++++ 1. about to toggle edit in the client');
    }
    toggleEdit();
    if(edit) {
      this.savePost();
    }
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
    // get the post
    let {post,edit}= this.props;

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
                  <p><textarea ref='postTextArea' width='100' rows='10' defaultValue={postText}/></p></div>):
                (<div>
                  <button type='button' onClick={this.doToggleEdit}>Edit</button>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: converter.makeHtml(postText)
                    }}
                    />
                </div>)}
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
  console.log('---------- Post : new state' + JSON.stringify(state.posts, null, 2));
  return {
    post : utils.getItem(state.posts, 'posts', state.posts.get('currentPost')),
    edit : state.posts.get('postEdit')
  };
}

export const PostContainer = connect(
  mapStateToProps,
  actionCreators
)(Post);