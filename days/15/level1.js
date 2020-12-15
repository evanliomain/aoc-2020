module.exports = function(input) {
  const game0 = new Map();
  const game1 = new Map();

  input.forEach((n, i) => {
    game0.set(n, i + 1);
  });
  let lastSpoken = input[input.length - 1];
  for (let turn = 1 + input.length; turn <= 2020; turn++) {
    if (game0.has(lastSpoken) && game1.has(lastSpoken)) {
      const turn0 = game0.get(lastSpoken);
      const turn1 = game1.get(lastSpoken);
      game0.set(lastSpoken, turn1);
      game1.set(lastSpoken, turn);
      lastSpoken = turn1 - turn0;

      if (!game0.has(lastSpoken)) {
        game0.set(lastSpoken, turn);
      } else {
        game1.set(lastSpoken, turn);
      }
    } else if (game0.has(lastSpoken) && !game1.has(lastSpoken)) {
      game1.set(lastSpoken, turn - 1);
      lastSpoken = 0;
      if (!game0.has(lastSpoken)) {
        game0.set(lastSpoken, turn);
      } else {
        game1.set(lastSpoken, turn);
      }
    } else if (!game0.has(lastSpoken) && !game1.has(lastSpoken)) {
      game0.set(lastSpoken, turn - 1);
      lastSpoken = 0;
      if (!game0.has(lastSpoken)) {
        game0.set(lastSpoken, turn);
      } else {
        game1.set(lastSpoken, turn);
      }
    }
  }
  return lastSpoken;
};
