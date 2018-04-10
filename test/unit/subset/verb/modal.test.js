var test = require('tape');
var nlp = require('../../lib/nlp');

//ignore some modals during conjugation, i guess
test('ignore-would-behaviour', function(t) {
  var str = nlp('he would walk').sentences().toPastTense().out();
  t.equal(str, 'he walked', 'would-past');

  str = nlp('he would walk').sentences().toFutureTense().out();
  t.equal(str, 'he will walk', 'would-future');

  str = nlp('he would walk').sentences().toPresentTense().out();
  t.equal(str, 'he walks', 'would-present');

  str = nlp('he would walk').sentences().toContinuous().out();
  t.equal(str, 'he is walking', 'would-continuous');

  t.end();
});

//can/could
//might
//should
