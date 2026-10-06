import compileAliases from './_aliases.js'

// wire-up more pos-tags to our model
const addTags = function (tags) {
  const { model, methods } = this.world()
  const tagSet = model.one.tagSet
  const fn = methods.one.addTags
  const res = fn(tags, tagSet)
  const aliases = compileAliases(res)
  model.one.tagSet = res
  model.one.tagAliases = aliases
  return this
}

export default { addTags }