const T = require('taninsam');
const { patternMatchingBy, parseNumber } = require('../../tools');

module.exports = function(instructions) {
  return T.chain(instructions)
    .chain(
      T.reduce(
        uncurry(
          patternMatchingBy(
            ([_, { type }]) => type,
            ['mask', changeMask],
            ['memory', alterMemory]
          )
        ),
        {}
      )
    )
    .chain(T.entries())
    .chain(T.filter(([key]) => 'mask' !== key))
    .chain(T.sumBy(([_, value]) => value))
    .value();
};

function uncurry(f) {
  return (...args) => f(args);
}

function changeMask([memory, { mask0, mask1, maskX }]) {
  return {
    ...memory,
    mask: { mask0, mask1, maskX }
  };
}

function alterMemory([memory, { adress, value }]) {
  const fromBinaire = parseNumber(2);

  const newValue = fromBinaire(applyMask(value, memory.mask.maskX));
  if (newValue < 0) {
    console.log({
      adress,
      value,
      newValue,
      maskX: memory.mask.maskX,
      mask1: memory.mask.mask1,
      mask0: memory.mask.mask0
    });
  }

  return {
    ...memory,
    [adress]: newValue
  };
}

function applyMask(value, mask) {
  let newValue = '';
  for (let i = 0; i < 36; i++) {
    newValue += applyBinaryMask(value[i], mask[i]);
  }
  return newValue;
}

function applyBinaryMask(v, m) {
  if ('X' === m) {
    return v;
  }
  return m;
}
