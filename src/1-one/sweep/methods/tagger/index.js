import canBe from './canBe.js'

const tagger = function (list, document, world) {
  const { model, methods } = world
  const { getDoc, setTag, unTag } = methods.one
  const looksPlural = methods.two.looksPlural
  if (list.length === 0) {
    return list
  }
  return list.map(todo => {
    if (!todo.tag && !todo.chunk && !todo.unTag) {
      return
    }
    const reason = todo.reason || todo.match
    const terms = getDoc([todo.pointer], document)[0]
    let validated
    // handle 'safe' tag
    if (todo.safe === true) {
      // check for conflicting tags
      if (canBe(terms, todo.tag, model) === false) {
        return
      }
      // dont tag half of a hyphenated word
      if (terms[terms.length - 1].post === '-') {
        return
      }
      // Only an exact single tag was checked by canBe; arrays and shorthand
      // still need their individual checks in setTag.
      if (typeof todo.tag === 'string' && Object.hasOwn(model.one.tagSet, todo.tag)) {
        validated = model.one.tagSet[todo.tag]
      }
    }
    if (todo.tag !== undefined) {
      setTag(terms, todo.tag, world, todo.safe, `[post] '${reason}'`, validated)
      // quick and dirty plural tagger 😕
      if (todo.tag === 'Noun' && looksPlural) {
        const term = terms[terms.length - 1]
        if (looksPlural(term.text)) {
          setTag([term], 'Plural', world, todo.safe, 'quick-plural')
        } else {
          setTag([term], 'Singular', world, todo.safe, 'quick-singular')
        }
      }
      // allow freezing this match, too
      if (todo.freeze === true) {
        terms.forEach(term => (term.frozen = true))
      }
    }
    if (todo.unTag !== undefined) {
      unTag(terms, todo.unTag, model.one.tagSet, reason)
    }
    // allow setting chunks, too
    if (todo.chunk) {
      terms.forEach(t => (t.chunk = todo.chunk))
    }
  })
}
export default tagger
