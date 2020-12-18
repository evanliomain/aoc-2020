const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(addMissingParenteses))
    .chain(T.map(eval))
    .chain(T.sum())
    .value();
};

function addMissingParenteses(str) {
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    newStr += '*' === c ? ')*(' : c;
  }
  return `(${newStr})`;
}
