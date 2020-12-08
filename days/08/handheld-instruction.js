module.exports = {
  acc,
  jmp,
  nop
};

/**
 * acc increases or decreases a single global value called the accumulator
 * by the value given in the argument.
 *
 * For example, acc +7 would increase the accumulator by 7.
 * The accumulator starts at 0. After an acc instruction,
 * the instruction immediately below it is executed next
 */
function acc(argument) {
  return state => ({
    ...state,
    accumulator: state.accumulator + argument,
    currentInstruction: 1 + state.currentInstruction
  });
}

/**
 * jmp jumps to a new instruction relative to itself.
 * The next instruction to execute is found using the argument as an offset
 * from the jmp instruction; for example, jmp +2 would skip the next instruction,
 * jmp +1 would continue to the instruction immediately below it,
 * and jmp -20 would cause the instruction 20 lines above to be executed next.
 */
function jmp(argument) {
  return state => ({
    ...state,
    currentInstruction: state.currentInstruction + argument
  });
}

/**
 * nop stands for No OPeration - it does nothing.
 * The instruction immediately below it is executed next.
 */
function nop() {
  return state => ({
    ...state,
    currentInstruction: 1 + state.currentInstruction
  });
}
