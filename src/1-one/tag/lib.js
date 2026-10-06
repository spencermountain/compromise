import compileAliases from './_aliases.js'

// wire-up more pos-tags to our model
const addTags = function (tags) {
  const world = this.world()
  const { model, methods } = world
  const tagSet = model.one.tagSet
  const fn = methods.one.addTags
  const res = fn(tags, tagSet)
  const aliases = compileAliases(res, name => methods.one.killUnicode(name, world))
  model.one.tagSet = res
  model.one.tagAliases = aliases
  return this
}

export default { addTags }