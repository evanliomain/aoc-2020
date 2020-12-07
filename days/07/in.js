const T = require('taninsam');
const { replace } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(replace(/^(.*) bags contain (.*)\.$/, '$1/$2')))
    .chain(T.map(T.split('/')))
    .chain(T.map(([bag, contains]) => ({ bag, contains })))
    .chain(
      T.map(({ bag, contains }) => ({
        bag,
        contains: T.chain(contains)
          .chain(T.split(', '))
          .chain(T.map(replace(/^(\d+|no) (.*) bags?$/, '$1/$2')))
          .chain(T.map(T.split('/')))
          .chain(T.map(([nb, child]) => ({ nb, child })))
          .chain(T.filter(({ nb }) => 'no' !== nb))
          .chain(T.map(T.castTo({ nb: x => parseInt(x, 10) })))
          .chain(T.map(({ nb, child }) => [child, nb]))
          .chain(T.fromEntries())
          .value()
      }))
    )
    .value();
};
