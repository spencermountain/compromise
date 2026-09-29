import getHooks from './01-getHooks.js'
import trimDown from './02-trim-down.js'
import runMatch from './04-runMatch.js'

const sweep = function (document, net, methods, opts = {}) {
  // find suitable matches to attempt, on each sentence
  const docCache = methods.one.cacheDoc(document)
  // collect possible matches for this document
  let maybeList = getHooks(docCache, net.hooks, net.hookOrder, net.index)
  // ensure all defined needs are met for each match
  maybeList = trimDown(maybeList, docCache, document, net.always)

  // now actually run the matches
  const results = runMatch(maybeList, document, docCache, methods, opts)
  // console.dir(results, { depth: 5 })
  return results
}
export default sweep
