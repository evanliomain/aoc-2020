const T = require('taninsam');
const { run, initialStateMachine } = require('./tools');

module.exports = function(program) {
  let result;
  for (let i = 0; i < program.length; i++) {
    const { operation } = program[i];
    const prgm = program.map(x => ({ ...x }));
    let hasSwitchOperation = false;
    switch (operation) {
      case 'jmp':
        prgm[i].operation = 'nop';
        hasSwitchOperation = true;
        break;
      case 'nop':
        prgm[i].operation = 'jmp';
        hasSwitchOperation = true;
        break;
      default:
        break;
    }

    if (hasSwitchOperation) {
      try {
        result = run(prgm)(initialStateMachine());
      } catch (error) {}
    }
  }
  return result.accumulator;
};
