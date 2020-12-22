const T = require('taninsam');
const chalk = require('chalk');

module.exports = { logDecks, score };

function logDecks({ deck1, deck2 }) {
  console.log(
    `${chalk.blue('deck1: ')} ${deck1.map(d => chalk.green(d)).join(', ')}`
  );
  console.log(
    `${chalk.cyan('deck2: ')} ${deck2.map(d => chalk.magenta(d)).join(', ')}`
  );
}

function score(winDeck) {
  return T.chain(winDeck)
    .chain(T.sumBy((d, i) => d * (winDeck.length - i)))
    .value();
}
