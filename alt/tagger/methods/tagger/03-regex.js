// normal regexes
const startsWith = function (term, regs) {
  return regs.find(r => {
    return r[0].test(term.normal) === true
  })
}

// suffix-regexes, indexed by last-character
const endsWith = function (term, byEnd) {
  let str = term.normal || ''
  let char = str[str.length - 1]
  if (byEnd.hasOwnProperty(char) === true) {
    let regs = endsWith[char]
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
      let tag = startsWith(t, model.startsWith) || endsWith(t, model.endsWith)
      if (tag !== undefined) {
        t.tags.add(tag)
      }
    }
  })
}
module.exports = checkRegex
