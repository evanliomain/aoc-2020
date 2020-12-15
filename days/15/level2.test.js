const day = 15;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('15-2', () => {
  it.each`
    sample | expected
    ${1}   | ${175594}
    ${2}   | ${2578}
    ${3}   | ${3544142}
    ${4}   | ${261214}
    ${5}   | ${6895259}
    ${6}   | ${18}
    ${7}   | ${362}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
