// filter-down list of maybe-matches
const localTrim = function (maybeList, docCache, document, always) {
  return maybeList.map((list, n) => {
    const haves = docCache[n]
    const termCount = document[n].length
    const found = []
    candidates: for (let i = 0; i < list.length; i += 1) {
      const obj = list[i]
      if (!(termCount >= obj.minWords)) {
        continue
      }
      for (let j = 0; j < obj.needs.length; j += 1) {
        if (!haves.has(obj.needs[j])) {
          continue candidates
        }
      }
      if (obj.ifNo !== undefined) {
        for (let j = 0; j < obj.ifNo.length; j += 1) {
          if (haves.has(obj.ifNo[j])) {
            continue candidates
          }
        }
      }
      if (obj.wants.length > 0) {
        let count = 0
        for (let j = 0; j < obj.wants.length; j += 1) {
          if (haves.has(obj.wants[j])) {
            count += 1
            if (count >= obj.minWant) {
              break
            }
          }
        }
        if (!(count >= obj.minWant)) {
          continue
        }
      }
      found.push(obj)
    }
    // Unindexed rules have historically bypassed cache checks. Keep them last
    // and apply only the length check, just as the separate tooSmall pass did.
    for (let i = 0; i < always.length; i += 1) {
      const obj = always[i]
      if (termCount >= obj.minWords) {
        found.push(obj)
      }
    }
    return found
  })
}
export default localTrim
