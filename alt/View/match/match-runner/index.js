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

// ok, here we go.
const runMatch = function (view, regs, justOne = false) {
  let results = []
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
        results.push(res)
        // should we stop here?
        if (justOne === true) {
          return results
        }
        // skip ahead, over matched results
        let split = res.pointer.split(/[/:]/)
        let end = Number(split[3]) || terms.length
        i = Math.abs(end - 1)
      }
    }
  }
  return results
}
module.exports = runMatch
