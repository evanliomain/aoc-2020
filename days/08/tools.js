const T = require('taninsam');
const instructions = require('./handheld-instruction');

module.exports = {
  parse,
  initialStateMachine,
  next,
  run
};

function parse(input) {
  return T.chain(input)
    .chain(T.map(T.split(' ')))
    .chain(T.map(([operation, argument]) => ({ operation, argument })))
    .chain(
      T.map(({ operation, argument }) => ({
        operation,
        argument: parseInt(argument, 10)
      }))
    )
    .value();
}

function initialStateMachine() {
  return { accumulator: 0, currentInstruction: 0, passedInstructions: {} };
}

function run(program) {
  const n = next(program);
  return state => {
    let currentState = state;
    while (true) {
      currentState = n(currentState);
    }
  };
}

/**
 * Execute the currentInstruction of the program
 * @param {} program
 * @returns a new state
 */
function next(program) {
  return state => {
    if (!T.isNil(state.passedInstructions[state.currentInstruction])) {
      throw new Error(
        `Infinity loop detected at instruction ${state.currentInstruction}: last accumulator value = ${state.accumulator}`
      );
    }
    return {
      ...state,
      ...executeInstruction(program[state.currentInstruction])(state),
      passedInstructions: {
        ...state.passedInstructions,
        [state.currentInstruction]: true
      }
    };
  };
}

function executeInstruction({ operation, argument }) {
  return instructions[operation](argument);
}

function logState(previousState, nextState) {
  console.log(
    [
      `instr: ${previousState.currentInstruction}->${nextState.currentInstruction}`,
      `acc: ${previousState.accumulator}->${nextState.accumulator}`
    ].join(', ')
  );
  return nextState;
}
