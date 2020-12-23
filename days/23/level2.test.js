const day = 23;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('23-2', () => {
  it.each`
    sample | expected
    ${1}   | ${149245887792}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
