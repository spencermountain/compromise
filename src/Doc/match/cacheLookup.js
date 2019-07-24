// we can say confidently that the .match() will fail,
// if it is missing a word or a tag
const doMatch = function(doc, regs) {
  let cache = doc.world.cache
  //can't fail if not frozen
  if (!cache.frozen) {
    return true
  }
  for (let i = 0; i < regs.length; i++) {
    const reg = regs[i]
    //  check a specific word exists
    if (reg.normal !== undefined && !reg.optional && cache.words.hasOwnProperty(reg.normal) === false) {
      return false
    }
    //  check a specific tag exists
    if (reg.tag !== undefined && !reg.optional && cache.tags.hasOwnProperty(reg.tag) === false) {
      return false
    }
    //  ensure a choice exists in (one|two)
    if (reg.choices && !reg.optional) {
      let found = reg.choices.some(obj => !obj.normal || cache.words.hasOwnProperty(obj.normal))
      if (!found) {
        return false
      }
    }
  }
  return true
}
module.exports = doMatch
