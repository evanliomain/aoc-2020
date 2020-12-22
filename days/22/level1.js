const T = require('taninsam');
const chalk = require('chalk');

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
  const winDeck = 0 !== deck1.length ? deck1 : deck2;

  return T.chain(winDeck)
    .chain(T.reverse())
    .chain(T.sumBy((d, i) => d * (1 + i)))
    .value();
};

function logDecks({ deck1, deck2 }) {
  console.log(
    `${chalk.blue('deck1: ')} ${deck1.map(d => chalk.green(d)).join(', ')}`
  );
  console.log(
    `${chalk.cyan('deck2: ')} ${deck2.map(d => chalk.magenta(d)).join(', ')}`
  );
}
