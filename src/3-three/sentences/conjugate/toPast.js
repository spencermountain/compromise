const toPast = function (s, parsed) {
  let verbs = s.verbs()

  // already past
  if (verbs.has('#PastTense')) {
    return s
  }

  // let first=verbs.pop()

  verbs.toPastTense()
  s.compute('chunks')
  return s
}
export default toPast