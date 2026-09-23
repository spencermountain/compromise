import test from 'tape'
import nlp from '../_lib.js'

test('work takes the base form in modal and do-support questions', t => {
  for (const str of ['does that work?', 'will that work?', 'could that work?', 'can this work?', 'do these work?', 'will those work?']) {
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


test('home distinguishes residents from an infinitive of purpose', t => {
  for (const str of ['she is home to rest', 'he is home to work', 'she will be home to rest']) {
    const doc = nlp(str)
    t.equal(doc.match('(rest|work)').has('#Infinitive'), true, str + ' purpose')
    t.equal(doc.match('to').has('#Preposition'), false, str + ' infinitival to')
  }
  for (const str of ['the island is home to birds', 'the island is home to wildlife', 'the island is home to rare birds']) {
    t.equal(nlp(str).match('to').has('#Preposition'), true, str + ' residents')
  }
  t.end()
})

test('been does not turn adjective suffixes into verbs', t => {
  for (const [str, word] of [
    ['the house has been green for years', 'green'],
    ['the light has been red for minutes', 'red'],
  ]) {
    const doc = nlp(str)
    t.equal(doc.match(word).has('#Adjective'), true, str)
    t.equal(doc.match(word).has('#Verb'), false, str + ' not verb')
  }
  for (const [str, word] of [
    ['it has been broken', 'broken'], ['it has been smoked', 'smoked'],
    ['she has been seen', 'seen'],
  ]) {
    t.equal(nlp(str).match(word).has('#PastTense'), true, str + ' still a verb')
  }
  t.end()
})

test('pretty preserves adjective-noun complements', t => {
  const doc = nlp('that is pretty furniture')
  t.equal(doc.match('pretty').has('#Adjective'), true, 'pretty adjective')
  t.equal(doc.match('furniture').has('#Noun'), true, 'furniture noun')
  t.equal(doc.match('furniture').has('#Adjective'), false, 'furniture not adjective')
  const adverb = nlp('she is pretty good')
  t.equal(adverb.match('pretty').has('#Adverb'), true, 'pretty intensifier')
  t.equal(adverb.match('good').has('#Adjective'), true, 'good adjective')
  t.end()
})
