const T = require('taninsam');

const { replace, matchRegexp } = require('../../tools');

module.exports = { rulesToRegex };

function rulesToRegex(rules) {
  return T.chain(rules[0])
    .chain(
      T.loopWhile(
        T.not(matchRegexp(/^[^\d]+$/)),
        T.chainFn(T.split(' '))
          .chain(
            T.map(
              T.unless(
                T.not(matchRegexp(/^\d+$/)),
                part => `( ${rules[part]} )`
              )
            )
          )
          .chain(T.join(' '))
          .value()
      )
    )
    .chain(replace(/ /g, ''))
    .chain(rule => `^${rule}$`)
    .value();
}
