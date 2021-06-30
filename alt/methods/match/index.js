import failFast from './01-failFast.js'
import fromHere from './02-from-here.js'
import getGroup from './04-getGroup.js'
// ok, here we go.
const runMatch = function (docs, m, cache) {
  cache = cache || []
  let { regs, group, justOne } = m
  let results = []
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
        res.pointer[0] = n
        // res.pointer = [n, res.pointer] //`/${n}/` + res.pointer
        Object.keys(res.groups).forEach(k => {
          res.groups[k][0] = n
          // res.groups[k] = [n, res.groups[k]] //`/${n}/` + res.groups[k]
        })
        results.push(res)
        // should we stop here?
        if (justOne === true) {
          return results
        }
        // skip ahead, over these results
        let end = res.pointer[2]
        // let { end } = methods.parsePointer(res.pointer)
        i = Math.abs(end - 1)
      }
    }
  }
  // grab the requested group
  results = getGroup(results, group)
  return results
}
export default runMatch
