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
  const toNext = next(program);
  const ending = isEnding(program);
  return state => {
    let previousState = state;
    let nextState = state;
    while (true) {
      previousState = nextState;

      // Compute instruction
      nextState = toNext(previousState);

      if (ending(nextState)) {
        return nextState;
      }
      if (isLooping(nextState)) {
        throw loopError(nextState);
      }
    }
  };
}

/**
 * Execute the currentInstruction of the program
 * @param {} program
 * @returns a new state
 */
function next(program) {
  return state => ({
    ...state,
    ...executeInstruction(program[state.currentInstruction])(state),
    passedInstructions: {
      ...state.passedInstructions,
      [state.currentInstruction]: true
    }
  });
}

function executeInstruction({ operation, argument }) {
  return instructions[operation](argument);
}

function isEnding(program) {
  const nbInstructions = program.length;
  return state => nbInstructions <= state.currentInstruction;
}
function isLooping(state) {
  return !T.isNil(state.passedInstructions[state.currentInstruction]);
}
function loopError(state) {
  return new Error(
    `Infinity loop detected at instruction ${state.currentInstruction}: last accumulator value = ${state.accumulator}`
  );
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
