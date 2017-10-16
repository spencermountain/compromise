
var test = require('tape');
var nlp = require('../lib/nlp');

test('addConjugations', function(t) {
  var conjugations = {
    woo: {
      PastTense: 'wooed'
    }
  };
  nlp.addConjugations(conjugations);
  var doc = nlp('woo the crush');
  t.equal(doc.verbs().length, 1, 'has inf in lexicon');

  doc.verbs().toPastTense();
  t.equal(doc.out(), 'wooed the crush', 'conjugated from infinitive');
  t.equal(doc.verbs().length, 1, 'still has 1 verb');

  doc.verbs().toInfinitive();
  t.equal(doc.out(), 'woo the crush', 'conjugated back tp infinitive');

  t.end();
});
