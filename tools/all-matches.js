module.exports = function allMatches(regexp) {
  return s => {
    const matches = [];
    let result;
    while (null !== (result = regexp.exec(s))) {
      matches.push(result[0]);
    }
    return matches;
  };
};
