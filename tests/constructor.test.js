const test = require('tape')
const nlp = require('./_lib')

test('extra exports:', function (t) {
  t.ok(nlp.version, 'version number exported')

  t.doesNotThrow(function () {
    nlp.verbose(true)
    nlp.verbose(false)
  }, 'can set verbosity')

  t.end()
})

test('tokenize() runs without pos-tagging', function (t) {
  const str = 'Miss Hoover, I glued my head to my shoulder.'
  const r = nlp.tokenize(str)
  t.equal(r.out('text'), str, 'tokenize output is same')

  t.equal(r.list.length, 1, 'sentence-parser-working')
  const found = r.match('#Noun').found
  t.equal(found, false, 'no sneaky-tagging')

  t.end()
})

test('tokenize() accepts lexicon param', function (t) {
  let doc = nlp.tokenize('spencer kelly is working here', {
    'spencer kelly': 'Person',
    working: 'NotFun',
  })
  t.equal(doc.match('#Person').text(), 'spencer kelly', 'used tag')
  t.equal(doc.match('#NotFun').text(), 'working', 'used 2nd tag')
  t.equal(doc.people().text(), 'spencer kelly', 'subsets work')
  t.equal(doc.has('#Verb'), false, 'not a full tag')
  t.end()
})

test('parseMatch() results are symmetric', function (t) {
  const doc = nlp(`Why doesnt ross, the largest friend, simply eat the other 5?`)
  let matches = [
    '#MaleName the #Adjective friend',
    '^why',
    '#Value$',
    null,
    ['simply', 'eat'],
    'why',
    '.',
    '. simply?',
    'simply eat',
    'tornado alley #Hoover',
  ]
  matches.forEach(str => {
    let match = nlp.parseMatch(str)
    let a = doc.match(match).json()
    let b = doc.match(str).json()
    a = JSON.stringify(a)
    b = JSON.stringify(b)
    t.equal(a, b, str)
  })
  t.end()
})
