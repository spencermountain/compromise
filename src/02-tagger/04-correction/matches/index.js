const parseSyntax = require('../../../Doc/match/syntax')
const unique = require('../_unique')
let matches = []
matches = matches.concat(require('./01-misc'))
matches = matches.concat(require('./02-dates'))
matches = matches.concat(require('./03-adjective'))
matches = matches.concat(require('./04-noun'))
matches = matches.concat(require('./05-adverb'))
matches = matches.concat(require('./06-value'))
matches = matches.concat(require('./07-verbs'))
matches = matches.concat(require('./08-place'))
matches = matches.concat(require('./09-org'))
matches = matches.concat(require('./10-people'))

// cache the easier conditions up-front
const cacheRequired = function (reg) {
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

const allLists = function (m) {
  let more = []
  let lists = m.reg.filter(r => r.oneOf !== undefined)
  if (lists.length === 1) {
    let i = m.reg.findIndex(r => r.oneOf !== undefined)
    Object.keys(m.reg[i].oneOf).forEach(w => {
      let newM = Object.assign({}, m)
      newM.reg = newM.reg.slice(0)
      newM.reg[i] = Object.assign({}, newM.reg[i])
      newM.reg[i].word = w
      delete newM.reg[i].operator
      delete newM.reg[i].oneOf
      // newM.reason += '-' + w
      more.push(newM)
    })
  }
  return more
}

// parse them
let all = []
matches.forEach(m => {
  m.reg = parseSyntax(m.match)
  let enumerated = allLists(m)
  if (enumerated.length > 0) {
    all = all.concat(enumerated)
  } else {
    all.push(m)
  }
})

all.forEach(m => {
  m.required = cacheRequired(m.reg)
  return m
})

module.exports = all
