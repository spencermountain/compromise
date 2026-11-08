import splitGroups from './splitGroups.js'
import splitRegs from './splitRegs.js'

// any whitespace separates terms, the same as the tokenizer
const byWord = /\s+/

const isBlock = str => {
  return /^[![^]*(<[^<]*>)?!?\(/.test(str) && /\)[?\]+*$~{},0-9]*$/.test(str)
}
const isReg = str => {
  return /^[![^]*(<[^<]*>)?\//.test(str) && /\/[?\]+*$~]*$/.test(str)
}
const never = () => false

const cleanUp = function (arr) {
  arr = arr.map(str => str.trim())
  arr = arr.filter(str => str)
  return arr
}

const parseBlocks = function (txt, opts = {}) {
  // {noRegex} - slashes are plain characters
  const isRegex = opts.noRegex ? never : isReg
  // parse by /regex/ first
  const arr = opts.noRegex ? [txt] : splitRegs(txt)
  let res = []
  // parse by (blocks), next
  arr.forEach(str => {
    if (isRegex(str)) {
      res.push(str)
      return
    }
    res = res.concat(splitGroups(str))
  })
  res = cleanUp(res)
  // split by spaces, now - but not inside (blocks) or /regexes/
  const final = res.flatMap(str => {
    if (isBlock(str) || isRegex(str)) {
      return str
    }
    return str.split(byWord)
  })
  return cleanUp(final)
}
export default parseBlocks
