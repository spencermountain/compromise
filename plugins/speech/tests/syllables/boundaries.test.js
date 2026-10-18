import test from 'tape'
import nlp from '../_lib.js'

// Expected spellings chosen independently of the splitting rules.
const examples = [
  'boat',
  'coat',
  'road',
  'bread',
  'read',
  'cre ate',
  're act',
  'qui et',
  'quite',
  'flu id',
  'ru in',
  'li on',
  'mil lion',
  'sci ence',
  'beau ti ful',
  'peo ple',
  'horse',
  'chance',
  'bot tle',
  'lit tle',
  'ta ble',
  'ap ple',
  'sta ble',
  'walked',
  'wan ted',
  'played',
  'nee ded',
  'wat ches',
  'cakes',
  'hor ses',
  'box es',
  'washed',
  'raised',
  'busi ness',
  'ra di o',
  'vi de o',
  'bi o gra phy',
  'po et ry',
  'queue',
  'through',
  'strength',
  'spring',
  'ex tra',
  'a pron',
  'rab bit',
  'hap py',
  'yel low',
  'to ge ther',
  'do nate',
  'mo ment',
  'move ment',
  'some thing',
]

test('speech: readable syllable boundaries', t => {
  // A correct count alone cannot detect awkward cuts or dropped characters.
  examples.forEach(example => {
    const expected = example.split(' ')
    const word = expected.join('')
    const actual = nlp(word).syllables()[0]
    t.equal(actual.length, expected.length, `${word}: count`)
    t.deepEqual(actual, expected, `${word}: boundaries`)
    t.equal(actual.join(''), word, `${word}: reconstruction`)
    t.ok(
      actual.every(part => part.length > 0),
      `${word}: nonempty chunks`
    )
  })
  t.end()
})

test('speech: syllables stay within terms and sentences', t => {
  // Exercise sentence grouping and the per-term metadata through the public API.
  const doc = nlp('A boat. People wanted tables.')
  t.deepEqual(doc.syllables(), [
    ['A', 'boat'],
    ['Peo', 'ple', 'wan', 'ted', 'ta', 'bles'],
  ])
  doc.json().forEach(sentence => {
    sentence.terms.forEach(term => {
      t.equal(term.syllables.join(''), term.text, `${term.text}: reconstruction`)
    })
  })
  t.end()
})

test('speech: vowel and ending contrasts', t => {
  // Contrasting word families guard against applying a spelling rule too broadly.
  const contrasts = [
    'suit',
    'fruit',
    'juice',
    'guide',
    'build',
    'guilt',
    'flu id',
    'flu ids',
    'ru in',
    'ru ined',
    'cre a ted',
    'cre a ting',
    're ac ted',
    're ac tion',
    'mu si cian',
    'spe cial',
    'pa tient',
    'na tion',
    'vi sion',
    'mile',
    'miles',
    'smile',
    'smiles',
    'ta bles',
    'can dle',
    'rid dle',
    'ca ble',
    'bub ble',
    'no ble',
    'fixed',
    'fix es',
    'wish es',
    'wish ing',
    'danced',
    'dan ces',
    'rest',
    'res ted',
    'end',
    'en ded',
    'saved',
  ]
  contrasts.forEach(example => {
    const expected = example.split(' ')
    const word = expected.join('')
    const actual = nlp(word).syllables()[0]
    t.deepEqual(actual, expected, word)
    t.equal(actual.join(''), word, `${word}: reconstruction`)
  })
  t.end()
})
