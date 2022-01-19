// interpret 'this halloween' or 'next june'
const parseRelative = function (doc) {
  // avoid parsing 'day after next'
  if (doc.has('(next|last|this)$')) {
    return { result: null, m: doc.none() }
  }
  // next monday
  let m = doc.match('^this? (next|upcoming|coming)')
  if (m.found) {
    return { result: 'next', m }
  }
  // 'this past monday' is not-always 'last monday'
  m = doc.match('^this? (past)')
  if (m.found) {
    return { result: 'this-past', m }
  }
  // last monday
  m = doc.match('^this? (last|previous)')
  if (m.found) {
    return { result: 'last', m }
  }
  // this monday
  m = doc.match('^(this|current)')
  if (m.found) {
    return { result: 'this', m }
  }
  return { result: null, m: doc.none() }
}
export default parseRelative
