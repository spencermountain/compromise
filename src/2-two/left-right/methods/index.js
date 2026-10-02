import matches from './_lib.js'
import apply from './_actions.js'

const collect = (entry, terms, i, pending) => {
  if (!entry) {
    return
  }
  const bucket = Array.isArray(entry) ? entry : [entry]
  for (let r = 0; r < bucket.length; r += 1) {
    const rule = bucket[r]
    if (rule.start !== undefined && i !== rule.start) {
      continue
    }
    if (rule.end !== undefined && i !== terms.length - 1 - rule.end) {
      continue
    }
    if (matches(terms[i - 1], rule.pre) && matches(terms[i + 1], rule.post)) {
      pending.push([terms[i], rule])
    }
  }
}

const leftRight = (document, { byWord, byTag, bySwitch = {} }, world) => {
  const pending = []
  document.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      const term = terms[i]
      if (Object.hasOwn(byWord, term.normal)) {
        collect(byWord[term.normal], terms, i, pending)
      }
      term.tags.forEach(tag => {
        if (Object.hasOwn(byTag, tag)) {
          collect(byTag[tag], terms, i, pending)
        }
      })
      if (term.switch && Object.hasOwn(bySwitch, term.switch)) {
        collect(bySwitch[term.switch], terms, i, pending)
      }
    }
  })
  // All indexes see incoming state; apply word, tag, then switch actions per term.
  pending.forEach(([term, rule]) => apply(term, rule, world))
}

const methods = { two: { leftRight } }
export default methods
