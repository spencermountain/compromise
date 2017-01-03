var test = require('tape');
var nlp = require('../lib/nlp');

test('basic is contractions', function(t) {
  let r = nlp(`he is cool.`);
  r.contractions().expand();
  t.equal(r.plaintext(), `he is cool.`, 'expanded-expand');

  r = nlp(`he's cool.`);
  r.contractions().expand();
  t.equal(r.plaintext(), `he is cool.`, 'contracted-expand');

  r = nlp(`he is cool.`);
  r.contractions().contract();
  t.equal(r.plaintext(), `he's cool.`, 'expanded-contract');

  r = nlp(`he's cool.`);
  r.contractions().contract();
  t.equal(r.plaintext(), `he's cool.`, 'contracted-contract');

  t.end();
});

test('do-not contractions', function(t) {
  let r = nlp(`please do not eat the marshmellow`);
  r.contractions().expand();
  t.equal(r.plaintext(), `please do not eat the marshmellow`, 'expanded-expand');

  r = nlp(`please don't eat the marshmellow`);
  r.contractions().expand();
  t.equal(r.plaintext(), `please do not eat the marshmellow`, 'contracted-expand');

  r = nlp(`please do not eat the marshmellow`);
  r.contractions().contract();
  t.equal(r.plaintext(), `please don't eat the marshmellow`, 'expanded-contract');

  r = nlp(`please don't eat the marshmellow`);
  r.contractions().contract();
  t.equal(r.plaintext(), `please don't eat the marshmellow`, 'contracted-contract');

  t.end();
});

test('have contractions', function(t) {
  let r = nlp(`i have stood`);
  r.contractions().expand();
  t.equal(r.plaintext(), `i have stood`, 'expanded-expand');

  r = nlp(`i've stood`);
  r.contractions().expand();
  t.equal(r.plaintext(), `i have stood`, 'contracted-expand');

  r = nlp(`i have stood`);
  r.contractions().contract();
  t.equal(r.plaintext(), `i've stood`, 'expanded-contract');

  r = nlp(`i've stood`);
  r.contractions().contract();
  t.equal(r.plaintext(), `i've stood`, 'contracted-contract');
  t.end();
});

test('repeated contract-expand', function(t) {
  let r = nlp(`i'm good`);
  r.contractions().expand();
  t.equal(r.plaintext(), `i am good`, 'expand-1');
  r.contractions().contract();
  t.equal(r.plaintext(), `i'm good`, 'contract-1');
  r.contractions().expand();
  t.equal(r.plaintext(), `i am good`, 'expand-2');
  r.contractions().contract();
  t.equal(r.plaintext(), `i'm good`, 'contract-2');

  r.contractions().contract().contract().contract();
  t.equal(r.plaintext(), `i'm good`, 'contract-n');

  r.contractions().expand().expand().expand();
  t.equal(r.plaintext(), `i am good`, 'expand-n');
  t.end();
});
