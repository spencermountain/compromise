const test = require('tape')
const nlp = require('../_lib')

// test('match-from-object :', function(t) {
//   const m = nlp('spencer is really cool').match({
//     spencer: true,
//   })
//   t.equal(m.out('normal'), 'spencer', 'just-spencer')
//   t.equal(m.length, 1, 'one-result')
//   t.end()
// })

/*
test('replace-capture-group', function(t) {
  const m = nlp('John eats glue').replace('john [#Verb]', 'sniffs')
  t.equal(m.out('text'), 'John sniffs glue', 'capture-2-simple')
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
  t.end()
})
*/

//test object-form
// test('not-from-object :', function(t) {
//   const m = nlp('spencer is not really cool.')
//   const r = m.not({
//     not: true,
//     really: true,
//   })
//   t.equal(m.out('normal'), 'spencer is not really cool.', 'double-obj-remains')
//   t.equal(r.out('normal'), 'spencer is cool.', 'spencer-double-obj')

//   m = nlp('everyone is cool. I said hi to everyone.').not({
//     everyone: true,
//     totally: true,
//   })
//   t.equal(m.out('normal'), 'is cool. i said hi to', 'not-everyone')

//   m = nlp('spencer is really, secretly, very cool.')
//   const adv = m.match('#Adverb').not({
//     really: true,
//   })
//   t.equal(adv.out('normal'), 'secretly very', 'not-subset')
//   t.equal(adv.length, 2, 'one-result-obj')

//   const adv2 = m.match('#Adverb').not('secretly')
//   t.equal(adv2.out('normal'), 'really very', 'not-subset2')
//   t.equal(adv2.length, 2, 'two-results-obj')

//   t.end()
// })

// test('normalize quotes ', function(t) {
//   const str = `،one’ «two» ‘three’ “four” 'five' "six."`
//   const doc = nlp(str)
//   t.equal(doc.text(), str, 'text out-3')
//   t.equal(doc.text(), 'one two three four five six.', 'normal out-3')
//   t.end()
// })

// let r = nlp('Homer, have you been eating that sandwich again?')
// .terms()
// .slice(0, 3)
// t.equal(r.out('text'), 'Homer, have you', 'result.slice')

// str = 'men go'
// m = nlp(str)
// .sentences()
// .toPastTense()
// .nouns()
// .toSingular()
// t.equal(m.out('normal'), 'a man went', str)
