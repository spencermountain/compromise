

// runs all match/tag patterns in model.two.matches
const postTagger = function (document, world) {
  const { model, methods } = world
  let byGroup = methods.two.compile(model.two.matches, methods)
  // perform these matches on a comma-seperated document
  document = methods.two.quickSplit(document)
  let found = methods.two.bulkMatch(document, byGroup, methods)
  // console.log(found.length, 'found')
  methods.two.bulkTagger(found, document, world)
  // 2nd time?
  // let subset = new Set(found.map(todo => todo.pointer[0]))
  // subset = Array.from(subset).map(n => document[n])
  // found = methods.two.bulkMatch(subset, byGroup, methods)
  // methods.two.bulkTagger(found, subset, world)
  return document
}

export default { postTagger }
