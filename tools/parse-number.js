module.exports = function parseNumber(base = 10) {
  return n => parseInt(n, base);
};
