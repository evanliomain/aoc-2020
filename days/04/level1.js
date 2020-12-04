const T = require('taninsam');
const { checkFieldsExistance } = require('./utils');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.filter(checkFieldsExistance))
    .chain(T.length())
    .value();
};
