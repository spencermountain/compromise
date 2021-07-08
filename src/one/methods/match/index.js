import failFast from './01-failFast.js'
import fromHere from './02-from-here.js'
import getGroup from './04-getGroup.js'

// ok, here we go.
const runMatch = function (docs, todo, cache) {
  cache = cache || []
  let { regs, group, justOne } = todo
  let results = []
  if (regs.length === 0) {
    return []
  }
  const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length
  docs: for (let n = 0; n < docs.length; n += 1) {
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
        res.pointer[0] = n
        Object.keys(res.groups).forEach(k => {
          res.groups[k][0] = n
        })
        results.push(res)
        // should we stop here?
        if (justOne === true) {
          break docs
        }
        // skip ahead, over these results
        let end = res.pointer[2]
        if (Math.abs(end - 1) > i) {
          i = Math.abs(end - 1)
        }
      }
    }
  }
  // grab the requested group
  results = getGroup(results, group)
  return results
}

export default runMatch
