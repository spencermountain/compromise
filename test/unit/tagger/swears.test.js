var test = require('tape');
var nlp = require('../lib/nlp');
//nsfw!

test('swears:', function(t) {
  var m = nlp('shit, i am tired').match('^#Expression');
  t.ok(m.found, 'swear-1');

  m = nlp('the shit keeps piling up').match('the #Noun');
  t.ok(m.found, 'swear-2');

  m = nlp('damn them all').match('^#Verb');
  t.ok(m.found, 'swear-3');

  m = nlp('fuck the government').match('^#Verb');
  t.ok(m.found, 'swear-4');

  // m = nlp('when hell freezes over').match('^when #Noun');
  // t.ok(m.found, 'swear-5');

  // m = nlp('he fucked up').match('he #Verb #Particle');
  // t.ok(m.found, 'swear-6');

  m = nlp('it is fucked up').match('is #Adjective #Adjective');
  t.ok(m.found, 'swear-7');

  t.end();
});
