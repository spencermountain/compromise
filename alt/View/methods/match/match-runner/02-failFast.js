// try to avoid doing the match
const failFast = function (p, regs) {
  if (regs.length === 0) {
    return true
  }
  for (let i = 0; i < regs.length; i += 1) {
    let reg = regs[i]
    //logical quick-ones
    if (reg.optional !== true && reg.negative !== true) {
      //start/end impossibilites
      if (reg.start === true && i > 0) {
        return true
      }
    }
    //this is not possible
    if (reg.anything === true && reg.negative === true) {
      return true
    }
  }
  return false
}
module.exports = failFast
