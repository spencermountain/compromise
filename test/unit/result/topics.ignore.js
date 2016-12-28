var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('topics:', function(t) {
  [
    ['James and Tony Hawk both live in Toronto. Tony Hawk is cool.', 'tony hawk'],
    ['I live Toronto. I think Toronto is cool.', 'toronto'],
    ['The EACD united in 1972. EACD must follow regulations.', 'eacd'],
    ['The Elkjsdflkjsdf sells hamburgers. I think the Elkjsdflkjsdf eats turky.', 'elkjsdflkjsdf'],
    ['Toronto\'s citizens love toronto!', 'toronto'],
  ].forEach(function (a) {
    var str = nlp.text(a[0]).topics()[0].text;
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
