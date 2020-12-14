const day = 14;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('14-2', () => {
  it.each`
    sample | expected
    ${2}   | ${208}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
