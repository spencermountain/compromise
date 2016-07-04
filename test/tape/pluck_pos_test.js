var test = require('tape');
var nlp = require('./lib/nlp');
var terms_test = require('./lib/fns').terms_test;


test('==Pluck-terms==', function(T) {

  T.test('pluck-people :', function(t) {
    [
      ['Sally Daniels went to the park with Don Douglas', ['Sally Daniels', 'Don Douglas']],
      ['Then Sally went to the park with all her friends.', ['Sally']],
      ['Oh say can you see? By the dawn\'s early rise.', ['you']],
      ['All the base are belong to us.', []]
    ].forEach(function(a) {
      var terms = nlp.text(a[0]).people();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck-places :', function(t) {
    [
      ['Toronto is the biggest city in Canada', ['Toronto', 'Canada']],
      ['Beijing China grows each year. It is usually sunny.', ['Beijing China']],
      ['How long is the flight from SFO to LAX? Both in the USA!', ['SFO', 'LAX?', 'USA!']],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ].forEach(function(a) {
      var terms = nlp.text(a[0]).places();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck nouns :', function(t) {
    [
      ['Cat eats meat.', ['Cat', 'meat.']],
      ['Running, swimming, jumping.', []],
      ['John Doe ran the race', ['John Doe', 'race']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).nouns();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck-adjectives ', function(t) {
    [
      ['Nice dog is eating', ['Nice']],
      ['Beautiful, dirty, rich.', ['Beautiful,', 'dirty,', 'rich.']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).adjectives();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck verbs :', function(t) {
    [
      ['Cat eats meat.', ['eats']],
      ['Beijing China grows each year. It is usually sunny.', ['grows', 'is']],
      ['Running, swimming, jumping.', ['Running,', 'swimming,', 'jumping.']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).verbs();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck adverbs :', function(t) {
    [
      ['Eat gently, slowly.', ['gently,', 'slowly.']],
      ['John quickly ate the food', ['quickly']],
      ['all spectators immediately started cheering hard', ['immediately', 'hard']],
      ['walk softly and carry a big stick', ['softly']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).adverbs();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck dates :', function(t) {
    [
      ['Toronto is best in January', ['January']],
      ['My birthday is June 5th', ['June 5th']],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).dates();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck values :', function(t) {
    [
      // ['The 5 books in Toronto are best in January', ['5 books']],
      // ['My harddrive is 5 Gb', ['5 Gb']],
      ['he is seven', ['seven']],
      // ['add eight and five', ['eight', 'five']],
      ['My birthday is June 5th', []],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).values();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck organizations :', function(t) {
    [
      ['The 5 books in Toronto are best in January', []],
      ['My birthday is June 5th', []],
      ['Oh say can you see? By the dawn\'s early rise.', []],
      ['Google may purchase Cannabis Inc', ['Google', 'Cannabis Inc']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).organizations();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });


});
