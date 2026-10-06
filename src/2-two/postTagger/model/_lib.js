import tags from '../../preTagger/tagSet/aliases.js'

// Expand compact rules once, before matching.
const expandTags = (value, bare = false) => {
  if (Array.isArray(value)) {
    return value.map(tag => expandTags(tag, bare))
  }
  if (typeof value !== 'string') {
    return value
  }
  const pattern = bare ? /#?[a-z][a-z0-9]*/gi : /#[a-z][a-z0-9]*/gi
  return value.replace(pattern, token => {
    const prefix = token.startsWith('#') ? '#' : ''
    const name = token.slice(prefix.length)
    return prefix + (Object.hasOwn(tags, name) ? tags[name] : name)
  })
}

export default expandTags
