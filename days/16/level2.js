const T = require('taninsam');
const R = require('ramda');
const {
  isValid,
  possibleRules,
  findRulesAssociation,
  groupRulesByFields
} = require('./tools');

module.exports = function({ rules, yourTicket, nearbyTickets }) {
  const nbFields = yourTicket.length;

  return T.chain(nearbyTickets)
    .chain(T.filter(isValid(rules)))
    .chain(T.map(T.map(possibleRules(rules))))
    .chain(groupRulesByFields(nbFields))
    .chain(T.map(T.reduce(R.intersection)))
    .chain(T.map((rules, position) => ({ rules, position })))
    .chain(T.sortBy(({ rules }) => rules.length))
    .chain(findRulesAssociation(nbFields))
    .chain(T.filter(({ name }) => name.startsWith('departure')))
    .chain(T.map(({ position }) => position))
    .chain(T.map(position => yourTicket[position]))
    .chain(T.reduce((a, b) => a * b, 1))
    .value();
};
