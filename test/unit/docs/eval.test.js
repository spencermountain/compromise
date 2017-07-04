var test = require('tape');
var docs = require('../../../docs/api');

let flat = [];
Object.keys(docs.generic).forEach(k => {
  let obj = docs.generic[k];
  Object.keys(obj).forEach(k2 => {
    obj[k2].title = k + '().' + k2 + '()';
    flat.push(obj[k2]);
  });
});
Object.keys(docs.subsets).forEach(k => {
  let obj = docs.subsets[k];
  Object.keys(obj).forEach(k2 => {
    obj[k2].title = k + '().' + k2 + '()';
    flat.push(obj[k2]);
  });
});

test('docs-eval:', function(t) {
  flat.forEach(o => {
    let code = o.example;
    try {
      code =
        `(function(){
        ` +
        code +
        `
      })()`;
      eval(code);
      t.ok(true, o.title);
      // t.doesNotThrow(eval(code))
    } catch (e) {
      console.log(o.title);
      console.log(e);
      t.fail(o.title);
    }
  });
  t.end();
});
