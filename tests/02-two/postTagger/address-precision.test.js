import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/address-precision] '

test('a measure or a count is not an address', function (t) {
  const arr = [
    'The nearest interstate is a 4 hour drive away.',
    'It is a 12 hour drive.',
    'a 2,800 km road',
    'Of his pretty little four wheel drive',
    'A little country church on a two lane road',
    'There is not one ideal way to do it.',
    'It is not a one way street.',
    'responds to 30 million emergency road service calls',
  ]
  arr.forEach(str => {
    t.notOk(nlp(str).has('#Address'), here + `no address: '${str}'`)
  })
  t.end()
})

test('addresses are still addresses', function (t) {
  const arr = [
    ['I live at 123 main street', '123 main street'],
    ['123 Main Street', '123 Main Street'],
    ['12 Elm Road', '12 Elm Road'],
    ['House of the week: 74 Inglewood Drive', '74 Inglewood Drive'],
    ['One Yonge Street', 'One Yonge Street'],
    ['the hotel at 3000 Las Vegas Blvd', '3000 Las Vegas Blvd'],
  ]
  arr.forEach(([str, want]) => {
    t.equal(nlp(str).match('#Address+').text('reduced'), nlp(want).text('reduced'), here + str)
  })
  t.end()
})

test('lowercase and uppercase month-named streets', function (t) {
  const arr = [
    ['I live at 12 march street.', 'march'],
    ['She works at 40 april road', 'april'],
    ['I live at 12 MARCH STREET.', 'MARCH'],
  ]
  arr.forEach(([str, month]) => {
    const doc = nlp(str)
    t.ok(doc.has('#Address'), here + `address: '${str}'`)
    t.notOk(doc.has('#Date'), here + `no date: '${str}'`)
    t.notOk(doc.match(month).has('#Month'), here + `no month: '${str}'`)
  })
  t.end()
})

test('a date before a lowercase noun keeps the date', function (t) {
  const arr = ['On 12 march road closures begin.', '5 march street parties were held.']
  arr.forEach(str => {
    t.ok(nlp(str).has('#Month'), here + `month: '${str}'`)
  })
  t.end()
})
