import test from 'tape'
import nlp from '../../_lib.js'
const here = '[three/phrasals]'

test('get phrasal infinitive', function (t) {
  const arr = [
    [` running out`, 'run out'],
    [`we walked in`, 'walk in'],
    [`then they quickly walked out`, 'walk out'],
    [`they studied up for the test`, 'study up'],
    [`they studied-up for the test`, 'study up'],
    [`they sat down for the test`, 'sit down'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    const res = doc.verbs().json()[0].verb
    t.equal(res.infinitive, a[1], here + ` '${a[0]}'`)
  })
  t.end()
})

test('phrasal roots retain standalone conjugations', function (t) {
  // These roots are supplied by the phrasal list, not the infinitive list.
  const forms = [
    ['take', 'took', 'takes', 'taking', 'taken'],
    ['freeze', 'froze', 'freezes', 'freezing', 'frozen'],
    ['write', 'wrote', 'writes', 'writing', 'written'],
    ['go', 'went', 'goes', 'going', 'gone'],
    ['die', 'died', 'dies', 'dying'],
    ['bring', 'brought', 'brings', 'bringing'],
  ]
  forms.forEach(([Infinitive, PastTense, PresentTense, Gerund, Participle]) => {
    const expected = { Infinitive, PastTense, PresentTense, Gerund, FutureTense: 'will ' + Infinitive }
    if (Participle) {
      expected.Participle = Participle
    }
    t.deepEqual(nlp(Infinitive).verbs().conjugate()[0], expected, here + ' standalone ' + Infinitive)
    t.equal(nlp('they are ' + Gerund).has('#Gerund'), true, here + ' ' + Gerund)
  })
  t.end()
})
