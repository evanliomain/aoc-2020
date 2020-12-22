const { score } = require('./tools');

module.exports = function({ deck1, deck2 }) {
  while (0 !== deck1.length && 0 !== deck2.length) {
    const d1 = deck1.shift();
    const d2 = deck2.shift();
    if (d1 < d2) {
      deck2.push(d2);
      deck2.push(d1);
    } else {
      deck1.push(d1);
      deck1.push(d2);
    }
  }
  return score(0 !== deck1.length ? deck1 : deck2);
};
