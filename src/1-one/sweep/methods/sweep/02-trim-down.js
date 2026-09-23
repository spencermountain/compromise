// filter-down list of maybe-matches
const localTrim = function (maybeList, docCache, document, always) {
  return maybeList.map((list, n) => {
    const haves = docCache[n]
    const termCount = document[n].length
    const found = []
    candidates: for (const obj of list) {
      if (!(termCount >= obj.minWords)) {
        continue
      }
      for (const need of obj.needs) {
        if (!haves.has(need)) {
          continue candidates
        }
      }
      if (obj.ifNo !== undefined) {
        for (const no of obj.ifNo) {
          if (haves.has(no)) {
            continue candidates
          }
        }
      }
      if (obj.wants.length > 0) {
        let count = 0
        for (const want of obj.wants) {
          if (haves.has(want)) {
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
    for (const obj of always) {
      if (termCount >= obj.minWords) {
        found.push(obj)
      }
    }
    return found
  })
}
export default localTrim
