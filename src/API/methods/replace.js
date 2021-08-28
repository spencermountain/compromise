const fns = {}

fns.replaceWith = function (input) {
  let ptr = this.fullPointer
  // slide this in
  this.insertAfter(input)
  // delete the original terms
  let original = this.update(ptr)
  this.delete(original)
  // what should we return?
  return this.update(ptr)
}

fns.replace = function (match, input) {
  let m = this.match(match)
  if (!m.found) {
    return this
  }
  return m.replaceWith(input)
}
export default fns
