import setTag from './_setTag.js'

// normal regexes
const startsWith = function (str, regs) {
  return regs.find(r => {
    return r[0].test(str) === true
  })
}
// suffix-regexes, indexed by last-character
const doEndsWith = function (str = '', byEnd) {
  let char = str[str.length - 1]
  if (byEnd.hasOwnProperty(char) === true) {
    let regs = byEnd[char] || []
    for (let r = 0; r < regs.length; r += 1) {
      if (regs[r][0].test(str) === true) {
        return regs[r]
      }
    }
  }
  return undefined
}

const checkRegex = function (term, model) {
  let { regexText, regexNormal, endsWith } = model.two
  let normal = term.machine || term.normal

  let arr = startsWith(term.text, regexText) || startsWith(normal, regexNormal)
  // only run endsWith if we're desperate
  if (!arr && term.tags.size === 0) {
    arr = doEndsWith(normal, endsWith)
  }
  if (arr !== undefined) {
    setTag(term, arr[1], `regex- '${arr[2] || arr[0]}'`)
    return true
  }
  return null
}
export default checkRegex
