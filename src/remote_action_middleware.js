export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    console.log('about to emit : ', action);
    socket.emit('action', action);
  }
  return next(action);
}