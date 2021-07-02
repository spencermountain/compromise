import setTag from './_setTag.js'

// normal regexes
const startsWith = function (str, regs) {
  return regs.find(r => {
    return r[0].test(str) === true
  })
}
// suffix-regexes, indexed by last-character
const endsWith = function (str = '', byEnd) {
  let char = str[str.length - 1]
  if (byEnd.hasOwnProperty(char) === true) {
    let regs = endsWith[char] || []
    for (let r = 0; r < regs.length; r += 1) {
      if (regs[r][0].test(str) === true) {
        return regs[r]
      }
    }
  }
  return undefined
}

const checkRegex = function (terms, model) {
  terms.forEach(t => {
    if (t.tags.size === 0) {
      let str = t.normal || t.implicit
      let arr = startsWith(t.text, model.regex) || endsWith(str, model.endsWith)
      if (arr !== undefined) {
        setTag(t, arr[1], 'regex')
      }
    }
  })
}
export default checkRegex
