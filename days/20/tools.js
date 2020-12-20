const T = require('taninsam');
const chalk = require('chalk');
const { printMatrix, patternMatching } = require('../../tools');

module.exports = { printTile, findMatchEdge };

function printTile() {
  return tile => {
    console.log(`#${tile.id} -- `, tile.nbMatch);
    console.log(
      '> ',
      color(tile.topMatch)(tile.top),
      color(tile.rightMatch)(tile.right),
      color(tile.bottomMatch)(tile.bottom),
      color(tile.leftMatch)(tile.left)
    );

    console.log(
      printMatrix(
        patternMatching(
          ['.', () => chalk.bgWhite(' ')],
          ['#', () => chalk.bgBlue(' ')]
        )
      )(tile.pixels)
    );
  };
}

function color(hasMatch) {
  return chalk[hasMatch ? 'green' : 'blue'];
}

function findMatchEdge(tiles) {
  return ({ id, edge }) =>
    T.chain(tiles)
      .chain(T.filter(tile => id !== tile.id))
      .chain(T.find(tileMatchEdge(edge)))
      .chain(T.unless(T.isUndefined, tile => tile.id))
      .value();
}

function tileMatchEdge(edge) {
  return tile => [tile.top, tile.right, tile.bottom, tile.left].includes(edge);
}
