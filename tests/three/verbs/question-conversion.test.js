import test from 'tape'
import nlp from '../_lib.js'

const cases = [
  ['Has she eaten?', 'Had she eaten?', 'Has she eaten?', 'Will she have eaten?'],
  ['Did she walk?', 'Did she walk?', 'Does she walk?', 'Will she walk?'],
  ['Is she swimming?', 'Was she swimming?', 'Is she swimming?', 'Will she be swimming?'],
  ['Will they arrive?', 'Did they arrive?', 'Do they arrive?', 'Will they arrive?'],
  ["Why doesn't he walk?", "Why didn't he walk?", "Why doesn't he walk?", "Why won't he walk?"],
  ['Why doesn’t he walk?', 'Why didn’t he walk?', 'Why doesn’t he walk?', 'Why won’t he walk?'],
  ['Why does he not walk?', 'Why did he not walk?', 'Why does he not walk?', 'Why will he not walk?'],
  ["Isn't she swimming?", "Wasn't she swimming?", "Isn't she swimming?", "Won't she be swimming?"],
  ["Won't they arrive?", "Didn't they arrive?", "Don't they arrive?", "Won't they arrive?"],
  ['Are the dogs sleeping?', 'Were the dogs sleeping?', 'Are the dogs sleeping?', 'Will the dogs be sleeping?'],
  ['Is the dog happy?', 'Was the dog happy?', 'Is the dog happy?', 'Will the dog be happy?'],
  ['Where is John?', 'Where was John?', 'Where is John?', 'Where will John be?'],
  ['Has the box of pencils fallen?', 'Had the box of pencils fallen?', 'Has the box of pencils fallen?', 'Will the box of pencils have fallen?'],
  ['Has she been watched?', 'Had she been watched?', 'Has she been watched?', 'Will she have been watched?'],
  ['Is she being watched?', 'Was she being watched?', 'Is she being watched?', 'Will she be being watched?'],
  ['Who walks?', 'Who walked?', 'Who walks?', 'Who will walk?'],
  ['Has she eaten and slept?', 'Had she eaten and slept?', 'Has she eaten and slept?', 'Will she have eaten and slept?'],
]

const verify = (t, input, expected, method, selection) => {
  const doc = nlp(input)
  doc[selection]()[method]()
  t.equal(doc.text(), expected, selection + '.' + method + ': ' + input)
  doc[selection]()[method]()
  t.equal(doc.text(), expected, 'repeated: ' + input)
  const fresh = nlp(expected)
  fresh[selection]()[method]()
  t.equal(fresh.text(), expected, 'fresh: ' + expected)
}

test('question conversion retains inversion, aspect and negative placement', t => {
  cases.forEach(([input, ...expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      ['toPastTense', 'toPresentTense', 'toFutureTense'].forEach((method, i) => {
        verify(t, input, expected[i], method, selection)
      })
    }
  })
  t.end()
})

test('question perfect and gerund conversions use the same auxiliary model', t => {
  const rows = [
    ['Did she walk?', 'Has she walked?', 'toPastParticiple'],
    ['Has she eaten?', 'Is she eating?', 'toGerund'],
    ['Has she been watched?', 'Is she being watched?', 'toGerund'],
    ['Has she eaten?', 'Does she eat?', 'toInfinitive'],
  ]
  rows.forEach(([input, expected, method]) => verify(t, input, expected, method, 'verbs'))
  t.end()
})

test('question conversion respects selection and sentence boundaries', t => {
  const selected = nlp('Has she eaten?')
  selected.verbs(0).toPastTense()
  t.equal(selected.text(), 'Has she eaten?', 'incomplete inverted phrase stays intact')
  verify(t, 'Has she eaten? They walk.', 'Had she eaten? They walked.', 'toPastTense', 'verbs')
  verify(t, 'Has she eaten? Is he swimming?', 'Will she have eaten? Will he be swimming?', 'toFutureTense', 'sentences')
  verify(t, 'Will Smith walked.', 'Will Smith walks.', 'toPresentTense', 'verbs')
  const chained = nlp('Has she eaten?')
  chained.verbs().toPastTense().verbs().toFutureTense()
  t.equal(chained.text(), 'Will she have eaten?', 'returned selection retains the complete inverted phrase')
  t.end()
})
