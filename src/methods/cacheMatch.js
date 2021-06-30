const cacheMatch = function (regs) {
  // parse match strings
  let need = new Set()
  regs.forEach(reg => {
    // negatives can't be cached
    if (reg.optional === true || reg.negative === true) {
      return
    }
    if (reg.tag) {
      need.add('#' + reg.tag)
    }
    if (reg.word) {
      need.add(reg.word)
    }
  })
  return need
}
export default cacheMatch
