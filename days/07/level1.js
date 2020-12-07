const T = require('taninsam');
const { equal } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(bags => recFindBagsContaining(bags, 'shiny gold'))
    .chain(T.filter(T.not(equal('shiny gold'))))
    .chain(T.uniq())
    .chain(T.length())
    .value();
};

function findBagsContaining(bagName) {
  return bags =>
    T.chain(bags)
      .chain(T.filter(({ contains }) => !T.isNil(contains[bagName])))
      .chain(T.map(({ bag }) => bag))
      .value();
}

function recFindBagsContaining(bags, bagName) {
  const bagsContaining = findBagsContaining(bagName)(bags);
  if (T.isEmpty(bagsContaining)) {
    return [bagName];
  }
  return T.chain(bagsContaining)
    .chain(T.map(bagContaining => recFindBagsContaining(bags, bagContaining)))
    .chain(T.flat())
    .chain(T.push(bagName))
    .value();
}
