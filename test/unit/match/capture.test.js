var test = require('tape');
var nlp = require('../lib/nlp');

test('match-capture-group', function(t) {
  var m = nlp('John eats glue').match('[john]');
  t.equal(m.out('text'), 'John', 'capture-group-simple');

  m = nlp('John Smith eats glue').match('[#Person+]');
  t.equal(m.out('text'), 'John Smith', 'capture-two');

  m = nlp('ralf eats the glue').match('ralf [#Verb] the');
  t.equal(m.out('normal'), 'eats', 'simple subset');

  m = nlp('ralf eats the glue').match('[ralf #Verb] the');
  t.equal(m.out('normal'), 'ralf eats', 'two-word capture');

  m = nlp('i saw ralf eat the glue Mrs. Hoover').match('ralf [#Verb the glue] mrs');
  t.equal(m.out('normal'), 'eat the glue', 'three-word capture');

  m = nlp('ralf eats the glue').match('* [#Verb]');
  t.equal(m.out('normal'), 'eats', 'capture after wildcard');

  m = nlp('ralf eats the glue').match('ralf eats [*]');
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end');

  m = nlp('ralf eats the glue').match('ralf eats [*] glue');
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle');

  m = nlp('saw the Toronto International Documentary Film Festival yesterday').match('saw the? [#Noun+] yesterday');
  t.equal(m.trim().out('text'), 'Toronto International Documentary Film Festival', 'greedy capture');

  t.end();
});

test('replace-capture-group', function(t) {
  var m = nlp('John eats glue').replace('john [#Verb]', 'sniffs');
  t.equal(m.out('text'), 'John sniffs glue', 'capture-group-simple');
  //
  //   m = nlp('John eats glue. john is fun.').replace('[john]', '$1 smith');
  //   t.equal(m.out('text'), 'John smith eats glue. john smith is fun.', 'capture-group-multiple');
  //
  //   m = nlp('John Smith eats glue').replace('[#Person+]', 'dr. $1');
  //   t.equal(m.out('text'), 'dr. John Smith eats glue', 'capture-two');
  //
  //   m = nlp('ralf eats the glue').replace('ralf [#Verb]', 'he $1');
  //   t.equal(m.out('text'), 'he eats the glue', 'simple subset');
  //
  //   m = nlp('John eats the glue').replace('the [#Noun]', 'the cyber-$1');
  //   t.equal(m.out('text'), 'John eats the cyber-glue', 'capture-group as subset');
  //
  t.end();
});
