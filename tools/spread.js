// TODO: make it more magic with array spread
module.exports = function spread(f) {
  return obj => ({ ...obj, ...f(obj) });
};
