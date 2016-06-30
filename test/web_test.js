var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==', function(T) {

  T.test(':', function(t) {
    [].forEach(function (a) {
      var str = nlp.adverb(a[0]).to_adverb();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});
