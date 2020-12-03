const T = require('taninsam');
const { atMatrix } = require('../../tools');

module.exports = function(input) {
  const width = input[0].length;
  const height = input.length;
  let coord = { x: 0, y: 0 };
  let treeCounter = 0;

  for (let i = 0; i < height - 1; i++) {
    coord = nextCoordinate(coord);
    const element = atMatrix({ x: coord.x % width, y: coord.y })(input);
    if (isTree(element)) {
      treeCounter++;
    }
  }
  return treeCounter;
};

function isTree(cell) {
  return '#' === cell;
}

function nextCoordinate({ x, y }) {
  return { x: x + 3, y: y + 1 };
}
