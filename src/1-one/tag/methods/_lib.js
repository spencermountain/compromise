const sets = new WeakMap()
const empty = new Set()

// Normalization replaces these arrays when plugins rebuild the tag graph.
const getTagSet = (tags) => {
  if (!tags || tags.length === 0) {
    return empty
  }
  let set = sets.get(tags)
  if (!set) {
    set = new Set(tags)
    sets.set(tags, set)
  }
  return set
}

// strip the '#', then follow any alias
export const resolveTag = (tag, aliases) => {
  tag = tag.replace(/^#/, '')
  return aliases?.[tag] || tag
}

export default getTagSet
