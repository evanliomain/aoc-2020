const day = 18;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('18-2', () => {
  it.each`
    sample | expected
    ${1}   | ${231}
    ${2}   | ${51}
    ${3}   | ${46}
    ${4}   | ${1445}
    ${5}   | ${669060}
    ${6}   | ${23340}
    ${7}   | ${34}
    ${8}   | ${31}
    ${9}   | ${12}
    ${10}  | ${390}
    ${11}  | ${130}
    ${12}  | ${1440}
    ${13}  | ${120}
    ${14}  | ${96}
    ${15}  | ${15}
    ${16}  | ${90}
    ${100} | ${269712}
    ${101} | ${28430377920}
    ${102} | ${81880}
    ${103} | ${41231785}
    ${104} | ${6496}
    ${105} | ${4608}
    ${106} | ${212583958272000}
    ${107} | ${145}
    ${108} | ${2512800}
    ${109} | ${3800}
    ${110} | ${69540}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
