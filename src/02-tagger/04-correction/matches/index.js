const parseSyntax = require('../../../Doc/match/syntax')
let matches = require('./_corrections')
const loops = require('./_loops')
const unique = require('../_unique')
matches = matches.concat(loops)

// cache the easier conditions up-front
const cacheRequired = function(reg) {
  let needTags = []
  let needWords = []
  reg.forEach(obj => {
    if (obj.optional === true || obj.negative === true) {
      return
    }
    if (obj.tag !== undefined) {
      needTags.push(obj.tag)
    }
    if (obj.word !== undefined) {
      needWords.push(obj.word)
    }
  })
  return { tags: unique(needTags), words: unique(needWords) }
}

matches = matches.map(m => {
  let reg = parseSyntax(m.match)
  m.reg = reg
  m.required = cacheRequired(reg)
  m.str = m.match
  return m
})

module.exports = matches
