module.exports = function(input) {
  const permutations = new Map();
  permutations.set(0, 1);

  for (let i = 0; i < input.length; i++) {
    const jolt = input[i];
    let nbBranch = 0;

    const last = jolt - 1;
    const last2 = jolt - 2;
    const last3 = jolt - 3;

    if (permutations.has(last)) {
      nbBranch += permutations.get(last);
    }
    if (permutations.has(last2)) {
      nbBranch += permutations.get(last2);
    }
    if (permutations.has(last3)) {
      nbBranch += permutations.get(last3);
    }
    permutations.set(jolt, nbBranch);
  }

  return permutations.get(input[input.length - 1]);
};
