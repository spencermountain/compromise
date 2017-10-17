var test = require('tape');
var nlp = require('../../lib/nlp');

test('basic is contractions', function(t) {
  var r = nlp(`he is cool.`);
  r.contractions().expand();
  t.equal(r.out('text'), `he is cool.`, 'expanded-expand');

  r = nlp(`he's cool.`);
  r.contractions().expand();
  t.equal(r.out('text'), `he is cool.`, 'contracted-expand');

  r = nlp(`he is cool.`);
  r.contractions().contract();
  t.equal(r.out('text'), `he's cool.`, 'expanded-contract');

  r = nlp(`he's cool.`);
  r.contractions().contract();
  t.equal(r.out('text'), `he's cool.`, 'contracted-contract');

  r = nlp(`that's really great.`);
  r.contractions().expand();
  t.equal(r.out('text'), `that is really great.`, 'contracted-expand');

  r = nlp(`she'll, eat icecream`);
  r.contractions().expand();
  t.equal(r.out('text'), `she will eat icecream`, 'with-punctuation');

  r = nlp("we're not gonna take it, no we're not gonna take it");
  r.contractions().expand();
  t.equal(r.out('text'), `we are not going to take it, no we are not going to take it`, 'expand gonna twice');

  r = nlp("let's let's we're gonna gonna");
  r.contractions().expand();
  t.equal(r.out('text'), `let us let us we are going to going to`, 'expand consecutive');
  t.end();
});

test('do-not contractions', function(t) {
  var r = nlp(`please do not eat the marshmellow`);
  r.contractions().expand();
  t.equal(r.out('text'), `please do not eat the marshmellow`, 'expanded-expand');

  r = nlp(`please don't eat the marshmellow`);
  r.contractions().expand();
  t.equal(r.out('text'), `please do not eat the marshmellow`, 'contracted-expand');

  r = nlp(`please do not eat the marshmellow`);
  r.contractions().contract();
  t.equal(r.out('text'), `please don't eat the marshmellow`, 'expanded-contract');

  r = nlp(`please don't eat the marshmellow`);
  r.contractions().contract();
  t.equal(r.out('text'), `please don't eat the marshmellow`, 'contracted-contract');

  t.end();
});

test('have contractions', function(t) {
  var r = nlp(`i have stood`);
  r.contractions().expand();
  t.equal(r.out('text'), `i have stood`, 'expanded-expand');

  r = nlp(`i've stood`);
  r.contractions().expand();
  t.equal(r.out('text'), `i have stood`, 'contracted-expand');

  r = nlp(`i have stood`);
  r.contractions().contract();
  t.equal(r.out('text'), `i've stood`, 'expanded-contract');

  r = nlp(`i've stood`);
  r.contractions().contract();
  t.equal(r.out('text'), `i've stood`, 'contracted-contract');
  t.end();
});

test('repeated contract-expand', function(t) {
  var r = nlp(`i'm good`);
  r.contractions().expand();
  t.equal(r.out('text'), `i am good`, 'expand-1');
  r.contractions().contract();
  t.equal(r.out('text'), `i'm good`, 'contract-1');
  r.contractions().expand();
  t.equal(r.out('text'), `i am good`, 'expand-2');
  r.contractions().contract();
  t.equal(r.out('text'), `i'm good`, 'contract-2');

  r
    .contractions()
    .contract()
    .contract()
    .contract();
  t.equal(r.out('text'), `i'm good`, 'contract-n');

  r
    .contractions()
    .expand()
    .expand()
    .expand();
  t.equal(r.out('text'), `i am good`, 'expand-n');
  t.end();
});

test('contracted', function(t) {
  var r = nlp(`I'll go to Toronto. I will see.`);
  var str = r
    .contractions()
    .contracted()
    .out('text');
  t.equal(str, `I'll`, 'contracted');
  str = r
    .contractions()
    .expanded()
    .out('text');
  t.equal(str, `I will`, 'expanded');
  t.end();
});

test('would-or-did', function(t) {
  var r = nlp(`i'd contemplate`);
  var str = r
    .contractions()
    .expand()
    .all()
    .out('text');
  t.equal(str, `i would contemplate`, 'i-would');

  r = nlp(`i'd contemplated`);
  str = r
    .contractions()
    .expand()
    .all()
    .out('text');
  t.equal(str, `i had contemplated`, 'i-had');
  t.end();
});
