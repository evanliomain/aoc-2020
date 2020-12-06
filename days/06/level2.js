const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(group => ({
        nb: group.length,
        answers: group.reduce((answers, person) => {
          for (let i = 0; i < person.length; i++) {
            const answer = person[i];
            if (!T.isNil(answers[answer])) {
              answers[answer] = 1 + answers[answer];
            } else {
              answers[answer] = 1;
            }
          }
          return answers;
        }, {})
      }))
    )
    .chain(
      T.map(({ nb, answers }) =>
        T.chain(answers)
          .chain(T.values())
          .chain(T.filter(v => v === nb))
          .chain(T.length())
          .value()
      )
    )
    .chain(T.sum())
    .value();
};
