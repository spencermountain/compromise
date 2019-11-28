const test = require('tape')
const nlp = require('./_lib')

// const doc = nlp('quick').adjectives()
test('to_adverb:', function(t) {
  const list = [
    ['quick', 'quickly'],
    // ['idle', 'idly'],
    ['dirty', ''],
    // ['fun', ''],
    ['full', ''],
    // ['quixotic', 'quixotically'],
    ['cute', 'cutely'],
    // ['good', 'well'],
    // ['low', 'low']
  ]
  list.forEach(function(a) {
    const doc = nlp(a[0])
      .adjectives()
      .toAdverb()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})

test(' to_superlative', function(t) {
  let list = [
    ['quick', 'quickest'],
    ['friendly', 'friendliest'],
    // ['caring', 'most caring'],
    // ['fun', 'most fun'],
    ['full', 'fullest'],
    // ['quixotic', 'most quixotic'],
    ['cute', 'cutest'],
    ['large', 'largest'],
  ]
  list.forEach(function(a) {
    const doc = nlp(a[0])
      .adjectives()
      .toSuperlative()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})
//
test(' to_comparative', function(t) {
  let list = [
    ['quick', 'quicker'],
    ['friendly', 'friendlier'],
    // ['caring', 'more caring'],
    // ['fun', 'more fun'],
    ['full', 'fuller'],
    // ['quixotic', 'more quixotic'],
    ['cute', 'cuter'],
  ]
  list.forEach(function(a) {
    const doc = nlp(a[0])
      .adjectives()
      .toComparative()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})

test(' to_noun', function(t) {
  let list = [
    ['quick', 'quickness'],
    ['fancy', 'fanciness'],
    // ['ferocious', 'ferociousness'],
    ['clean', 'cleanliness'],
  ]
  list.forEach(function(a) {
    const doc = nlp(a[0])
      .adjectives()
      .toNoun()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})

test(' conjugate', function(t) {
  const o = nlp('nice')
    .adjectives()
    .conjugate(0)
  t.equal(o.Comparative, 'nicer', 'comparative')
  t.equal(o.Superlative, 'nicest', 'superlative')
  t.equal(o.Adverb, 'nicely', 'adverb')
  t.equal(o.Noun, 'niceness', 'noun')
  t.end()
})
