const T = require('taninsam');

module.exports = function(input) {
  const permutations = new Map([[0, 1]]);

  input.forEach(jolt => {
    permutations.set(
      jolt,
      T.chain([1, 2, 3])
        .chain(T.map(j => jolt - j))
        .chain(T.filter(diff => permutations.has(diff)))
        .chain(T.sumBy(diff => permutations.get(diff)))
        .value()
    );
  });

  return permutations.get(T.last()(input));
};
