const test = require('tape')
const nlp = require('./_lib')

test('penn-tags', function (t) {
  let doc = nlp('i gave John Smith 900£ on December 1 in Paris, France.')
  let json = doc.pennTags()
  t.equal(json.length, 1, '1 sentence')
  let terms = json[0].terms
  let have = terms.map((o) => o.penn).join('|')
  let want = `PRP|VBD|NNP|NNP|CD|IN|NN|CD|IN|NNP|NNP`
  t.equal(have, want, 'penn-tags')
  t.end()
})

test('json-match', function (t) {
  let doc = nlp('in the town where I was born')
  let json = doc.match('town').pennTags({ offset: true })
  t.ok(json[0].offset, 'has offset')
  t.equal(json[0].terms.length, 1, 'has match term')
  t.equal(json[0].terms[0].penn, 'NN', 'has noun term')
  t.end()
})
