const T = require('taninsam');
const { mapMatrix, patternMatching } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split('')))
    .value();
};
