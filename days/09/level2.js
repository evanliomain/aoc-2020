const T = require('taninsam');
const { findInvalidNumber } = require('./tools');

module.exports = function(input) {
  const { preamble, codes } = input;
  const allCodes = [...preamble, ...codes];
  const invalidNumber = findInvalidNumber(input);
  const numbersToSum = [];
  let sum = 0;

  for (let i = 0; i < allCodes.length; i++) {
    const code = allCodes[i];

    const nextSum = sum + code;

    if (nextSum < invalidNumber) {
      numbersToSum.push(code);
      sum += code;
    }
    if (nextSum === invalidNumber) {
      break;
    }
    if (invalidNumber < nextSum) {
      const leftOver = numbersToSum.shift();
      sum -= leftOver;
      i--;
    }
  }

  return T.chain(numbersToSum)
    .chain(T.sortBy(x => x))
    .chain(numbers => numbers[0] + numbers[numbers.length - 1])
    .value();
};
