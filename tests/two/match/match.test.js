import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/match] '

test('term-match :', function (t) {
  const arr = [
    ['quick', 'quick', true],
    ['Quick', 'Quick', true],
    ['quick', 's', false],
    ['quick', '#Adjective', true],
    ['quick', '#Noun', false],
    ['quick', '(fun|nice|quick|cool)', true],
    ['quick', '(fun|nice|good)', false],
  ]
  arr.forEach(function (a) {
    const m = nlp(a[0]).match(a[1])
    const msg = a[0] + ' matches ' + a[1] + ' ' + a[2]
    t.equal(m.found, a[2], here + msg)
  })
  t.end()
})

test('sentence-match:', function (t) {
  const arr = [
    ['the dog played', 'the dog', 'the dog'],
    ['the dog played', 'the dog played', 'the dog played'],
    ['the dog played', 'the #Noun', 'the dog'],
    ['the dog played', 'the #Noun played', 'the dog played'],
    ['the dog played', 'the cat played', ''],
    ['the dog played', 'the #Adjective played', ''],
    ['the dog played', 'the (cat|dog|piano) played', 'the dog played'],
    ['the dog played', 'the (cat|piano) played', ''],
    ['the dog played', 'the . played', 'the dog played'],
    //optional
    ['the dog played', 'the dog quickly? played', 'the dog played'],
    ['the dog played', 'the dog #Adverb? played', 'the dog played'],
    ['the dog quickly played', 'the dog #Adverb? played', 'the dog quickly played'],
    ['the dog quickly played', 'the dog #Adverb played', 'the dog quickly played'],
    ['the dog quickly played', 'the dog . played', 'the dog quickly played'],
    ['the dog quickly played', 'the dog .? played', 'the dog quickly played'],
    // ['the dog played', 'the dog .? played', 'the dog played'],

    //leading/trailing logic
    ['the dog played', 'the dog played$', 'the dog played'],
    ['the dog played', 'the dog', 'the dog'],
    ['the dog played', 'the dog$', ''],
    ['the dog played', 'the dog$ played', ''],
    ['the dog played', '^the dog', 'the dog'],
    ['the dog played', 'dog played', 'dog played'],
    ['the dog played', '^dog played', ''],
    ['the dog played', '^played', ''],
    ['the dog played', '^the', 'the'],

    ['john eats glue', 'john eats glue', 'john eats glue'],
    ['john eats glue', 'john eats', 'john eats'],
    ['john eats glue', 'eats glue', 'eats glue'],
    ['john eats glue', 'eats glue all day', ''],

    //test contractions
    // [`if you don't mind`, `you don't mind`, `you don't mind`],
    [`if you don't mind`, `you don't care`, ``],
    // [`if you don't mind`, `you don't`, `you don't`],
    // [`if you don't mind`, `don't mind`, `don't mind`],

    // [`if you didn't care`, `didn't`, `didn't`], //TODO:support me

    // [`if you wouldn't care, i'll eat here`, `i'll eat`, `i'll eat`], //omg hard one

    // [`don't go`, `do not`, `don't`],
    [`do not go`, `do not`, `do not`],
    // [`i dunno`, `do not`, `dunno`],
    //bugs
    // [`really remind me to buy`, '#Adverb? #Infinitive (me|us) (to|for)', `really remind me to`],
  ]
  arr.forEach(function (a) {
    const m = nlp(a[0]).match(a[1])
    if (!m.found) {
      t.equal(a[2], '', here + 'no-match: ' + a[0] + ' - -' + a[1])
    } else {
      const msg = "'" + a[0] + "'  - " + a[1] + " - - have : '" + m.out('normal') + "'"
      t.equal(m.out('normal'), a[2], here + msg)
    }
  })
  t.end()
})

test('tag-match-tag :', function (t) {
  const m = nlp('apple is cool')
  m.match('apple').tag('Person')
  const p = m.match('#Person')
  t.equal(p.out('normal'), 'apple', here + 'apple-tagged')
  t.equal(m.length, 1, here + 'one-result')
  t.end()
})

test('reduced matches', function (t) {
  let doc = nlp(`the donkey's hotel`)
  t.equals(doc.has('donkey'), true, 'apostrophe-s')

  doc = nlp(`the donkeys' hotel`)
  t.equals(doc.has('donkeys'), true, 's-apostrophe')

  t.end()
})

test('slashes-basic', function (t) {
  const doc = nlp(`spencer is/was trying.`)
  t.equal(doc.terms().length, 3, 'three terms')
  t.equal(doc.match('#Person #Verb trying').found, true, 'verb trying')
  // t.equal(doc.match('#Person is trying').found, true, 'is trying')
  t.end()
})

// test('slashes-complex', function (t) {
// doc = nlp(`spencer is/was trying`)
// 1. doc.has('#PresentTense') == true (choose first)
// 2. doc.has('#Verb') (only common tags)
// 3. doc.has('#PastTense') && doc.has('#PresentTense') :/

// doc = nlp(`spencer is/was trying`)
// 1b. doc.has('is') == true (choose first)
// 2b. doc.has('was') == true  (find both)
// 3b. doc.has('is') == false  (find none)
//   t.end()
// })
