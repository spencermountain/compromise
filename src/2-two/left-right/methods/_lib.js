// Missing or empty context means no constraint on that side.
const matches = (term, context) => {
  if (context === undefined || context === '') {
    return true
  }
  if (!term) {
    return false
  }
  // Retain the original object-rule format for internal callers.
  if (typeof context === 'string') {
    if (context.startsWith('#')) {
      return term.tags.has(context.slice(1))
    }
    return term.normal === context
  }
  if (context.words.has(term.normal)) {
    return true
  }
  for (let i = 0; i < context.tags.length; i += 1) {
    if (term.tags.has(context.tags[i])) {
      return true
    }
  }
  return false
}

export default matches
