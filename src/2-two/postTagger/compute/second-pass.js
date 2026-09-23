import rules from '../model/second-pass.js'

let net = null

// Compile once, then match all corrections against the main sweep's output.
const secondPass = function (sentences, world) {
  const { methods } = world
  net = net || methods.one.buildNet(rules, world)
  // Match the whole sentence so rules can include context across commas.
  // All matches see the same incoming tags; there are no dependent subpasses.
  const found = methods.one.bulkMatch(sentences, net, methods)
  methods.one.bulkTagger(found, sentences, world)
}

export default secondPass
