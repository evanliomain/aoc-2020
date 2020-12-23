const T = require('taninsam');

module.exports = { move, merge, toCircular, toResult, fillUp };

function move(nbCups = 9) {
  const max = nbCups + 1;
  return ({ circularList, current }) => {
    // Cut the circular list
    const start = circularList[current];
    const middle = circularList[start];
    const end = circularList[middle];

    circularList[current] = circularList[end];

    // Find new current cup
    let destination;
    let i = 1;
    while (T.isNil(destination)) {
      const next = (max + (current - i)) % max;
      if (0 !== next && start !== next && middle !== next && end !== next) {
        destination = next;
      }
      i++;
    }

    // Merge list
    const edge = circularList[destination];
    circularList[destination] = start;
    circularList[end] = edge;

    // Selects new current
    const nextCurrent = circularList[current];

    return { circularList, current: nextCurrent };
  };
}

function merge({ circularList }) {
  let result = '';
  let n = circularList[1];

  while (n !== 1) {
    result += n;
    n = circularList[n];
  }

  return result;
}

function toCircular(list) {
  const circularList = {};

  for (let i = 0; i < list.length - 1; i++) {
    circularList[list[i]] = list[i + 1];
  }
  circularList[list[list.length - 1]] = list[0];

  return { circularList, current: list[0] };
}

function toResult({ circularList }) {
  const next1 = circularList[1];
  const nextNext1 = circularList[next1];
  return next1 * nextNext1;
}

function fillUp(list) {
  for (let i = 10; i <= 1000000; i++) {
    list.push(i);
  }
  return list;
}
