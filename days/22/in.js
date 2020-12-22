const T = require('taninsam');
const { parseNumber } = require('../../tools');

module.exports = function(input) {
  const deck1 = [];
  const deck2 = [];
  let i;
  for (i = 1; !/^Player/.test(input[i]); i++) {
    deck1.push(parseNumber()(input[i]));
  }
  for (i++; i < input.length; i++) {
    deck2.push(parseNumber()(input[i]));
  }
  return { deck1, deck2 };
};
