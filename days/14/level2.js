const T = require('taninsam');
const {
  toBinary,
  patternMatchingBy,
  spread,
  uncurry,
  fromBinary,
  memoizer
} = require('../../tools');
const { sumMemory, changeMask, masking } = require('./tools');

const memoize = memoizer();

module.exports = function(instructions) {
  return T.chain(instructions)
    .chain(
      T.map(
        patternMatchingBy(({ type }) => type, [
          'memory',
          spread(({ adress }) => ({
            adress: toBinary(adress).padStart(36, 0)
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

function alterMemory([memory, { adress, value }, i, all]) {
  return (
    T.chain({ value: adress, mask: memory.mask })
      .chain(masking(applyBinaryMask))
      .chain(patternToAdress)
      .chain(T.map(fromBinary))
      // Fast
      .chain(
        T.reduce((mem, adr) => {
          mem[adr] = value;
          return mem;
        }, memory)
      )
      // Slow
      // .chain(
      //   T.reduce((mem, adr) => spread(() => ({ [adr]: value }))(mem), memory)
      // )
      .value()
  );
}

function applyBinaryMask(v, m) {
  if ('0' === m) {
    return v;
  }
  if ('1' === m) {
    return m;
  }
  if ('X' === m) {
    return m;
  }
  return m;
}

function patternToAdress(pattern) {
  const nbX = T.countCharacter('X')(pattern);
  if (0 === nbX) {
    return [pattern];
  }
  const res = T.chain(nbX)
    .chain(memoize(combinatoire))
    .chain(T.map(applyCombinaison2(pattern)))
    .value();

  return res;
}

function combinatoire(n) {
  if (1 === n) {
    return [[0], [1]];
  }
  if (2 <= n) {
    return T.chain(n - 1)
      .chain(memoize(combinatoire))
      .chain(
        T.map(c => [
          [...c, 0],
          [...c, 1]
        ])
      )
      .chain(T.flat())
      .value();
  }
}

// Several variant to apply combinaison
// Done in 23.01s.
function applyCombinaison(pattern) {
  return T.reduce((str, c) => str.replace('X', c), pattern);
}

// Done in 22.23s.
function applyCombinaison2(pattern) {
  return combinaison => {
    let i = 0;
    return pattern.replace(/X/g, () => combinaison[i++]);
  };
}

// Done in 25.85s.
function applyCombinaison3(pattern) {
  return combinaison => {
    let n = 0;
    return pattern
      .split('')
      .map(p => ('X' !== p ? p : combinaison[n++]))
      .join('');
  };
}
