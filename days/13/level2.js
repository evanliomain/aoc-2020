const T = require('taninsam');
const { parseNumber, hcf, lcm } = require('../../tools');

module.exports = function({ busIDs }) {
  const bus = T.chain(busIDs)
    .chain(T.map((id, index) => ({ id, index })))
    .chain(T.filter(({ id }) => 'x' !== id))
    .chain(T.map(({ id, index }) => ({ id: parseNumber()(id), index })))
    .chain(T.map(({ id, index }) => ({ id, index, remain: (id - index) % id })))
    .value();

  const m = bus.map(({ remain }) => remain);
  const v = bus.map(({ id }) => id);

  return crt(v, m);
};

function crt(remainders, numbers) {
  // TODO: implement this (cf help: https://www.freecodecamp.org/news/how-to-implement-the-chinese-remainder-theorem-in-java-db88a3f1ffe0/)
  // Or use https://docs.sympy.org/latest/modules/ntheory.html#sympy.ntheory.modular.crt
  console.log(`crt([${remainders.join(',')}], [${numbers.join(',')}])`);
  // const p = product()(numbers);
  // for(int i=0; i<num.length; i++){   partialProduct[i] = product/number[i];}
}

function product() {
  return numbers.reduce((a, b) => a * b, 1);
}

function computeInverse(a, b) {
  let m = b,
    t,
    q;
  let x = 0,
    y = 1;
  if (b == 1) {
    return 0;
  }
  // Apply extended Euclid Algorithm
  while (a > 1) {
    // q is quotient
    q = a / b;
    t = b;

    // now proceed same as Euclid's algorithm
    b = a % b;
    a = t;
    t = x;
    x = y - q * x;
    y = t;
  }
  // Make x1 positive
  if (y < 0) {
    y += m;
  }

  return y;
}

/*


function specialHcf(busA) {
  return busB => {
    let a = busA.id + busA.index;
    let b = busB.id + busB.index;
    while (a - busA.index != b - busB.index) {
      if (a > b) {
        a -= busB.id;
      } else {
        b -= busA.id;
      }
    }
    return a;
  };
}

function specialLcm(busA) {
  return busB => (busA.id * busB.id) / specialHcf(busA)(busB);
}

function solve(a, b) {
  const hcfAB = hcf(a.id)(b.id);
  const A = a.id / hcfAB;
  const B = b.id / hcfAB;
  const C = (b.remain - a.remain) / hcfAB;

  console.log(`--> ${A} -- ${B}`);
  console.log(`${A} x - ${B} y = ${C}`);

  const decomposition = decompose(B, A);

  const result = T.chain(decomposition)
    .chain(T.reverse())
    .chain(([head, ...tail]) =>
      tail.reduce(
        (acc, curr) => {
          const T = curr[1].L;
          const S = curr[1].R;
          const w = curr[1].q;
          const v = 1;
          return {
            T,
            v: 1,
            w: acc.v + acc.w,
            S: acc.T
          };
        },
        {
          T: head[1].L,
          S: head[1].R,
          w: head[1].q,
          v: 1
        }
      )
    )
    .chain(({ w, S, v, T }) => ({ cS: C * w, cT: C * v, S, T }))
    // .chain(id => ({ id, remain: 0, index: 0 }))
    .value();
  console.log(
    `--> ${A} -- ${B} = ${result.cS}x${result.S} + ${result.cT}x${result.T}`
  );
  return result;
}

function decompose(B, A) {
  return decomposeTerminal(B, A, []);
}

function decomposeTerminal(B, A, decomposition) {
  const { q, m } = euclide(B, A);
  console.log(`${B} = ${q}x${A} + ${m}`);
  decomposition.push([m, { L: B, q, R: A }]);
  if (1 === m) {
    return decomposition;
  }
  return decomposeTerminal(A, m, decomposition);
}

// 1068781 = 152 683 * 7
//

function euclide(a, b) {
  const mod = a % b;
  return { q: (a - mod) / b, m: mod };
}
*/
