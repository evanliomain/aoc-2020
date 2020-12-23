const T = require('taninsam');
const { parseNumber } = require('../../tools');

module.exports = function(input) {
  return T.chain(input[0])
    .chain(T.split(''))
    .chain(T.map(parseNumber()))
    .value();
};
