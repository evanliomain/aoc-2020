const T = require('taninsam');
const { patternMatching, autoConvert } = require('../../tools');

module.exports = function(paths) {
  return T.chain(paths)
    .chain(T.map(T.reduce(moveTo, { x: 0, y: 0, z: 0 })))
    .chain(
      T.reduce((coordsMap, nextCoord) => {
        const key = toKey(nextCoord);
        if (!coordsMap.has(key)) {
          coordsMap.set(key, true);
        } else {
          coordsMap.set(key, !coordsMap.get(key));
        }
        return coordsMap;
      }, new Map())
    )
    .chain(coordsMap => {
      let counter = 0;
      for (const isBlack of coordsMap.values()) {
        if (isBlack) {
          counter++;
        }
      }
      return counter;
    })
    .value();
};

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
