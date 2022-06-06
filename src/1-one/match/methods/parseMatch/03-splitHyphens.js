const hasDash = /[a-z0-9][-–—][a-z]/i

// match 're-do' -> ['re','do']
const splitHyphens = function (regs) {
  for (let i = regs.length - 1; i >= 0; i -= 1) {
    let reg = regs[i]
    if (reg.word && hasDash.test(reg.word)) {
      let words = reg.word.split(/[-–—]/g)
      words = words.filter(w => w).reverse()
      regs.splice(i, 1)
      words.forEach(w => {
        let obj = Object.assign({}, reg)
        obj.word = w
        regs.splice(i, 0, obj)
      })
    }
  }
  return regs
}
export default splitHyphens