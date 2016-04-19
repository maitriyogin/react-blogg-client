export default store => next => action => {
  console.log(`---- log action : ${action.type}`);
  return next(action);
}