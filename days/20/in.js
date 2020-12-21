const T = require('taninsam');
const { captureGroups, parseNumber } = require('../../tools');
const { flagTiles, associateEdge } = require('./tools');

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
