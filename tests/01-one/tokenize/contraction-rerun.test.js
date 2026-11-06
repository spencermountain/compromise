import test from 'tape'
import nlp from '../lib.js'
const here = '[one/contraction-rerun] '

// the words each term stands for, implicit ones included
const words = doc => doc.docs.flat().map(term => term.implicit || term.text)

test(here + 'recomputing does not expand a contraction twice', function (t) {
  const arr = [
    [`he wasn't happy`, ['he', 'was', 'not', 'happy']],
    [`i don't know`, ['i', 'do', 'not', 'know']],
    [`we'll go`, ['we', 'will', 'go']],
    [`it is 4km away`, ['it', 'is', '4', 'km', 'away']],
    [`the 44-2 game`, ['the', '44', 'to', '2', 'game']],
    [`j'aime Paris`, ['je', 'aime', 'Paris']],
  ]
  arr.forEach(a => {
    const [str, want] = a
    const doc = nlp(str)
    t.deepEqual(words(doc), want, here + 'first-pass: ' + str)
    doc.compute('contractions')
    t.deepEqual(words(doc), want, here + 're-run: ' + str)
    doc.compute('contractions')
    t.deepEqual(words(doc), want, here + 're-run again: ' + str)
    t.equal(doc.text(), str, here + 'text: ' + str)
  })
  t.end()
})

test(here + 'recomputing still expands new contractions', function (t) {
  const doc = nlp(`he wasn't happy`)
  doc.append(`we'll`)
  t.deepEqual(words(doc), ['he', 'was', 'not', 'happy', `we'll`], here + 'not-yet expanded')
  doc.compute('contractions')
  t.deepEqual(words(doc), ['he', 'was', 'not', 'happy', 'we', 'will'], here + 'only new term expanded')
  t.end()
})

test(here + 'new contractions shift the indexes after them', function (t) {
  const doc = nlp(`we ran home`)
  doc.match('ran').replaceWith(`won't`)
  doc.compute('contractions')
  t.deepEqual(words(doc), ['we', 'will', 'not', 'home'], here + 'expanded')
  t.deepEqual(doc.docs[0].map(term => term.index[1]), [0, 1, 2, 3], here + 'indexes')
  t.end()
})

test(here + 'recomputing leaves other sentences alone', function (t) {
  const doc = nlp(`she wasn't here. he isn't there.`)
  doc.eq(1).compute('contractions')
  t.deepEqual(words(doc), ['she', 'was', 'not', 'here', 'he', 'is', 'not', 'there'], here + 'both sentences')
  t.end()
})
