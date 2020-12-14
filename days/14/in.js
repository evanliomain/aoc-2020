const T = require('taninsam');
const { parseNumber } = require('../../tools');

module.exports = function(instructions) {
  return T.chain(instructions)
    .chain(
      T.map(instruction => {
        if (/^mask = /.test(instruction)) {
          const maskX = instruction.split(' = ')[1];
          return { type: 'mask', maskX };
        }
        const { adress, value } = captureGroupsRE(
          /mem\[(?<adress>\d+)\] = (?<value>\d+)/
        )(instruction);
        return {
          type: 'memory',
          adress,
          value: Number(value)
            .toString(2)
            .padStart(36, 0)
        };
      })
    )
    .value();
};

function captureGroupsRE(RE) {
  return str =>
    T.chain(str)
      .chain(s => RE.exec(s))
      .chain(({ groups }) => groups)
      .chain(T.entries())
      .chain(
        T.map(([key, value]) => [
          key,
          isNaN(parseInt(value, 10)) ? value : parseInt(value, 10)
        ])
      )
      .chain(T.fromEntries())
      .value();
}
