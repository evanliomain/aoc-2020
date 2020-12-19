const T = require('taninsam');
const { matchRegexp } = require('../../tools');
const { rulesToRegex } = require('./tools');

module.exports = function({ messages, rules }) {
  return T.chain(messages)
    .chain(T.filter(matchRegexp(new RegExp(rulesToRegex(rules)))))
    .chain(T.length())
    .value();
};
