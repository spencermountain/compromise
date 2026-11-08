import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/possessive-year] '

const isYear = (t, str, num) => {
  const doc = nlp(str)
  t.ok(doc.has('#Year'), here + `#Year: '${str}'`)
  t.ok(doc.has('(#Year && #Possessive)'), here + `#Possessive: '${str}'`)
  t.ok(doc.has('(#Year && #Cardinal)'), here + `#Cardinal: '${str}'`)
  t.deepEqual(doc.numbers().get(), [num], here + `value: '${str}'`)
  t.equal(doc.text(), str, here + `text kept: '${str}'`)
}

test('numeric possessive years', function (t) {
  const arr = [
    [`2020's election`, 2020],
    [`2020’s election`, 2020],
    [`in 2020's election`, 2020],
    [`of 2020's election`, 2020],
    [`1992's election`, 1992],
    [`2026's budget`, 2026],
    [`2021's best song`, 2021],
    [`2010's results`, 2010],
    [`june 2020's election`, 2020],
  ]
  arr.forEach(a => isYear(t, a[0], a[1]))
  t.ok(nlp(`2020's election`).has('(2020 && #NumericValue)'), here + 'numeric tag')
  t.ok(nlp(`2020's election`).has('#Year #Noun'), here + 'next noun')
  t.end()
})

test('spoken possessive years', function (t) {
  const arr = [
    [`twenty twenty's election`, 2020],
    [`twenty twenty-six's budget`, 2026],
    [`twenty twenty six's budget`, 2026],
    [`twenty twenty-six’s budget`, 2026],
    [`twenty ten's results`, 2010],
    [`twenty thirteen's results`, 2013],
    [`twenty thirty's goals`, 2030],
    [`twenty forty's budget`, 2040],
    [`in twenty twenty's election`, 2020],
    [`Twenty Twenty's election`, 2020],
    [`Twenty Twenty-Six's budget`, 2026],
    [`in Twenty Twenty-Six's budget`, 2026],
    [`june twenty twenty's election`, 2020],
  ]
  arr.forEach(a => isYear(t, a[0], a[1]))
  t.ok(nlp(`twenty twenty's election`).has('(twenty && #TextValue)'), here + 'text tag')
  t.end()
})

// the 's can also be 'is', instead of a possessive
test('years with a contraction', function (t) {
  const arr = [
    [`2020's over`, 2020],
    [`twenty twenty's over`, 2020],
    [`twenty twenty-six's over`, 2026],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    t.ok(doc.has('#Year'), here + `#Year: '${a[0]}'`)
    t.notOk(doc.has('#Possessive'), here + `no #Possessive: '${a[0]}'`)
    t.deepEqual(doc.numbers().get(), [a[1]], here + `value: '${a[0]}'`)
    t.equal(doc.text(), a[0], here + `text kept: '${a[0]}'`)
  })
  t.end()
})

test('these are decades, and not years', function (t) {
  const arr = [
    `the 1990's were great`,
    `in the 1990's`,
    `the 1980's`,
    `the early 1990's`,
    `the mid 1980's`,
    `the late 1970's`,
    `the mid-1980's`,
    `1980's music`,
    `1960's style`,
    `the 2020's`,
    `the 2020's election`,
    `the early 2020's`,
    `the late 2010's`,
    `mid 2000's`,
    `the 1500's`,
    `the 1990s`,
    `the 90's`,
  ]
  arr.forEach(str => {
    t.notOk(nlp(str).has('#Year'), here + `no #Year: '${str}'`)
  })
  t.end()
})

test('other possessive numbers are not years', function (t) {
  const arr = [
    `twenty fifty's election`,
    `twenty eighty two's election`,
    `twenty nine's election`,
    `thirty twenty's election`,
    `twenty's plenty`,
    `five's company`,
    `1200's fashion`,
    `2200's fashion`,
    `12345's fashion`,
    `50's fashion`,
    `5's fashion`,
    `john's car`,
    `the dog's bone`,
  ]
  arr.forEach(str => {
    t.notOk(nlp(str).has('#Year'), here + `no #Year: '${str}'`)
  })
  t.deepEqual(nlp(`twenty's plenty`).numbers().get(), [20], here + `twenty's plenty`)
  t.end()
})

