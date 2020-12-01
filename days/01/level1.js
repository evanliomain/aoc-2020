const T = require('taninsam');

module.exports = function(input) {
  const expenseReport = new Map();
  input.forEach(x => {
    expenseReport.set(x, true);
  });
  for (let i = 0; i < input.length; i++) {
    const expense = input[i];
    if (expenseReport.has(2020 - expense)) {
      return expense * (2020 - expense);
    }
  }
};
