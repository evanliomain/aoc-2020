const T = require('taninsam');
const chalk = require('chalk');
const { score, logDecks } = require('./tools');
const { captureGroups } = require('../../tools');

const cash = new Set();

// 29177 is the answer

// 8841 too low
// 2956 too low

module.exports = function({ deck1, deck2 }) {
  return game({ deck1, deck2 }).score;
};

function game({ deck1, deck2 }) {
  return subGame({
    deck1,
    deck2,
    depth: 1
  });
}

function subGame({ deck1, deck2, depth }) {
  const cache1 = new Set();
  const cache2 = new Set();
  let round = 1;
  while (0 !== deck1.length && 0 !== deck2.length) {
    const s1 = deckToKey(deck1);
    const s2 = deckToKey(deck2);
    if (cache1.has(s1) || cache2.has(s2)) {
      return { winner: '1', score: score(deck1) };
    }
    cache1.add(s1);
    cache2.add(s2);

    const d1 = deck1.shift();
    const d2 = deck2.shift();

    const { winner } = roundWinner(d1, d2, deck1, deck2, depth);
    if ('2' === winner) {
      deck2.push(d2);
      deck2.push(d1);
    } else {
      deck1.push(d1);
      deck1.push(d2);
    }
    round++;
  }
  return {
    winner: 0 !== deck1.length ? '1' : '2',
    score: score(0 !== deck1.length ? deck1 : deck2)
  };
}

function roundWinner(d1, d2, deck1, deck2, depth) {
  if (d1 <= deck1.length && d2 <= deck2.length) {
    return subGame({
      deck1: deck1.slice(0, d1),
      deck2: deck2.slice(0, d2),
      depth: 1 + depth
    });
  }
  return { winner: d1 < d2 ? '2' : '1' };
}

function deckToKey(deck) {
  return deck.join(',');
}

function colorWinner(winner) {
  return '1' === winner ? chalk.blue(winner) : chalk.yellow(winner);
}
