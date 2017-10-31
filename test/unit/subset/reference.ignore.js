var test = require('tape');
var nlp = require('../lib/nlp');

test('reference-test', function(t) {
  var orig = nlp('is');
  var subset = orig.terms().replace('is', 'was');
  t.equal(orig.out(), 'was', 'terms-original');
  t.equal(subset.out(), 'was', 'terms-subset');

  orig = nlp('is');
  subset = orig.verbs().replace('is', 'was');
  t.equal(orig.out(), 'was', 'verbs-original');
  t.equal(subset.out(), 'was', 'verbs-subset');

  orig = nlp('is');
  subset = orig.sentences().replace('is', 'was');
  t.equal(orig.out(), 'was', 'sentences-original');
  t.equal(subset.out(), 'was', 'sentences-subset');

  orig = nlp('old');
  subset = orig.adjectives().replace('old', 'new');
  t.equal(orig.out(), 'new', 'adjectives-original');
  t.equal(subset.out(), 'new', 'adjectives-subset');

  orig = nlp('baby');
  subset = orig.nouns().replace('baby', 'adult');
  t.equal(orig.out(), 'adult', 'nouns-original');
  t.equal(subset.out(), 'adult', 'nouns-subset');

  orig = nlp('9');
  subset = orig.values().replace('9', '5');
  t.equal(orig.out(), '5', 'values-original');
  t.equal(subset.out(), '5', 'values-subset');

  orig = nlp('toronto');
  subset = orig.topics().replace('toronto', 'vancouver');
  t.equal(orig.out(), 'vancouver', 'topics-original');
  t.equal(subset.out(), 'vancouver', 'topics-subset');

  t.end();
});

test('.all()-multiple', function(t) {
  var orig = nlp('i am from new jersey');
  var sub1 = orig.match('new jersey');
  var sub2 = sub1.match('jersey');
  var sub3 = sub2.replace('jersey', 'york');

  //check doc.out()
  t.equal(orig.out('normal'), 'i am from new york', 'original-text');
  t.equal(sub1.out('normal'), 'new york', 'sub1-text');
  t.equal(sub2.out('normal'), 'york', 'sub2-text');
  t.equal(sub3.out('normal'), 'york', 'sub3-text');

  //call .all().out()
  t.equal(orig.all().out('normal'), 'i am from new york', 'orig-all');
  t.equal(sub1.all().out('normal'), 'i am from new york', 'sub1-all');
  t.equal(sub2.all().out('normal'), 'i am from new york', 'sub2-all');
  t.equal(sub3.all().out('normal'), 'i am from new york', 'sub3-all');
  t.end();
});
