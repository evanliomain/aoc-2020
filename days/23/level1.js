const T = require('taninsam');
const { equal } = require('../../tools');

module.exports = function({ circularList, current }) {
  return T.chain({ circularList, current })
    .chain(T.loopFor(100, move))
    .chain(merge)
    .value();
};

function move({ circularList, current }) {
  // Cut the circular list
  const start = circularList[current];
  const middle = circularList[start];
  const end = circularList[middle];

  circularList[current] = circularList[end];

  // Find new current cup
  const destinations = T.chain(circularList)
    .chain(T.values())
    .chain(T.filter(T.not(equal(start))))
    .chain(T.filter(T.not(equal(middle))))
    .chain(T.filter(T.not(equal(end))))
    .chain(list => new Set(list))
    .value();

  let destination;
  let i = 1;
  while (T.isNil(destination)) {
    const next = (10 + (current - i)) % 10;
    if (destinations.has(next)) {
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
