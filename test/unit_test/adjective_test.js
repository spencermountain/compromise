var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Adjective==', function(T) {

  T.test('to_adverb:', function(t) {
    [
      ['quick', 'quickly'],
      ['idle', 'idly'],
      ['dirty', null],
      ['fun', null],
      ['full', null],
      ['quixotic', 'quixotically'],
      ['cute', 'cutely'],
      ['good', 'well'],
      ['low', 'low']
    ].forEach(function (a) {
      var str = nlp.adjective(a[0]).to_adverb();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_superlative', function(t) {
    [
      ['quick', 'quickest'],
      ['friendly', 'friendliest'],
      ['caring', 'most caring'],
      ['fun', 'most fun'],
      ['full', 'fullest'],
      ['quixotic', 'most quixotic'],
      ['cute', 'cutest'],
    ].forEach(function (a) {
      var str = nlp.adjective(a[0]).to_superlative();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_comparative', function(t) {
    [
      ['quick', 'quicker'],
      ['friendly', 'friendlier'],
      ['caring', 'more caring'],
      ['fun', 'more fun'],
      ['full', 'fuller'],
      ['quixotic', 'more quixotic'],
      ['cute', 'cuter'],
    ].forEach(function (a) {
      var str = nlp.adjective(a[0]).to_comparative();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_noun', function(t) {
    [
      ['quick', 'quickness'],
      ['fancy', 'fanciness'],
      ['ferocious', 'ferociousness'],
      ['', ''],
      [' ', ''],
      ['clean', 'cleanliness'],
    ].forEach(function (a) {
      var str = nlp.adjective(a[0]).to_noun();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' conjugate', function(t) {
    var adv = nlp.adjective('nice');
    var o = adv.conjugate();
    str_test(o.comparative, 'nice', 'nicer', t);
    str_test(o.superlative, 'nice', 'nicest', t);
    str_test(o.adverb, 'nice', 'nicely', t);
    str_test(o.noun, 'nice', 'niceness', t);
    t.end();
  });

  T.end();
});
