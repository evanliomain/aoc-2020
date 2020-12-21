const T = require('taninsam');
const { atMatrix } = require('../../tools');

module.exports = {
  isTree,
  nextCoordinate,
  countTree
};

function isTree(cell) {
  return '#' === cell;
}

function nextCoordinate(slope) {
  return ({ x, y }) => ({ x: x + slope.x, y: y + slope.y });
}

function countTree(input) {
  const at = atMatrix(input);
  return slope => {
    const slider = nextCoordinate(slope);
    const width = input[0].length;
    const height = input.length;
    let coord = { x: 0, y: 0 };
    let treeCounter = 0;
    for (let i = 0; i < height - 1; i += slope.y) {
      coord = slider(coord);
      const element = at({ x: coord.x % width, y: coord.y });
      if (isTree(element)) {
        treeCounter++;
      }
    }
    return treeCounter;
  };
}
