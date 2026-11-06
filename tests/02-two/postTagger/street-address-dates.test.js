import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/street-address-dates] '

test('a month-named street is not a date', function (t) {
  const arr = [
    ['I live at 12 March Street.', '12 March Street'],
    ['I live at 12 May Street.', '12 May Street'],
    ['I live at 40 April Road.', '40 April Road'],
    ['I live at 12 June Avenue.', '12 June Avenue'],
    ['I live at 12 August Lane.', '12 August Lane'],
    ['I live at 12 January Street.', '12 January Street'],
    ['She moved to 5 October Drive', '5 October Drive'],
    ['12 December Boulevard is nice', '12 December Boulevard'],
    ['12 March St.', '12 March St'],
  ]
  arr.forEach(([str, target]) => {
    const m = nlp(str).match(target)
    t.equal(m.found, true, here + `found: '${str}'`)
    t.equal(m.match('#Address').length, 3, here + `address: '${str}'`)
    t.notOk(m.has('#Date'), here + `no date: '${str}'`)
    t.notOk(m.has('#Month'), here + `no month: '${str}'`)
    t.ok(m.has('^#NumericValue #Noun #Noun$'), here + `number and nouns: '${str}'`)
  })
  t.end()
})

test('other addresses are unchanged', function (t) {
  const doc = nlp('I live at 12 Main Street.')
  t.equal(doc.match('#Address').length, 3, here + 'main street')
  t.ok(doc.has('^#Pronoun #Verb #Preposition #Address+$'), here + 'whole sentence')
  t.end()
})

test('dates beside a month are still dates', function (t) {
  const arr = [
    ['I left on 12 March.', '12 March'],
    ['I left on 12 May.', '12 May'],
    ['I left on 12th of March.', '12th of March'],
    ['12 March 2021', '12 March'],
    ['March 12', 'March 12'],
    ['12 January', '12 January'],
    // a lowercase noun follows the date, instead of ending an address
    ['On 12 March road closures begin.', '12 March'],
    ['The 12 March drive was long.', '12 March'],
    ['5 March street parties were held.', '5 March'],
  ]
  arr.forEach(([str, target]) => {
    const m = nlp(str).match(target)
    t.equal(m.found, true, here + `found: '${str}'`)
    t.equal(m.match('#Date').length, m.terms().length, here + `date: '${str}'`)
  })
  t.end()
})
