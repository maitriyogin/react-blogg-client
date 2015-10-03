import React from 'react/addons';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { Link } from 'react-router';
import {utils} from '../utils';

export const Comments = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  comments : [],

  getComments(props){
    console.log('+++++++++');
    let postId = parseInt(props.params.postId);
    let {state} = props;
    return utils.filterList(state, 'comments', 'post', postId);
  },

  // called on the initial mounting and only once.
  componentWillMount: function() {
    console.log('------------');
    console.log('comments, componentWillMount');
    this.comments = this.getComments(this.props);
  },

  // only called when props and state are being updated
  componentWillReceiveProps: function(nextProps) {
    console.log('------------');
    console.log('comments, componentWillReceiveProps');
    this.comments = this.getComments(nextProps);
  },

  addAComment(event){
    if (event.which === 13) {
      var comment = event.target.value;
      let {addComment, state} = this.props;

      addComment(comment, parseInt(this.props.params.postId));
    }
  },

  render: function() {

    let commentsMu = <li>No Comments!</li>
    if(this.comments != null) {
      commentsMu = this.comments.map((comment)=> {
        let id = comment.get('_id');
        let commentsLink = `comments/${id}`;
        return <li key={comment.get('_id')}><span>{comment.get('date')}</span> <span>{comment.get('body')}</span> </li>
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
    state: state,
    comments: state.get('currentComments')
  };
}

export const CommentsContainer = connect(
  mapStateToProps,
  actionCreators
)(Comments);