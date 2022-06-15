import getHooks from './01-getHooks.js'
import trimDown from './02-trim-down.js'
// import getWants from './03-get-wants.js'
import runMatch from './04-runMatch.js'


const tooSmall = function (maybeList, document) {
  return maybeList.map((arr, i) => {
    let termCount = document[i].length
    arr = arr.filter(o => {
      return termCount >= o.minWords
    })
    return arr
  })
}

const sweep = function (document, net, methods, opts = {}) {
  // find suitable matches to attempt, on each sentence
  let docCache = methods.one.cacheDoc(document)
  // collect possible matches for this document
  let maybeList = getHooks(docCache, net.hooks)
  // ensure all defined needs are met for each match
  maybeList = trimDown(maybeList, docCache)
  // add unchacheable matches to each sentence's todo-list
  if (net.always.length > 0) {
    maybeList = maybeList.map(arr => arr.concat(net.always))
  }
  // if we don't have enough words
  maybeList = tooSmall(maybeList, document)

  // maybeList.forEach((arr, i) => {
  //   let txt = document[i].map(t => t.text).join(' ')
  //   console.log(`==== ${txt} ====`)
  //   arr.forEach(m => {
  //     console.log(`    - ${m.match}`)
  //   })
  // })

  // now actually run the matches
  let results = runMatch(maybeList, document, methods, opts)
  // console.dir(results, { depth: 5 })
  return results
}
export default sweep
