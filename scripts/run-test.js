const chalk = require('chalk');
const pkg = require('../package.json');
const year = pkg.aocYear;
const { logArg } = require('../utils/log-arg');
const { extractTest } = require('../utils/extract-args');

const runTest = require('../utils/run-test');

async function run() {
  const { day, level } = extractTest(process.argv);

  // Log user arguments
  logArg(year, day, level);

  // Run the Jest asynchronously
  return runTest(day, level).then(onTestFinish);

  function onTestFinish(result) {
    // Analyze the results
    // (see typings for result format)
    if (result.results.success) {
      console.log(chalk.green('Tests passed'));
    } else {
      console.log(chalk.red('Tests Failed'));
    }
  }
}

run().catch(() => {});
