var test = require('tape');
var nlp = require('./lib/nlp');

test('==contraction match==', function(T) {

  T.test('contraction match', function(t) {
    [
      ['he\'s nice', 'he is', 2],
      ['he\'s nice', 'is nice', 2],
      ['he\'s nice', 'he\'s', 1],
      ['he\'s nice', 'he\'s nice', 3],
    ].forEach(function (a) {
      var r = nlp(a[0]).match(a[1]).first() || [];
      var msg = '\'' + a[0] + '\'   ' + r.length;
      t.equal(r.length, a[2], msg);
    });
    t.end();
  });

});
