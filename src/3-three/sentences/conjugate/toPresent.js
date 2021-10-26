const toPresent = function (s, parsed) {
  s.verbs().toPresentTense()
  s.compute('chunks')
  return s
}
export default toPresent