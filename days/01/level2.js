const T = require('taninsam');

module.exports = function(input) {
  const expenseReport = new Map();
  input.forEach(x => {
    expenseReport.set(x, true);
  });

  for (let i = 0; i < input.length; i++) {
    const expense = input[i];

    for (let j = i; j < input.length; j++) {
      const expense2 = input[j];

      if (expenseReport.has(2020 - expense - expense2)) {
        return expense * expense2 * (2020 - expense - expense2);
      }
    }
  }
};
