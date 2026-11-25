import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/noun-agreement] '

// set(), add() and subtract() fix the noun that is being counted
test(here + 'the counted noun follows the number', t => {
  const rows = [
    // [input, method, n, expected, agree:false]
    ['he has two dogs', 'set', 1, 'he has one dog', 'he has one dogs'],
    ['he has one dog', 'set', 2, 'he has two dogs', 'he has two dog'],
    ['he has 5 dogs', 'set', 1, 'he has 1 dog', 'he has 1 dogs'],
    ['there is one apple left', 'add', 1, 'there are two apples left', 'there is two apple left'],
    ['he has 1 dog', 'add', 4, 'he has 5 dogs', 'he has 5 dog'],
    ['he drank two beers', 'subtract', 1, 'he drank one beer', 'he drank one beers'],
    ['he has one big red apple', 'add', 1, 'he has two big red apples', 'he has two big red apple'],
    ['she has two children', 'set', 1, 'she has one child', 'she has one children'],
    ['she has one child', 'add', 1, 'she has two children', 'she has two child'],
    ['he is 6 feet tall', 'set', 1, 'he is 1 foot tall', 'he is 1 feet tall'],
    ['it is 1 degree outside', 'set', 0, 'it is 0 degrees outside', 'it is 0 degree outside'],
    ['it is 2 degrees outside', 'set', -1, 'it is -1 degree outside', 'it is -1 degrees outside'],
    ['one dog and two cats', 'add', 1, 'two dogs and three cats', 'two dog and three cats'],
  ]
  rows.forEach(([str, method, n, on, off]) => {
    let doc = nlp(str)
    doc.numbers()[method](n)
    t.equal(doc.text(), on, here + `[on] ${method}(${n}): ${str}`)
    doc = nlp(str)
    doc.numbers()[method](n, { agree: false })
    t.equal(doc.text(), off, here + `[off] ${method}(${n}): ${str}`)
  })
  t.end()
})

test(here + 'these nouns are left alone', t => {
  const rows = [
    // nothing to count
    ['he ate one', 'add', 1, 'he ate two'],
    ['one of the dogs left', 'add', 1, 'two of the dogs left'],
    // no other form
    ['he has two sheep', 'set', 1, 'he has one sheep'],
    ['I saw one Canadian', 'add', 2, 'I saw three Canadian'],
    // unit symbols
    ['it weighs 1 kg', 'add', 4, 'it weighs 5 kg'],
    ['it rose 1 percent', 'add', 1, 'it rose 2 percent'],
    // an ordinal, or a year, is not a count
    ['the third apple fell', 'add', 1, 'the fourth apple fell'],
    [`2020's election`, 'add', 1, `2021's election`],
    // across punctuation
    ['he has one, dogs', 'add', 1, 'he has two, dogs'],
  ]
  rows.forEach(([str, method, n, want]) => {
    const doc = nlp(str)
    doc.numbers()[method](n)
    t.equal(doc.text(), want, here + `${method}(${n}): ${str}`)
  })
  // increment and decrement
  const doc = nlp('he waited one hour')
  doc.numbers().increment()
  t.equal(doc.text(), 'he waited two hours', here + 'increment')
  doc.numbers().decrement()
  t.equal(doc.text(), 'he waited one hour', here + 'decrement')
  t.end()
})

// the verb follows the noun, too
test(here + 'the verb follows the counted noun', t => {
  const rows = [
    // [input, method, n, expected, agree:false]
    ['two dogs are barking', 'set', 1, 'one dog is barking', 'one dogs are barking'],
    ['one dog is barking', 'set', 2, 'two dogs are barking', 'two dog is barking'],
    ['two dogs bark', 'subtract', 1, 'one dog barks', 'one dogs bark'],
    ['two dogs were here', 'set', 1, 'one dog was here', 'one dogs were here'],
    ['two big dogs have left', 'set', 1, 'one big dog has left', 'one big dogs have left'],
    ['the two dogs that bark are loud', 'set', 1, 'the one dog that barks is loud', 'the one dogs that bark are loud'],
    ['five dollars are enough', 'set', 1, 'one dollar is enough', 'one dollars are enough'],
    // the verb comes first
    ['there are two apples left', 'set', 1, 'there is one apple left', 'there are one apples left'],
    ['are the two dogs barking?', 'set', 1, 'is the one dog barking?', 'are the one dogs barking?'],
    ['is one dog enough?', 'add', 2, 'are three dogs enough?', 'is three dog enough?'],
    // inside a clause
    ['i think two dogs bark', 'set', 1, 'i think one dog barks', 'i think one dogs bark'],
    ['when two dogs bark, i wake', 'set', 1, 'when one dog barks, i wake', 'when one dogs bark, i wake'],
  ]
  rows.forEach(([str, method, n, on, off]) => {
    let doc = nlp(str)
    doc.numbers()[method](n)
    t.equal(doc.text(), on, here + `[on] ${method}(${n}): ${str}`)
    doc = nlp(str)
    doc.numbers()[method](n, { agree: false })
    t.equal(doc.text(), off, here + `[off] ${method}(${n}): ${str}`)
  })
  t.end()
})

test(here + 'these verbs are left alone', t => {
  const rows = [
    // the noun is not the subject
    ['he has two dogs', 'set', 1, 'he has one dog'],
    ['he saw two dogs run', 'set', 1, 'he saw one dog run'],
    ['he let two dogs run', 'set', 1, 'he let one dog run'],
    ['it took two hours and was fun', 'set', 1, 'it took one hour and was fun'],
    // no number in these verbs
    ['two dogs barked', 'set', 1, 'one dog barked'],
    ['two dogs will bark', 'set', 1, 'one dog will bark'],
    // a list is plural, whatever its parts are
    ['two dogs and two cats are here', 'set', 1, 'one dog and one cat are here'],
    ['one dog and one cat are here', 'subtract', 1, 'zero dogs and zero cats are here'],
    // the noun did not change
    ['2 kg is heavy', 'set', 1, '1 kg is heavy'],
    ['two dogs or one cat is fine', 'set', 1, 'one dog or one cat is fine'],
    ['two sheep are here', 'set', 3, 'three sheep are here'],
  ]
  rows.forEach(([str, method, n, want]) => {
    const doc = nlp(str)
    doc.numbers()[method](n)
    t.equal(doc.text(), want, here + `${method}(${n}): ${str}`)
  })
  t.end()
})
