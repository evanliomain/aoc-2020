const T = require('taninsam');
const { run, initialStateMachine } = require('./tools');

module.exports = function(program) {
  try {
    run(program)(initialStateMachine());
  } catch (error) {
    const [, lastAccumulator] = error.message.split(' = ');
    return lastAccumulator;
  }
};
