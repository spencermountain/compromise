import test from 'tape'
import nlp from '../lib.js'
const here = '[three/topics/vice-president] '

// a 'vice' title before a name
// [sentence, people]
const titles = [
  ['Vice President Al Gore spoke', ['Vice President Al Gore']],
  ['Vice President Joe Biden spoke', ['Vice President Joe Biden']],
  ['vice president joe biden spoke', ['vice president joe biden']],
  ['we met Vice President Kamala Harris', ['Vice President Kamala Harris']],
  ['Vice-President Joe Biden spoke', ['Vice-President Joe Biden']],
  ['our vice president John Smith left', ['vice president John Smith']],
  ['former Vice President Dick Cheney spoke', ['Vice President Dick Cheney']],
  // other vice titles
  ['we met Vice Chairman John Smith', ['Vice Chairman John Smith']],
  ['Vice Chancellor John Smith left', ['Vice Chancellor John Smith']],
  ['Vice Premier John Smith spoke', ['Vice Premier John Smith']],
  ['Vice Minister John Smith spoke', ['Vice Minister John Smith']],
  ['Vice Chair John Smith spoke', ['Vice Chair John Smith']],
  ['Vice Principal John Smith spoke', ['Vice Principal John Smith']],
  ['Vice-Chairman John Smith left', ['Vice-Chairman John Smith']],
  ['vice chairman john smith left', ['vice chairman john smith']],
  // other titles stay
  ['President Joe Biden spoke', ['President Joe Biden']],
  ['Vice Admiral John Smith left', ['Vice Admiral John Smith']],
  ['Major General John Smith left', ['Major General John Smith']],
]

// a title, then one unknown surname
const surnames = [
  ['Vice President Biden spoke', ['Vice President Biden']],
  ['President Biden spoke', ['President Biden']],
  ['President Zelensky spoke', ['President Zelensky']],
  ['Vice Chairman Zebrowski left', ['Vice Chairman Zebrowski']],
  ['Colonel Sanders spoke', ['Colonel Sanders']],
  ['Dr Zebrowski left', ['Dr Zebrowski']],
  // or two unknown names
  ['President Hosni Mubarak spoke', ['President Hosni Mubarak']],
  ['we met President Xi Jinping', ['President Xi Jinping']],
]

// possessive names stay in one piece
const possessives = [
  ["Vice President Joe Biden's speech was long", ["Vice President Joe Biden's"]],
  ['Vice President Joe Biden’s speech was long', ['Vice President Joe Biden’s']],
  ["Vice President Biden's speech was long", ["Vice President Biden's"]],
  ["President John Smith's speech was long", ["President John Smith's"]],
  ["John Smith's speech was long", ["John Smith's"]],
  ["Joe Biden's speech was long", ["Joe Biden's"]],
  // the owner, and not the thing owned
  ["John's car is red", ["John's"]],
  ["we saw John's Honda", ["John's"]],
  ["i like Spencer's King", ["Spencer's", 'King']],
]

// a vice title without a name, and other uses of 'vice'
const notTitles = [
  ['the vice president spoke', []],
  ['she is the vice president', []],
  ['he was vice president', []],
  ['the vice president of sales left', []],
  ['the vice chairman spoke', []],
  ['she is vice chancellor', []],
  ['he became vice chair', []],
  ['vice is bad', []],
  ['i read Vice News', []],
  ['Miami Vice starred Don Johnson', ['Don Johnson']],
  ['the vice squad arrested John Smith', ['John Smith']],
]

test('vice president', function (t) {
  ;[...titles, ...surnames, ...possessives].forEach(([str, want]) => {
    t.deepEqual(nlp(str).people().out('array'), want, here + str)
  })
  notTitles.forEach(([str, want]) => {
    const doc = nlp(str)
    t.deepEqual(doc.people().out('array'), want, here + str)
    t.equal(doc.match('vice').has('#Honorific'), false, here + `${str} - no #Honorific`)
  })
  let person = nlp('Vice President Joe Biden spoke').people().json()[0].person
  t.equal(person.honorific, 'vice president', here + 'honorific')
  t.equal(person.firstName, 'joe', here + 'firstName')
  t.equal(person.lastName, 'biden', here + 'lastName')
  person = nlp('we met Vice Chairman John Smith').people().json()[0].person
  t.equal(person.honorific, 'vice chairman', here + 'vice chairman honorific')
  t.end()
})
