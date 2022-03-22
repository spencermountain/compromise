import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/normalize-one] '

test('normalize defaults', function (t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  doc.normalize()
  t.equal(doc.text(), `it's cool (i think). He is cool i said.`, here + 'normalize-defaults')
  t.end()
})

test('normalize unicode', function (t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  doc.normalize({ unicode: true })
  t.equal(doc.text(), ` it's   cool, (i think) .    He is   cool;  i said .`, here + 'normalize-unicode')
  t.end()
})

test('normalize punctuation', function (t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  doc.normalize({ punctuation: true })
  t.equal(doc.text(), ` it's   coöl (i think) .    He is   cool  i said.`, here + 'normalize-punct')
  t.end()
})

test('normalize whitespace', function (t) {
  let doc = nlp.tokenize(` it's   coöl, (i think) .    He is   cool;  i said .`)
  doc.normalize({ whitespace: true })
  t.equal(doc.text(), `it's coöl, (i think). He is cool; i said.`, here + 'normalize-whitespace')
  t.end()
})

test('normalize parentheses', function (t) {
  let doc = nlp(` it's   coöl, (i think) .    He is   cool;  i said .`)
  doc.normalize({ parentheses: true })
  t.equal(doc.text(), ` it's   coöl, i think .    He is   cool;  i said .`, here + 'normalize-parentheses')
  t.end()
})

test('normalize contractions', function (t) {
  let doc = nlp(` it's   coöl, (i think) .    He is   cool;  i said .`)
  doc.normalize({ contractions: true })
  t.equal(doc.text(), ` it is   coöl, (i think) .    He is   cool;  i said .`, here + 'normalize-contractions')
  t.end()
})
