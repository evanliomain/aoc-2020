const jest = require('jest');

function runTest(day, level) {
  // Run the Jest asynchronously
  return jest
    .run(['--config', JSON.stringify({ testRegex: getTestRegex(day, level) })])
    .then(
      x => x,
      error => console.log('error', error)
    );
}

module.exports = runTest;

function getTestRegex(day, level) {
  if (undefined === day) {
    return '.*\\.test\\.js$';
  }
  if (undefined === level) {
    return `${day}/.*\\.test\\.js$`;
  }
  return `${day}/level${level}\\.test\\.js$`;
}
