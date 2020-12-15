const { parseNumber } = require('../../tools');

module.exports = function([timestamp, busIDs]) {
  return {
    timestamp: parseNumber()(timestamp),
    busIDs: busIDs.split(',')
  };
};
