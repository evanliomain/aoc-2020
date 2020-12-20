const T = require('taninsam');
const {
  captureGroups,
  spread,
  fromBinary,
  patternMatching,
  parseNumber
} = require('../../tools');
const { findMatchEdge } = require('./tools');

const tileRE = /^Tile (?<id>\d+):$/;

module.exports = function(input) {
  return T.chain(input)
    .chain(extractTiles)
    .chain(flagTiles)
    .chain(associateEdge)
    .value();
};

function extractTiles(input) {
  const tiles = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    if (tileRE.test(line)) {
      const { id } = captureGroups(tileRE)(line);
      tiles.push({ id: parseNumber()(id), pixels: [] });
    } else {
      tiles[tiles.length - 1].pixels.push(line.split(''));
    }
  }
  return tiles;
}

function flagTiles(tiles) {
  return T.chain(tiles)
    .chain(
      T.map(
        spread(tile => ({
          top: tile.pixels[0],
          bottom: tile.pixels[tile.pixels.length - 1],
          left: tile.pixels.map(line => line[0]),
          right: tile.pixels.map(line => line[line.length - 1])
        }))
      )
    )
    .chain(
      T.map(
        spread(({ top, bottom, left, right }) => ({
          top: lineToNumber(top),
          bottom: lineToNumber(bottom),
          left: lineToNumber(left),
          right: lineToNumber(right)
        }))
      )
    )
    .value();
}

function lineToNumber(line) {
  return T.chain(line)
    .chain(T.map(patternMatching(['.', () => 0], ['#', () => 1])))
    .chain(T.join(''))
    .chain(binary => fromBinary(binary) + fromBinary(T.reverse()(binary)))
    .value();
}

function associateEdge(tiles) {
  const finder = findMatchEdge(tiles);
  return T.chain(tiles)
    .chain(
      T.map(
        spread(tile => ({
          topMatch: finder({ id: tile.id, edge: tile.top }),
          rightMatch: finder({ id: tile.id, edge: tile.right }),
          bottomMatch: finder({ id: tile.id, edge: tile.bottom }),
          leftMatch: finder({ id: tile.id, edge: tile.left })
        }))
      )
    )
    .chain(
      T.map(
        spread(tile => ({
          nbMatch: T.chain([
            tile.topMatch,
            tile.rightMatch,
            tile.bottomMatch,
            tile.leftMatch
          ])
            .chain(T.filter(T.not(T.isUndefined)))
            .chain(T.length())
            .value()
        }))
      )
    )
    .value();
}
