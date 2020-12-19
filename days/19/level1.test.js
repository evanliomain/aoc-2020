const day = 19;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read');

describe('19-1', () => {
  it.each`
    sample | expected
    ${1}   | ${2}
    ${2}   | ${3}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
