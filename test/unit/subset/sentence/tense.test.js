var test = require('tape');
var nlp = require('../../lib/nlp');

test('sentence-change-tense:', function(t) {
  [
    ['john walks quickly', 'john walked quickly', 'john will walk quickly'],
    ['he is quick', 'he was quick', 'he will be quick'],
    ['the stool falls over', 'the stool fell over', 'the stool will fall over'],
    ['i usually take the stairs', 'i usually took the stairs', 'i usually will take the stairs'],
    ['i usually use the stairs', 'i usually used the stairs', 'i usually will use the stairs'],
    ['he finishes first', 'he finished first', 'he will finish first'],
    ['our house looks great', 'our house looked great', 'our house will look great'],
    //infinitives
    // ['he does what he can to stop', 'he did what he could to stop', 'he will do what he can to stop'],
    ['goes to sleep', 'went to sleep', 'will go to sleep'],

    //passive
    // ['cardboard is made of tree fibre', 'cardboard was made of tree fibre', 'cardboard will be made of tree fibre'],

    //grammatical-number
    // ['we do what we can to stop', 'we did what we could to stop', 'we will do what we can to stop'],

    //multi-sentence
    [
      'this is one sentence. This makes two now.',
      'this was one sentence. This made two now.',
      'this will be one sentence. This will make two now.'
    ]

  //support negative
  // ['this isn\'t one sentence. This doesn\'t make two now.', 'this was not one sentence. This didn\'t make two now.', 'this won\'t be one sentence. This won\'t make two now.']
  ].forEach(function(a) {
    var r = nlp(a[0]).sentences();

    r.toPastTense();
    var str = r.out('text');
    t.equal(str, a[1], 'pastTense-' + str);

    r.toFutureTense();
    str = r.out('text');
    t.equal(str, a[2], 'futureTense-' + str);

    r.toPresentTense();
    str = r.out('text');
    t.equal(str, a[0], 'presentTense-' + str);
  });
  t.end();
});

test('copula-form', function(t) {
  var m = nlp('john is nice').sentences();

  m.toPastTense();
  t.equal(m.out(), 'john was nice', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'john is nice', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'john will be nice', 'toFuture-1');

  m.toNegative();
  t.equal(m.out(), 'john will not be nice', 'toNeg-future');

  //negative forms
  m.toPastTense();
  t.equal(m.out(), 'john was not nice', 'toPast-neg');

  m.toPresentTense();
  t.equal(m.out(), 'john is not nice', 'toPres-neg');

  m.toFutureTense();
  t.equal(m.out(), 'john will not be nice', 'toFuture-neg');

  t.end();
});
// //
test('conjugate-form', function(t) {
  var m = nlp('john walks quickly').sentences();

  m.toPastTense();
  t.equal(m.out(), 'john walked quickly', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'john walks quickly', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'john will walk quickly', 'toFuture-1');

  m.toNegative();
  t.equal(m.out(), 'john will not walk quickly', 'toNeg');

  //negative forms
  m.toPastTense();
  t.equal(m.out(), 'john did not walk quickly', 'toPast-neg');

  m.toPresentTense();
  t.equal(m.out(), 'john does not walk quickly', 'toPres-neg');

  m.toFutureTense();
  t.equal(m.out(), 'john will not walk quickly', 'toFuture-neg');

  t.end();
});

test('particle-form', function(t) {
  var m = nlp('the stool falls over').sentences();

  m.toPastTense();
  t.equal(m.out(), 'the stool fell over', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'the stool falls over', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'the stool will fall over', 'toFuture-1');

  m.toNegative();
  t.equal(m.out(), 'the stool will not fall over', 'toNeg');

  //negative forms
  m.toPastTense();
  t.equal(m.out(), 'the stool did not fall over', 'toPast-neg');

  m.toPresentTense();
  t.equal(m.out(), 'the stool does not fall over', 'toPres-neg');

  m.toFutureTense();
  t.equal(m.out(), 'the stool will not fall over', 'toFuture-neg');

  t.end();
});

