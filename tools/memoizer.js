const T = require('taninsam');

module.exports = function memoizer() {
  // Initiate cache
  const cache = new Map();
  return f => arg => {
    const argHash = T.hash()(arg);
    if (cache.has(argHash)) {
      return cache.get(argHash);
    }
    const result = f(arg);
    cache.set(argHash, result);
    return result;
  };
};
