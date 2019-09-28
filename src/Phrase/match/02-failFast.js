// try to avoid doing the match
const failFast = function(p, terms, regs) {
  if (regs.length === 0) {
    return true
  }
  for (let i = 0; i < regs.length; i += 1) {
    let reg = regs[i]
    //logical quick-ones
    if (reg.optional !== true) {
      //this is not possible
      if (reg.anything === true && reg.negative === true) {
        return true
      }
      //start/end impossibilites
      if (reg.start === true && i > 0) {
        return true
      }
      if (reg.end === true && i < regs.length - 1) {
        return true
      }
      if (reg.start === true && reg.end === true && terms.length > 1) {
        return true
      }
      //empty choices
      if (reg.choices && reg.choices.length === 0) {
        return true
      }
    }
    // check our cache
    if (p.cache.tags && reg.tag && !reg.optional && !reg.negative && !p.cache.tags[reg.tag]) {
      // console.log('skip-tag')
      // return true
    }
    if (p.cache.words && reg.word && !reg.optional && !reg.negative && !p.cache.words[reg.word]) {
      // console.log('skip-word')
      // return true
    }
  }
  return false
}
module.exports = failFast
