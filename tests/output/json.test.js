const test = require('tape')
const nlp = require('../_lib')

const hasTag = function (term, want) {
  if (!term || !term.tags) {
    return false
  }
  return term.tags.some(tag => tag === want)
}

test('json out default', function (t) {
  let doc = nlp('who are you? what is this?')
  let json = doc.json({ terms: true })
  t.equal(json.length, 2, 'json-len')
  t.equal(json[1].text, 'what is this?', 'json-text')
  t.equal(json[1].terms.length, 3, 'json-three-terms')
  t.equal(hasTag(json[1].terms[1], 'Copula'), true, 'json-has-tag')
  t.end()
})

test('json out trim', function (t) {
  let doc = nlp('who are you? what is this?')
  let json = doc.json({ trim: false, terms: false })
  t.equal(json.length, 2, 'json-len')
  t.equal(json[0].text, 'who are you? ', 'json-text')
  t.equal(json[1].text, 'what is this?', 'json-text')
  t.equal(json[1].terms, undefined, 'json-no-terms')
  t.end()
})

test('json out implicit', function (t) {
  let str = `he isn't`
  let doc = nlp(str)
  let json = doc.json()
  t.equal(json.length, 1, 'json-len')
  t.equal(json[0].text, str, 'json-text')
  t.equal(json[0].terms.length, 3, 'json-three-terms')
  let t0 = json[0].terms[0] || {}
  t.equal(t0.implicit, undefined, 'has-no-implicit')
  let t1 = json[0].terms[1] || {}
  t.equal(hasTag(t1, 'Copula'), true, 'json-has-tag')
  t.equal(t1.implicit, 'is', 'has-implicit1')
  t.equal(hasTag(json[0].terms[2], 'Negative'), true, 'json-has-tag2')
  let t2 = json[0].terms[2] || {}
  t.equal(t2.implicit, 'not', 'has-implicit2')
  t.end()
})

test('json terms out', function (t) {
  let doc = nlp(`she was not`)
  let json = doc.json({ text: false, terms: { clean: true, id: true, bestTag: true, whitespace: true } })
  t.equal(json.length, 1, 'json-len')
  t.equal(json[0].text, undefined, 'json-text')
  t.equal(json[0].terms.length, 3, 'json-terms-length')
  let t0 = json[0].terms[0] || {}
  t.equal(t0.bestTag, 'Pronoun', 'json-terms-bestTag')
  let t1 = json[0].terms[1] || {}
  t.equal(t1.bestTag, 'Copula', 'json-terms-bestTag1')
  let t2 = json[0].terms[2] || {}
  t.equal(t2.bestTag, 'Negative', 'json-terms-bestTag2')

  t.equal(t1.pre, '', 'json-terms-whitespace-pre')
  t.equal(t1.post, ' ', 'json-terms-whitespace-post')
  t.end()
})

test('json-index:', function (t) {
  let doc = nlp(`john is not really walking`)
  let obj = doc.match('really').json({ index: true })[0]
  t.equal(obj.terms[0].index, 3, 'index:3')
  t.equal(obj.index, 3, 'phrase-index:3')
  t.end()
})

test('json-unique:', function (t) {
  let doc = nlp(`a b c b a`)
  let arr = doc.terms().json({ unique: true, terms: false, count: true })
  t.equal(arr.length, 3, 'no duplicates')
  t.end()
})

test('out-custom:', function (t) {
  const doc = nlp('The competent drum work of Don Brewer?')
  const arr = doc.json({
    terms: {
      text: true,
      normal: false,
      tags: true,
      sdf: true,
      root: true,
    },
  })[0].terms
  t.equal(arr[0].text, 'The', 'has text')
  // t.equal(arr[5].root, 'don', 'has root')
  t.equal(arr[5].sdf, undefined, 'has no sdf')
  t.equal(
    arr[0].tags.some(tag => tag === 'Determiner'),
    true,
    'has tags'
  )
  t.end()
})

test('out:', function (t) {
  let doc = nlp(`john is not really walking`)
  let json = doc.out('json')
  t.equal(json.length, 1, 'one-json')
  json = doc.out('offset')
  t.equal(json.length, 1, 'offset-out')

  let terms = doc.out('terms')
  t.equal(terms[0], 'john', 'terms-out')
  t.end()
})
