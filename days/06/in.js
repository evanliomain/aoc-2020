const T = require('taninsam');

module.exports = function(input, raw) {
  const groups = [[raw[0]]];

  for (let i = 1; i < raw.length; i++) {
    const line = raw[i];
    if ('' === line) {
      groups.push([]);
    } else {
      groups[groups.length - 1].push(line);
    }
  }
  return groups;
};
