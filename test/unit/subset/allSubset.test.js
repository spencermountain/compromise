var test = require('tape');
var nlp = require('../lib/nlp');
var fns = require('../lib/fns');
var freshPrince = require('../lib/freshPrince');

var subsets = [
  'acronyms',
  'adjectives',
  'adverbs',
  'contractions',
  'dates',
  'hashTags',
  'organizations',
  'people',
  'phoneNumbers',
  'places',
  'sentences',
  'questions',
  'statements',
  'nouns',
  'urls',
  'values',
  'verbs'
];

test('all combined subsets empty:', function(t) {
  var r = nlp(freshPrince);
  var small = r.all();
  for (var i = 0; i < subsets.length; i++) {
    var sub = subsets[i];
    small = small[sub]();
  }
  t.equal(small.out('text'), '', 'no-uber subset');
  t.end();
});

test('all subsets have a data method:', function(t) {
  var r = nlp(freshPrince);
  subsets.forEach(function(s) {
    var sub = r[s]();
    var arr = sub.data();
    t.ok(fns.isArray(arr), s + '.data() is an array');
  });
  t.end();
});

test('all subsets support .all():', function(t) {
  var txt = freshPrince;
  var r = nlp(txt);
  subsets.forEach(function(s) {
    var sub = r[s]();
    var str = sub.all().out('text');
    var msg = s + '.all() works';
    t.equal(str, txt, msg);
  });
  t.end();
});

test('all subsets have an empty 100th element', function(t) {
  var txt = freshPrince;
  var r = nlp(txt);
  subsets.forEach(function(s) {
    var sub = r[s](9999);
    var str = sub.out('text');
    var msg = s + ' is empty';
    t.equal(str, '', msg);
  });
  t.end();
});
