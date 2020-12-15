const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

module.exports = function(instructions) {
  return T.chain(instructions)
    .chain(
      T.map(instruction => {
        if (/^mask = /.test(instruction)) {
          return { type: 'mask', mask: instruction.split(' = ')[1] };
        }
        const { adress, value } = T.chain(instruction)
          .chain(captureGroups(/mem\[(?<adress>\d+)\] = (?<value>\d+)/))
          .chain(autoConvert())
          .value();
        return { type: 'memory', adress, value };
      })
    )
    .value();
};
