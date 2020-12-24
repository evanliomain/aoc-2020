const T = require('taninsam');
const { patternMatching, autoConvert, identity } = require('../../tools');

module.exports = {
  pathToCoordinate,
  coordinatesToTiles,
  countBlackTiles,
  nextDay
};

function pathToCoordinate(path) {
  return T.reduce(moveTo, { x: 0, y: 0, z: 0 })(path);
}

function coordinatesToTiles(coords) {
  return T.reduce((coordsMap, nextCoord) => {
    const key = toKey(nextCoord);
    if (T.isNil(coordsMap[key])) {
      coordsMap[key] = true;
    } else {
      coordsMap[key] = !coordsMap[key];
    }
    return coordsMap;
  }, {})(coords);
}

function countBlackTiles(tiles) {
  return T.chain(tiles)
    .chain(T.values())
    .chain(T.filter(identity))
    .chain(T.length())
    .value();
}

function moveTo({ x, y, z }, direction) {
  return patternMatching(
    ['e', () => ({ x: i(x), y: d(y), z })],
    ['se', () => ({ x, y: d(y), z: i(z) })],
    ['sw', () => ({ x: d(x), y, z: i(z) })],
    ['w', () => ({ x: d(x), y: i(y), z })],
    ['nw', () => ({ x, y: i(y), z: d(z) })],
    ['ne', () => ({ x: i(x), y, z: d(z) })]
  )(direction);
}

function i(n) {
  return n + 1;
}
function d(n) {
  return n - 1;
}

function toKey({ x, y, z }) {
  return `${x},${y},${z}`;
}
function fromKey(key) {
  const [x, y, z] = key.split(',');
  return autoConvert()({ x, y, z });
}

function nextDay(tiles) {
  return T.chain(tiles)
    .chain(T.entries())
    .chain(T.filter(([_, color]) => color))
    .chain(T.map(([coord]) => coord))
    .chain(T.map(fromKey))
    .chain(
      T.reduce((newDayTiles, coords) => {
        const neighborsCoord = T.chain(coords)
          .chain(getTilesImmediatelyAdjacentCoordinates)
          .value();
        const neighborsTile = T.chain(neighborsCoord)
          .chain(T.map(coordToTile(tiles)))
          .value();
        const nbNeighborsBlackTiles = T.chain(neighborsTile)
          .chain(T.filter(identity))
          .chain(T.length())
          .value();

        if (!(0 === nbNeighborsBlackTiles || 2 < nbNeighborsBlackTiles)) {
          // black tile preserved
          newDayTiles[toKey(coords)] = true;
        }
        neighborsCoord.forEach(neighborCoord => {
          const color = coordToTile(tiles)(neighborCoord);
          const nbAdjacentBlackTiles = T.chain(neighborCoord)
            .chain(getTilesImmediatelyAdjacentCoordinates)
            .chain(T.map(coordToTile(tiles)))
            .chain(T.filter(identity))
            .chain(T.length())
            .value();

          // is the white tile turn to black ?
          if (!color && 2 === nbAdjacentBlackTiles) {
            newDayTiles[toKey(neighborCoord)] = true;
          }
        });

        return newDayTiles;
      }, {})
    )
    .value();
}

function getTilesImmediatelyAdjacentCoordinates({ x, y, z }) {
  return [
    { x: i(x), y: d(y), z },
    { x, y: d(y), z: i(z) },
    { x: d(x), y, z: i(z) },
    { x: d(x), y: i(y), z },
    { x, y: i(y), z: d(z) },
    { x: i(x), y, z: d(z) }
  ];
}

function coordToTile(tiles) {
  return coord => {
    const tile = tiles[toKey(coord)];
    return T.isNil(tile) ? false : tile;
  };
}
