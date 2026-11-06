import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/spoken-year] '

const isYear = (t, str, num) => {
  const doc = nlp(str)
  t.deepEqual(doc.numbers().get(), [num], here + `value: '${str}'`)
  t.equal(doc.numbers().length, 1, here + `one number: '${str}'`)
  t.ok(doc.has('#Year+'), here + `#Year: '${str}'`)
  const terms = doc.numbers().json()[0].terms
  const tagged = terms.every(term => ['Year', 'Date', 'Cardinal', 'TextValue'].every(tag => term.tags.includes(tag)))
  t.ok(tagged, here + `every term tagged: '${str}'`)
}

const notYear = (t, str) => {
  const doc = nlp(str)
  t.notOk(doc.has('#Year'), here + `no #Year: '${str}'`)
  doc.numbers().get().forEach(num => {
    t.notOk(num >= 2000 && num <= 2100, here + `no year-like value: '${str}' (${num})`)
  })
}

test('every year in range', function (t) {
  const ones = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
  teens.forEach((w, i) => isYear(t, `twenty ${w}`, 2010 + i))
  const decades = [['twenty', 2020], ['thirty', 2030]]
  decades.forEach(([w, num]) => {
    isYear(t, `twenty ${w}`, num)
    ones.forEach((one, i) => {
      isYear(t, `twenty ${w} ${one}`, num + i + 1)
      isYear(t, `twenty ${w}-${one}`, num + i + 1)
      isYear(t, `twenty-${w}-${one}`, num + i + 1)
    })
  })
  isYear(t, 'twenty forty', 2040)
  isYear(t, 'twenty fourty', 2040)
  isYear(t, 'twenty-twenty', 2020)
  t.end()
})

test('years in a sentence', function (t) {
  const arr = [
    ['we met in twenty twenty-six.', 2026],
    ['we met in twenty twenty six', 2026],
    ['by twenty thirty the plan is done', 2030],
    ['since twenty ten', 2010],
    ['the twenty twenty election', 2020],
    ['twenty twenty-six was a good year', 2026],
    ['Twenty twenty-six was a good year', 2026],
    ['Twenty Twenty-Six was a good year', 2026],
    ['in Twenty Twenty Six', 2026],
    ['the Twenty Ten budget', 2010],
    ['IN TWENTY TWENTY-SIX', 2026],
    ['the twenty thirty vision', 2030],
  ]
  arr.forEach(a => isYear(t, a[0], a[1]))
  // the rest of the sentence keeps its tags
  t.ok(nlp('the twenty twenty election').has('the #Year+ #Noun'), here + 'following noun')
  t.ok(nlp('twenty twenty-six was a good year').has('^#Year+ #Copula'), here + 'following verb')
  t.end()
})

test('number methods', function (t) {
  const num = nlp('we met in twenty twenty-six').numbers()
  t.equal(num.json()[0].number.num, 2026, here + 'json')
  t.equal(num.parse()[0].num, 2026, here + 'parse')
  t.equal(num.isEqual(2026).length, 1, here + 'isEqual')
  t.equal(num.greaterThan(2025).length, 1, here + 'greaterThan')
  t.equal(num.isCardinal().length, 1, here + 'isCardinal')
  t.equal(num.isOrdinal().length, 0, here + 'isOrdinal')

  const doc = nlp('we met in twenty twenty-six')
  doc.numbers().toNumber()
  t.equal(doc.text(), 'we met in 2026', here + 'toNumber')
  t.ok(doc.has('in #Year'), here + 'toNumber keeps year')
  t.deepEqual(doc.numbers().get(), [2026], here + 'toNumber value')

  const set = nlp('i saw 7 birds').numbers().set('twenty twenty-six')
  t.deepEqual(set.get(), [2026], here + 'set from a spoken year')
  const add = nlp('i saw 7 birds').numbers().add('twenty ten')
  t.deepEqual(add.get(), [2017], here + 'add from a spoken year')
  t.end()
})

