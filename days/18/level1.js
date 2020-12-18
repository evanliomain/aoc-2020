const T = require('taninsam');
const { replace } = require('../../tools');

const { evaluateAst, toAst, simplifyAst } = require('./tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(replace(/ /g, '')))
    .chain(T.map(T.reverse()))
    .chain(T.map(toAst))
    .chain(T.map(simplifyAst))
    .chain(T.map(evaluateAst))
    .chain(T.sum())
    .value();
};
