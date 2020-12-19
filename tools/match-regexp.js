module.exports = function matchRegexp(regexp) {
  let re = regexp;
  if ('string' === typeof regexp) {
    re = new RegExp(regexp);
  }
  return s => re.test(s);
};
