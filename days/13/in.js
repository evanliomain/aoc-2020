module.exports = function([timestamp, busIDs]) {
  return {
    timestamp: parseInt(timestamp, 10),
    busIDs: busIDs.split(',')
  };
};
