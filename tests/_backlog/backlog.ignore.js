var test = require('tape')
var nlp = require('../_lib')

// match contraction:
// [`if you didn't care`, `didn't`, `didn't`], //TODO:support me

// test('lump-match:', function(t) {
//   var m = nlp('hello one two three hello')
//   m.match('one two three').lump()

//   t.equal(m.has('hello'), true, 'has-unlumped')
//   t.equal(m.has('one two three'), true, 'has-lumped')
//   t.equal(m.has('hello one two three'), true, 'word+lumped')
//   t.equal(m.has('one two three hello'), true, 'lumped+word')

//   t.equal(m.has('one'), false, 'no-partial1')
//   t.equal(m.has('two'), false, 'no-partial2')
//   t.equal(m.has('three'), false, 'no-partial3')
//   t.equal(m.has('one two'), false, 'no-partial4')
//   t.equal(m.has('two three'), false, 'no-partial5')
//   t.equal(m.has('hello one two'), false, 'no-partial6')
//   t.equal(m.has('three hello'), false, 'no-partial7')
//   t.equal(m.has('two three hello'), false, 'no-partial8')
//   t.end()
// })

// test('match-from-object :', function(t) {
//   var m = nlp('spencer is really cool').match({
//     spencer: true,
//   })
//   t.equal(m.out('normal'), 'spencer', 'just-spencer')
//   t.equal(m.length, 1, 'one-result')
//   t.end()
// })

/*
test('replace-capture-group', function(t) {
  var m = nlp('John eats glue').replace('john [#Verb]', 'sniffs')
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
