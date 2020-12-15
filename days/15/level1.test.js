const day = 15;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read');

describe('15-1', () => {
  it.each`
    sample | expected
    ${1}   | ${436}
    ${2}   | ${1}
    ${3}   | ${10}
    ${4}   | ${27}
    ${5}   | ${78}
    ${6}   | ${438}
    ${7}   | ${1836}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