test('contraction-cases', function(t) {
  var arr = [[`I'm going to the shops`, `I went to the shops`], [`I'll go to the shops`, `I went to the shops`]];
  arr.forEach(a => {
    var str = nlp(a[0]).sentences().toPastTense().out();
    t.equal(str, a[1], 'past-tense ' + a.join(' - '));
  });
  arr = [[`We're looking`, `We looked`], [`We'll look`, `We looked`], [`We are looking`, `We looked`]];
  arr.forEach(a => {
    var str = nlp(a[0]).sentences().toPastTense().out();
    t.equal(str, a[1], 'past-tense ' + a.join(' - '));
  });
  arr = [[`I'm going to the shops`, `I will go to the shops`], [`I'll go to the shops`, `I will go to the shops`]];
  arr.forEach(a => {
    var str = nlp(a[0]).sentences().toFutureTense().out();
    t.equal(str, a[1], 'future-tense ' + a.join(' - '));
  });
  arr = [[`I'm going to the shops`, `I go to the shops`], [`I'll go to the shops`, `I go to the shops`]];
  arr.forEach(a => {
    var str = nlp(a[0]).sentences().toPresentTense().out();
    t.equal(str, a[1], 'present-tense ' + a.join(' - '));
  });
  arr = [[`I'm looking for a bug`, `I look for a bug`], [`I'll look for a bug`, `I look for a bug`]];
  arr.forEach(a => {
    var str = nlp(a[0]).sentences().toPresentTense().out();
    t.equal(str, a[1], 'present-tense ' + a.join(' - '));
  });
  var str = nlp('I’m lookin’ for Amanda Hugginkiss').sentences().toPastTense().out();
  t.equal(str, 'i looked for Amanda Hugginkiss', 'present-tense slang');
  t.end();
});


test('pronoun-specific', function(t) {
  //from present
  var m = nlp('i am cool').sentences().toPresentTense();
  t.equal(m.out(), 'i am cool', 'toPresent-I');
  m = nlp('i am cool').sentences().toPastTense();
  t.equal(m.out(), 'i was cool', 'toPastTense-I');
  m = nlp('i am cool').sentences().toFutureTense();
  t.equal(m.out(), 'i will be cool', 'toFutureTense-I');

  //from future
  m = nlp('i will be cool').sentences().toFutureTense();
  t.equal(m.out(), 'i will be cool', 'toFutureTense-I-2');
  m = nlp('i will be cool').sentences().toPastTense();
  t.equal(m.out(), 'i was cool', 'toPastTense-I-2');
  m = nlp('i will be cool').sentences().toPresentTense();
  t.equal(m.out(), 'i am cool', 'toPresentTense-I-2');

  //from past
  m = nlp('i was cool').sentences().toPresentTense();
  t.equal(m.out(), 'i am cool', 'toPresentTense-I-3');
  m = nlp('i was cool').sentences().toPastTense();
  t.equal(m.out(), 'i was cool', 'toPastTense-I-3');
  m = nlp('i was cool').sentences().toFutureTense();
  t.equal(m.out(), 'i will be cool', 'toFutureTense-I-3');

  //with negative
  m = nlp('i was not cool').sentences().toPresentTense();
  t.equal(m.out(), 'i am not cool', 'neg-1');
  m = nlp('i wasn\'t cool').sentences().toPastTense();
  t.equal(m.out(), 'i was not cool', 'neg-2');
  m = nlp('i was not cool').sentences().toFutureTense();
  t.equal(m.out(), 'i will not be cool', 'neg-3');

  //with adverbs
  m = nlp('i was really cool').sentences().toPresentTense();
  t.equal(m.out(), 'i am really cool', 'toPresentTense-I-3');
  m = nlp('i was really cool').sentences().toPastTense();
  t.equal(m.out(), 'i was really cool', 'toPastTense-I-3');
  m = nlp('i was really cool').sentences().toFutureTense();
  t.equal(m.out(), 'i will be really cool', 'toFutureTense-I-3');
  t.end();
});
