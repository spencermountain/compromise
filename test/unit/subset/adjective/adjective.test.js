var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('==Adjective==', function(T) {
  T.test('to_adverb:', function(t) {
    [
      ['quick', 'quickly'],
      // ['idle', 'idly'],
      ['dirty', null],
      ['fun', null],
      ['full', null],
      ['quixotic', 'quixotically'],
      ['cute', 'cutely']
      // ['good', 'well'],
      // ['low', 'low']
    ].forEach(function(a) {
      var arr = nlp(a[0]).adjectives().data();
      var obj = arr[0] || {};
      str_test(obj.adverbForm, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_superlative', function(t) {
    [
      ['quick', 'quickest'],
      ['friendly', 'friendliest'],
      // ['caring', 'most caring'],
      ['fun', 'most fun'],
      ['full', 'fullest'],
      // ['quixotic', 'most quixotic'],
      ['cute', 'cutest'],
      ['large', 'largest']
    ].forEach(function(a) {
      var arr = nlp(a[0]).adjectives().data();
      var obj = arr[0] || {};
      str_test(obj.superlative, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' to_comparative', function(t) {
    [
      ['quick', 'quicker'],
      ['friendly', 'friendlier'],
      // ['caring', 'more caring'],
      ['fun', 'more fun'],
      ['full', 'fuller'],
      // ['quixotic', 'more quixotic'],
      ['cute', 'cuter']
    ].forEach(function(a) {
      var arr = nlp(a[0]).adjectives().data();
      var obj = arr[0] || {};
      str_test(obj.comparative, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' to_noun', function(t) {
    [
      ['quick', 'quickness'],
      ['fancy', 'fanciness'],
      // ['ferocious', 'ferociousness'],
      // ['', ''],
      // [' ', ''],
      ['clean', 'cleanliness']
    ].forEach(function(a) {
      var arr = nlp(a[0]).adjectives().data();
      var obj = arr[0] || {};
      str_test(obj.nounForm, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' conjugate', function(t) {
    var o = nlp('nice').adjectives().data()[0] || {};
    str_test(o.comparative, 'nice', 'nicer', t);
    str_test(o.superlative, 'nice', 'nicest', t);
    str_test(o.adverbForm, 'nice', 'nicely', t);
    str_test(o.nounForm, 'nice', 'niceness', t);
    t.end();
  });

  T.end();
});
