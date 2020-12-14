const T = require('taninsam');
const { spread } = require('../../tools');

module.exports = {
  sumMemory,
  masking,
  changeMask
};

function sumMemory(memory) {
  return T.chain(memory)

    .chain(T.entries())
    .chain(T.filter(([key]) => 'mask' !== key))
    .chain(T.sumBy(([_, value]) => value))
    .value();
}

function masking(maskFn) {
  return ({ value, mask }) => {
    let newValue = '';
    for (let i = 0; i < 36; i++) {
      newValue += maskFn(value[i], mask[i]);
    }
    return newValue;
  };
}

function changeMask([memory, { mask }]) {
  return spread(() => ({ mask }))(memory);
}
