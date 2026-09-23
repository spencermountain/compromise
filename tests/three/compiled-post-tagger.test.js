import test from 'tape'
import nlp from './_lib.js'

test('warm post-tagger uses compiled, tag-only passes', t => {
  nlp('warm up the post tagger')
  const world = nlp.world()
  const originalCompute = world.compute.postTagger
  const originalParse = world.methods.one.parseMatch
  const prototype = Object.getPrototypeOf(nlp(''))
  const ownSweep = Object.getOwnPropertyDescriptor(prototype, 'sweep')
  const originalSweep = prototype.sweep
  let active = false
  let parses = 0
  let sweeps = 0
  // Wrap only the post-tagger: the rest of the public API may parse patterns.
  world.compute.postTagger = view => {
    active = true
    try {
      return originalCompute(view)
    } finally {
      active = false
    }
  }
  prototype.sweep = function (...args) {
    if (active) {
      sweeps += 1
    }
    return originalSweep.apply(this, args)
  }
  world.methods.one.parseMatch = (...args) => {
    if (active) {
      parses += 1
    }
    return originalParse(...args)
  }
  try {
    const doc = nlp('I know that works. Had she left already? Could you help me, please?')
    t.equal(doc.match('that').has('#Pronoun'), true, 'subject and predicate corrections share the incoming tags')
    t.equal(doc.match('had').has('#Auxiliary'), true, 'question rule is distinct from conditional rule')
    t.equal(doc.match('help').has('#Imperative'), true, 'sentence rule crosses comma boundary')
  } finally {
    world.compute.postTagger = originalCompute
    world.methods.one.parseMatch = originalParse
    if (ownSweep) {
      Object.defineProperty(prototype, 'sweep', ownSweep)
    } else {
      delete prototype.sweep
    }
  }
  t.equal(parses, 0, 'no pattern parsing after compilation')
  t.equal(sweeps, 0, 'uses tag-only path')
  t.end()
})

test('compiled refinements respect partial Views', t => {
  const doc = nlp.tokenize('I know that works. I know that works.')
  doc.eq(1).compute('tagger')
  t.equal(doc.eq(0).has('#Pronoun'), false, 'excluded sentence untouched')
  t.equal(doc.eq(1).match('that').has('#Pronoun'), true, 'selected sentence refined')
  t.equal(doc.eq(1).match('works').has('#PresentTense'), true, 'selected predicate refined')
  t.end()
})
