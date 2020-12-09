const day = 9;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('09-2', () => {
  it.each`
    sample | preamble | expected
    ${1}   | ${5}     | ${62}
  `(
    'returns $expected for sample $sample',
    ({ sample, preamble, expected }) => {
      expect(solve(parse(read(day)(sample), null, preamble))).toEqual(expected);
    }
  );
});