test('converting keeps the possessive', function (t) {
  const arr = [
    [`twenty twenty-six's budget`, doc => doc.numbers().toNumber(), `2026's budget`],
    [`Twenty Twenty's election`, doc => doc.numbers().toNumber(), `2020's election`],
    [`we saw twenty ten's results`, doc => doc.numbers().toNumber(), `we saw 2010's results`],
    [`2020's election`, doc => doc.numbers().toNumber(), `2020's election`],
    [`2020's election`, doc => doc.numbers().set(2030), `2030's election`],
    [`2020's election`, doc => doc.numbers().add(1), `2021's election`],
  ]
  arr.forEach(([str, fn, want]) => {
    const doc = nlp(str)
    fn(doc)
    t.equal(doc.text(), want, here + `${str} -> ${want}`)
    t.ok(doc.has('(#Year && #Possessive)'), here + `still a possessive year: '${want}'`)
    t.deepEqual(doc.numbers().length, 1, here + `still one number: '${want}'`)
  })
  // these are no longer in a year's format, so only the words need to survive
  const words = [
    [`2020's election`, doc => doc.numbers().toLocaleString(), `2,020's election`],
    [`2020's election`, doc => doc.numbers().toText(), `two thousand and twenty's election`],
    [`twenty twenty's election`, doc => doc.numbers().set(2030), `two thousand and thirty's election`],
    [`twenty twenty's election`, doc => doc.numbers().toLocaleString(), `2,020's election`],
  ]
  words.forEach(([str, fn, want]) => {
    const doc = nlp(str)
    fn(doc)
    t.equal(doc.text(), want, here + `${str} -> ${want}`)
  })
  t.end()
})

test('every selection can find it', function (t) {
  const arr = [`2020's election`, `twenty twenty's election`, `twenty twenty-six's budget`]
  arr.forEach(str => {
    const doc = nlp(str)
    t.equal(doc.numbers().length, 1, here + `numbers: '${str}'`)
    t.equal(doc.possessives().length, 1, here + `possessives: '${str}'`)
    t.ok(doc.has('#Value+ #Noun'), here + `#Value: '${str}'`)
    t.ok(doc.has('#Year+ #Noun'), here + `#Year: '${str}'`)
    t.ok(doc.has('#Date+ #Noun'), here + `#Date: '${str}'`)
    // the thing it owns is still a noun
    t.equal(doc.nouns().length > 0, true, here + `nouns: '${str}'`)
  })
  t.end()
})

// these should all give back an array
test('no numbers to return', function (t) {
  const doc = nlp('no digits here')
  t.deepEqual(doc.numbers().get(), [], here + 'numbers get')
  t.deepEqual(doc.numbers().parse(), [], here + 'numbers parse')
  t.deepEqual(doc.values().get(), [], here + 'values get')
  t.deepEqual(doc.fractions().get(), [], here + 'fractions get')
  t.deepEqual(doc.fractions().parse(), [], here + 'fractions parse')
  t.deepEqual(doc.people().parse(), [], here + 'people parse')
  t.deepEqual(doc.money().get(), [], here + 'money get')
  // a found selection with no match
  t.deepEqual(nlp('two cats').numbers().get(5), [], here + 'get(n) out of range')
  // these still work
  t.deepEqual(nlp('two cats').numbers().get(), [2], here + 'one number')
  t.deepEqual(nlp('two cats and five dogs').numbers().get(1), [5], here + 'get(n)')
  t.equal(nlp('two cats').numbers().parse()[0].num, 2, here + 'parse')
  t.equal(nlp('two thirds').fractions().get()[0].numerator, 2, here + 'fraction')
  t.equal(nlp('john smith').people().parse()[0].firstName.text(), 'john', here + 'person')
  t.end()
})
