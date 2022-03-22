import matchUp from './01-matchUp.js'
import localTrim from './02-localTrim.js'
import runMatch from './03-runMatch.js'

const matcher = function (document, byGroup, methods) {
  const one = methods.one
  // find suitable matches to attempt, on each sentence
  let docCache = one.cacheDoc(document)
  // collect possible matches for this document
  let maybeList = matchUp(docCache, byGroup)
  // ensure all defined needs are met for each match
  maybeList = localTrim(maybeList, docCache)
  // now actually run the matches
  let results = runMatch(maybeList, document, one)
  // console.dir(results, { depth: 5 })
  return results
}
export default matcher
