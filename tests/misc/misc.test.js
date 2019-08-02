var test = require('tape')
var nlp = require('../_lib')

const only = function(options) {
  const none = {
    case: false,
    whitespace: false,
    unicode: false,
    punctuation: false,
  }
  return Object.assign({}, none, options)
}
// test('normalize defaults', function(t) {
//   let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
//   doc.normalize()
//   t.equal(doc.text(), `it's cool i think. He is cool i said.`, 'normalize-defaults')
//   t.end()
// })

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
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ parentheses: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it's   coöl, i think .    He is   cool;  i said .`, 'normalize-parentheses')
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
  t.equal(t.text(), `i didn't know.`, 'init-whitespace')

  doc.contractions().expand()
  t.equal(t.text(), `i did not know.`, 'expanded-whitespace')

  doc = nlp(`i didn't.`)
  t.equal(t.text(), `i didn't.`, 'init-period')

  doc.contractions().expand()
  t.equal(t.text(), `i did not.`, 'expanded-period')

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
