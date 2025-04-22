
// borrow a reference from another pronoun
// 'mike is tall, [he] climbs and [he] swims'
const findChained = function (want, s) {
  const m = s.match(want)
  if (m.found) {
    const ref = m.pronouns().refersTo()
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
  const [n] = m.fullPointer[0]
  if (n && n > 0) {
    return m.update([[n - 1]])
  }
  return m.none()
}
export { prevSentence, findChained }