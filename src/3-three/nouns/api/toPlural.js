const keep = { tags: true }

const toPlural = function (m, parsed) {
  // already plural?
  if (parsed.isPlural === true) {
    return m
  }
  const { methods, model } = m.world
  const { nounToPlural } = methods.two.transform
  // inflect the root noun
  let str = parsed.root.text('normal')
  let plural = nounToPlural(str, model)
  m.replace(parsed.root, plural, keep).tag('Plural', 'toPlural')

  // should we change the determiner/article?
  if (parsed.determiner.has('(a|an)')) {
    // 'a captain' -> 'the captains'
    m.replace(parsed.determiner, 'the', keep)
  }
  return m
}
export default toPlural
