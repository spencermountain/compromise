// wire-up more pos-tags to our model
const addTags = function (tags) {
  const { model, methods } = this.world()
  const tagSet = model.one.tagSet
  const addTags = methods.one.addTags
  let res = addTags(tags, tagSet)
  model.one.tagSet = res
  return this
}

export default { addTags }