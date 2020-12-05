const chalk = require('chalk');

function logArg(year, day, level, other) {
  // Log user arguments
  const logLine = [];
  if (undefined !== year) {
    logLine.push(chalk.magenta(`year:`, chalk.bold(year)));
  }
  if (undefined !== day) {
    logLine.push(chalk.green(`day:`, chalk.bold(day)));
  }
  if (undefined !== level) {
    logLine.push(chalk.blue(`level:`, chalk.bold(level)));
  }
  logLine.push(other);
  console.log(
    logLine
      .filter(x => undefined !== x)
      .filter(x => '' !== x)
      .join(' - ')
  );
}

module.exports = {
  logArg
};
