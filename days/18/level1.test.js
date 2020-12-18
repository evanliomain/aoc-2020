const day = 18;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read');

describe('18-1', () => {
  it.each`
    sample | expected
    ${1}   | ${71}
    ${2}   | ${51}
    ${3}   | ${26}
    ${4}   | ${437}
    ${5}   | ${12240}
    ${6}   | ${13632}
    ${7}   | ${34}
    ${8}   | ${31}
    ${9}   | ${12}
    ${10}  | ${100}
    ${11}  | ${100}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
