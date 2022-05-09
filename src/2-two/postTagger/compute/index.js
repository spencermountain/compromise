
// runs all match/tag patterns in model.two.matches
const postTagger = function (view) {
  const { world } = view
  const { model, methods } = world

  let net = methods.two.makeNet(model.two.matches, methods)
  // perform these matches on a comma-seperated document
  let document = methods.two.quickSplit(view.document)
  let found = methods.two.bulkMatch(document, net, methods)
  methods.two.bulkTagger(found, document, world)
  // 2nd time?
  view.uncache()
  return document
}

export default { postTagger }
