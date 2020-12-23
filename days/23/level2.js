const T = require('taninsam');
const { move, toCircular, fillUp, toResult } = require('./tools');

module.exports = function(list) {
  return T.chain(list)
    .chain(fillUp)
    .chain(toCircular)
    .chain(T.loopFor(10000000, move(1000000)))
    .chain(toResult)
    .value();
};
