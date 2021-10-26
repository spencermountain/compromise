const toInfinitive = function (s, parsed) {
  s.verbs().toInfinitive()
  s.compute('chunks')
  return s
}
export default toInfinitive