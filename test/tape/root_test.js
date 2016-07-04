var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('root():', function(t) {
  //on term
  t.equal(nlp.term('Joe').root(), 'joe');
  t.equal(nlp.term('just-right').root(), 'just right');
  //on noun
  t.equal(nlp.noun('camel').root(), 'camel');
  t.equal(nlp.noun('camels').root(), 'camel');
  t.equal(nlp.noun('4').root(), '4');
  t.equal(nlp.noun('shadows').root(), 'shadow');
  //on verb
  t.equal(nlp.verb('shadow').root(), 'shadow');
  t.equal(nlp.verb('shadowed').root(), 'shadow');
  t.equal(nlp.verb('shadowing').root(), 'shadow');
  t.equal(nlp.verb('shadows').root(), 'shadow');
  //on person
  t.equal(nlp.person('john smith').root(), 'john smith');
  t.equal(nlp.person('john g. smith').root(), 'john g smith');
  t.equal(nlp.person('mr. john g. smith-o\'reilly').root(), 'john g smith-o\'reilly');
  t.equal(nlp.person('john g. m. smith').root(), 'john g m smith');
  t.equal(nlp.person('Dr. John Smith-McDonald').root(), 'john smith-mcdonald');
  //on place
  t.equal(nlp.place('Toronto').root(), 'toronto');
  t.equal(nlp.place('Toronto, Canada').root(), 'toronto');
  t.equal(nlp.place('Toronto Canada').root(), 'toronto');
  // nlp.place('Toronto, Ontario, Canada').root(), 'toronto');
  //on term
  t.equal(nlp.text('Joe is 5.5 ft tall.').root(), 'joe is 5.5 ft tall');
  t.equal(nlp.text('Joe is five ft tall.').root(), 'joe is 5 ft tall');
  t.equal(nlp.text('Dr. Joe is cool.').root(), 'joe is cool');
  t.equal(nlp.text('it is just-right').root(), 'it is just right');
  t.end();
});
