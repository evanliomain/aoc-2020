const { countTree } = require('./tools');

module.exports = function(input) {
  return countTree(input)({ x: 3, y: 1 });
};
