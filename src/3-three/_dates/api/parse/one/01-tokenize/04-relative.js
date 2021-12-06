// interpret 'this halloween' or 'next june'
const parseRelative = function (doc) {
  // avoid parsing 'day after next'
  if (doc.has('(next|last|this)$')) {
    return null
  }
  // next monday
  let m = doc.match('^this? (next|upcoming|coming)')
  if (m.found) {
    doc.remove(m)
    return 'next'
  }
  // 'this past monday' is not-always 'last monday'
  m = doc.match('^this? (past)')
  if (m.found) {
    doc.remove(m)
    return 'this-past'
  }
  // last monday
  m = doc.match('^this? (last|previous)')
  if (m.found) {
    doc.remove(m)
    return 'last'
  }
  // this monday
  m = doc.match('^(this|current)')
  if (m.found) {
    doc.remove(m)
    return 'this'
  }
  return null
}
export default parseRelative
