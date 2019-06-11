const doesMatch = require('./match')
const isAcronym = require('./normalize/isAcronym')

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

module.exports = {
  hasComma: function() {
    return this.postText.includes(',')
  },
  hasPeriod: function() {
    return this.postText.includes('.') === true && this.postText.includes('...') === false
  },
  hasExclamation: function() {
    return this.postText.includes('!')
  },
  hasQuestionMark: function() {
    return this.postText.includes('?') || this.postText.includes('¿')
  },
  hasElipses: function() {
    return this.postText.includes('..') || this.postText.includes('…')
  },
  hasSemicolon: function() {
    return this.postText.includes(';')
  },
  punctuation() {
    let str = this.postText.trim()
    let m = str.match(/[\.,\?\!]/)
    if (m !== null) {
      return m[0]
    }
    return null
  },
  doesMatch: function(reg) {
    return doesMatch(this, reg)
  },
  toUpperCase: function() {
    this.text = this.text.toUpperCase()
    this.tag('#UpperCase', 'toUpperCase')
    return this
  },
  toLowerCase: function() {
    this.text = this.text.toLowerCase()
    this.unTag('#TitleCase')
    this.unTag('#UpperCase')
    return this
  },
  toTitleCase: function() {
    this.text = this.text.replace(/^ *[a-z]/, x => x.toUpperCase())
    this.tag('#TitleCase', 'toTitleCase')
    return this
  },
  normalizeWhitespace: function() {
    let punct = this.punctuation() || ''
    this.preText = ' '
    this.postText = punct
    return this
  },
  isAcronym: function() {
    return isAcronym(this.text)
  },
  //do we have atleast one juicy tag?
  isKnown: function() {
    let tags = Object.keys(this.tags)
    tags = tags.filter(t => !boring[t])
    return tags.length > 0
  },
}
