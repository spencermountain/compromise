import matches from './_lib.js'

const leftRight = (document, rules, world) => {
  const pending = []
  document.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      const term = terms[i]
      if (!Object.hasOwn(rules, term.normal)) {
        continue
      }
      const entry = rules[term.normal]
      const bucket = Array.isArray(entry) ? entry : [entry]
      for (let r = 0; r < bucket.length; r += 1) {
        const rule = bucket[r]
        if (matches(terms[i - 1], rule.pre) && matches(terms[i + 1], rule.post)) {
          pending.push([term, rule])
        }
      }
    }
  })
  // Neighbours see incoming tags; actions on each target keep bucket order.
  pending.forEach(([term, rule]) => {
    world.methods.one.setTag([term], rule.tag, world, rule.safe, rule.reason || 'left-right')
  })
}

const methods = { two: { leftRight } }
export default methods
