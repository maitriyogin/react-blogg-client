import React from 'react/addons';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../action_creators';
import { Link } from 'react-router';
import {utils} from '../utils';

export const Comments = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  addAComment(event){
    if (event.which === 13) {
      var comment = event.target.value;
      let {addComment} = this.props;

      addComment(comment, parseInt(this.props.params.postId));
    }
  },

  render: function() {
    let {comments} = this.props;
    let commentsMu = <li>No Comments!</li>
    if(comments != null) {
      commentsMu = comments.map((comment)=> {
        let id = comment.get('_id');
        let commentsLink = `comments/${id}`;
        return <li key={comment.get('_id')}><span>{moment(comment.get('date')).fromNow()}</span> <span>{comment.get('body')}</span> </li>
      });
    }
    return (
      <div>
        <h2>Comments</h2>
        <ul>
          {commentsMu}
        </ul>
        <textarea rows='3' cols='60' placeholder='make your comment' onKeyDown={this.addAComment}/>
        {this.props.children}
      </div>
    );
  }
});

function mapStateToProps(state) {
  //console.log('---- Comments : ' + JSON.stringify(state, null, 2));
  return {
    state: state.posts,
    comments: utils.filterList(state.posts, 'comments', 'post', state.posts.get('currentPost'))
  };
}

export const CommentsContainer = connect(
  mapStateToProps,
  actionCreators
)(Comments);