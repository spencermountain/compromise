var test = require('tape');
var nlp = require('../lib/nlp');

test('clone:', function(t) {
  var arr = [
    'he eats the alligator',
    'Jumanji is the best move. He eats cheese.',
    'Uperman is wayyyy better than batman!'
  ];
  arr.forEach(function(str) {
    var m = nlp(str);
    var neg = m.clone().sentences().toNegative();
    var past = m.clone().sentences().toPastTense();
    var fut = m.clone().sentences().toFutureTense();
    var adv = m.clone().verbs().insertBefore('really');
    var rm = m.clone().verbs().delete('#Verb');
    var out = m.out();
    t.equal(out, str, 'equals input - ' + out);
    t.notEqual(str, neg.out(), 'neg not equal - ' + str);
    t.notEqual(str, past.out(), 'past not equal - ' + str);
    t.notEqual(str, fut.out(), 'future not equal - ' + str);
    t.notEqual(str, adv.out(), 'adv not equal - ' + str);
    t.notEqual(str, rm.out(), 'rm not equal - ' + str);
  });
  t.end();
});

// test('one-liner:', function (t) {
//   var str = 'would somebody please think of the children';
//   var have = nlp(str).clone().toUpperCase().parent.out();
//   t.equal(str, have, 'parent-unchanged');
//   t.end();
// });
