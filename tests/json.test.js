var test = require('tape')
var nlp = require('./_lib')

const hasTag = function(term, want) {
  return term.tags.some(tag => tag === want)
}

test('json out default', function(t) {
  let doc = nlp('who are you? what is this?')
  let json = doc.json({ terms: true })
  t.equal(json.length, 2, 'json-len')
  t.equal(json[1].text, 'what is this?', 'json-text')
  t.equal(json[1].terms.length, 3, 'json-three-terms')
  t.equal(hasTag(json[1].terms[1], 'Copula'), true, 'json-has-tag')
  t.end()
})

test('json out implicit', function(t) {
  let str = `he isn't`
  let doc = nlp(str)
  let json = doc.json()
  t.equal(json.length, 1, 'json-len')
  t.equal(json[0].text, str, 'json-text')
  t.equal(json[0].terms.length, 3, 'json-three-terms')
  t.equal(json[0].terms[0].implicit, undefined, 'has-no-implicit')
  t.equal(hasTag(json[0].terms[1], 'Copula'), true, 'json-has-tag')
  t.equal(json[0].terms[1].implicit, 'is', 'has-implicit1')
  t.equal(hasTag(json[0].terms[2], 'Negative'), true, 'json-has-tag2')
  t.equal(json[0].terms[2].implicit, 'not', 'has-implicit2')
  t.end()
})

test('json terms out', function(t) {
  let doc = nlp(`she is not`)
  let json = doc.json({ text: false, terms: { clean: true, id: true, bestTag: true, raw: true, whitespace: true } })
  t.equal(json.length, 1, 'json-len')
  t.equal(json[0].text, undefined, 'json-text')
  t.equal(json[0].terms.length, 3, 'json-terms-length')
  t.equal(json[0].terms[0].bestTag, 'Pronoun', 'json-terms-bestTag')
  t.equal(json[0].terms[1].bestTag, 'Copula', 'json-terms-bestTag1')
  t.equal(json[0].terms[2].bestTag, 'Negative', 'json-terms-bestTag2')
  t.equal(json[0].terms[2].raw, 'not', 'json-terms-raw')
  t.equal(json[0].terms[1].pre, '', 'json-terms-whitespace-pre')
  t.equal(json[0].terms[1].post, ' ', 'json-terms-whitespace-post')
  t.end()
})
