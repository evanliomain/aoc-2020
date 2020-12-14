module.exports = function uncurry(f) {
  return (...args) => f(args);
};
