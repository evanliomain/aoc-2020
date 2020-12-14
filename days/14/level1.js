const T = require('taninsam');
const {
  patternMatchingBy,
  uncurry,
  fromBinary,
  spread,
  toBinary
} = require('../../tools');
const { sumMemory, masking, changeMask } = require('./tools');

module.exports = function(instructions) {
  return T.chain(instructions)
    .chain(
      T.map(
        patternMatchingBy(({ type }) => type, [
          'memory',
          spread(({ value }) => ({
            value: toBinary(value).padStart(36, 0)
          }))
        ])
      )
    )
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
    .chain(sumMemory)
    .value();
};

function alterMemory([memory, { adress, value }]) {
  const mask = masking(applyBinaryMask);
  return spread(() => ({
    [adress]: fromBinary(mask({ value, mask: memory.mask }))
  }))(memory);
}

function applyBinaryMask(v, m) {
  if ('X' === m) {
    return v;
  }
  return m;
}
