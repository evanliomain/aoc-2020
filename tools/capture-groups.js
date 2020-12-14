const T = require('taninsam');

module.exports = function captureGroups(regexp) {
  return str =>
    T.chain(str)
      .chain(s => regexp.exec(s))
      .chain(({ groups }) => groups)
      // TODO: export next to a magic convertion function
      .chain(T.entries())
      .chain(
        T.map(([key, value]) => [
          key,
          isNaN(parseInt(value, 10)) ? value : parseInt(value, 10)
        ])
      )
      .chain(T.fromEntries())
      .value();
};
