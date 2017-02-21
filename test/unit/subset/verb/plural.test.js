var test = require('tape');
var nlp = require('../../lib/nlp');

test('plural-verbs:', function(t) {
  var r = nlp('i look at');
  var len = r.verbs().isPlural().length;
  t.equal(len, 0, 'i singular');

  r = nlp('we look at it. They report on it');
  len = r.verbs().isPlural().length;
  t.equal(len, 2, 'they plural');

  r = nlp('lkjsdf are cool');
  var str = r.verbs().isPlural().out('normal');
  t.equal(str, 'are', 'are plural');

  r = nlp('lkjsdf does eat bugs');
  str = r.verbs().isPlural().out('normal');
  t.equal(str, 'does eat', 'does plural');

  r = nlp('lkjsdf is cool');
  str = r.verbs().isPlural().out('normal');
  t.equal(str, '', 'is singular');
  t.end();
});
