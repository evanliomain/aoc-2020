const T = require('taninsam');

module.exports = {
  isValid,
  matchRules,
  matchRule,
  possibleRules,
  groupRulesByFields,
  findRulesAssociation
};

function isValid(rules) {
  return ticket => ticket.every(matchRules(rules));
}

function matchRules(rules) {
  return n => rules.some(matchRule(n));
}

function matchRule(n) {
  return ({ min1, max1, min2, max2 }) =>
    (min1 <= n && n <= max1) || (min2 <= n && n <= max2);
}

function possibleRules(rules) {
  return n =>
    T.chain(rules)
      .chain(T.filter(matchRule(n)))
      .chain(T.map(({ name }) => name))
      .value();
}

function groupRulesByFields(nbFields) {
  return rulesSet => {
    const groupByFields = [];
    for (let i = 0; i < nbFields; i++) {
      groupByFields.push([]);
      rulesSet.forEach(rules => {
        groupByFields[i].push(rules[i]);
      });
    }
    return groupByFields;
  };
}

function findRulesAssociation(nbFields) {
  return rulesSet => {
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
        rules.rules = rules.rules.filter(rule => !excludeRules.includes(rule));
        i--;
      }
    }
    return groupByFields;
  };
}
