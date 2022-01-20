const fns = {}

fns.replaceWith = function (input, keep = {}) {
  let ptrs = this.fullPointer
  let original = this.update(ptrs)
  let oldTags = (original.docs[0] || []).map(term => Array.from(term.tags))
  // slide this in
  this.insertAfter(input)
  this.match(original) //todo: fix me December '21
  // delete the original terms
  // are we replacing part of a contraction?
  if (original.has('@hasContraction')) {
    let more = this.growLeft('@hasContraction+').growRight('@hasContraction+')
    more.contractions().expand()
  }
  this.delete(original)
  // what should we return?
  let m = this.toView(ptrs).compute(['index', 'lexicon', 'preTagger'])
  // replace any old tags
  if (keep.tags) {
    m.terms().forEach((term, i) => {
      term.tagSafe(oldTags[i])
    })
  }
  return m
}

fns.replace = function (match, input, keep) {
  if (match && !input) {
    return this.replaceWith(match, keep)
  }
  let m = this.match(match)
  if (!m.found) {
    return this
  }
  return m.replaceWith(input, keep)
}
export default fns
