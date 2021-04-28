const parseSyntax = require('../../../src/World/match-syntax')

const boringTags = {
  Determiner: true,
  Noun: true,
  Verb: true,
}
const boringWords = {
  the: true,
  a: true,
  an: true,
}

const compile = function (rules) {
  rules = rules.map(o => {
    o.reg = parseSyntax(o.match)
    o.hasTag = o.hasTag || []
    o.hasWord = o.hasWord || []
    o.reg.forEach(reg => {
      if (reg.not || reg.optional) {
        return
      }
      if (reg.tag && !boringTags[reg.tag]) {
        o.hasTag.push(reg.tag)
      }
      if (reg.word && !boringWords[reg.word]) {
        o.hasWord.push(reg.word)
      }
    })
    return o
  })
  return rules
}
module.exports = compile
