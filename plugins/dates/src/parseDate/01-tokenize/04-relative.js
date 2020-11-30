// interpret 'this halloween' or 'next june'
const parseRelative = function (doc) {
  // avoid parsing 'last month of 2019'
  // if (doc.has('^(this|current|next|upcoming|last|previous) #Duration')) {
  //   return null
  // }
  // parse 'this evening'
  // let m = doc.match('^(next|last|this)$')
  // if (m.found) {
  //   doc.remove(m)
  //   return doc.text('reduced')
  // }
  // but avoid parsing 'day after next'
  if (doc.has('(next|last|this)$')) {
    return null
  }
  let rel = null
  let m = doc.match('^this? (next|upcoming|coming)')
  if (m.found) {
    rel = 'next'
    doc.remove(m)
  }
  m = doc.match('^this? (last|previous)')
  if (m.found) {
    rel = 'last'
    doc.remove(m)
  }
  m = doc.match('^(this|current)')
  if (m.found) {
    rel = 'this'
    doc.remove(m)
  }
  // finally, remove it from our text
  // doc.remove('^(this|current|next|upcoming|last|previous)')

  return rel
}
module.exports = parseRelative
