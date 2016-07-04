var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Normalize==', function(T) {

  T.test('sentence():', function(t) {
    [
      ['he is good', 'he is good'],
      ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
      ['Mr. Clinton did so.', 'mr clinton did so.'],
    ].forEach(function (a) {
      var str = nlp.sentence(a[0]).normal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('text():', function(t) {
    [
      ['he is good', 'he is good'],
      ['Jack and Jill   went up the hill. She got  water.', 'jack and jill went up the hill. she got water.'],
    // ['Contains no fruit juice \n\n All rights reserved', 'contains no fruit juice. all rights reserved'],
    ].forEach(function (a) {
      var str = nlp.text(a[0]).normal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});
