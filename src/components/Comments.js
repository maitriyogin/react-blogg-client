import React from 'react/addons';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../action_creators';
import { Link } from 'react-router';
import {utils} from '../utils';

import 'styles/components/Comments';

export const Comments = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  getInitialState: function() {
    return {comment: null};
  },

  addAComment(event){
    if (event.which === 13) {
      var comment = this.state.comment; //event.target.value;
      let {addComment} = this.props;
      addComment(comment, parseInt(this.props.params.postId));
      this.setState({comment: ''});
    } else {
      this.setState({comment: event.target.value});
    }
  },

  render: function() {
    let {comments} = this.props;
    let commentsMu = <li>No Comments!</li>
    if(comments != null) {
      commentsMu = comments.map((comment)=> {
        let id = comment.get('_id');
        let commentsLink = `comments/${id}`;
        return <li key={comment.get('_id')}><span>{comment.get('body')}</span><span className='SECTION__Comments__Comment__date'>{moment(comment.get('date')).fromNow()}</span> </li>
      });
    }
    return (
      <div className='SECTION__Comments'>
        <h2>Comments</h2>
        <ul>
          {commentsMu}
        </ul>
        <textarea rows='3' cols='60' placeholder='make your comment' onKeyDown={this.addAComment} value={this.comment}/>
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