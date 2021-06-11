const fromHere = require('./02-from-here')
const failFast = require('./01-failFast')

// ok, here we go.
const runMatch = function (view, regs, justOne = false) {
  let results = []
  let docs = view.docs
  let cache = view._cache || []
  const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length

  for (let n = 0; n < docs.length; n += 1) {
    let terms = docs[n]
    // can we skip this sentence?
    if (cache[n] && failFast(regs, cache[n])) {
      continue
    }
    //try starting the match, from every term
    for (let i = 0; i < terms.length; i += 1) {
      let slice = terms.slice(i)
      // ensure it's long-enough
      if (slice.length < minLength) {
        break
      }
      let res = fromHere(slice, regs, i, terms.length)
      // did we find a result?
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
        // skip ahead, over these results
        let split = res.pointer.split(/[/:]/)
        let end = Number(split[3]) || terms.length
        i = Math.abs(end - 1)
      }
    }
  }
  return results
}
module.exports = runMatch
