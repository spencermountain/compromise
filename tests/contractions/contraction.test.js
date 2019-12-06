const test = require('tape')
const nlp = require('../_lib')

test('contractions v possessive', function(t) {
  let str = nlp("spencer's not cool")
    .normalize({ contractions: true })
    .text()
  t.equal(str, 'spencer is not cool', 'adj contraction')

  str = nlp("spencer's walk")
    .normalize({ contractions: true })
    .text()
  t.equal(str, "spencer's walk", 'noun not contraction')

  str = nlp("spencer's runs")
    .normalize({ contractions: true })
    .text()
  t.equal(str, "spencer's runs", 'present-tense not contraction')
  t.end()
})

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
