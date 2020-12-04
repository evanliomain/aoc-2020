const T = require('taninsam');
const { checkAll } = require('./utils');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.filter(checkAll))
    .chain(T.length())
    .value();
};
