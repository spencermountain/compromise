const markov = require('./data/markov')
const afterKeys = Object.keys(markov.afterThisPos)
const beforeKeys = Object.keys(markov.beforeThisPos)

//tags that don't really count
const boring = {
  TitleCase: true,
  UpperCase: true,
  CamelCase: true,
  Hyphenated: true,
  StartBracket: true,
  EndBracket: true,
  Comma: true,
  ClauseEnd: true,
}

const checkNeighbours = function(terms, world) {
  for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i]
    //do we still need a tag?
    if (Object.keys(term.tags).some(tag => !boring[tag])) {
      // term is already well-tagged
      continue
    }
    //ok, this term needs a tag.
    //look at previous word for clues..
    let lastTerm = terms[i - 1]
    if (lastTerm) {
      // 'foobar term'
      if (markov.afterThisWord.hasOwnProperty(lastTerm.normal) === true) {
        let tag = markov.afterThisWord[lastTerm.normal]
        term.tag(tag, 'after-' + lastTerm.normal, world)
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
      if (markov.beforeThisWord.hasOwnProperty(nextTerm.normal) === true) {
        let tag = markov.beforeThisWord[nextTerm.normal]
        term.tag(tag, 'before-' + nextTerm.normal, world)
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
