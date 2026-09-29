import test from 'tape'
import nlp from './_lib.js'

test('statistics handle inherited dictionary keys', t => {
  const doc = nlp('constructor constructor apple')
  t.equal(doc.buildIDF().constructor, '0.176', 'IDF counts constructor as a word')
  t.ok(doc.tfidf().every(([, score]) => Number.isFinite(score)), 'default TF-IDF weights stay numeric')
  t.deepEqual(doc.tfidf({}, { constructor: 0, apple: 2 }), [['apple', 2], ['constructor', 0]], 'custom weights preserve zero')
  const edges = nlp('constructor').edgeGrams({ size: 1 })
  t.equal(edges[0].normal, 'constructor', 'edge grams retain inherited names')
  t.equal(edges[0].count, 2, 'combines start and end counts')
  t.end()
})
