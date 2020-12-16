module.exports = {
  isValid,
  matchRules,
  matchRule
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
