import test from 'tape'
import nlp from '../_lib.js'

test('standalone demonstratives in copular questions', function (t) {
  ;[
    'who is that?', 'what is this?', 'what are these?', 'what are those?',
    'who was that again?', 'what exactly is this?', 'what is really this?',
    'what exactly are those again?',
  ].forEach(str => {
    const word = nlp(str).match('(this|that|these|those)')
    t.equal(word.has('#Pronoun'), true, str + ' pronoun')
    t.equal(word.has('#Noun'), true, str + ' noun')
    t.equal(word.has('#Determiner'), false, str + ' not determiner')
  })
  ;[
    'who is that person?', 'what is this thing?', 'what are these things?', 'what are those things?',
    'what exactly is this thing?', 'who was that person again?',
    'what are those really strange things?',
  ].forEach(str => {
    t.equal(nlp(str).match('(this|that|these|those)').has('#Determiner'), true, str)
  })
  t.equal(nlp('she said that he left').match('that').has('#Conjunction'), true, 'conjunction unchanged')
  t.end()
})

test('if keeps its conditional and conjunction tags', function (t) {
  ;['if it rains, we will stay home.', 'we will stay home if it rains.'].forEach(str => {
    const word = nlp(str).match('if')
    t.equal(word.has('#Condition'), true, str + ' condition')
    t.equal(word.has('#Conjunction'), true, str + ' conjunction')
    t.equal(word.has('#Preposition'), false, str + ' not preposition')
  })
  t.equal(nlp('unless it rains, we will go.').match('unless').has('#Condition'), true, 'unless unchanged')
  t.end()
})

test('standalone demonstrative subjects and objects', t => {
  for (const str of ['this is good', 'those are mine', 'these will work', 'that really is nice', 'I like this', 'take that']) {
    const word = nlp(str).match('(this|that|these|those)')
    t.equal(word.has('#Pronoun'), true, str + ' pronoun')
    t.equal(word.has('#Determiner'), false, str + ' not determiner')
  }
  for (const str of ['this book is good', 'those books are mine', 'I like this book', 'take that box', 'this May was cold']) {
    t.equal(nlp(str).match('(this|that|these|those)').has('#Determiner'), true, str)
  }
  t.equal(nlp('she said that he left').match('that').has('#Conjunction'), true, 'embedded conjunction')
  t.end()
})
