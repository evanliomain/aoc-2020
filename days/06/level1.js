const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.reduce((person, s) => s.concat(person), '')))
    .chain(T.map(T.split()))
    .chain(T.map(T.uniq()))
    .chain(T.map(T.length()))
    .chain(T.sum())
    .value();
};
