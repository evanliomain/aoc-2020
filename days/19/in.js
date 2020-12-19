const T = require('taninsam');

const { captureGroups, replace, matchRegexp } = require('../../tools');

const extractRE = /^(?<name>\d+): (?<rule>.*)$/;

module.exports = function(input) {
  return T.chain(input)
    .chain(T.partition(s => extractRE.test(s)))
    .chain(([rules, messages]) => ({ rules, messages }))
    .chain(({ messages, rules }) => ({
      messages,
      rule: T.chain(rules)
        .chain(T.map(captureGroups(extractRE)))
        .chain(T.map(({ name, rule }) => [name, rule.replaceAll('"', '')]))
        .chain(T.fromEntries())
        .chain(rulesToRegex)
        .chain(rule => new RegExp(rule))
        .value()
    }))
    .value();
};

function rulesToRegex(rules) {
  return T.chain(rules[0])
    .chain(
      T.loopWhile(
        T.not(matchRegexp(/^[^\d]+$/)),
        T.chainFn(T.split(' '))
          .chain(
            T.map(
              T.unless(
                T.not(matchRegexp(/^\d+$/)),
                part => `( ${rules[part]} )`
              )
            )
          )
          .chain(T.join(' '))
          .value()
      )
    )
    .chain(replace(/ /g, ''))
    .chain(rule => `^${rule}$`)
    .value();
}
