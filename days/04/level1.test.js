const day = 4;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read-raw');

describe('04-1', () => {
  it.each`
    sample | expected
    ${1}   | ${2}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(null, read(day)(sample)))).toEqual(expected);
  });
});
