const day = 13;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('13-2', () => {
  it.each`
    sample | expected
    ${1}   | ${1068781}
    ${2}   | ${3417}
    ${3}   | ${754018}
    ${4}   | ${779210}
    ${5}   | ${1261476}
    ${6}   | ${1202161486}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
