const toPresent = function (vb, parsed) {
  // don't conjugate 'go away'.
  if (parsed.root.has('#Imperative')) {
    return
  }
}
export default toPresent
