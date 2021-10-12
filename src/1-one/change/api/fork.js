const deepClone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}
const methods = {
  fork: function () {
    let after = this
    after.world.model = deepClone(after.world.model)
    after.world.methods = Object.assign({}, after.world.methods)
    if (after.ptrs) {
      after.ptrs = after.ptrs.slice(0)
    }
    // clone the cache?
    // clone the document?
    return after
  },
}
export default methods
