var test = require('tape');
var nlp = require('../lib/nlp');
var terms_test = function(r, arr, t) {
  var have = r.out('array').join(' - ');
  arr = arr.join(' - ');
  var msg = have + ' == ' + arr;
  t.equal(have, arr, msg);
};

test('pluck-people :', function(t) {
  [
    ['Sally Daniels went to the park with Don Douglas', ['sally daniels', 'don douglas']],
    ['Then Sally went to the park with all her friends.', ['sally']],
    ['Oh say can you see? By the dawn\'s early rise.', []],
    ['All the base are belong to us.', []]
  ].forEach(function(a) {
    var terms = nlp(a[0]).people();
    terms_test(terms, a[1], t);
  });
  t.end();
});

test('pluck-places :', function(t) {
  [
    ['Toronto is the biggest city in Canada', ['toronto', 'canada']],
    ['Beijing China grows each year. It is usually sunny.', ['beijing china']],
    ['How long is the flight from SFO to LAX? Both in the USA!', ['sfo', 'lax', 'usa']],
    ['Oh say can you see? By the dawn\'s early rise.', []]
  ].forEach(function(a) {
    var terms = nlp(a[0]).places();
    terms_test(terms, a[1], t, true);
  });
  t.end();
});

test('pluck nouns :', function(t) {
  [
    ['Cat eats meat.', ['cat', 'meat']],
    ['Running, swimming, jumping.', []],
    ['John Doe ran the race', ['john doe', 'race']]
  ].forEach(function(a) {
    var terms = nlp(a[0]).nouns();
    terms_test(terms, a[1], t, true);
  });
  t.end();
});

test('pluck-adjectives ', function(t) {
  [['Nice dog is eating', ['nice']], ['Beautiful, dirty, rich.', ['beautiful', 'dirty', 'rich']]].forEach(function(a) {
    var terms = nlp(a[0]).adjectives();
    terms_test(terms, a[1], t, true);
  });
  t.end();
});

test('pluck verbs :', function(t) {
  [
    ['Cat eats meat.', ['eats']],
    ['Beijing China grows each year. It is usually sunny.', ['grows', 'is usually']],
    ['Running, swimming, jumping.', ['running', 'swimming', 'jumping']]
  ].forEach(function(a) {
    var terms = nlp(a[0]).verbs();
    terms_test(terms, a[1], t, true);
  });
  t.end();
});

test('pluck adverbs :', function(t) {
  [
    ['Eat gently, slowly.', ['gently', 'slowly']],
    ['John quickly ate the food', ['quickly']],
    ['all spectators immediately started cheering hard', ['immediately', 'hard']],
    ['walk softly and carry a big stick', ['softly']]
  ].forEach(function(a) {
    var terms = nlp(a[0]).adverbs();
    terms_test(terms, a[1], t, true);
  });
  t.end();
});

test('pluck dates :', function(t) {
  [
    ['Toronto is best in January', ['january']],
    ['My birthday is June 5th', ['june 5th']],
    ['Oh say can you see? By the dawn\'s early rise.', []]
  ].forEach(function(a) {
    var terms = nlp(a[0]).dates();
    terms_test(terms, a[1], t, true);
  });
  t.end();
});

test('pluck values :', function(t) {
  [
    ['The 5 books in Toronto are best in January', ['5']],
    ['My harddrive is 5 Gb', ['5 gb']],
    ['he is seven', ['seven']],
    ['add eight and five', ['eight', 'five']],
    ['My birthday is June 5th 1999', ['5th', '1999']],
    ['Oh say can you see? By the dawn\'s early rise.', []]
  ].forEach(function(a) {
    var terms = nlp(a[0]).values();
    terms_test(terms, a[1], t, true);
  });
  t.end();
});

test('pluck organizations :', function(t) {
  [
    ['The 5 books in Toronto are best in January', []],
    ['My birthday is June 5th', []],
    ['Oh say can you see? By the dawn\'s early rise.', []],
    ['Google may purchase Cannabis Inc', ['google', 'cannabis inc']]
  ].forEach(function(a) {
    var terms = nlp(a[0]).organizations();
    terms_test(terms, a[1], t, true);
  });
  t.end();
});
