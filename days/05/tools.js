const { chain } = require('taninsam');

module.exports = { toSeatId, findPlace };

function findPlace(boardingPass) {
  const row = chain([0, 127])
    .chain(cutRange)
    .chain(chooseSectionRow(boardingPass[0]))
    .chain(cutRange)
    .chain(chooseSectionRow(boardingPass[1]))
    .chain(cutRange)
    .chain(chooseSectionRow(boardingPass[2]))
    .chain(cutRange)
    .chain(chooseSectionRow(boardingPass[3]))
    .chain(cutRange)
    .chain(chooseSectionRow(boardingPass[4]))
    .chain(cutRange)
    .chain(chooseSectionRow(boardingPass[5]))
    .chain(chooseSectionRow(boardingPass[6]))
    .value();

  const column = chain([0, 7])
    .chain(cutRange)
    .chain(chooseSectionColumn(boardingPass[7]))
    .chain(cutRange)
    .chain(chooseSectionColumn(boardingPass[8]))
    .chain(chooseSectionColumn(boardingPass[9]))
    .value();

  return { row, column };
}

function cutRange([min, max]) {
  const length = max - min + 1;
  const half = length / 2 + min;
  return [
    [min, half - 1],
    [half, max]
  ];
}
function chooseSectionRow(letter) {
  if ('F' !== letter && 'B' !== letter) {
    throw new Error(`Invalid letter ${letter} to choose a row`);
  }
  return sections => {
    if ('F' === letter) {
      return sections[0];
    }
    if ('B' === letter) {
      return sections[1];
    }
  };
}
function chooseSectionColumn(letter) {
  if ('L' !== letter && 'R' !== letter) {
    throw new Error(`Invalid letter ${letter} to choose a column`);
  }
  return sections => {
    if ('L' === letter) {
      return sections[0];
    }
    if ('R' === letter) {
      return sections[1];
    }
  };
}

function toSeatId({ row, column }) {
  return row * 8 + column;
}
