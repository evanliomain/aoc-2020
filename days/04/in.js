const T = require('taninsam');

module.exports = function(input, raw) {
  return T.chain(raw)
    .chain(groupPassport)
    .chain(T.map(T.split(' ')))
    .chain(T.map(T.map(T.split(':'))))
    .chain(T.map(T.fromEntries()))
    .value();
};

function groupPassport(raw) {
  const rawPassport = [''];
  for (let i = 0; i < raw.length; i++) {
    const line = raw[i];
    if ('' === line) {
      rawPassport.push(line);
    } else {
      rawPassport[rawPassport.length - 1] = rawPassport[
        rawPassport.length - 1
      ].concat(` ${line}`);
    }
  }
  return rawPassport;
}
