const T = require('taninsam');

module.exports = function(input) {
  const { preamble, preambleMap, codes } = input;

  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    if (!isValid({ preamble, preambleMap, code })) {
      return code;
    }
    // Remove first preamble
    const p = preamble.shift();
    delete preambleMap[p];
    // Add code to  preamble
    preamble.push(code);
    preambleMap[code] = true;
  }

  return 'No code found';
};

function isValid({ preamble, preambleMap, code }) {
  return T.chain(preamble)
    .chain(T.some(p => !T.isNil(preambleMap[code - p]) && p !== code - p))
    .value();
}
