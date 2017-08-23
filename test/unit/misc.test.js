var test = require('tape')
var nlp = require('./lib/nlp')

//make sure it can handle garbage inputs
test('garbage:', function(t) {
  var garbage = ['', '  ', null, '\n\n', [], {}]
  garbage.forEach(function(g, i) {
    var num = nlp(g).list.length
    var msg = typeof g + ' text input #' + i
    t.equal(num, 0, msg)
  })
  var str = nlp(2).out()
  t.equal(str, '2', 'integer-casted')
  str = nlp(2.2).out()
  t.equal(str, '2.2', 'float-casted')

  //garbage in lexicon too
  str = nlp('hello', null).out()
  t.equal(str, 'hello', 'null-lexicon')

  str = nlp('hello', 2).out()
  t.equal(str, 'hello', 'int-lexicon')
  t.end()
})

test('extra exports:', function(t) {
  t.ok(nlp.version, 'version number exported')

  t.doesNotThrow(function() {
    nlp.verbose(true)
    nlp.verbose(false)
  }, 'can set verbosity')

  t.end()
})

test('misc:', function(t) {
  var str = '2 million five hundred thousand and fifty nine is bigger than 2882'
  var m = nlp(str)
  m.values().toNumber()
  t.equal(m.out('normal'), '2500059 is bigger than 2882', str)

  str = '2 million five hundred thousand and fifty nine is bigger than 2882'
  m = nlp(str)
  m.values().toNice()
  t.equal(m.out('text'), '2,500,059 is bigger than 2,882', str)

  str = 'doug is 5 years old'
  m = nlp(str)
  m.values().toText()
  t.equal(m.out('normal'), 'doug is five years old', str)

  var r = nlp('Homer, have you been eating that sandwich again?').terms().slice(0, 3)
  t.equal(r.out('text'), 'Homer, have you', 'result.slice')

  // str = 'men go';
  // m = nlp(str).sentences().toPastTense().nouns().toSingular();
  // t.equal(m.out('normal'), 'a man went', str);

  t.end()
})
