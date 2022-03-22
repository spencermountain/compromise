import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/swears] '

//nsfw!
test('swears:', function (t) {
  let m = nlp('shit, i am tired').match('^#Expression')
  t.ok(m.found, here + 'swear-1')

  m = nlp('the shit keeps piling up').match('the #Noun')
  t.ok(m.found, here + 'swear-2')

  m = nlp('damn them all').match('^#Verb')
  t.ok(m.found, here + 'swear-3')

  m = nlp('fuck the government').match('^#Verb')
  t.ok(m.found, here + 'swear-4')

  // m = nlp('when hell freezes over').match('^when #Noun');
  // t.ok(m.found,  here +'swear-5');

  // m = nlp('he fucked up').match('he #Verb #Particle');
  // t.ok(m.found,  here +'swear-6');

  // m = nlp('it is fucked up').match('is #Adjective #Adjective')
  // t.ok(m.found, here + 'swear-7')

  t.end()
})
