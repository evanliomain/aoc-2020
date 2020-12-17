const day = 17;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('17-2', () => {
  it.each`
    sample | expected
    ${1}   | ${848}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
