const T = require('taninsam');
const chalk = require('chalk');
const {
  printMatrix,
  patternMatchingBy,
  uncurry,
  atMatrix,
  makeMatrix,
  spread,
  fromBinary,
  patternMatching
} = require('../../tools');

module.exports = {
  printTilePixels,
  printTileInfo,
  findMatchEdge,
  toMap,
  toArray,
  firstCornerId,
  rotateClockwise90,
  rotateClockwise90Square,
  flipHorizontal,
  flipVertical,
  flipHorizontalSquare,
  flipVerticalSquare,
  flagTiles,
  associateEdge,
  straightenCorner,
  straighten,
  straightenEdge,
  printBigSquare,
  logTile
};

function printTilePixels() {
  return ({ pixels, topMatch, rightMatch, bottomMatch, leftMatch }) => {
    const squareSize = pixels.length;
    return T.chain(pixels)
      .chain(
        printMatrix(
          uncurry(
            patternMatchingBy(
              ([cell]) => cell,
              ['.', () => chalk.bgWhite(' ')],
              [
                '#',
                ([_, x, y]) => {
                  if (y === 0 && topMatch) {
                    return chalk.bgGreen(' ');
                  }
                  if (y === squareSize - 1 && bottomMatch) {
                    return chalk.bgGreen(' ');
                  }
                  if (x === 0 && leftMatch) {
                    return chalk.bgGreen(' ');
                  }
                  if (x === squareSize - 1 && rightMatch) {
                    return chalk.bgGreen(' ');
                  }

                  return chalk.bgBlue(' ');
                }
              ]
            )
          )
        )
      )
      .value();
  };
}
function printTileInfo() {
  return tile => {
    console.log(`#${tile.id} -- `, tile.nbMatch);
    console.log(
      '> ',
      color(tile.topMatch)(tile.top),
      color(tile.rightMatch)(tile.right),
      color(tile.bottomMatch)(tile.bottom),
      color(tile.leftMatch)(tile.left)
    );
  };
}

