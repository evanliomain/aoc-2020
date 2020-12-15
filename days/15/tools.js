module.exports = {
  lastSpokenNumber
};

function lastSpokenNumber(nbIterations) {
  return input => {
    const lastSeen = new Map();

    input.forEach((n, i) => {
      lastSeen.set(n, i + 1);
    });
    let lastSpoken = input[input.length - 1];
    for (let turn = input.length; turn < nbIterations; turn++) {
      const turnLastSeen = lastSeen.has(lastSpoken)
        ? lastSeen.get(lastSpoken)
        : turn;
      lastSeen.set(lastSpoken, turn);
      lastSpoken = turn - turnLastSeen;
    }
    return lastSpoken;
  };
}
