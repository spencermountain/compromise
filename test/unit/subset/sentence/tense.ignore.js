var test = require('tape');
var nlp = require('../../lib/nlp');

test('sentence-change-tense:', function(t) {
  [
    ['john walks quickly', 'john walked quickly', 'john will walk quickly'],
    ['he is quick', 'he was quick', 'he will be quick'],
    ['the stool falls over', 'the stool fell over', 'the stool will fall over'],
    // ['i usually take the stairs', 'i usually took the stairs', 'i usually will take the stairs'],
    // ['i usually use the stairs', 'i usually used the stairs', 'i usually will use the stairs'],
    // ['cardboard is made of tree fibre', 'cardboard was made of tree fibre', 'cardboard will be made of tree fibre'],
    ['he finishes first', 'he finished first', 'he will finish first'],
    ['our house looks great', 'our house looked great', 'our house will look great'],

    //infinitives
    ['he does what he can to stop', 'he did what he could to stop', 'he will do what he can to stop'],
    ['goes to sleep', 'went to sleep', 'will go to sleep'],

    //grammatical-number
    // ['we do what we can to stop', 'we did what we could to stop', 'we will do what we can to stop'],

    //multi-sentence
    ['this is one sentence. This makes two now.', 'this was one sentence. This made two now.', 'this will be one sentence. This will make two now.'],

  //support negative
  // ['this isn\'t one sentence. This doesn\'t make two now.', 'this was not one sentence. This didn\'t make two now.', 'this won\'t be one sentence. This won\'t make two now.']
  ].forEach(function (a) {
    var r = nlp(a[0]).sentences();

    r.toPastTense();
    var str = r.out('text');
    t.equal(str, a[1], str);

    r.toFutureTense();
    str = r.out('text');
    t.equal(str, a[2], str);

    r.toPresentTense();
    str = r.out('text');
    t.equal(str, a[0], str);

  });
  t.end();
});


test('positive+negative-copulas', function(t) {
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
  t.equal(m.out(), 'john was not nice', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'john is not nice', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'john will not be nice', 'toFuture-1');

  t.end();
});

test('positive+negative-conjugate', function(t) {
  var m = nlp('john walks quickly').sentences();

  m.toPastTense();
  t.equal(m.out(), 'john walked quickly', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'john walks quickly', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'john will walk quickly', 'toFuture-1');

  m.toNegative();
  t.equal(m.out(), 'john will not walk quickly', 'toNeg-future');

  //negative forms
  m.toPastTense();
  t.equal(m.out(), 'john did not walk quickly', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'john is not walking quickly', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'john will not walk quickly', 'toFuture-1');

  t.end();
});
