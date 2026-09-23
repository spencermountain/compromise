import test from 'tape'
import nlp from '../_lib.js'

test('work takes the base form in modal and do-support questions', t => {
  for (const str of ['does that work?', 'will that work?', 'could that work?']) {
    const word = nlp(str).match('work')
    t.equal(word.has('#Infinitive'), true, str)
    t.equal(word.has('#PastTense'), false, str + ' not past')
  }
  t.equal(nlp('that worked').match('worked').has('#PastTense'), true, 'ordinary past tense')
  t.end()
})

test('perfect read uses an auxiliary and a participle', t => {
  for (const str of ['I have read the book', 'I had read the book', 'she has read the book', 'I had already read the book', 'she has not read it']) {
    const doc = nlp(str)
    const aux = doc.match('(has|have|had)')
    t.equal(aux.has('#Auxiliary'), true, str + ' auxiliary')
    t.equal(aux.has('#Modal'), false, str + ' not modal')
    t.equal(doc.match('read').has('#Participle'), true, str + ' participle')
  }
  t.equal(nlp('I can read').match('can').has('#Modal'), true, 'real modal remains')
  t.end()
})

test('predicative home and subject before to', t => {
  for (const [str, word, tag] of [
    ['this island is home to birds', 'home', 'Noun'],
    ['this island was once home to birds', 'home', 'Noun'],
    ['this island will be home to birds', 'home', 'Noun'],
    ['she is subject to review', 'subject', 'Adjective'],
    ['she will be subject to review', 'subject', 'Adjective'],
    ['it remains subject to review', 'subject', 'Adjective'],
  ]) {
    const doc = nlp(str)
    t.equal(doc.match(word).has('#' + tag), true, str)
    t.equal(doc.match(word).has('#Verb'), false, str + ' not verb')
  }
  const doc = nlp('she is subject to review')
  t.equal(doc.match('to').has('#Preposition'), true, 'to review is prepositional')
  t.equal(doc.match('review').has('#Noun'), true, 'review is its object')
  for (const [str, word] of [
    ['we subject them to review', 'subject'],
    ['she subjected him to review', 'subjected'],
    ['pigeons home to their nests', 'home'],
    ['they will home to their nests', 'home'],
  ]) {
    t.equal(nlp(str).match(word).has('#Verb'), true, str + ' keeps verb')
  }
  t.end()
})
