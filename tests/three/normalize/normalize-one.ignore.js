const test = require('tape')
const nlp = require('../_lib')

const only = function (options) {
  const none = {
    case: false,
    whitespace: false,
    unicode: false,
    punctuation: false,
    contraction: false,
  }
  return Object.assign({}, none, options)
}

test('normalize defaults', function (t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  doc.normalize()
  t.equal(doc.text(), `it's cool (i think). He is cool i said.`, 'normalize-defaults')
  t.end()
})

test('normalize unicode', function (t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ unicode: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it's   cool, (i think) .    He is   cool;  i said .`, 'normalize-unicode')
  t.end()
})

test('normalize punctuation', function (t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ punctuation: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it's   coöl (i think) .    He is   cool  i said .`, 'normalize-punct')
  t.end()
})

test('normalize whitespace', function (t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ whitespace: true })
  doc.normalize(options)
  t.equal(doc.text(), `it's coöl, (i think). He is cool; i said.`, 'normalize-whitespace')
  t.end()
})

test('normalize parentheses', function (t) {
  let doc = nlp(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ parentheses: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it's   coöl, i think .    He is   cool;  i said .`, 'normalize-parentheses')
  t.end()
})

test('normalize contractions', function (t) {
  let doc = nlp(` it's   coöl, (i think) .    He is   cool;  i said .`)
  let options = only({ contractions: true })
  doc.normalize(options)
  t.equal(doc.text(), ` it is   coöl, (i think) .    He is   cool;  i said .`, 'normalize-contractions')
  t.end()
})
