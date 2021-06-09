const fromHere = require('./01-from-here')
//
// validity checks
//
const failFast = function (terms, regs, minLength) {
  if (terms.length < minLength) {
    return true
  }
  return false
}

const matchOne = function (view, regs) {
  let docs = view.docs
  const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length

  for (let n = 0; n < docs.length; n += 1) {
    let terms = docs[n]
    //try starting the match, from every term
    for (let i = 0; i < terms.length; i += 1) {
      let slice = terms.slice(i)
      // first, quick-pass for validity
      if (failFast(slice, regs, minLength)) {
        continue
      }
      let res = fromHere(slice, regs, i, terms.length)
      if (res) {
        // make proper pointers
        res.pointer = `/${n}/` + res.pointer
        Object.keys(res.groups).forEach(k => {
          res.groups[k] = `/${n}/` + res.groups[k]
        })
        return res
      }
    }
  }
  return null
}
module.exports = matchOne
