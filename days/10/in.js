const T = require('taninsam');
const { parseNumber, identity } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(parseNumber()))
    .chain(T.sortBy(identity))
    .value();
};
