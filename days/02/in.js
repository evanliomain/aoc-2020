const { parseLinesWithRegexp } = require('../../tools');

module.exports = parseLinesWithRegexp(
  /^(?<min>\d+)-(?<max>\d+) (?<character>.): (?<password>.*)$/
);
