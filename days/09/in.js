const T = require('taninsam');

const nbPreamble = 25;

module.exports = function(input /*, nbPreamble = 25  for unit test */) {
  return T.chain(input)
    .chain(T.map(x => parseInt(x, 10)))
    .chain(T.map((value, index) => ({ value, index })))
    .chain(T.partition(({ index }) => index < nbPreamble))
    .chain(T.map(T.map(({ value }) => value)))
    .chain(([preamble, codes]) => ({
      codes,
      preamble,
      preambleMap: T.chain(preamble)
        .chain(T.map(n => [n, true]))
        .chain(T.fromEntries())
        .value()
    }))
    .value();
};
