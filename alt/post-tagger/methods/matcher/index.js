const matchUp = require('./01-matchUp')
const localTrim = require('./02-localTrim')

const matcher = function (document, byGroup, methods) {
  let docCache = methods.cacheDoc(document)
  let maybeList = matchUp(docCache, byGroup)
  maybeList = localTrim(maybeList, docCache)
  // console.dir(maybeList, { depth: 5 })
}
module.exports = matcher
