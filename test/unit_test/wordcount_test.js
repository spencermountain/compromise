var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==WordCount==', function(T) {

  T.test('sentence():', function(t) {
    [
      ['he is good', 3],
      ['jack and jill went up the hill.', 7],
      ['Mr. Clinton did so.', 3],
      ['Bill Clinton ate cheese.', 3],
      ['5kb of data.', 3],
      ['it was five hundred and seventy two.', 3],
    ].forEach(function (a) {
      var num = nlp.sentence(a[0]).word_count();
      str_test(num, a[0], a[1], t);
    });
    t.end();
  });

  T.test('text():', function(t) {
    [
      ['he is good', 3],
      ['jack and jill went up the hill. They got water.', 10],
      ['Mr. Clinton did so.', 3],
      ['Bill Clinton ate cheese.', 3],
      ['Bill Clinton went walking', 3],
      ['Bill Clinton will go walking', 3],
    ].forEach(function (a) {
      var num = nlp.text(a[0]).word_count();
      str_test(num, a[0], a[1], t);
    });
    t.end();
  });

});
