const day = 22;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('22-2', () => {
  it.each`
    sample | expected
    ${1}   | ${291}
    ${2}   | ${105}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
