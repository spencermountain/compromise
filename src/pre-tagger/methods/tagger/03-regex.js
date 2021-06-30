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
const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
const checkRegex = function (terms, model) {
  terms.forEach(t => {
    if (t.tags.size === 0) {
      let str = t.normal || t.implicit
      let arr = startsWith(str, model.regex) || endsWith(str, model.endsWith)
      if (arr !== undefined) {
        if (isArray(arr[1])) {
          arr[1].forEach(tag => t.tags.add(tag))
        } else {
          t.tags.add(arr[1])
        }
      }
    }
  })
}
export default checkRegex
