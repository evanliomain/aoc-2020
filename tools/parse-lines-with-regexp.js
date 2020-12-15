const T = require('taninsam');
const autoConvert = require('./auto-convert');
const captureGroups = require('./capture-groups');

module.exports = function parseLinesWithRegexp(regexp) {
  return lines =>
    T.chain(lines)
      .chain(T.map(captureGroups(regexp)))
      .chain(T.map(autoConvert()))
      .value();
};
