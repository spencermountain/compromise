var test = require('tape');
var nlp = require('../lib/nlp');
var docs = require('../../../docs/api');
var freshPrince = require('../lib/freshPrince');

// test('generic-methods-exist:', function (t) {
//   var r = nlp(freshPrince);
//   Object.keys(docs.generic).forEach((fn) => {
//     console.log(fn);
//     t.doesNotThrow(() => r[fn](), true, fn);
//   });
//   t.end();
// });

test('subsets-methods-exist:', function (t) {
  var r = nlp(freshPrince);
  Object.keys(docs.subsets).forEach((subset) => {
    //each subset
    t.doesNotThrow(() => r[subset](), true, subset + '()');
    //each method in that subset
    Object.keys(docs.subsets[subset]).forEach((method) => {
      var func = function() {
        r[subset]()[method]();
      };
      var msg = subset + '().' + method;
      t.doesNotThrow(func, true, msg);
    });
  });
  t.end();
});