function printBigSquare(bigSquareSize) {
  return T.chain(bigSquareSize)
    .chain(
      printMatrix(
        uncurry(
          patternMatchingBy(
            ([cell]) => cell,
            ['.', () => chalk.bgWhite(' ')],
            ['#', () => chalk.bgBlue(' ')],
            ['O', () => chalk.bgGreen(' ')],
            [() => chalk.bgRed(' ')]
          )
        )
      )
    )
    .value();
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

function flagTiles(tiles) {
  return tiles.map(spread(({ pixels }) => flagTile(pixels)));
}

function flagTile(pixels) {
  return T.chain(pixels)
    .chain(p => ({
      top: p[0],
      bottom: p[p.length - 1],
      left: p.map(line => line[0]),
      right: p.map(line => line[line.length - 1])
    }))
    .chain(({ top, bottom, left, right }) => ({
      top: lineToNumber(top),
      bottom: lineToNumber(bottom),
      left: lineToNumber(left),
      right: lineToNumber(right),
      strictTop: strictLineToNumber(top),
      strictBottom: strictLineToNumber(bottom),
      strictLeft: strictLineToNumber(left),
      strictRight: strictLineToNumber(right)
    }))
    .value();
}

function associateEdge(tiles) {
  return tiles.map(spread(associateTileEdge(tiles)));
}
function associateTileEdge(tiles) {
  const finder = findMatchEdge(tiles);
  return tile =>
    T.chain(tile)
      .chain(({ id, top, right, bottom, left }) => ({
        topMatch: finder({ id, edge: top }),
        rightMatch: finder({ id, edge: right }),
        bottomMatch: finder({ id, edge: bottom }),
        leftMatch: finder({ id, edge: left })
      }))
      .chain(
        spread(({ topMatch, rightMatch, bottomMatch, leftMatch }) => ({
          nbMatch: T.chain([topMatch, rightMatch, bottomMatch, leftMatch])
            .chain(T.filter(T.not(T.isUndefined)))
            .chain(T.length())
            .value()
        }))
      )
      .value();
}

function lineToNumber(line) {
  return T.chain(line)
    .chain(T.map(patternMatching(['.', () => 0], ['#', () => 1])))
    .chain(T.join(''))
    .chain(
      binary =>
        fromBinary(binary) +
        fromBinary(T.reverse()(binary)) +
        fromBinary(binary) * fromBinary(T.reverse()(binary))
    )
    .value();
}

function strictLineToNumber(line) {
  return T.chain(line)
    .chain(T.map(patternMatching(['.', () => 0], ['#', () => 1])))
    .chain(T.join(''))
    .chain(fromBinary)
    .value();
}

function toMap(tiles) {
  return T.chain(tiles)
    .chain(T.map(({ id, ...properties }) => [id, { id, ...properties }]))
    .chain(T.fromEntries())
    .value();
}
function toArray(tilesMap) {
  return T.values()(tilesMap);
}

function firstCornerId(tiles) {
  return T.chain(tiles)
    .chain(T.filter(({ nbMatch }) => 2 === nbMatch))
    .chain(T.map(({ id }) => id))
    .chain(T.head())
    .value();
}

function rotateClockwise90(tilesMap) {
  return transform(rotateClockwise90Square)(tilesMap);
}
function flipHorizontal(tilesMap) {
  return transform(flipHorizontalSquare)(tilesMap);
}
function flipVertical(tilesMap) {
  return transform(flipVerticalSquare)(tilesMap);
}

function rotateClockwise90Square(matrix) {
  const at = atMatrix(matrix);
  const border = matrix.length - 1;
  return T.chain(matrix)
    .chain(T.length())
    .chain(n => ({ sizeX: n, sizeY: n }))
    .chain(makeMatrix((x, y) => at({ x: y, y: border - x })))
    .value();
}
function flipHorizontalSquare(matrix) {
  const at = atMatrix(matrix);
  const border = matrix.length - 1;
  return T.chain(matrix)
    .chain(T.length())
    .chain(n => ({ sizeX: n, sizeY: n }))
    .chain(makeMatrix((x, y) => at({ x: border - x, y })))
    .value();
}
function flipVerticalSquare(matrix) {
  const at = atMatrix(matrix);
  const border = matrix.length - 1;
  return T.chain(matrix)
    .chain(T.length())
    .chain(n => ({ sizeX: n, sizeY: n }))
    .chain(makeMatrix((x, y) => at({ x, y: border - y })))
    .value();
}

function transform(f) {
  return tilesMap => {
    const ass = associateTileEdge(toArray(tilesMap));

    return tile => {
      const newPixels = f(tile.pixels);
      const newFlags = flagTile(newPixels);
      const matches = ass({ id: tile.id, ...newFlags });

      return {
        id: tile.id,
        ...newFlags,
        ...matches,
        pixels: newPixels
      };
    };
  };
}

function straightenCorner(tilesMap) {
  return tile =>
    T.chain(tile)
      .chain(
        T.loopWhile(({ topMatch }) => topMatch, rotateClockwise90(tilesMap))
      )
      .value();
}

function straighten(tilesMap) {
  const r = rotateClockwise90(tilesMap);
  return previousTile => tile =>
    T.chain(tile)
      // Rotate tile until edge match
      // .chain(tile => ({ tile, i: 0 }))
      // .chain(
      //   T.loopWhile(
      //     ({ tile: { leftMatch } }) => previousTile.id !== leftMatch,
      //     ({ tile, i }) => {
      //       // logTile(tile);
      //       const next = {
      //         i: i + 1,
      //         tile: r(tile)
      //       };

      //       // logTile(next.tile);
      //       return next;
      //     }
      //   )
      // )
      // .chain(({ tile }) => tile)
      .chain(T.loopWhile(({ leftMatch }) => previousTile.id !== leftMatch, r))
      // Flip tile if edge does have same direction
      .chain(
        T.unless(
          ({ strictLeft }) => strictLeft === previousTile.strictRight,
          flipVertical(tilesMap)
        )
      )
      .value();
}

function straightenEdge(tilesMap) {
  return previousTile => tile =>
    T.chain(tile)
      // Rotate tile until edge match
      .chain(
        T.loopWhile(
          ({ topMatch }) => previousTile.id !== topMatch,
          rotateClockwise90(tilesMap)
        )
      )
      // Flip tile if edge does have same direction
      .chain(
        T.unless(
          ({ strictTop }) => strictTop === previousTile.strictBottom,
          flipHorizontal(tilesMap)
        )
      )
      .value();
}

function logTile(tile) {
  printTileInfo()(tile);
  console.log(printTilePixels()(tile));
}
