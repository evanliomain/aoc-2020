const T = require('taninsam');

module.exports = function autoConvert() {
  return obj =>
    T.chain(obj)
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
