import test from 'tape'
import nlp from '../lib.js'
const here = '[two/tag/plural-fractions] '

const blank = () => nlp('xyz').unTag('*')

test('plural fraction words are both fractions and plural nouns', function (t) {
  const arr = [
    ['two fifths', 'fifths'],
    ['three thirds', 'thirds'],
    ['two halves', 'halves'],
    ['the two halves', 'halves'],
    ['three quarters of the pie', 'quarters'],
    ['two millionths', 'millionths'],
    ['twelve hundredths', 'hundredths'],
    ['two fifths of the people', 'fifths'],
    ['the thirds were uneven', 'thirds'],
    ['cut it into fifths', 'fifths'],
    ['fifths', 'fifths'],
    ['thirds', 'thirds'],
  ]
  arr.forEach(([str, word]) => {
    const m = nlp(str).match(word)
    t.equal(m.found, true, here + `found: '${str}'`)
    t.ok(m.has('#Fraction'), here + `fraction: '${str}'`)
    t.ok(m.has('#Plural'), here + `plural: '${str}'`)
    t.ok(m.has('#Noun') && m.has('#Value'), here + `parents: '${str}'`)
    t.ok(m.canBe('Plural').found && m.canBe('Fraction').found, here + `consistent tags: '${str}'`)
  })
  t.end()
})

test('singular fraction words are not plural', function (t) {
  const arr = [
    ['a third of the pie', 'third'],
    ['one fifth of the vote', 'fifth'],
    ['half a cup', 'half'],
    ['a quarter of the pie', 'quarter'],
    ['two and a half', 'half'],
    ['one millionth of a second', 'millionth'],
  ]
  arr.forEach(([str, word]) => {
    const m = nlp(str).match(word)
    t.equal(m.found, true, here + `found: '${str}'`)
    t.ok(m.has('#Fraction'), here + `fraction: '${str}'`)
    t.notOk(m.has('#Plural'), here + `not plural: '${str}'`)
  })
  t.end()
})

test('plain plural nouns are not fractions', function (t) {
  const arr = [
    ['I waited ten seconds', 'seconds'],
    ['the living quarters', 'quarters'],
    ['the halves', 'halves'],
    ['both halves', 'halves'],
    ['hundreds of people', 'hundreds'],
    ['in the twenties', 'twenties'],
  ]
  arr.forEach(([str, word]) => {
    const m = nlp(str).match(word)
    t.equal(m.found, true, here + `found: '${str}'`)
    t.ok(m.has('#Plural'), here + `plural: '${str}'`)
    t.notOk(m.has('#Fraction'), here + `not a fraction: '${str}'`)
    t.notOk(m.has('#Value'), here + `not a value: '${str}'`)
  })
  t.end()
})

test('Fraction and Plural coexist through the tag api', function (t) {
  for (const [first, second] of [['Fraction', 'Plural'], ['Plural', 'Fraction']]) {
    for (const method of ['tag', 'tagSafe']) {
      const doc = blank().tag(first)
      t.ok(doc.canBe(second).found, here + `${first} can be ${second}`)
      doc[method](second)
      t.ok(doc.has(`#${first}`) && doc.has(`#${second}`), here + `${first} -> ${method}(${second}) keeps both`)
      t.ok(doc.has('#Noun') && doc.has('#Value'), here + `${first} -> ${method}(${second}) keeps both parents`)
    }
  }
  // other noun and value subtypes still replace each other
  let doc = blank().tag('Fraction').tag('Singular')
  t.ok(doc.has('#Singular') && !doc.has('#Fraction') && !doc.has('#Value'), here + 'Singular still replaces Fraction')
  doc = blank().tag('Plural').tag('Cardinal')
  t.ok(doc.has('#Cardinal') && !doc.has('#Plural') && !doc.has('#Noun'), here + 'Cardinal still replaces Plural')
  doc = blank().tag('Plural').tag('Ordinal')
  t.ok(doc.has('#Ordinal') && !doc.has('#Plural'), here + 'Ordinal still replaces Plural')
  t.equal(blank().tag('Singular').canBe('Fraction').found, false, here + 'Singular cannot be Fraction')
  t.equal(blank().tag('Uncountable').canBe('Fraction').found, false, here + 'Uncountable cannot be Fraction')
  t.end()
})
