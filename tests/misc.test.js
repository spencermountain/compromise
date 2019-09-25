var test = require('tape')
var nlp = require('./_lib')

const only = function(options) {
  const none = {
    case: false,
    whitespace: false,
    unicode: false,
    punctuation: false,
    contraction: false,
  }
  return Object.assign({}, none, options)
}
// test('normalize defaults', function(t) {
//   let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
//   doc.normalize()
//   t.equal(doc.text(), `it's cool i think. He is cool i said.`, 'normalize-defaults')
//   t.end()
// })

test('tag-multiples:', function(t) {
  var r = nlp('twas brillig in the doofgafoof.')
  r.match('brillig').tag(['Foo', 'Barr'])
  t.ok(r.match('#Foo').found, 'tagged-foo')
  t.ok(r.match('#Barr').found, 'tagged-barr')
  t.end()
})

test('normalize unicode', function(t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ unicode: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it's   cool, (i think) .    He is   cool;  i said .`, 'normalize-unicode')
  t.end()
})

test('normalize punctuation', function(t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ punctuation: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it's   coöl (i think) .    He is   cool  i said .`, 'normalize-punct')
  t.end()
})

test('normalize whitespace', function(t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ whitespace: true })
  doc.normalize(options)
  t.equal(doc.text(), `it's coöl, (i think). He is cool; i said.`, 'normalize-whitespace')
  t.end()
})

test('normalize parentheses', function(t) {
  let doc = nlp(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ parentheses: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it's   coöl, i think .    He is   cool;  i said .`, 'normalize-parentheses')
  t.end()
})

test('normalize contractions', function(t) {
  let doc = nlp(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ contractions: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it is   coöl, (i think) .    He is   cool;  i said .`, 'normalize-contractions')
  t.end()
})

// -----

test('root-text vs match-text', function(t) {
  let str = `  paper, scissors, rock. I run with scissors.`
  let doc = nlp(str)
    .match('*')
    .all()
  t.equal(doc.text(), str, 'perfect-root-text')

  let m = doc.match('scissors')
  t.equal(m.text(), 'scissors, scissors', 'match-text')
  t.end()
})

// -------------

test('match contractions/possessives', function(t) {
  let doc = nlp(`i think it's spencer's`)
  t.equal(doc.has('it'), true, 'has it')
  t.equal(doc.has('spencer'), true, 'has spencer')
  t.equal(doc.has(`spencer's`), true, "has spencer's")
  t.equal(doc.has(`i'm`), false, 'not false-positive')
  t.equal(doc.has(`it'll`), false, 'not false-positive-2')
  t.end()
})

test('contraction whitespace', function(t) {
  let doc = nlp(`i didn't know.`)
  t.equal(doc.text(), `i didn't know.`, 'init-whitespace')

  doc.contractions().expand()
  t.equal(doc.text(), `i did not know.`, 'expanded-whitespace')

  doc = nlp(`i didn't.`)
  t.equal(doc.text(), `i didn't.`, 'init-period')

  doc.contractions().expand()
  t.equal(doc.text(), `i did not.`, 'expanded-period')

  t.end()
})

test('match @functions', function(t) {
  let doc = nlp(`jamie's much, much better.`)

  let m = doc.match('@hasComma')
  t.equal(m.text(), 'much', 'hasComma')

  m = doc.match('(@hasPeriod|cool)')
  t.equal(m.text(), 'better', 'hasPeriod')

  m = doc.match('(@hasSemicolon|better)')
  t.equal(m.text(), 'better', 'false-positive')

  doc = nlp(`i am much, much better and faster`)
  m = doc.match('!@hasComma')
  t.equal(m.text(), 'i am much better and faster', 'negative function')

  doc = nlp(`i am much, much better and faster`)
  m = doc.match('(foo|!@hasComma)')
  t.equal(m.text(), 'i am much better and faster', 'negative in optional function')

  t.end()
})

test('slash whitespace', function(t) {
  let str = 'left his / her backpack '
  let doc = nlp(str)
  t.equal(doc.out(), str, 'slash with normal spaces')

  str = 'left   his/her  backpack '
  doc = nlp(str)
  t.equal(doc.out(), str, 'slash with no spaces')

  str = 'left  his  /  her  backpack'
  doc = nlp(str)
  t.equal(doc.out(), str, 'slash with lots of spaces')
  t.end()
})

test('slash match', function(t) {
  let str = 'left his / her backpack '
  let doc = nlp(str)
  t.equal(doc.has('his'), true, 'slash with normal spaces - his')
  t.equal(doc.has('her'), true, 'slash with normal spaces - her')
  // t.equal(doc.has('his / her'), true, 'slash with normal spaces - his / her')

  str = 'left   his/her  backpack '
  doc = nlp(str)
  t.equal(doc.has('his'), true, 'slash with no spaces - his')
  t.equal(doc.has('her'), true, 'slash with no spaces - her')
  t.equal(doc.has('his/her'), true, 'slash with no spaces - his/her')

  str = 'left  his  /  her  backpack'
  doc = nlp(str)
  t.equal(doc.has('his'), true, 'slash with lots of spaces')
  t.equal(doc.has('her'), true, 'slash with lots of spaces')

  str = 'left   his/her/their  backpack '
  doc = nlp(str)
  t.equal(doc.has('his'), true, 'three-slash - his')
  t.equal(doc.has('her'), true, 'three-slash - her')
  t.equal(doc.has('their'), true, 'three-slash - their')
  t.equal(doc.has('his/her/their'), true, 'three-slash - his/her/their ')

  t.end()
})

test('barely a term', function(t) {
  let str = '.('
  let doc = nlp(str)
  t.equal(doc.out(), str, 'barely-term-no-space')
  str = '.( '
  doc = nlp(str)
  t.equal(doc.out(), str, 'barely-term-with-space')
  t.end()
})

test('hyphenated', function(t) {
  let doc = nlp(`super-cool and hunky-dory. Connected with-a-dash.`)
  let arr = doc.match('@hasHyphen+ .').out('array')
  t.equal(arr.length, 3, 'three found')
  t.equal(arr[0], 'super-cool', 'first found')
  t.equal(arr[1], 'hunky-dory.', 'second found')
  t.equal(arr[2], 'with-a-dash', 'third found')
  t.end()
})

test('match min-max', function(t) {
  let doc = nlp('hello1 one hello2').match('#Value{7,9}')
  t.equal(doc.out(), '', 'match was too short')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3}')
  t.equal(doc.out(), 'one two three', 'exactly three')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3,3}')
  t.equal(doc.out(), 'one two three', 'still exactly three')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3,}')
  t.equal(doc.out(), 'one two three four five', 'minimum three')

  doc = nlp('hello1 one two three four five hello2').match('hello1 .{3}')
  t.equal(doc.out(), 'hello1 one two three', 'unspecific greedy exact length')

  doc = nlp('hello1 one two').match('hello1 .{3}')
  t.equal(doc.out(), '', 'unspecific greedy not long enough')

  t.end()
})
