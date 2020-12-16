const T = require('taninsam');
const R = require('ramda');
const { isValid, matchRule } = require('./tools');

module.exports = function({ rules, yourTicket, nearbyTickets }) {
  const nbFields = yourTicket.length;

  return T.chain(nearbyTickets)
    .chain(T.filter(isValid(rules)))
    .chain(T.map(T.map(possibleRules(rules))))
    .chain(rulesSet => {
      const groupByFields = [];
      for (let i = 0; i < nbFields; i++) {
        groupByFields.push([]);
        rulesSet.forEach(rules => {
          groupByFields[i].push(rules[i]);
        });
      }
      return groupByFields;
    })
    .chain(T.map(T.reduce(R.intersection)))
    .chain(T.map((rules, position) => ({ rules, position })))
    .chain(T.sortBy(({ rules }) => rules.length))
    .chain(rulesSet => {
      const groupByFields = [];
      const excludeRules = [];
      for (let i = 0; i < nbFields; i++) {
        const rules = rulesSet[i];

        if (1 === rules.rules.length) {
          groupByFields.push({
            position: rules.position,
            name: rules.rules[0]
          });
          excludeRules.push(rules.rules[0]);
        } else {
          rules.rules = rules.rules.filter(
            rule => !excludeRules.includes(rule)
          );
          i--;
        }
      }
      return groupByFields;
    })
    .chain(T.filter(({ name }) => name.startsWith('departure')))
    .chain(T.map(({ position }) => position))
    .chain(T.map(position => yourTicket[position]))
    .chain(T.reduce((a, b) => a * b, 1))
    .value();
};

function possibleRules(rules) {
  return n =>
    T.chain(rules)
      .chain(T.filter(matchRule(n)))
      .chain(T.map(({ name }) => name))
      .value();
}
