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
  let pointers = []
  const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length
  view.docs.forEach((terms, n) => {
    //try starting the match, from every term
    for (let i = 0; i < terms.length; i += 1) {
      let slice = terms.slice(i)
      // first, quick-pass for validity
      if (failFast(slice, regs, minLength)) {
        return
      }
      let res = fromHere(slice, regs, i, terms.length)
      if (res) {
        res.pointer = `/${n}/` + res.pointer
        res.groups.forEach(o => (o.pointer = `/${n}/` + o.pointer))
        console.log(res)
        return
      }
    }
  })
  // empty response
  if (pointers.length === 0) {
    return null
  }
  return pointers
}
module.exports = matchOne
