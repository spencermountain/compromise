import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/question-lead-punct] '

// punctuation before the first word shouldn't change how a question converts
const wraps = [
  str => `-${str}`,
  str => `- ${str}`,
  str => `—${str}`,
  str => `–${str}`,
  str => `"${str}"`,
  str => `“${str}”`,
  str => `'${str}'`,
  str => `(${str})`,
  str => `...${str}`,
]

const questions = [
  'Did you want some coffee?',
  'Do you want some coffee?',
  'Can you hear me now?',
  'Is she swimming?',
  'Has she eaten?',
  'Are the dogs sleeping?',
  "Didn't you go?",
  "Won't they arrive?",
  'What are you wearing?',
  'Where did you go last night?',
  'Which books did you read?',
  'In which city do they live?',
  "Why doesn't he walk?",
]

const methods = ['toPastTense', 'toPresentTense', 'toFutureTense']

const convert = function (str, selection, method) {
  const doc = nlp(str)
  doc[selection]()[method]()
  return doc.text()
}

test('same result as without the punctuation', function (t) {
  for (const selection of ['verbs', 'sentences']) {
    for (const method of methods) {
      for (const str of questions) {
        const want = convert(str, selection, method)
        for (const wrap of wraps) {
          t.equal(convert(wrap(str), selection, method), wrap(want), here + `${selection} ${method} ${wrap(str)}`)
        }
      }
    }
  }
  t.end()
})

test('leading punctuation', function (t) {
  const arr = [
    ['-Did you want some coffee?', 'toPastTense', '-Did you want some coffee?'],
    ['-Do you want some coffee?', 'toPastTense', '-Did you want some coffee?'],
    ['-Did you want some coffee?', 'toPresentTense', '-Do you want some coffee?'],
    ['- Did you want some coffee?', 'toFutureTense', '- Will you want some coffee?'],
    ['-What are you wearing?', 'toPastTense', '-What were you wearing?'],
    ['—Is it raining?', 'toFutureTense', '—Will it be raining?'],
    ['"Do you want some coffee?"', 'toPastTense', '"Did you want some coffee?"'],
    ['“Do you want some coffee?”', 'toPastTense', '“Did you want some coffee?”'],
    ["'Do you want some coffee?'", 'toPastTense', "'Did you want some coffee?'"],
    ['(Can you hear me now?)', 'toPastTense', '(Could you hear me now?)'],
    ["-Didn't you go?", 'toFutureTense', "-Won't you go?"],
    ['-which books did you read?', 'toFutureTense', '-which books will you read?'],
  ]
  arr.forEach(([str, method, want]) => {
    t.equal(convert(str, 'verbs', method), want, here + `${method} ${str}`)
  })
  t.end()
})

test('returned selection', function (t) {
  const doc = nlp('-Did you want some coffee?')
  t.deepEqual(doc.verbs().toPresentTense().out('array'), ['-Do', 'want'], here + 'auxiliary and verb')
  t.end()
})

test('not a question', function (t) {
  t.equal(convert('-He runs fast.', 'verbs', 'toPastTense'), '-He ran fast.', here + 'statement')
  t.equal(convert('"He runs fast."', 'verbs', 'toPastTense'), '"He ran fast."', here + 'quoted statement')
  t.equal(convert("'Tis fine.", 'verbs', 'toPastTense'), "'It was fine.", here + 'leading apostrophe')
  t.end()
})

test('the ending is kept', function (t) {
  t.equal(convert('Did you want some coffee?!', 'verbs', 'toPresentTense'), 'Do you want some coffee?!', here + 'two marks')
  t.equal(convert('Is she swimming? ', 'verbs', 'toPastTense'), 'Was she swimming? ', here + 'trailing space')
  t.end()
})

test('a conversion that stops reading as a question', function (t) {
  ;['How are you doing today?', '-How are you doing today?'].forEach(str => {
    t.doesNotThrow(() => nlp(str).verbs().toInfinitive(), here + str)
  })
  t.end()
})
