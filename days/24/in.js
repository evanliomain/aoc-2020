const T = require('taninsam');
const {allMatches}=require('../../tools')

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(allMatches(/(e|se|sw|w|nw|ne)/g)))
    .value();
};
