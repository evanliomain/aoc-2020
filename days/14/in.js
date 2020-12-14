const T = require('taninsam');
const { toBinary, captureGroups } = require('../../tools');

module.exports = function(instructions) {
  return T.chain(instructions)
    .chain(
      T.map(instruction => {
        if (/^mask = /.test(instruction)) {
          return { type: 'mask', mask: instruction.split(' = ')[1] };
        }
        const { adress, value } = captureGroups(
          /mem\[(?<adress>\d+)\] = (?<value>\d+)/
        )(instruction);
        return { type: 'memory', adress, value };
      })
    )
    .value();
};
