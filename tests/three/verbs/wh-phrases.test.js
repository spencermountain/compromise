import test from 'tape'
import nlp from '../_lib.js'

const rows = [
  ['Which books has she read?', 'Which books had she read?', 'Which books has she read?', 'Which books will she have read?'],
  ['Whose car did she borrow?', 'Whose car did she borrow?', 'Whose car does she borrow?', 'Whose car will she borrow?'],
  ['How many books did they read?', 'How many books did they read?', 'How many books do they read?', 'How many books will they read?'],
  ['In which city does she live?', 'In which city did she live?', 'In which city does she live?', 'In which city will she live?'],
  ['What kind of books has she read?', 'What kind of books had she read?', 'What kind of books has she read?', 'What kind of books will she have read?'],
  ["Which books hasn't she read?", "Which books hadn't she read?", "Which books hasn't she read?", "Which books won't she have read?"],
  ['How many dogs were barking?', 'How many dogs were barking?', 'How many dogs are barking?', 'How many dogs will be barking?'],
  ['Which dog is barking?', 'Which dog was barking?', 'Which dog is barking?', 'Which dog will be barking?'],
  ['Which books are on the table?', 'Which books were on the table?', 'Which books are on the table?', 'Which books will be on the table?'],
  ['Which dogs are hungry?', 'Which dogs were hungry?', 'Which dogs are hungry?', 'Which dogs will be hungry?'],
]

test('object wh-phrases invert while subject wh-phrases retain subject order', t => {
  rows.forEach(([input, ...expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      ['toPastTense', 'toPresentTense', 'toFutureTense'].forEach((method, i) => {
        const doc = nlp(input)
        doc[selection]()[method]()
        t.equal(doc.text(), expected[i], selection + '.' + method + ': ' + input)
        doc[selection]()[method]()
        t.equal(doc.text(), expected[i], 'repeated: ' + input)
        const fresh = nlp(expected[i])
        fresh[selection]()[method]()
        t.equal(fresh.text(), expected[i], 'fresh: ' + expected[i])
      })
    }
  })
  t.end()
})

test('embedded wh-nouns are not conjugated and remain in statement order', t => {
  const input = 'She asked which books he had read.'
  const embedded = [
    ['toPastTense', input],
    ['toPresentTense', 'She asks which books he has read.'],
    ['toFutureTense', 'She will ask which books he will have read.'],
  ]
  embedded.forEach(([method, expected]) => {
    const doc = nlp(input)
    doc.verbs()[method]()
    t.equal(doc.text(), expected, method)
    doc.verbs()[method]()
    t.equal(doc.text(), expected, 'repeated: ' + method)
    const fresh = nlp(expected)
    fresh.verbs()[method]()
    t.equal(fresh.text(), expected, 'fresh: ' + method)
  })
  const selected = nlp('She walks. Which books has he read? They sleep.')
  selected.sentences(1).toFutureTense()
  t.equal(selected.text(), 'She walks. Which books will he have read? They sleep.', 'wh selection stays in its sentence')
  t.end()
})
