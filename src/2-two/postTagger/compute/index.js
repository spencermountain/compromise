import secondPass from './second-pass.js'

let net = null

// Compiled tag-only passes avoid building match-result Views that are discarded.
const postTagger = function (view) {
  const { world } = view
  const { model, methods } = world
  net = net || methods.one.buildNet(model.two.matches, world)
  const sentences = view.docs
  const clauses = methods.two.quickSplit(sentences)
  const found = methods.one.bulkMatch(clauses, net, methods)
  methods.one.bulkTagger(found, clauses, world)
  secondPass(sentences, world)
  view.uncache()
  view.unfreeze()
  return view
}

const tagger = view => view.compute(['freeze', 'lexicon', 'preTagger', 'postTagger', 'unfreeze'])

export default { postTagger, tagger }
