const toFuture = function (s, parsed) {
  s.verbs().toFutureTense()
  s = s.fullSentence()
  s.compute('chunks')
  return s
}
export default toFuture