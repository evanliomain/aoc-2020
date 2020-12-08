const pathAst = require('path-ast');

const pathString =
  'M52.449,57.423c10.113-2.258,17.674-11.28,17.674-22.073c0-12.494-10.129-22.623-22.623-22.623S24.877,22.856,24.877,35.35  c0,10.793,7.562,19.815,17.674,22.073c-14.337,0.505-26.108,11.068-28.482,24.851h66.861C78.557,68.492,66.786,57.928,52.449,57.423  z';
const viewPortSize = 95;

// From viewport, if need to retranslate to 0
const x = 0;
const y = 0;

const ast = pathAst.parse(
  pathString.replace(/([0-9])-/g, '$1,-').replace(/\.([0-9]+)\./g, '.$1,.')
);

ast.translate(-x, -y);
ast.translate(-viewPortSize / 2, -viewPortSize / 2);
ast.scale(1 / (viewPortSize / 2), 0, 0);

const pathData = pathAst.stringify(ast);

console.log(pathData);
