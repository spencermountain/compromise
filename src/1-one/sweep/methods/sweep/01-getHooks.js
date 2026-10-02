import canMatch from './_lib.js'

// Required anchors narrow the candidate list. Sort surviving entries by their
// original first matching hook, then their position within that hook's bucket.
const getIndexed = function (set, index, hookOrder, terms) {
  const found = []
  const seen = new Set()
  set.forEach(key => {
    const bucket = index[key]
    if (!Array.isArray(bucket)) {
      return
    }
    for (let i = 0; i < bucket.length; i += 1) {
      const entry = bucket[i]
      // Single-bucket entries cannot be encountered twice. Older nets fall back.
      if (entry.single !== true) {
        if (seen.has(entry)) {
          continue
        }
        seen.add(entry)
      }
      if (!canMatch(entry.rule, set, terms, entry.needs)) {
        continue
      }
      let rank = entry.rank
      for (let j = 0; j < entry.earlier.length; j += 1) {
        const earlier = entry.earlier[j]
        if (set.has(earlier)) {
          rank = hookOrder[earlier]
          break
        }
      }
      found.push({ rule: entry.rule, rank, order: entry.order })
    }
  })
  found.sort((a, b) => a.rank - b.rank || a.order - b.order)
  return found.map(entry => entry.rule)
}

// for each cached-sentence, find a list of possible matches
const getHooks = function (docCaches, net, document) {
  const { hooks, index, always } = net
  let { hookOrder } = net
  // Older compiled nets may not include the precomputed hook order.
  if (!hookOrder) {
    hookOrder = Object.create(null)
    Object.keys(hooks).forEach((k, i) => { hookOrder[k] = i })
  }
  const lists = docCaches.map((set, n) => {
    if (index) {
      return getIndexed(set, index, hookOrder, document[n])
    }
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
    for (let i = 0; i < keys.length; i += 1) {
      const bucket = hooks[keys[i]]
      for (let j = 0; j < bucket.length; j += 1) {
        const m = bucket[j]
        if (!already.has(m)) {
          already.add(m)
          if (canMatch(m, set, document[n])) {
            maybe.push(m)
          }
        }
      }
    }
    return maybe
  })
  // Unindexed rules only use the length check and still run last.
  lists.forEach((list, n) => {
    const termCount = document[n].length
    for (let i = 0; i < always.length; i += 1) {
      if (termCount >= always[i].minWords) {
        list.push(always[i])
      }
    }
  })
  return lists
}

export default getHooks
