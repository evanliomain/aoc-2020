module.exports = function captureGroups(regexp) {
  return str => {
    const { groups } = regexp.exec(str);
    return groups;
  };
};
