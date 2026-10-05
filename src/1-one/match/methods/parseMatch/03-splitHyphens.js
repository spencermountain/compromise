import { hasHyphen } from '../../../tokenize/methods/02-terms/01-hyphens.js'

// match 're-do' -> ['re','do']
// split them the same way the tokenizer does - 'x-ray' stays one word
const splitHyphens = function (regs, world) {
  for (let i = regs.length - 1; i >= 0; i -= 1) {
    const reg = regs[i]
    if (reg.word && hasHyphen(reg.word, world.model)) {
      let words = reg.word.split(/[-–—]/g)
      words = words.filter(w => w).reverse()
      regs.splice(i, 1)
      words.forEach(w => {
        const obj = { ...reg }
        obj.word = w
        regs.splice(i, 0, obj)
      })
    }
  }
  return regs
}
export default splitHyphens