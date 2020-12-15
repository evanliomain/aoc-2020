const T = require('taninsam');
const { lastSpokenNumber } = require('./tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(lastSpokenNumber(2020))
    .value();
};
