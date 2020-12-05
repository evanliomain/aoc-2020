const day = 5;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read');

describe('05-1', () => {
  it.each`
    sample | expected
    ${1}   | ${820}
    ${2}   | ${357}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
