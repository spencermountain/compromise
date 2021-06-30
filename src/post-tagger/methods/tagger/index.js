const tagger = function (list, document, world) {
  const tagSet = world.model.tags
  const { getDoc, setTag } = world.methods
  return list.map(todo => {
    let terms = getDoc([todo.pointer], document)[0]
    return setTag(terms, todo.tag, tagSet, todo.safe)
  })
}
export default tagger
