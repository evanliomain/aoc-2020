const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(allMatches(/(e|se|sw|w|nw|ne)/g)))
    .value();
};

function allMatches(regexp) {
  return s => {
    const matches = [];
    let result;
    while (null !== (result = regexp.exec(s))) {
      matches.push(result[0]);
    }
    return matches;
  };
}
