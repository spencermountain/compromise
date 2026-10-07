const toNegative = function (s) {
  s.verbs().first().toNegative()
  // Include inserted terms outside the original verb selection.
  s.compute('chunks')
  return s
}
const toPositive = function (s) {
  s.verbs().first().toPositive()
  s.compute('chunks')
  return s
}
export { toNegative, toPositive }
