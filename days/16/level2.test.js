const day = 16;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('16-2', () => {
  it.each`
    sample | expected
    ${2}   | ${143}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
