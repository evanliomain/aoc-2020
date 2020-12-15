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
      if (lastSeen.has(lastSpoken)) {
        const turnLastSeen = lastSeen.get(lastSpoken);
        lastSeen.set(lastSpoken, turn);
        lastSpoken = turn - turnLastSeen;
      } else {
        lastSeen.set(lastSpoken, turn);
        lastSpoken = 0;
      }
    }
    return lastSpoken;
  };
}
