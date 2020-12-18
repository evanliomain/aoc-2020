const T = require('taninsam');

module.exports = {
  toAst,
  evaluateAst,
  simplifyAst
};

function toAst(str) {
  return toAstRight({ left: 0, operator: '+' }, str);
}

function toAstRight(node, str) {
  let currentNumber = '';

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (!isNaN(parseInt(c, 10))) {
      currentNumber += c;
      // Am I at the end of str ?
      if (i === str.length - 1) {
        const n = parseNumber(currentNumber);
        return { ...node, right: n };
      }
    } else if (['+', '*'].includes(c)) {
      // Am I at the end of str ?
      if (i === str.length - 1) {
        throw new Error(`Invalid mathematical expression: ${str}`);
      }
      const n = parseNumber(currentNumber);
      return {
        ...node,
        right: toAstRight({ left: n, operator: c }, str.substr(i + 1))
      };
    } else if (')' === c) {
      // Warning, it's an open parentheses
      const closeParenthesesIndex = findCloseParenthesesIndex(str);
      const inParenthesesExpression = str.substring(1, closeParenthesesIndex);

      // close parenthesis at the end of str
      if (closeParenthesesIndex === str.length - 1) {
        return { ...node, right: toAst(inParenthesesExpression) };
      }

      const operator = str[closeParenthesesIndex + 1];
      const remain = str.substr(closeParenthesesIndex + 2);

      return {
        ...node,
        right: {
          left: toAst(inParenthesesExpression),
          operator,
          right: toAst(remain)
        }
      };
    } else if ('(' === c) {
      throw new Error(
        `Syntaxe error in mathematical expression: missing open parenthesis`
      );
    } else {
      throw new Error(
        `Syntaxe error in mathematical expression: ${c} at :${i} in ${str}`
      );
    }
  }

  throw new Error(`Unable to parse :${str}`);
}

function evaluateAst(ast) {
  if (T.isNumber(ast)) {
    return ast;
  }
  const { left, operator, right } = ast;
  switch (operator) {
    case '+':
      return evaluateAst(left) + evaluateAst(right);
    case '*':
      return evaluateAst(left) * evaluateAst(right);
  }
  throw new Error(`Invalid AST: ${JSON.stringify(ast)}`);
}

function findCloseParenthesesIndex(str) {
  let nbOpenParentheses = 0;
  for (let i = 1; i < str.length; i++) {
    const c = str[i];
    if (')' === c) {
      nbOpenParentheses++;
    }
    if ('(' === c) {
      if (0 === nbOpenParentheses) {
        return i;
      }
      nbOpenParentheses--;
    }
  }
  throw new Error(
    `Syntaxe error in mathematical expression: missing close parenthesis`
  );
}

function parseNumber(str) {
  return parseInt(T.reverse()(str), 10);
}

// Remove 0 + in ast
function simplifyAst(ast) {
  if (T.isNumber(ast)) {
    return ast;
  }
  const { left, operator, right } = ast;
  if (0 === left && '+' === operator) {
    return simplifyAst(right);
  }
  return { left: simplifyAst(left), operator, right: simplifyAst(right) };
}
