module.exports = function euclideDivision(a, b) {
  const mod = a % b;
  return { q: (a - mod) / b, m: mod };
};
