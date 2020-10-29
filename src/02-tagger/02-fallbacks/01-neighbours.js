const markov = require('./data/markov')
const afterKeys = Object.keys(markov.afterThisPos)
const beforeKeys = Object.keys(markov.beforeThisPos)

const checkNeighbours = function (terms, world) {
  for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i]
    //do we still need a tag?
    if (term.isKnown() === true) {
      continue
    }
    //ok, this term needs a tag.
    //look at previous word for clues..
    let lastTerm = terms[i - 1]
    if (lastTerm) {
      // 'foobar term'
      if (markov.afterThisWord.hasOwnProperty(lastTerm.clean) === true) {
        let tag = markov.afterThisWord[lastTerm.clean]
        term.tag(tag, 'after-' + lastTerm.clean, world)
        continue
      }
      // 'Tag term'
      // (look at previous POS tags for clues..)
      let foundTag = afterKeys.find(tag => lastTerm.tags[tag])
      if (foundTag !== undefined) {
        let tag = markov.afterThisPos[foundTag]
        term.tag(tag, 'after-' + foundTag, world)
        continue
      }
    }

    //look at next word for clues..
    let nextTerm = terms[i + 1]
    if (nextTerm) {
      // 'term foobar'
      if (markov.beforeThisWord.hasOwnProperty(nextTerm.clean) === true) {
        let tag = markov.beforeThisWord[nextTerm.clean]
        term.tag(tag, 'before-' + nextTerm.clean, world)
        continue
      }
      // 'term Tag'
      // (look at next POS tags for clues..)
      let foundTag = beforeKeys.find(tag => nextTerm.tags[tag])
      if (foundTag !== undefined) {
        let tag = markov.beforeThisPos[foundTag]
        term.tag(tag, 'before-' + foundTag, world)
        continue
      }
    }
  }
}
module.exports = checkNeighbours
