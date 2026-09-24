// Choose one necessary hook per rule. A missing required hook guarantees that
// the rule cannot match, so broader hooks need not enqueue it as well.
const buildIndex = function (matches, hooks, hookOrder) {
  const index = Object.create(null)
  const seen = new Set()
  const lastRank = Object.keys(hooks).length
  matches.forEach((rule, order) => {
    if (seen.has(rule)) {
      return
    }
    seen.add(rule)
    let anchor = null
    let rank = lastRank
    for (let i = 0; i < rule.needs.length; i += 1) {
      const key = rule.needs[i]
      // Prefer the hook shared by the fewest rules in this network.
      if (anchor === null || hooks[key].length < hooks[anchor].length) {
        anchor = key
      }
      rank = Math.min(rank, hookOrder[key])
    }
    // Explicit hooks have already been checked against required match tokens.
    if (rule.hook !== undefined) {
      anchor = rule.hook
    }
    // Historically, any earlier matching alternative could determine where
    // this rule ran. Retain that ordering even when using a required anchor.
    const earlier = [...new Set(rule.wants)]
      .filter(key => hookOrder[key] < rank)
      .sort((a, b) => hookOrder[a] - hookOrder[b])
    const entry = { rule, order, rank, earlier }
    const keys = anchor === null ? [...new Set(rule.wants)] : [anchor]
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i]
      index[key] = index[key] || []
      index[key].push(entry)
    }
  })
  return index
}

export default buildIndex
