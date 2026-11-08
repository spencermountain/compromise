import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/question-lead-word] '

const convert = function (str, selection, method) {
  const doc = nlp(str)
  doc[selection]()[method]()
  return doc.text()
}

const selections = ['sentences', 'verbs']
const leads = ['Well, ', 'Homer, ', 'Mr. Smith, ', 'Oh well, ', 'Uh-oh, ', 'please ', 'Please, ', 'Homer, please ']

const questions = [
  'did she walk?',
  'have you eaten?',
  'could you open the door?',
  'is he happy?',
  'are the dogs sleeping?',
  'is Tom a doctor?',
  "didn't you go?",
  "won't they arrive?",
  'why did she walk?',
  'where are you going?',
  'which books did you read?',
  'in which city do they live?',
  "why doesn't he walk?",
  // no main verb
  'did you?',
  'has she?',
  'why did you really?',
]

const methods = ['toNegative', 'toPositive', 'toPastTense', 'toPresentTense', 'toFutureTense', 'toInfinitive']

test('same result as without the leading word', function (t) {
  for (const selection of selections) {
    for (const method of methods) {
      for (const str of questions) {
        const want = convert(str, selection, method)
        for (const lead of leads) {
          t.equal(convert(lead + str, selection, method), lead + want, here + `${selection} ${method} ${lead + str}`)
        }
      }
    }
  }
  t.end()
})

test('a negative follows the subject', function (t) {
  const arr = [
    ['Homer, have you eaten?', 'Homer, have you not eaten?'],
    ['Well, did she walk?', 'Well, did she not walk?'],
    ['please could you open the door?', 'please could you not open the door?'],
    ['Please, could you open the door?', 'Please, could you not open the door?'],
    ['Homer, please could you open the door?', 'Homer, please could you not open the door?'],
    ['Mr. Burns, is the book on the table?', 'Mr. Burns, is the book not on the table?'],
    ['Well, why did she walk?', 'Well, why did she not walk?'],
    ['Well, did you?', 'Well, did you not?'],
    ['please do you know the way?', 'please do you not know the way?'],
    ['please have you seen it?', 'please have you not seen it?'],
    ['please do the kids walk the dog?', 'please do the kids not walk the dog?'],
    ['please do the walls really need paint?', 'please do the walls not really need paint?'],
    ['"Well, did she walk?"', '"Well, did she not walk?"'],
    ['He left. Well, did she walk?', 'He did not leave. Well, did she not walk?'],
    // already negative
    ["Well, isn't he happy?", "Well, isn't he happy?"],
    ['Well, did she not walk?', 'Well, did she not walk?'],
  ]
  arr.forEach(([str, want]) => {
    for (const selection of selections) {
      t.equal(convert(str, selection, 'toNegative'), want, here + `${selection} ${str}`)
      // stable when repeated
      t.equal(convert(want, selection, 'toNegative'), want, here + `${selection} again ${want}`)
    }
  })
  t.end()
})

test('a negative is removed', function (t) {
  const arr = [
    ['Homer, have you not eaten?', 'Homer, have you eaten?'],
    ['Well, did she not walk?', 'Well, did she walk?'],
    ['please could you not open the door?', 'please could you open the door?'],
    ["Homer, isn't he here?", 'Homer, is he here?'],
  ]
  arr.forEach(([str, want]) => {
    for (const selection of selections) {
      t.equal(convert(str, selection, 'toPositive'), want, here + `${selection} ${str}`)
    }
  })
  t.end()
})

test('tense conversions', function (t) {
  const arr = [
    ['Well, did she walk?', 'toFutureTense', 'Well, will she walk?'],
    ['Well, did she walk?', 'toPresentTense', 'Well, does she walk?'],
    ['Well, did she walk?', 'toPastTense', 'Well, did she walk?'],
    ['Homer, have you eaten?', 'toFutureTense', 'Homer, will you have eaten?'],
    ['Homer, have you eaten?', 'toPastTense', 'Homer, had you eaten?'],
    ['Homer, is he happy?', 'toPastTense', 'Homer, was he happy?'],
    ['Homer, is he happy?', 'toFutureTense', 'Homer, will he be happy?'],
    ['please do you know the way?', 'toPastTense', 'please did you know the way?'],
    ['please could you open the door?', 'toPastTense', 'please could you have opened the door?'],
    ['Well, is the book on the table?', 'toFutureTense', 'Well, will the book be on the table?'],
    ["Well, isn't he happy?", 'toFutureTense', "Well, won't he be happy?"],
    ['Well, did you?', 'toFutureTense', 'Well, will you?'],
    ['Homer, has she?', 'toFutureTense', 'Homer, will she have?'],
    ['Well, why did she walk?', 'toFutureTense', 'Well, why will she walk?'],
    ['Homer, which books did you read?', 'toFutureTense', 'Homer, which books will you read?'],
  ]
  arr.forEach(([str, method, want]) => {
    for (const selection of selections) {
      t.equal(convert(str, selection, method), want, here + `${selection} ${method} ${str}`)
    }
  })
  t.end()
})

test('selecting verbs', function (t) {
  const doc = nlp('Well, did she walk?')
  t.deepEqual(doc.verbs().toFutureTense().out('array'), ['will', 'walk?'], here + 'auxiliary and verb')
  t.equal(doc.text(), 'Well, will she walk?', here + 'whole sentence')
  // part of the question can't move the auxiliary
  const partial = nlp('Well, did she walk?')
  partial.verbs().eq(1).toFutureTense()
  t.equal(partial.text(), 'Well, did she walk?', here + 'partial selection')
  t.end()
})

// These stay on the ordinary path, so their output isn't always right. It just shouldn't change.
test('not a question after a lead', function (t) {
  const arr = [
    // statements with a lead, or a comma
    ['Had I known, I would have left earlier.', 'toNegative', 'Had I known, I would not have left earlier.'],
    ['When he is late, they walk.', 'toNegative', 'When he is late, they do not walk.'],
    ['Well, she walks.', 'toNegative', 'Well, she does not walk.'],
    ['Well, she walks.', 'toPastTense', 'Well, she walked.'],
    ['Well, she walks.', 'toFutureTense', 'Well, she will walk.'],
    ['Well, she walks?', 'toNegative', 'Well, she does not walk?'],
    ['Well, did she walk.', 'toFutureTense', 'Well, will do she walk.'],
    // a statement with a question tagged on
    ['You walk, do you?', 'toNegative', 'You do not walk, do you?'],
    ['You walk, do you?', 'toPastTense', 'You walked, did you?'],
    ['He ate, did he?', 'toNegative', 'He did not eat, did he?'],
    // commands
    ['Please do the dishes.', 'toFutureTense', 'Please will do the dishes.'],
    ['Please do the dishes?', 'toNegative', 'Please does not do the dishes?'],
    ['Please do the dishes now?', 'toNegative', 'Please does not do the dishes now?'],
    ['please do it?', 'toNegative', 'please does not do it?'],
    ['please have a seat?', 'toNegative', 'please do not have a seat?'],
    // too long to be a short lead
    ['My very dear old friend, did you walk?', 'toFutureTense', 'My very dear old friend, will do you walk?'],
  ]
  arr.forEach(([str, method, want]) => {
    t.equal(convert(str, 'sentences', method), want, here + `${method} ${str}`)
  })
  t.end()
})
