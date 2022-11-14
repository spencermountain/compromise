
// borrow a reference from another pronoun
// 'mike is tall, [he] climbs and [he] swims'
const findChain = function (want, s) {
  let m = s.match(want)
  if (m.found) {
    let ref = m.pronouns().referenceTo()
    if (ref.found) {
      return ref
    }
  }
  return s.none()
}

const prevSentence = function (m) {
  if (!m.found) {
    return m
  }
  let [n] = m.fullPointer[0]
  if (n && n > 0) {
    return m.update([[n - 1]])
  }
  return m.none()
}
export { prevSentence, findChain }