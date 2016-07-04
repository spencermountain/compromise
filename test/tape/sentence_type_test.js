var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('sentence-terminator:', function(t) {
  [
    ['Tony is nice.', '.'],
    ['Tony is nice!', '!'],
    ['Is Tony is nice?', '?'],
    ['Tony is okay', '']
  ].forEach(function(a) {
    var str = nlp.text(a[0]).sentences[0].terminator();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
