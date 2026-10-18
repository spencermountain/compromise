import maybeMatch from './maybeMatch.js'
import getNet from './_lib.js'

// Tokenize first, then only tag sentences required.
const lazyParse = function (input, reg) {
  const net = getNet(this, reg)
  const doc = this.tokenize(input)
  const m = maybeMatch(doc, net)
  if (m.found) {
    m.uncache().compute(this.hooks())
    return m.match(reg)
  }
  return doc.none()
}

export default lazyParse
