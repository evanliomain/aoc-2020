const T = require('taninsam');
const { parseLinesWithRegexp, captureGroups } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(captureGroups(/^(?<bag>.*) bags contain (?<contains>.*)\.$/)))
    .chain(
      T.map(({ bag, contains }) => ({
        bag,
        contains: T.chain(contains)
          .chain(T.split(', '))
          .chain(parseLinesWithRegexp(/^(?<nb>\d+|no) (?<child>.*) bags?$/))
          .chain(T.filter(({ nb }) => 'no' !== nb))
          .chain(T.map(({ nb, child }) => [child, nb]))
          .chain(T.fromEntries())
          .value()
      }))
    )
    .value();
};
