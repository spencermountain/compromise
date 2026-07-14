import test from 'tape'
import nlp from './_lib.js'
const here = '[three/spec-tags] '

// ---------------------------------------------------------
// the closed-world of out('spec') for the full build:
//   every slot is one of these 28 root tags (Redacted comes
//   from three's redact plugin), written as its alias when
//   one exists, plus '-' for an untagged term.
// this is the vocabulary documented in docs/spec-format.md -
// keep the two in sync.
// ---------------------------------------------------------
const specWorld = {
  Abbreviation: 'Abbr',
  Acronym: 'Acronym',
  Address: 'Addr',
  Adjective: 'Adj',
  Adverb: 'Adv',
  Condition: 'Condition',
  Conjunction: 'Conj',
  Date: 'Date',
  Determiner: 'Det',
  Email: 'Email',
  Emoji: 'Emoji',
  Emoticon: 'Emoticon',
  Expression: 'Expr',
  HashTag: 'HashTag',
  Hyphenated: 'Hyphenated',
  Negative: 'Negative',
  Noun: 'Noun',
  NumberRange: 'NumberRange',
  PhoneNumber: 'PhoneNumber',
  Prefix: 'Prefix',
  Preposition: 'Prep',
  QuestionWord: 'QuestionWord',
  Redacted: 'Redacted',
  SlashedTerm: 'SlashedTerm',
  There: 'There',
  Url: 'Url',
  Value: 'Val',
  Verb: 'Vb',
}

test('spec-tags closed-world', function (t) {
  const tagSet = nlp.model().one.tagSet
  const roots = Object.keys(tagSet).filter(k => !tagSet[k].parents || tagSet[k].parents.length === 0)
  t.deepEqual(roots.sort(), Object.keys(specWorld).sort(), here + 'the 28 root tags')

  // aliases turn each root into its printed spec form
  roots.forEach(root => {
    const printed = tagSet[root].alias || root
    t.equal(printed, specWorld[root], here + `${root} prints as ${specWorld[root]}`)
  })

  // every other tag resolves up to one of these roots
  const rootSet = new Set(roots)
  const orphans = Object.keys(tagSet).filter(k => {
    const entry = tagSet[k]
    if (!entry.parents || entry.parents.length === 0) {
      return false
    }
    return !entry.parents.some(p => rootSet.has(p))
  })
  t.deepEqual(orphans, [], here + 'no tag is orphaned from a root')
  t.end()
})

test('spec-tags slots stay in-vocabulary', function (t) {
  const vocab = new Set(Object.values(specWorld))
  vocab.add('-')
  const corpus = [
    'The quick brown fox jumped over the lazy dog.',
    `don't stop believing! she said.`,
    'if it rains on june 5th 2024, we will not go outside.',
    'there are five hundred quick reasons.',
    'Visit https://nlp.com or email me@x.com today!',
    'call 902-555-1234 about #blessed 😀',
    'Dr. Smith and the F.B.I. met NASA at 5pm.',
    'wow, what a well-known game!',
    'is he really going? yes!',
    `it's a 3.5 inch disk, i think.`,
  ]
  corpus.forEach(str => {
    const out = nlp(str).out('spec')
    out.split('\n').forEach(line => {
      const tags = line.split(/\{(?=[^{]*$)/)[1].replace(/\}$/, '').split(',')
      tags.forEach(tag => {
        t.equal(vocab.has(tag), true, here + `in-vocab: '${tag}' from '${line}'`)
      })
    })
  })
  t.end()
})

test('spec-tags redact', function (t) {
  // .redact() appends the Redacted tag, so the original POS keeps the slot -
  // Redacted is a root tag, but does not surface in out('spec')
  const doc = nlp('Contact Rex Smythe-Higgins at 555-1234')
  doc.redact()
  const out = doc.out('spec')
  t.equal(/█/.test(out), true, here + 'redacted text in spec output')
  t.equal(out.split(/\{(?=[^{]*$)/)[1].includes('Redacted'), false, here + 'slot keeps the original pos')
  t.end()
})
