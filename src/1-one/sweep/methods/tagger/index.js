import logger from './_logger.js'
import canBe from './canBe.js'


const tagger = function (list, document, world) {
  const { model, methods } = world
  const { getDoc, setTag, unTag } = methods.one
  if (list.length === 0) {
    return list
  }
  // some logging for debugging
  const env = typeof process === 'undefined' || !process.env ? self.env || {} : process.env
  if (env.DEBUG_TAGS) {
    console.log(`\n  \x1b[32m→ ${list.length} corrections:\x1b[0m`) //eslint-disable-line
  }
  return list.map(todo => {
    if (!todo.tag && !todo.chunk) {
      return
    }
    if (env.DEBUG_TAGS) {
      logger(todo, document)
    }
    let terms = getDoc([todo.pointer], document)[0]
    // handle 'safe' tag
    if (todo.safe === true) {
      // check for conflicting tags
      if (canBe(terms, todo.tag, model) === false) {
        return
      }
      // dont tag half of a hyphenated word
      if (terms[terms.length - 1].post === '-') {
        return
      }
    }
    if (todo.tag !== undefined) {
      setTag(terms, todo.tag, world, todo.safe)
      // quick and dirty plural tagger
      if (terms.length === 1 && todo.tag === 'Noun') {
        if (terms[0].text && terms[0].text.match(/..s$/) !== null) {
          setTag(terms, 'Plural', world, todo.safe)
        }
      }
    }
    if (todo.unTag !== undefined) {
      unTag(terms, todo.unTag, world, todo.safe)
    }
    // allow setting chunks, too
    if (todo.chunk) {
      terms.forEach(t => t.chunk = todo.chunk)
    }
  })
}
export default tagger
