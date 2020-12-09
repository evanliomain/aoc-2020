const day = 9;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read');

describe('09-1', () => {
  it.each`
    sample | preamble | expected
    ${1}   | ${5}     | ${127}
    ${2}   | ${25}    | ${100}
    ${3}   | ${25}    | ${50}
    ${4}   | ${25}    | ${65}
  `(
    'returns $expected for sample $sample',
    ({ sample, preamble, expected }) => {
      expect(solve(parse(read(day)(sample), preamble))).toEqual(expected);
    }
  );
});
