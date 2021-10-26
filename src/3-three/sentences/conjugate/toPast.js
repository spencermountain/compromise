const toPast = function (s, parsed) {
  s.verbs().toPastTense()
  s.compute('chunks')
  return s
}
export default toPast