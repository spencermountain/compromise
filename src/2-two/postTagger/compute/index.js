import rules from '../model/second-pass.js'
let net = null
let secondNet = null

// Compile once, then match all corrections against the main sweep's output.
const secondPass = function (sentences, world) {
  const { methods } = world
  secondNet = secondNet || methods.one.buildNet(rules, world)
  // Match the whole sentence so rules can include context across commas.
  // All matches see the same incoming tags; there are no dependent subpasses.
  const found = methods.one.bulkMatch(sentences, secondNet, methods)
  methods.one.bulkTagger(found, sentences, world)
}

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
