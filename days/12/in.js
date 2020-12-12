const T = require('taninsam');
const { replace } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(replace(/([A-Z])(\d+)/, '$1/$2')))
    .chain(T.map(T.split('/')))
    .chain(T.map(([action, value]) => ({ action, value: parseInt(value, 10) })))
    .value();
};
