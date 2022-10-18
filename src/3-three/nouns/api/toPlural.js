const keep = { tags: true }

const hasPlural = function (parsed) {
  let { root } = parsed
  if (root.has('^(#Uncountable|#Possessive|#ProperNoun|#Place|#Pronoun)+$')) {
    return false
  }
  return true
}

const nounToPlural = function (m, parsed) {
  // already plural?
  if (parsed.isPlural === true) {
    return m
  }
  // is a plural appropriate?
  if (!hasPlural(parsed)) {
    return m
  }
  const { methods, model } = m.world
  const { toPlural } = methods.two.transform.noun
  // inflect the root noun
  let str = parsed.root.text('normal')
  let plural = toPlural(str, model)
  m.match(parsed.root).replaceWith(plural, keep).tag('Plural', 'toPlural')
  // should we change the determiner/article?
  if (parsed.determiner.has('(a|an)')) {
    // 'a captain' -> 'the captains'
    m.replace(parsed.determiner, 'the', keep)
  }
  return m
}
export default nounToPlural
