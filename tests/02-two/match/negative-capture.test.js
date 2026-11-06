import test from 'tape'
import nlp from '../lib.js'
const here = '[two/match/negative-capture] '

const group = (text, reg) => nlp(text).match(reg, 0).out('array')

// one form of each kind of negative token
const tokens = ['!#Noun', '!(dogs|cats)', '!(#Noun|#Pronoun)', '!(#Noun && dogs)']

test('a negative token in a capture', function (t) {
  tokens.forEach(tok => {
    t.deepEqual(group('the big dogs', `the [${tok}] dogs`), ['big'], here + `single: ${tok}`)
    t.deepEqual(group('the big red dogs', `the [${tok}+] dogs`), ['big red'], here + `plus: ${tok}`)
    t.deepEqual(group('the big red dogs', `the [${tok}*] dogs`), ['big red'], here + `star: ${tok}`)
    t.deepEqual(group('the big red dogs', `the [${tok}+?] dogs`), ['big red'], here + `optional plus: ${tok}`)
    t.deepEqual(group('the big red dogs', `the [${tok}{2}] dogs`), ['big red'], here + `exactly: ${tok}`)
    t.deepEqual(group('the big red dogs', `the [${tok}{1,3}] dogs`), ['big red'], here + `range: ${tok}`)
    // nothing to capture
    t.deepEqual(group('the dogs', `the [${tok}*] dogs`), [], here + `empty star: ${tok}`)
    t.deepEqual(group('the dogs', `the [${tok}+?] dogs`), [], here + `empty optional plus: ${tok}`)
  })
  t.end()
})

// the span used to come up short, or start late
test('a negative token inside a longer capture', function (t) {
  tokens.forEach(tok => {
    t.deepEqual(group('the big dogs', `[the ${tok}] dogs`), ['the big'], here + `at the end: ${tok}`)
    t.deepEqual(group('the big dogs', `[the ${tok} dogs]`), ['the big dogs'], here + `in the middle: ${tok}`)
    t.deepEqual(group('the big dogs', `[${tok} big dogs]`), ['the big dogs'], here + `at the start: ${tok}`)
    t.deepEqual(group('the big red dogs', `[the ${tok}+ dogs]`), ['the big red dogs'], here + `plus: ${tok}`)
    t.deepEqual(group('the big red dogs', `[the ${tok}*] dogs`), ['the big red'], here + `star: ${tok}`)
    t.deepEqual(group('the big red dogs', `[the ${tok}{2} dogs]`), ['the big red dogs'], here + `exactly: ${tok}`)
    // nothing for it to add
    t.deepEqual(group('the dogs', `[the ${tok}* dogs]`), ['the dogs'], here + `empty star: ${tok}`)
  })
  t.end()
})

test('a negative optional in a capture', function (t) {
  t.deepEqual(group('his fine and', 'his fine [!#Noun?]'), ['and'], here + 'takes its term')
  t.deepEqual(group('the big dogs', 'the [!#Noun?] dogs'), ['big'], here + 'before the next token')
  t.deepEqual(group('his fine', 'his fine [!#Noun?]'), [], here + 'at the end of a sentence')
  // still a lookahead
  t.deepEqual(group('his fine dog', 'his fine [!#Noun?]'), [], here + 'lookahead')
  t.end()
})

// the term goes to the next token, and so should its capture
test('a capture after a negative optional', function (t) {
  const arr = [
    ['a hundred', '!once? [a] hundred', ['a']],
    ['the dogs ran', '!#Verb? [the] dogs', ['the']],
    ['the dogs ran', 'the !#Verb? [dogs]', ['dogs']],
    ['the big dogs ran', 'the !#Noun? [dogs]', ['dogs']],
    ['the dogs ran', 'the !#Verb? #Adjective? [dogs]', ['dogs']],
    ['once a hundred', '!once? [a] hundred', ['a']],
    ['just a hundred', '!once? [a] hundred', ['a']],
    // it can also be repeating, or a group
    ['the dogs ran', 'the !#Verb? [#Noun+]', ['dogs']],
    ['the dogs ran', 'the !#Verb? [(#Noun|#Adjective)]', ['dogs']],
    ['the dogs ran', 'the !#Verb? [(#Noun && dogs)]', ['dogs']],
  ]
  arr.forEach(([text, reg, want]) => {
    t.deepEqual(group(text, reg), want, here + `'${text}' ${reg}`)
  })
  t.end()
})

