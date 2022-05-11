import getCandidates from './01-candidates.js'
import trimDown from './02-trim-down.js'
import runMatch from './03-runMatch.js'

const sweep = function (document, net, methods, opts = {}) {
  // find suitable matches to attempt, on each sentence
  let docCache = methods.one.cacheDoc(document)
  // collect possible matches for this document
  let maybeList = getCandidates(docCache, net.index)
  // ensure all defined needs are met for each match
  maybeList = trimDown(maybeList, docCache)
  // add unchacheable matches to each sentence's todo-list
  if (net.always.length > 0) {
    maybeList = maybeList.map(arr => arr.concat(net.always))
  }
  // now actually run the matches
  let results = runMatch(maybeList, document, methods, opts)
  // console.dir(results, { depth: 5 })
  return results
}
export default sweep
