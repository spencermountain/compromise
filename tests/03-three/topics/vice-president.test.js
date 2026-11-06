import test from 'tape'
import nlp from '../lib.js'
const here = '[three/topics/vice-president] '

// 'vice president' as a title before a name
// [sentence, people]
const titles = [
  ['Vice President Al Gore spoke', ['Vice President Al Gore']],
  ['Vice President Joe Biden spoke', ['Vice President Joe Biden']],
  ['vice president joe biden spoke', ['vice president joe biden']],
  ['we met Vice President Kamala Harris', ['Vice President Kamala Harris']],
  ['Vice-President Joe Biden spoke', ['Vice-President Joe Biden']],
  ['our vice president John Smith left', ['vice president John Smith']],
  ['former Vice President Dick Cheney spoke', ['Vice President Dick Cheney']],
  // other titles stay
  ['President Joe Biden spoke', ['President Joe Biden']],
  ['Vice Admiral John Smith left', ['Vice Admiral John Smith']],
  ['Major General John Smith left', ['Major General John Smith']],
]

// 'vice president' without a name, and other uses of 'vice'
const notTitles = [
  ['the vice president spoke', []],
  ['she is the vice president', []],
  ['he was vice president', []],
  ['the vice president of sales left', []],
  ['vice is bad', []],
  ['i read Vice News', []],
  ['Miami Vice starred Don Johnson', ['Don Johnson']],
  ['the vice squad arrested John Smith', ['John Smith']],
]

test('vice president', function (t) {
  titles.forEach(([str, want]) => {
    t.deepEqual(nlp(str).people().out('array'), want, here + str)
  })
  notTitles.forEach(([str, want]) => {
    const doc = nlp(str)
    t.deepEqual(doc.people().out('array'), want, here + str)
    t.equal(doc.match('vice').has('#Honorific'), false, here + `${str} - no #Honorific`)
  })
  const person = nlp('Vice President Joe Biden spoke').people().json()[0].person
  t.equal(person.honorific, 'vice president', here + 'honorific')
  t.equal(person.firstName, 'joe', here + 'firstName')
  t.equal(person.lastName, 'biden', here + 'lastName')
  t.end()
})
