const day = 4;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read-raw');

describe('04-2', () => {
  it.each`
    sample | expected
    ${1}   | ${2}
    ${2}   | ${4}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(null, read(day)(sample)))).toEqual(expected);
  });
});
