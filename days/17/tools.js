const T = require('taninsam');
const { autoConvert, log } = require('../../tools');

module.exports = {
  solve,
  getNeighbors3D,
  getNeighbors4D,
  arrayToMap
};

function solve(findNeighbors) {
  return input =>
    T.chain(input)
      .chain(log(() => 'cycle 1'))
      .chain(nextCycle(findNeighbors))
      .chain(log(() => 'cycle 2'))
      .chain(nextCycle(findNeighbors))
      .chain(log(() => 'cycle 3'))
      .chain(nextCycle(findNeighbors))
      .chain(log(() => 'cycle 4'))
      .chain(nextCycle(findNeighbors))
      .chain(log(() => 'cycle 5'))
      .chain(nextCycle(findNeighbors))
      .chain(log(() => 'cycle 6'))
      .chain(nextCycle(findNeighbors))
      .chain(T.keys())
      .chain(T.length())
      .value();
}

function nextCycle(findNeighbors) {
  return space => {
    const newSpace = [];
    for (const key in space) {
      const coord = fromKey(key);
      const neighbors = findNeighbors(coord);
      const nbActive = countActive(space)(neighbors);

      // Active cube remains active
      if (2 === nbActive || 3 === nbActive) {
        newSpace.push(coord);
      }

      // Add neighbors that should be active
      const newActiveCubes = T.chain(neighbors)
        .chain(T.filter(T.not(isActive(space))))
        .chain(
          T.map(neighbor => ({
            ...neighbor,
            neighbors: findNeighbors(neighbor)
          }))
        )
        .chain(T.filter(({ neighbors }) => 3 === countActive(space)(neighbors)))
        .value();

      newActiveCubes.forEach(x => newSpace.push(x));
    }
    return arrayToMap(newSpace);
  };
}

function toKey({ x, y, z, w }) {
  return `${x},${y},${z},${w}`;
}
function fromKey(key) {
  const [x, y, z, w] = key.split(',');
  return autoConvert()({ x, y, z, w });
}
function isActive(space) {
  return coord => !T.isUndefined(space[toKey(coord)]);
}
function countActive(space) {
  return coords =>
    T.chain(coords)
      .chain(T.filter(isActive(space)))
      .chain(T.length())
      .value();
}

function getNeighbors3D({ x, y, z }) {
  return [
    { x: i(x), y, z, w: 0 },
    { x: d(x), y, z, w: 0 },
    { x, y: i(y), z, w: 0 },
    { x, y: d(y), z, w: 0 },
    { x, y, z: i(z), w: 0 },
    { x, y, z: d(z), w: 0 },

    { x: i(x), y: i(y), z, w: 0 },
    { x: i(x), y, z: i(z), w: 0 },
    { x, y: i(y), z: i(z), w: 0 },
    { x: d(x), y: d(y), z, w: 0 },
    { x: d(x), y, z: d(z), w: 0 },
    { x, y: d(y), z: d(z), w: 0 },
    { x: i(x), y: d(y), z, w: 0 },
    { x: i(x), y, z: d(z), w: 0 },
    { x, y: i(y), z: d(z), w: 0 },
    { x: d(x), y: i(y), z, w: 0 },
    { x: d(x), y, z: i(z), w: 0 },
    { x, y: d(y), z: i(z), w: 0 },

    { x: i(x), y: i(y), z: i(z), w: 0 },
    { x: i(x), y: d(y), z: d(z), w: 0 },
    { x: d(x), y: i(y), z: d(z), w: 0 },
    { x: d(x), y: d(y), z: i(z), w: 0 },
    { x: d(x), y: i(y), z: i(z), w: 0 },
    { x: i(x), y: d(y), z: i(z), w: 0 },
    { x: i(x), y: i(y), z: d(z), w: 0 },
    { x: d(x), y: d(y), z: d(z), w: 0 }
  ];
}

function getNeighbors4D({ x, y, z, w }) {
  return T.chain({ x, y, z, w })
    .chain(getNeighbors3D)
    .chain(
      T.map(neighbor => [
        { ...neighbor, w: d(w) },
        { ...neighbor, w },
        { ...neighbor, w: i(w) }
      ])
    )
    .chain(T.flat())
    .chain(T.push({ x, y, z, w: d(w) }))
    .chain(T.push({ x, y, z, w: i(w) }))
    .value();
}

function i(v) {
  return 1 + v;
}
function d(v) {
  return v - 1;
}

function arrayToMap(array) {
  return T.chain(array)
    .chain(T.map(({ x, y, z, w }) => [toKey({ x, y, z, w }), '#']))
    .chain(T.fromEntries())
    .value();
}
