const T = require('taninsam');
const { merge, move, toCircular } = require('./tools');

module.exports = function(list) {
  return T.chain(list)
    .chain(toCircular)
    .chain(T.loopFor(100, move()))
    .chain(merge)
    .value();
};
