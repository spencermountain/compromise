import getHooks from './01-getHooks.js'
import runMatch from './04-runMatch.js'

const sweep = function (document, net, methods, opts = {}) {
  // find suitable matches to attempt, on each sentence
  const docCache = methods.one.cacheDoc(document)
  // filter candidates before sorting them into execution order
  const maybeList = getHooks(docCache, net, document)

  // now actually run the matches
  const results = runMatch(maybeList, document, docCache, methods, opts)
  // console.dir(results, { depth: 5 })
  return results
}
export default sweep
