// runs all match/tag patterns in model.two.matches
const postTagger = function (document, world) {
  const { model, methods } = world
  let byGroup = methods.two.compile(model.two.matches, methods)
  let found = methods.two.bulkMatch(document, byGroup, methods)
  methods.two.bulkTagger(found, document, model, methods)
  return document
}

export default { postTagger }
