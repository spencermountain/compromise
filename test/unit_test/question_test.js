var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('question-test :', function(t) {
  [
    ['which party was it?', 'which'],
    ['which day was it?', 'when'],
    ['but who did you go with?', 'who'],
    ['what time did you show up?', 'when'],
    [`why'd you come so early?`, 'why'],
    [`when'll you show up?`, 'when'],
    [`is it fun?`, 'yesNo'],
    [`was it fun?`, 'yesNo'],
    [`did you think it was fun?`, 'yesNo'],
  ].forEach(function(a) {
    var str = nlp.question(a[0]).form();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
