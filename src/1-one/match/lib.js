/** pre-parse any match statements */
const parseMatch = function (str) {
  const world = this.world()
  return world.methods.one.parseMatch(str)
}
export default {
  parseMatch
}