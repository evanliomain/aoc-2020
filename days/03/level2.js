const { countTree } = require('./tools');

module.exports = function(input) {
  const counter = countTree(input);
  return (
    counter({ x: 1, y: 1 }) *
    counter({ x: 3, y: 1 }) *
    counter({ x: 5, y: 1 }) *
    counter({ x: 7, y: 1 }) *
    counter({ x: 1, y: 2 })
  );
};
