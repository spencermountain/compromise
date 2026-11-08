import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/matcher-rules] '

// rules that are sensitive to how optional tokens and repeats share a term
test('titles before a name', function (t) {
  const arr = [
    ['Lieutenant Colonel John Smith spoke', ['Lieutenant', 'Colonel']],
    ['Army Lieutenant Colonel Oliver North spoke', ['Lieutenant', 'Colonel']],
    ['Sergeant Major John Smith spoke', ['Sergeant', 'Major']],
    ['by Chairman Major General My Nyunt', ['Chairman', 'Major']],
    ['Colonel John Smith spoke', ['Colonel']],
    ['President Joe Biden spoke', ['President']],
    ['Mayor John Smith spoke', ['Mayor']],
  ]
  arr.forEach(([str, words]) => {
    words.forEach(word => {
      t.ok(nlp(str).match(word).has('#Honorific'), here + `${word} in '${str}'`)
    })
  })
  // these aren't titles
  t.notOk(nlp('we walked on King Street').has('#Honorific'), here + 'King Street')
  t.notOk(nlp('the mayor spoke').has('#Honorific'), here + 'no name')
  t.end()
})

test('last names', function (t) {
  const yes = [
    ['John F Kennedy spoke', 'Kennedy'],
    ['George W Bush spoke', 'Bush'],
    ['Joe Biden spoke', 'Biden'],
  ]
  yes.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#LastName'), here + `${word} in '${str}'`)
  })
  // a country after a first name
  const usa = nlp('not enough to redeem Herman USA').match('usa')
  t.notOk(usa.has('#LastName'), here + 'USA is not a last name')
  t.ok(usa.has('#Country'), here + 'USA is a country')
  t.end()
})

test('may and march after a date', function (t) {
  const modal = [
    'part during the Putin years may not be enough',
    'this probe launched in 1977 may travel to space',
    'the elections this September may have consequences',
    'what happens in 2009 may jeopardize some of it',
    'in 1977 she may travel',
  ]
  modal.forEach(str => {
    t.ok(nlp(str).match('may').has('#Modal'), here + `modal: '${str}'`)
    t.notOk(nlp(str).match('may').has('#Month'), here + `no month: '${str}'`)
  })
  const month = ['from june to may', 'june and may', 'from november to march', 'november march']
  month.forEach(str => {
    t.ok(nlp(str).match('(may|march)$').has('#Month'), here + `month: '${str}'`)
  })
  t.end()
})

test('half before a unit', function (t) {
  const arr = ['in half an hour', 'half a month away', 'half a meter tall', 'half a dozen people']
  arr.forEach(str => {
    t.ok(nlp(str).match('half').has('#Fraction'), here + `fraction: '${str}'`)
  })
  t.end()
})
