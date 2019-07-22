// we can say confidently that the .match() will fail,
// if it is missing a word or a tag
const failsCache = function(doc, regs) {
  if (!doc.cache.frozen) {
    return false
  }
  for (let i = 0; i < regs.length; i++) {
    const reg = regs[i]
    if (reg.normal !== undefined && !reg.optional && doc.cache.words.hasOwnProperty(reg.normal) === false) {
      // console.log('fail-word')
      return true
    }
    if (reg.choices && !reg.optional) {
      let found = reg.choices.some(obj => !obj.normal || doc.cache.words.hasOwnProperty(obj.normal))
      if (!found) {
        return true
      }
    }
  }
  return false
}
module.exports = failsCache
