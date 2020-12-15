module.exports = {
  lastSpokenNumber
};

function lastSpokenNumber(nbIterations) {
  return input => {
    const seen = new Map();

    input.forEach((n, i) => seen.set(n, i + 1));

    let lastSpoken = input[input.length - 1];

    for (let turn = input.length; turn < nbIterations; turn++) {
      const turnLastSeen = seen.has(lastSpoken) ? seen.get(lastSpoken) : turn;
      seen.set(lastSpoken, turn);
      lastSpoken = turn - turnLastSeen;
    }
    return lastSpoken;
  };
}
