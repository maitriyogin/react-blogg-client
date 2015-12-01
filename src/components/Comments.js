import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../action_creators';
import { Link } from 'react-router';
import {utils} from '../utils';

import 'styles/components/Comments';

export const Comments = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  componentWillMount() {
    let {getCommentsForPost} = this.props;
    let{postId} = this.props.params;
    console.log('--- componentWillMount postId : ' + postId);
    getCommentsForPost(postId);
  },

  componentWillReceiveProps(nextProps) {
    let {getCommentsForPost} = this.props;
    let oldPostId = this.props.params.postId;
    let nextPostId = nextProps.params.postId;
    if(oldPostId != nextPostId && nextPostId){
      getCommentsForPost(nextPostId);
    }
  },

  /**
   * Will fire off an addComment ( remote ) action when you click enter
   */
  addComment(event){
    if (event.which === 13) {
      //var comment = this.state.comment; //event.target.value;
      let {addComment, clearClientComment} = this.props;
      addComment(event.target.value, parseInt(this.props.params.postId));
      clearClientComment();
    }
  },

  /**
   * Will update the client comment on each change.
   */
  changeComment(event){
    // the onChange event doesn't give us a which so we'll have to check the value ..
    if(event.target.value != '\n') {
      let {updateClientComment} = this.props;
      //console.log('addAComment : ' + event.target.value);
      updateClientComment(event.target.value);
    }
  },

  render: function() {
    let {comments, clientComment} = this.props;
    if(clientComment == null){
      clientComment = '';
    }
    console.log('clientComment : ' + clientComment);
    let commentsMu = <li>No Comments!</li>
    if(comments != null) {
      commentsMu = comments.map((comment)=> {
        let id = comment.get('_id');
        let commentsLink = `comments/${id}`;
        return <li key={comment.get('_id')}><span>{comment.get('body')}</span><span className='SECTION__Comments__Comment__date'>{moment(comment.get('updatedate')).fromNow()}</span> </li>
      });
    }
    return (
      <div className='SECTION__Comments'>
        <h2>Comments</h2>
        <ul>
          {commentsMu}
        </ul>
        <textarea rows='3' cols='60' placeholder='make your comment' onKeyDown={this.addComment} onChange={this.changeComment} value={clientComment}/>
        {this.props.children}
      </div>
    );
  }
});

function mapStateToProps(state) {
  //console.log('---- Comments : ' + JSON.stringify(state, null, 2));
  return {
    state: state.posts,
    comments: state.posts.get('comments'),
    currentPost: state.posts.get('currentPost'),
    clientComment : state.posts.get('clientComment')
  };
}

export const CommentsContainer = connect(
  mapStateToProps,
  actionCreators
)(Comments);