test('named captures', function (t) {
  const m = nlp('the big dogs').match('[<a>the] [<b>!#Noun] [<c>dogs]')
  t.deepEqual(m.groups('a').out('array'), ['the'], here + 'before')
  t.deepEqual(m.groups('b').out('array'), ['big'], here + 'negative')
  t.deepEqual(m.groups('c').out('array'), ['dogs'], here + 'after')
  const many = nlp('the big red dogs').match('the [<x>!#Noun+] dogs')
  t.deepEqual(many.groups('x').out('array'), ['big red'], here + 'repeat')
  const block = nlp('the big red dogs').match('the [<x>!(#Noun|#Pronoun)+] dogs')
  t.deepEqual(block.groups('x').out('array'), ['big red'], here + 'group')
  const wide = nlp('the big red dogs').match('[<x>the !#Noun+] dogs')
  t.deepEqual(wide.groups('x').out('array'), ['the big red'], here + 'wide')
  t.end()
})

// the name can go on either side of the !
test('naming a negative group', function (t) {
  const arr = [
    'the [<x>!(#Noun|#Pronoun)+] dogs',
    'the ![<x>(#Noun|#Pronoun)+] dogs',
    'the [<x>!(#Noun && dogs)+] dogs',
    'the ![<x>(#Noun && dogs)+] dogs',
    'the [<x>!(dogs|cats)+] dogs',
    'the ![<x>(dogs|cats)+] dogs',
    'the [<x>!#Noun+] dogs',
  ]
  arr.forEach(reg => {
    const m = nlp('the big red dogs').match(reg)
    t.deepEqual(m.out('array'), ['the big red dogs'], here + `whole: ${reg}`)
    t.deepEqual(m.groups('x').out('array'), ['big red'], here + `group: ${reg}`)
    t.equal(nlp.parseMatch(reg).length, 3, here + `three tokens: ${reg}`)
  })
  // and with spaces, inside the group
  const spaced = nlp('the big red dogs').match('the [<x>!(green yellow|dogs)] red')
  t.deepEqual(spaced.groups('x').out('array'), ['big'], here + 'spaces')
  t.end()
})

test('the whole match is unchanged', function (t) {
  tokens.forEach(tok => {
    t.deepEqual(nlp('the big dogs').match(`the [${tok}] dogs`).out('array'), ['the big dogs'], here + `single: ${tok}`)
    t.deepEqual(nlp('the big red dogs').match(`the [${tok}+] dogs`).out('array'), ['the big red dogs'], here + `plus: ${tok}`)
  })
  // a capture elsewhere is not disturbed
  t.deepEqual(group('the big dogs', 'the !#Noun [dogs]'), ['dogs'], here + 'after a negative')
  t.deepEqual(group('the big dogs', '[the] !#Noun dogs'), ['the'], here + 'before a negative')
  t.deepEqual(group('the big red dogs', 'the !#Noun+ [dogs]'), ['dogs'], here + 'after a repeat')
  t.end()
})

test('sweep captures, too', function (t) {
  const arr = [
    ['the big dogs', 'the [!#Noun] dogs', ['big']],
    ['the big red dogs', 'the [!#Noun+] dogs', ['big red']],
    ['the big red dogs', 'the [!(#Noun|#Pronoun)+] dogs', ['big red']],
    ['the big dogs', '[the !#Noun dogs]', ['the big dogs']],
  ]
  arr.forEach(([text, match, want]) => {
    const doc = nlp(text)
    doc.sweep(nlp.buildNet([{ match, group: 0, tag: 'Foo' }]))
    t.deepEqual(doc.match('#Foo+').out('array'), want, here + `tagged: ${match}`)
  })
  t.end()
})
