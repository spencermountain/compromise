var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('root():', function(t) {
  //on term
  str_test(nlp.term('Joe').root(), '', 'joe', t);
  str_test(nlp.term('just-right').root(), '', 'just right', t);
  //on noun
  str_test(nlp.noun('camel').root(), '', 'camel', t);
  str_test(nlp.noun('camels').root(), '', 'camel', t);
  str_test(nlp.noun('4').root(), '', '4', t);
  str_test(nlp.noun('shadows').root(), '', 'shadow', t);
  //on verb
  str_test(nlp.verb('shadow').root(), '', 'shadow', t);
  str_test(nlp.verb('shadowed').root(), '', 'shadow', t);
  str_test(nlp.verb('shadowing').root(), '', 'shadow', t);
  str_test(nlp.verb('shadows').root(), '', 'shadow', t);
  //on person
  str_test(nlp.person('john smith').root(), '', 'john smith', t);
  str_test(nlp.person('john g. smith').root(), '', 'john g smith', t);
  str_test(nlp.person('mr. john g. smith-o\'reilly').root(), '', 'john g smith-o\'reilly', t);
  str_test(nlp.person('john g. m. smith').root(), '', 'john g m smith', t);
  str_test(nlp.person('Dr. John Smith-McDonald').root(), '', 'john smith-mcdonald', t);
  //on place
  str_test(nlp.place('Toronto').root(), '', 'toronto', t);
  str_test(nlp.place('Toronto, Canada').root(), '', 'toronto', t);
  str_test(nlp.place('Toronto Canada').root(), '', 'toronto', t);
  // nlp.place('Toronto, Ontario, Canada').root(), '', 'toronto',t);
  //on term
  str_test(nlp.text('Joe is 5.5 ft tall.').root(), '', 'joe is 5.5 ft tall', t);
  str_test(nlp.text('Joe is five ft tall.').root(), '', 'joe is 5 ft tall', t);
  str_test(nlp.text('Dr. Joe is cool.').root(), '', 'joe is cool', t);
  str_test(nlp.text('it is just-right').root(), '', 'it is just right', t);
  t.end();
});
