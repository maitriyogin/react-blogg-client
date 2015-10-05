export default socket => store => next => action => {
  if(action.type == 'UPDATE_POST_TEXT'){
    console.log('********** 2. middleware intercepts update_post_text');
  }
  if(action.type == 'TOGGLE_EDIT'){
    console.log('++++++++++ 2. middle ware intercepts toggle_edit but doesnt send to the server');
  }
  if (action.meta && action.meta.remote) {
    console.log('about to emit : ', action);
    if(action.type == 'UPDATE_POST_TEXT'){
      console.log('********** 3. middleware emits to the server update_post_text');
    }


    socket.emit('action', action);
  }
  return next(action);
}