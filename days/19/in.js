const T = require('taninsam');

const { captureGroups } = require('../../tools');

const extractRE = /^(?<name>\d+): (?<rule>.*)$/;

module.exports = function(input) {
  return T.chain(input)
    .chain(T.partition(s => extractRE.test(s)))
    .chain(([rules, messages]) => ({ rules, messages }))
    .chain(({ messages, rules }) => ({
      messages,
      rules: T.chain(rules)
        .chain(T.map(captureGroups(extractRE)))
        .chain(T.map(({ name, rule }) => [name, rule.replaceAll('"', '')]))
        .chain(T.fromEntries())
        .value()
    }))
    .value();
};
