

// runs all match/tag patterns in model.two.matches
const postTagger = function (view) {
  const { world } = view
  const { model, methods } = world
  let byGroup = methods.two.compile(model.two.matches, methods)
  // perform these matches on a comma-seperated document
  let document = methods.two.quickSplit(view.document)
  let found = methods.two.bulkMatch(document, byGroup, methods)
  // console.log(found.length, 'found')
  methods.two.bulkTagger(found, document, world)
  // 2nd time?
  // let subset = new Set(found.map(todo => todo.pointer[0]))
  // subset = Array.from(subset).map(n => document[n])
  // found = methods.two.bulkMatch(subset, byGroup, methods)
  // methods.two.bulkTagger(found, subset, world)
  // leave a nice cache for the next person?
  // view.compute('cache')
  view.uncache()
  return document
}

export default { postTagger }
