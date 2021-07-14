import failFast from './01-failFast.js'
import fromHere from './02-from-here.js'
import getGroup from './05-getGroup.js'

// make proper pointers
const addSentence = function (res, n) {
  res.pointer[0] = n
  Object.keys(res.groups).forEach(k => {
    res.groups[k][0] = n
  })
  return res
}

const handleStart = function (terms, regs, n, group) {
  let res = fromHere(terms, regs, 0, terms.length)
  if (res) {
    res = addSentence(res, n)
    return getGroup([res], group)
  }
  return { ptrs: [], byGroup: {} }
}

// ok, here we go.
const runMatch = function (docs, todo, cache) {
  cache = cache || []
  let { regs, group, justOne } = todo
  let results = []
  if (regs.length === 0) {
    return { ptrs: [], byGroup: {} }
  }

  const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length
  docs: for (let n = 0; n < docs.length; n += 1) {
    let terms = docs[n]
    // can we skip this sentence?
    if (cache[n] && failFast(regs, cache[n])) {
      continue
    }
    // ^start regs only run once-
    if (regs[0].start === true) {
      return handleStart(terms, regs, n, group)
    }
    //ok, try starting the match now from every term
    for (let i = 0; i < terms.length; i += 1) {
      let slice = terms.slice(i)
      // ensure it's long-enough
      if (slice.length < minLength) {
        break
      }
      let res = fromHere(slice, regs, i, terms.length)
      // did we find a result?
      if (res) {
        res = addSentence(res, n)
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
