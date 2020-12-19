const T = require('taninsam');
const { matchRegexp } = require('../../tools');

module.exports = function({ messages, rule }) {
  return T.chain(messages)
    .chain(T.filter(matchRegexp(rule)))
    .chain(T.length())
    .value();
};
