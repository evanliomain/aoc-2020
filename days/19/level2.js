const T = require('taninsam');
const { matchRegexp } = require('../../tools');
const { rulesToRegex } = require('./tools');

module.exports = function({ messages, rules }) {
  // rules[0] = '8 11'

  // Hypothetic looping replacement
  // rules[8] = '42 | 42 8';
  // rules[11] = '42 31 | 42 11 31';

  // Actual no looping replacement
  // Recursive pattern is: 42 ( 11 )? 31
  rules[8] = '( 42 )+';
  rules[11] =
    '42 ( 42 ( 42 ( 42 ( 42 ( 42 ( 42 31 )? 31 )? 31 )? 31 )? 31 )? 31 )? 31';

  return T.chain(messages)
    .chain(T.filter(matchRegexp(rulesToRegex(rules))))
    .chain(T.length())
    .value();
};
