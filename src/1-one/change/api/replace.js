const fns = {}

const mergeMatch = function (insert,) { }

fns.replaceWith = function (input) {
  let ptrs = this.fullPointer
  const insert = this.fromText(input).docs
  // slide this in
  this.insertAfter(input)
  // delete the original terms
  let original = this.update(ptrs)
  // are we replacing part of a contraction?
  if (original.has('@hasContraction')) {
    let more = this.growLeft('@hasContraction+').growRight('@hasContraction+')
    more.contractions().expand()
  }
  this.delete(original)
  // what should we return?
  return this.toView(ptrs).compute(['index', 'lexicon', 'preTagger'])
}

fns.replace = function (match, input) {
  if (match && !input) {
    return this.replaceWith(match)
  }
  let m = this.match(match)
  if (!m.found) {
    return this
  }
  return m.replaceWith(input)
}
export default fns
