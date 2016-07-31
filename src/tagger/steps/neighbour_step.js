'use strict';
const markov = require('./data/neighbours')
const afterThisWord = markov.afterThisWord
const beforeThisWord = markov.beforeThisWord
const beforeThisPos = markov.beforeThisPos
const afterThisPos = markov.afterThisPos

//for unknown terms, look left + right first, and hit-up the markov-chain for clues
const neighbour_step = function(s) {
  s.terms.forEach((t, n) => {
    //is it still unknown?
    let termTags = Object.keys(t.pos);
    if (termTags.length === 0) {
      let lastTerm = s.terms[n - 1]
      let nextTerm = s.terms[n + 1]
      //look at last word
      if (lastTerm && afterThisWord[lastTerm.normal]) {
        t.tag(afterThisWord[lastTerm.normal], 'neighbour-after-"' + lastTerm.normal + '"')
        return
      }
      //look at next word
      if (nextTerm && beforeThisWord[nextTerm.normal]) {
        t.tag(beforeThisWord[nextTerm.normal], 'neighbour-before-"' + nextTerm.normal + '"')
        return
      }
      //look at the last POS
      let tags = []
      if (lastTerm) {
        tags = Object.keys(lastTerm.pos)
        for (let i = 0; i < tags.length; i++) {
          if (afterThisPos[tags[i]]) {
            t.tag(afterThisPos[tags[i]], 'neighbour-after-[' + tags[i] + ']')
            return
          }
        }
      }
      //look at the next POS
      if (nextTerm) {
        tags = Object.keys(nextTerm.pos)
        for (let i = 0; i < tags.length; i++) {
          if (beforeThisPos[tags[i]]) {
            t.tag(beforeThisPos[tags[i]], 'neighbour-before-[' + tags[i] + ']')
            return
          }
        }
      }
    }
  })

  return s;
};

module.exports = neighbour_step;
