import logger from './_logger.js'

const tagger = function (list, document, model, methods) {
  const tagSet = model.two.tags
  const { getDoc, setTag, unTag } = methods.one
  if (list.length === 0) {
    return list
  }
  // some logging for debugging
  let env = typeof process === undefined ? self.env : process.env
  if (env.DEBUG_TAGS) {
    console.log(`\n  \x1b[32m→ ${list.length} corrections:\x1b[0m`) //eslint-disable-line
  }
  return list.map(todo => {
    if (env.DEBUG_TAGS) {
      logger(todo, document)
    }
    let terms = getDoc([todo.pointer], document)[0]
    // handle 'safe' tag
    if (todo.safe === true) {
      if (methods.two.canBe(terms, todo.tag, model) === false) {
        return
      }
    }
    if (todo.tag !== undefined) {
      setTag(terms, todo.tag, tagSet, todo.safe)
    }
    if (todo.unTag !== undefined) {
      unTag(terms, todo.unTag, tagSet, todo.safe)
    }
  })
}
export default tagger