test('many numbers keep their order', function (t) {
  const arr = [
    ['twenty ten, twenty twenty', [2010, 2020]],
    ['twenty ten - twenty twenty', [2010, 2020]],
    ['from twenty ten to twenty twenty', [2010, 2020]],
    ['twenty twenty and twenty thirty', [2020, 2030]],
    ['five people in twenty twenty six and 6 cars', [5, 2026, 6]],
    ['twenty twenty-six. five. twenty ten', [2026, 5, 2010]],
    ['june fifth twenty twenty-six', [5, 2026]],
    ['in twenty twenty, six people', [2020, 6]],
    ['in twenty twenty 5 people died', [2020, 5]],
  ]
  arr.forEach(a => {
    t.deepEqual(nlp(a[0]).numbers().get(), a[1], here + a[0])
  })
  t.end()
})

test('out of range', function (t) {
  const arr = [
    'twenty nine',
    'twenty one',
    'twenty',
    'twenty fifty',
    'twenty sixty',
    'twenty ninety',
    'twenty fifty five',
    'twenty eighty two',
    'twenty forty one',
    'twenty forty nine',
    'fourty eighty two',
    'forty eighty two',
    'thirty twenty',
    'thirty twenty six',
    'nineteen eighty two',
    'twenty ten one',
    'twenty thirteen six',
    'twenty first',
    'twenty twenty-first',
    'twenty twenty-sixth',
  ]
  arr.forEach(str => notYear(t, str))
  t.deepEqual(nlp('twenty nine').numbers().get(), [29], here + 'twenty nine is a number')
  t.deepEqual(nlp('twenty one').numbers().get(), [21], here + 'twenty one is a number')
  t.end()
})

test('counts, lists and clock-times', function (t) {
  const arr = [
    'I ate twenty ten dollar bills',
    'twenty twenty dollar bills',
    'twenty twenty-six dollars',
    'twenty ten minute walks',
    'twenty thirty minutes',
    'twenty ten km',
    'twenty ten miles',
    'twenty thirty feet',
    'twenty twenty-six kg',
    'twenty ten percent',
    'twenty ten-year-olds',
    'twenty twenty-foot containers',
    'twenty thirty-page reports',
    'twenty thirty hours',
    'the train leaves at twenty thirty',
    'tied at twenty twenty',
    'twenty twenty vision',
    'twenty twenty hindsight',
    'twenty, twenty one, twenty two',
    'twenty, thirty',
    'five twenty twenty',
    'ten twenty thirty',
    'twenty thirty forty',
    'twenty twenty twenty',
    'one hundred twenty twenty',
    'twenty-five twenty ten',
  ]
  arr.forEach(str => notYear(t, str))
  // and nothing is left behind, once a unit is found
  t.notOk(nlp('twenty ten km').has('#Date'), here + 'no #Date left on a count')
  t.end()
})

// no reliable clue in the sentence - so the assumed reading is the year, while staying a number
test('ambiguous scores are years', function (t) {
  isYear(t, 'the score was twenty twenty', 2020)
  isYear(t, 'it was twenty ten at halftime', 2010)
  t.end()
})

test('other year forms are unchanged', function (t) {
  const arr = [
    ['two thousand and twenty-five', 2025],
    ['two thousand and twenty five', 2025],
    ['two thousand and eight', 2008],
    ['two thousand and twenty', 2020],
    ['two thousand twenty', 2020],
    ['two thousand and ten', 2010],
    ['two thousand', 2000],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    t.deepEqual(doc.numbers().get(), [a[1]], here + a[0])
    t.notOk(doc.has('#Year'), here + `no #Year: '${a[0]}'`)
  })
  // numeric years keep working
  t.deepEqual(nlp('in 2026').numbers().get(), [2026], here + 'in 2026')
  t.ok(nlp('in 2026').has('#Year'), here + 'in 2026 #Year')
  t.deepEqual(nlp('june 5th 1999').numbers().get(), [5, 1999], here + 'june 5th 1999')
  t.end()
})
