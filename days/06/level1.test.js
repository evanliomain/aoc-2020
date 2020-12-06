const day = 6;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read-raw');

describe('06-1', () => {
  it.each`
    sample | expected
    ${1}   | ${11}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(null, read(day)(sample)))).toEqual(expected);
  });
});
