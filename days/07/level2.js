const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(({ bag, contains }) => [bag, contains]))
    .chain(T.fromEntries())
    .chain(bags => recNbBagsInside(bags, 'shiny gold'))
    .value();
};

function recNbBagsInside(bags, bagName) {
  const containing = T.chain(bags[bagName])
    .chain(T.entries())
    .value();
  if (T.isEmpty(containing)) {
    return 0;
  }

  return T.chain(containing)
    .chain(T.map(([name, nb]) => nb * (1 + recNbBagsInside(bags, name))))
    .chain(T.sum())
    .value();
}
