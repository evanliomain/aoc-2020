module.exports = function([cardPublicKey, doorPublicKey]) {
  return handshake(guessLoopSize(doorPublicKey), cardPublicKey);
};

function handshake(loopSize, subjectNumber) {
  let value = 1;
  while (0 !== loopSize) {
    value = (value * subjectNumber) % 20201227;
    loopSize--;
  }
  return value;
}

function guessLoopSize(publicKey) {
  let loopSize = 0;
  for (let value = 1; publicKey !== value; loopSize++) {
    value = (value * 7) % 20201227;
  }
  return loopSize;
}
