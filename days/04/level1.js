const T = require('taninsam');

const checkFields = [
  'byr', // (Birth Year)
  'iyr', // (Issue Year)
  'eyr', // (Expiration Year)
  'hgt', // (Height)
  'hcl', // (Hair Color)
  'ecl', // (Eye Color)
  'pid' // (Passport ID)
];

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.filter(passport =>
        checkFields.every(field => !T.isNil(passport[field]))
      )
    )
    .chain(T.length())
    .value();
};
