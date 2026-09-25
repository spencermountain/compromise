import test from 'tape'
import nlp from '../_lib.js'

const here = '[two/tag-invariants] '
const blank = () => nlp('xyz').unTag('*')

// Check the resulting term, rather than prescribing which compatible tags survive.
// `also` parents have the same presence requirement as `is` parents.
const violations = function (doc, tagSet) {
  const tags = doc.termList()[0].tags
  const errors = new Set()
  for (const tag of tags) {
    const entry = tagSet[tag] || {}
    for (const parent of entry.parents || []) {
      if (!tags.has(parent)) {
        errors.add(`${tag} requires ${parent}`)
      }
    }
    for (const incompatible of entry.not || []) {
      if (tags.has(incompatible)) {
        // Collapse reciprocal exclusions into one diagnostic.
        errors.add(`${[tag, incompatible].sort().join(' conflicts with ')}`)
      }
    }
  }
  return [...errors].sort()
}

test('tag invariants: representative ordered pairs', function (t) {
  const tagSet = nlp.world().model.one.tagSet
  const pairs = [
    ['Noun', 'Verb'], // ordinary exclusion: passing control
    ['FirstName', 'Plural'], // inherited exclusion: passing control
    ['Value', 'Year'], // legitimate overlap: passing control
    ['Value', 'Month'], // also-parent exclusion is not inherited
    ['Month', 'Value'], // also-child survives removal of its parent
    ['Person', 'Prefix'], // ProperNoun is removed but Person survives
    ['Country', 'Timezone'], // another missing ProperNoun parent
    ['Unit', 'Acronym'], // asymmetric exclusion from the shared entity array
  ]
  pairs.forEach(([first, second]) => {
    const doc = blank().tag(first).tag(second)
    t.ok(doc.has(`#${second}`), here + `${first} -> ${second}: new tag is present`)
    t.deepEqual(violations(doc, tagSet), [], here + `${first} -> ${second}: consistent result`)
  })
  t.end()
})

test('tag invariants: safe tagging checks implied parents', function (t) {
  const tagSet = nlp.world().model.one.tagSet
  const doc = blank().tag('Value')
  const before = [...doc.termList()[0].tags].sort()
  t.equal(doc.canBe('Month').found, false, here + 'Value cannot also become Month/Noun')
  doc.tagSafe('Month')
  t.deepEqual([...doc.termList()[0].tags].sort(), before, here + 'rejected safe tag leaves tags unchanged')
  t.deepEqual(violations(doc, tagSet), [], here + 'safe tagging preserves invariants')
  t.end()
})

test('tag invariants: removing an also parent removes its dependent tag', function (t) {
  const tagSet = nlp.world().model.one.tagSet
  const doc = blank().tag('Month').unTag('Noun')
  t.equal(doc.has('#Noun'), false, here + 'Noun was removed')
  t.equal(doc.has('#Month'), false, here + 'Month cannot survive without Noun')
  t.deepEqual(violations(doc, tagSet), [], here + 'untagging preserves invariants')
  t.end()
})

// Intentionally assert the desired invariants, including currently failing cases.
// Derive the matrix from the active tagset so new tags get the same coverage.
for (const method of ['tag', 'tagSafe']) {
  test(`tag invariants: all ordered pairs using ${method}`, function (t) {
    const tagSet = nlp.world().model.one.tagSet
    const names = Object.keys(tagSet)
    names.forEach(first => {
      const failures = []
      names.forEach(second => {
        const doc = blank().tag(first)
        doc[method](second)
        const errors = violations(doc, tagSet)
        if (errors.length) {
          failures.push({ second, errors })
        }
      })
      t.deepEqual(failures, [], here + `${first} -> ${method}(each tag): consistent results`)
    })
    t.end()
  })
}
