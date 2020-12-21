const T = require('taninsam');
const {
  atMatrix,
  mapMatrix,
  makeMatrix,
  euclideDivision,
  equal
} = require('../../tools');
const patternMatching = require('../../tools/pattern-matching');
const {
  printTilePixels,
  printTileInfo,
  logTile,
  toMap,
  firstCornerId,
  straightenCorner,
  straighten,
  straightenEdge,
  printBigSquare,
  rotateClockwise90Square: r,
  flipHorizontalSquare: fh,
  flipVerticalSquare: fv
} = require('./tools');

// The monster to find
//                   #
// #    ##    ##    ###
//  #  #  #  #  #  #
const monster = [
  { x: 18, y: 0 },
  { x: 0, y: 1 },
  { x: 5, y: 1 },
  { x: 6, y: 1 },
  { x: 11, y: 1 },
  { x: 12, y: 1 },
  { x: 17, y: 1 },
  { x: 18, y: 1 },
  { x: 19, y: 1 },
  { x: 1, y: 2 },
  { x: 4, y: 2 },
  { x: 7, y: 2 },
  { x: 10, y: 2 },
  { x: 13, y: 2 },
  { x: 16, y: 2 }
];
const monsterWidth = 20;
const monsterHeight = 3;

// max 2750 ?
// 2510 too high
// 2495 too high
// 2494 wrong
// 2493 wrong
// 2492 wrong
// 2491 wrong
// 2490 wrong
// 2489 Bingo !!!!!!!!!!!!!!!!
// 2488 wrong
// 2480 too low

module.exports = function(tiles) {
  return T.chain(tiles)
    .chain(makeBigSquare)
    .chain(cleanupBigSquare)
    .chain(removeBorderBigSquare)
    .chain(mergeBigSquare)
    .chain(findOrientation)
    .chain(markMonster)
    .chain(T.sumBy(T.sumBy(cell => ('#' === cell ? 1 : 0))))
    .value();
};

function updateTilesMap(tilesMap, newTile) {
  tilesMap[newTile.id] = newTile;
  return tilesMap;
}

function makeBigSquare(tiles) {
  const squareSize = Math.sqrt(tiles.length);

  let tilesMap = toMap(tiles);
  const bigSquare = [];

  let firstTile = straightenCorner(tilesMap)(tilesMap[firstCornerId(tiles)]);
  tilesMap = updateTilesMap(tilesMap, firstTile);

  let line = [];
  line.push(firstTile);

  while (true) {
    let previousTile = line[0];

    while (line.length < squareSize) {
      let nextTile = tilesMap[previousTile.rightMatch];

      nextTile = straighten(tilesMap)(previousTile)(nextTile);
      tilesMap = updateTilesMap(tilesMap, nextTile);
      line.push(nextTile);
      previousTile = nextTile;
    }
    bigSquare.push(line);

    // bigSquare is finish!
    if (bigSquare.length === squareSize) {
      break;
    }
    // Find next line edge tile
    const edgeTile = straightenEdge(tilesMap)(line[0])(
      tilesMap[line[0].bottomMatch]
    );
    tilesMap = updateTilesMap(tilesMap, edgeTile);

    line = [edgeTile];
  }
  return bigSquare;
}

function cleanupBigSquare(bigSquare) {
  return mapMatrix(({ pixels }) => pixels)(bigSquare);
}

function removeBorderBigSquare(bigSquare) {
  return mapMatrix(pixels =>
    makeMatrix((x, y) => atMatrix(pixels)({ x: x + 1, y: y + 1 }))({
      sizeX: pixels.length - 2,
      sizeY: pixels.length - 2
    })
  )(bigSquare);
}

function mergeBigSquare(bigSquare) {
  const littleSquareSize = bigSquare[0][0].length;
  const nbLittleSquare = bigSquare.length;
  const bigSquareSize = nbLittleSquare * littleSquareSize;

  return makeMatrix((x, y) => {
    const { q: xq, m: xm } = euclideDivision(x, littleSquareSize);
    const { q: yq, m: ym } = euclideDivision(y, littleSquareSize);

    return atMatrix(atMatrix(bigSquare)({ x: xq, y: yq }))({
      x: xm,
      y: ym
    });
  })({
    sizeX: bigSquareSize,
    sizeY: bigSquareSize
  });
}

function nbMonsters(bigSquare) {
  let nb = 0;
  const isMonsterDetected = isMonsterDetectedAt(bigSquare);

  for (let y = 0; y < bigSquare.length - monsterHeight; y++) {
    const line = bigSquare[y];
    for (let x = 0; x < line.length - monsterWidth; x++) {
      if (isMonsterDetected({ x, y })) {
        nb++;
      }
    }
  }

  return nb;
}

function markMonster(bigSquare) {
  const isMonsterDetected = isMonsterDetectedAt(bigSquare);

  for (let y = 0; y < bigSquare.length - monsterHeight; y++) {
    const line = bigSquare[y];
    for (let x = 0; x < line.length - monsterWidth; x++) {
      if (isMonsterDetected({ x, y })) {
        monster.forEach(({ x: dx, y: dy }) => {
          bigSquare[y + dy][x + dx] = 'O';
        });
      }
    }
  }

  return bigSquare;
}

function isMonsterDetectedAt(bigSquare) {
  const at = atMatrix(bigSquare);
  return ({ x, y }) => {
    return T.chain(monster)
      .chain(T.map(({ x: dx, y: dy }) => at({ x: x + dx, y: y + dy })))
      .chain(T.every(equal('#')))
      .value();
  };
}

function findOrientation(bigSquare) {
  return T.chain(bigSquare)
    .chain(bigSquare => ({ bigSquare, i: 0 }))
    .chain(
      T.loopWhile(
        ({ bigSquare }) => 0 === nbMonsters(bigSquare),
        ({ bigSquare, i }) => ({
          i: i + 1,
          bigSquare: patternMatching(
            [0, () => fv(r(bigSquare))],
            [1, () => fh(r(bigSquare))],
            [2, () => fv(r(bigSquare))],
            [3, () => r(fh(r(bigSquare)))],
            [4, () => fv(r(bigSquare))],
            [5, () => fh(r(bigSquare))],
            [6, () => fv(r(bigSquare))],
            [7, () => fh(r(bigSquare))]
          )(i)
        })
      )
    )
    .chain(({ bigSquare }) => bigSquare)
    .value();
}
