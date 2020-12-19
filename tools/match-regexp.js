module.exports = function matchRegexp(regexp) {
  return s => regexp.test(s);
};
