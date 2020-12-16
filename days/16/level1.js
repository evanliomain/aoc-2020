const T = require('taninsam');
const { matchRules } = require('./tools');

module.exports = function({ rules, nearbyTickets }) {
  return T.chain(nearbyTickets)
    .chain(T.flat())
    .chain(T.filter(T.not(matchRules(rules))))
    .chain(T.sum())
    .value();
};
