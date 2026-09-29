const keep = { tags: true }

// give 'dane' the case of the word it replaced: 'Danes' -> 'Dane', 'DANES' -> 'DANE'
const matchCase = function (original, str) {
  if (original.length > 1 && original === original.toUpperCase() && original !== original.toLowerCase()) {
    return str.toUpperCase()
  }
  if (/^\p{Lu}/u.test(original)) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return str
}

const nounToSingular = function (m, parsed) {
  // already singular?
  if (parsed.isPlural === false) {
    return m
  }
  const { methods, model } = m.world
  const { toSingular } = methods.two.transform.noun
  // inflect the root noun
  const str = parsed.root.text('normal')
  const single = toSingular(str, model)
  const before = (parsed.root.docs[0] || []).map(term => term.text)
  const after = m.replace(parsed.root, single, keep).tag('Singular', 'toPlural')
  // the conversion works on the normalized text, so put the original case back
  const terms = after.docs[0] || []
  if (terms.length === before.length) {
    terms.forEach((term, i) => {
      term.text = matchCase(before[i], term.text)
    })
  }
  // should we change the determiner/article?
  // m.debug()
  return m
}
export default nounToSingular
