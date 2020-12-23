const T = require('taninsam');
const { parseNumber } = require('../../tools');

module.exports = function(input) {
  return T.chain(input[0])
    .chain(T.split(''))
    .chain(T.map(parseNumber()))
    .chain(list => {
      const circularList = {};

      for (let i = 0; i < list.length - 1; i++) {
        circularList[list[i]] = list[i + 1];
      }
      circularList[list[list.length - 1]] = list[0];

      return { circularList, current: list[0] };
    })
    .value();
};
