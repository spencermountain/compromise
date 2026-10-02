// Missing or empty context means no constraint on that side.
const matches = (term, context) => {
  if (context === undefined || context === '') {
    return true
  }
  if (!term) {
    return false
  }
  if (context.startsWith('#')) {
    return term.tags.has(context.slice(1))
  }
  return term.normal === context
}

export default matches
