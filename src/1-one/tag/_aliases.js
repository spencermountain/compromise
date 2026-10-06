// Compile once per registration. Real tag names always take precedence.
const compileAliases = (tags, normalize) => {
  const aliases = Object.create(null)
  Object.keys(tags).forEach(tag => { aliases[tag] = tag })
  Object.keys(tags).forEach(tag => {
    const entry = tags[tag]
    const names = entry.aliases === undefined ? [entry.alias] : [entry.aliases].flat()
    names.forEach(name => {
      if (name === null || name === undefined) {
        return
      }
      if (typeof name !== 'string' || !/^[\p{L}_][\p{L}\p{M}\p{N}_-]*$/u.test(name)) {
        throw new Error(`compromise: invalid alias for '#${tag}'`)
      }
      // Match strings undergo Unicode normalization before parsing.
      const spellings = normalize ? [name, normalize(name)] : [name]
      spellings.forEach(spelling => {
        if (Object.hasOwn(tags, spelling)) {
          if (spelling !== name && spelling !== tag) {
            throw new Error(`compromise: tag alias '${name}' normalizes to '#${spelling}'`)
          }
          return
        }
        if (aliases[spelling] && aliases[spelling] !== tag) {
          throw new Error(`compromise: duplicate tag alias '${spelling}'`)
        }
        aliases[spelling] = tag
      })
    })
  })
  return aliases
}

export default compileAliases
