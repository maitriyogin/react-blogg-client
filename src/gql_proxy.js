import fetch from 'isomorphic-fetch';

var isProduction = process.env.NODE_ENV === 'production';

console.log('isProduction:' + isProduction + ', process.env.NODE_ENV:' + process.env.NODE_ENV );

let gqlserver = 'https://react-blogg-server.herokuapp.com/graphql';
// this is like a def, gets stripped in the build
if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
  gqlserver = 'http://localhost:3010/graphql';
}


export function allPosts() {
  let postsQuery = '{posts{_id,title,}}';
  return query(postsQuery);
}

export function getPost(id) {
  let postsQuery = `{posts(_id:${id}){_id,title,body}}`;
  return query(postsQuery);
}

export function getCommentsForPost(postid) {
  let postsQuery = `{comments(postfk:${postid}){_id,body,updatedate}}`;
  return query(postsQuery);
}

export function addComment(comment, postfk, userfk) {
  let addCommentQuery = `mutation { addComment(body:"${comment}",userfk:${userfk}, postfk:${postfk}){_id,body,updatedate,userfk,postfk}}`;
  return query(addCommentQuery);
}

export function updatePost(post) {
  let jsPost = post.toJS();
  let addCommentQuery = `mutation { updatePost(_id:${jsPost._id},body:"${jsPost.body}"){_id,title,body,userfk}}`;
  return query(addCommentQuery);
}

export function allUsers() {
  let usersQuery = '{users{_id,username,email}}';
  return query(usersQuery);
}

export function createUser(user) {
  let jsUser = user.toJS();
  let createUserQuery = `mutation { createUser(username:"${jsUser.username}", email:"${jsUser.email}"){_id,username,email}}`;
  return query(createUserQuery);
}

export function query(query) {
  return fetch(gqlserver, {
    method: 'post',
    headers: { 'Content-Type':'application/graphql' },
    body: query,
  }).then((result, error)=>{
    return result.json();
  })
}

//curl -XPOST -H 'Content-Type:application/json'  -d '{posts{title}}' http://localhost:3010/gql