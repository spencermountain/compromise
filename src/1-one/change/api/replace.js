const fns = {}

fns.replaceWith = function (input, keep = {}) {
  let ptrs = this.fullPointer
  let main = this
  let original = this.update(ptrs)
  original.freeze()
  let oldTags = (original.docs[0] || []).map(term => Array.from(term.tags))
  // slide this in
  main.insertAfter(input)
  original.repair()
  // original.debug()
  // delete the original terms
  // are we replacing part of a contraction?
  if (original.has('@hasContraction') && main.contractions) {
    let more = main.growLeft('@hasContraction+').growRight('@hasContraction+')
    more.contractions().expand()
  }
  //science.
  main.delete(original)
  // what should we return?
  let m = main.toView(ptrs).compute(['index', 'lexicon', 'preTagger'])
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
