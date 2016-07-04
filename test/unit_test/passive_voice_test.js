var test = require('tape');
var nlp = require('./lib/nlp');

test('passive-voice:', function(t) {
  [
    ['the drink was drank by me', true],
    ['baghdad was flooded by the river', true],
    ['My birthday was approaching by June 5th', false],
    ['Oh say can you see? By the dawn\'s early rise.', false],
  ].forEach(function (a) {
    var bool = nlp.sentence(a[0]).is_passive();
    var msg = a[0] + ' is passive';
    t.equal(bool, a[1], msg);
  });
  t.end();
});
