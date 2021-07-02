import logger from './_logger.js'

const tagger = function (list, document, world) {
  const tagSet = world.model.tags
  const { getDoc, setTag } = world.methods
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
    return setTag(terms, todo.tag, tagSet, todo.safe)
  })
}
export default tagger
