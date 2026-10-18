const filters = new WeakMap()

const getNeeds = net => {
  if (!filters.has(net)) {
    const rules = new Set(net.always)
    Object.values(net.hooks).forEach(bucket => bucket.forEach(rule => rules.add(rule)))
    const needs = Array.from(rules, rule => {
      // Only mandatory, exact literals are safe before tagging. Unknown rules
      // and alternatives stay eligible, even if other rules have literal hooks.
      return (rule.regs || [])
        .filter(reg => reg.word && !reg.optional && !reg.negative && !reg.fuzzy && !reg.use)
        .map(reg => reg.word)
    })
    filters.set(net, needs)
  }
  return filters.get(net)
}

const maybeMatch = (doc, net) => {
  const needs = getNeeds(net)
  if (needs.some(words => words.length === 0)) {
    return doc
  }
  doc.cache()
  doc.document.forEach((terms, i) => {
    terms.forEach(term => doc._cache[i].add(term.text))
  })
  const pointers = []
  doc._cache.forEach((cache, i) => {
    if (needs.some(words => words.every(word => cache.has(word)))) {
      // Tagging may expand contractions; keep an open sentence boundary.
      pointers.push([i])
    }
  })
  return doc.update(pointers)
}

export default maybeMatch
