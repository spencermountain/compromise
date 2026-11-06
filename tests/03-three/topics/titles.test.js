import test from 'tape'
import nlp from '../lib.js'
const here = '[three/topics/titles] '

// a title before a name is part of the person
// [sentence, people]
const titles = [
  ['Prime Minister Justin Trudeau spoke', ['Prime Minister Justin Trudeau']],
  ['we met Prime Minister Zebrowski', ['Prime Minister Zebrowski']],
  ['Deputy Prime Minister John Smith left', ['Deputy Prime Minister John Smith']],
  ['Senior Vice President John Smith left', ['Senior Vice President John Smith']],
  ['Executive Vice President John Smith left', ['Executive Vice President John Smith']],
  ['Deputy Director John Smith left', ['Deputy Director John Smith']],
  ['Chancellor Angela Merkel spoke', ['Chancellor Angela Merkel']],
  ['we met Chairman John Smith', ['Chairman John Smith']],
  ['Senator John Smith spoke', ['Senator John Smith']],
  ['senator john smith spoke', ['senator john smith']],
  ['Minister John Smith spoke', ['Minister John Smith']],
  ['Congressman John Smith spoke', ['Congressman John Smith']],
  ['Ambassador John Smith spoke', ['Ambassador John Smith']],
  ['Mayor Bloomberg spoke', ['Mayor Bloomberg']],
  ['Governor Cuomo spoke', ['Governor Cuomo']],
  ['Judge Judy left', ['Judge Judy']],
  ['Professor Zebrowski left', ['Professor Zebrowski']],
  // existing titles stay
  ['King Arthur spoke', ['King Arthur']],
  ['Queen Anne left', ['Queen Anne']],
  ['Major General John Smith left', ['Major General John Smith']],
  ['Sergeant Major Harold left', ['Sergeant Major Harold']],
]

// a title word before a place, or without a name
const notTitles = [
  ['King County is large', []],
  ['we drove down Queen Street', []],
  ['President Street is closed', []],
  ['the mayor spoke', []],
  ['she is a senator', []],
  ['the judge left', []],
  ['he saw the prime minister', []],
  ['the governor of Texas left', []],
  ['the minister of finance spoke', []],
  ['a senior executive left', []],
]

// [sentence, honorific, firstName, lastName]
const parts = [
  ["Vice President Joe Biden's speech", 'vice president', 'joe', 'biden'],
  ['Joe Biden’s speech', '', 'joe', 'biden'],
  ["James Joyce's book", '', 'james', 'joyce'],
  ["Charles Dickens' novels", '', 'charles', 'dickens'],
  ["John's car is red", '', 'john', ''],
  ['Vice President Biden spoke', 'vice president', '', 'biden'],
  ['we met Prime Minister Zebrowski', 'prime minister', '', 'zebrowski'],
  ['Mr Springer left', 'mr', '', 'springer'],
  // apostrophes inside a name stay
  ["Conan O'Brien left", '', '', "o'brien"],
  ["Guido D'Arezzo sang", '', 'guido', "d'arezzo"],
]

test('titles before names', function (t) {
  titles.forEach(([str, want]) => {
    const doc = nlp(str)
    t.deepEqual(doc.people().out('array'), want, here + str)
    t.equal(doc.has('#Honorific'), true, here + `${str} - has #Honorific`)
  })
  notTitles.forEach(([str, want]) => {
    const doc = nlp(str)
    t.deepEqual(doc.people().out('array'), want, here + str)
    t.equal(doc.has('#Honorific'), false, here + `${str} - no #Honorific`)
  })
  t.end()
})

test('parsed name parts', function (t) {
  parts.forEach(([str, honorific, firstName, lastName]) => {
    const found = nlp(str).people().json()[0] || { person: {} }
    const person = found.person
    t.equal(person.honorific, honorific, here + `${str} - honorific`)
    t.equal(person.firstName, firstName, here + `${str} - firstName`)
    t.equal(person.lastName, lastName, here + `${str} - lastName`)
  })
  // reading the parts does not edit the document
  const doc = nlp("Joe Biden's speech was long")
  doc.people().json()
  t.equal(doc.text(), "Joe Biden's speech was long", here + 'document unchanged')
  t.equal(doc.has('#Possessive'), true, here + 'still possessive')
  t.end()
})
