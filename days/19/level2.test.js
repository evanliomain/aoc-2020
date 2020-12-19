const day = 19;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('19-2', () => {
  it.each`
    sample | expected
    ${2}   | ${12}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
