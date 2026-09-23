// for each cached-sentence, find a list of possible matches
const getHooks = function (docCaches, hooks, hookOrder) {
  // Older compiled nets may not include the precomputed hook order.
  if (!hookOrder) {
    hookOrder = Object.create(null)
    Object.keys(hooks).forEach((k, i) => { hookOrder[k] = i })
  }
  return docCaches.map(set => {
    const keys = []
    set.forEach(k => {
      if (typeof hookOrder[k] === 'number') {
        keys.push(k)
      }
    })
    keys.sort((a, b) => hookOrder[a] - hookOrder[b])
    // Append each rule once, without concatenating and then filtering buckets.
    const maybe = []
    const already = new Set()
    for (const k of keys) {
      for (const m of hooks[k]) {
        if (!already.has(m)) {
          already.add(m)
          maybe.push(m)
        }
      }
    }
    return maybe
  })
}

export default getHooks
