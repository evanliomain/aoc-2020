const T = require('taninsam');
const {
  filterUntil,
  equal,
  parseNumber,
  parseLinesWithRegexp
} = require('../../tools');

const ruleRE = /^(?<name>(\w| )+): (?<min1>\d+)-(?<max1>\d+) or (?<min2>\d+)-(?<max2>\d+)$/;

module.exports = function(input) {
  const yourTicket = T.chain(input)
    .chain(filterUntil(T.not(equal('your ticket:'))))
    .chain(([_, ticket]) => ticket)
    .chain(T.split(','))
    .chain(T.map(parseNumber()))
    .value();

  const nearbyTickets = T.chain(input)
    .chain(filterUntil(T.not(equal('nearby tickets:'))))
    .chain(T.tail())
    .chain(T.map(T.split(',')))
    .chain(T.map(T.map(parseNumber())))
    .value();

  const rules = T.chain(input)
    .chain(T.filter(line => ruleRE.test(line)))
    .chain(parseLinesWithRegexp(ruleRE))
    .value();

  return { rules, yourTicket, nearbyTickets };
};
