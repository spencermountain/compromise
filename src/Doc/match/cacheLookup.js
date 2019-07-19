const passesCache = function(doc, regs) {
  // console.log(regs)
  if (!doc.cache.frozen) {
    return true
  }
  for (let i = 0; i < regs.length; i++) {
    const reg = regs[i]
    if (reg.normal !== undefined && !reg.optional) {
      // console.log(reg.normal)
    }
  }
  return true
}
module.exports = passesCache
