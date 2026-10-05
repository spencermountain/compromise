const conflicts = new WeakMap()
const empty = new Set()

// Normalization replaces exclusion arrays when plugins rebuild the tag graph.
const getConflicts = (not) => {
  if (!not || not.length === 0) {
    return empty
  }
  let set = conflicts.get(not)
  if (!set) {
    set = new Set(not)
    conflicts.set(not, set)
  }
  return set
}

export default getConflicts
