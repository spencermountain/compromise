// Compile once per registration. Real tag names always take precedence.
const compileAliases = tags => {
  const aliases = Object.create(null)
  Object.keys(tags).forEach(tag => { aliases[tag] = tag })
  Object.keys(tags).forEach(tag => {
    const entry = tags[tag]
    const names = [entry.alias, ...[entry.aliases || []].flat()]
    names.forEach(name => {
      if (!name) {
        return
      }
      if (typeof name !== 'string' || /[\s#]/u.test(name)) {
        throw new Error(`compromise: invalid alias for '#${tag}'`)
      }
      if (Object.hasOwn(tags, name)) {
        return
      }
      if (aliases[name] && aliases[name] !== tag) {
        throw new Error(`compromise: duplicate tag alias '${name}'`)
      }
      aliases[name] = tag
    })
  })
  return aliases
}

export default compileAliases
