const methods = require('./_methods')

const defaults = {
  // light
  whitespace: true,
  unicode: true,
  punctuation: true,
  emoji: true,
  acronyms: true,
  abbreviations: true,

  // medium
  case: false,
  contractions: false,
  parentheses: false,
  quotations: false,
  adverbs: false,

  // heavy (loose legibility)
  possessives: false,
  verbs: false,
  nouns: false,
  honorifics: false,

  // pronouns: true,
}
const mapping = {
  light: {},
  medium: { case: true, contractions: true, parentheses: true, quotations: true, adverbs: true },
}
mapping.heavy = Object.assign({}, mapping.medium, { possessives: true, verbs: true, nouns: true, honorifics: true })

/** common ways to clean-up the document, and reduce noise */
exports.normalize = function (options) {
  options = options || {}
  // support named forms
  if (typeof options === 'string') {
    options = mapping[options] || {}
  }
  // set defaults
  options = Object.assign({}, defaults, options)
  // clear the cache
  this.uncache()

  let termList = this.termList()

  // lowercase things
  if (options.case) {
    this.toLowerCase()
  }

  //whitespace
  if (options.whitespace) {
    methods.whitespace(this)
  }

  // unicode: é -> e
  if (options.unicode) {
    methods.unicode(termList)
  }

  //punctuation - keep sentence punctation, quotes, parenths
  if (options.punctuation) {
    methods.punctuation(termList)
  }

  // remove ':)'
  if (options.emoji) {
    this.remove('(#Emoji|#Emoticon)')
  }

  // 'f.b.i.' -> 'FBI'
  if (options.acronyms) {
    this.acronyms().strip()
    // .toUpperCase()
  }
  // remove period from abbreviations
  if (options.abbreviations) {
    methods.abbreviations(this)
  }

  // --Medium methods--

  // `isn't` -> 'is not'
  if (options.contraction || options.contractions) {
    this.contractions().expand()
  }

  // '(word)' -> 'word'
  if (options.parentheses) {
    this.parentheses().unwrap()
  }
  // remove "" punctuation
  if (options.quotations || options.quotes) {
    methods.quotations(termList)
  }

  // remove any un-necessary adverbs
  if (options.adverbs) {
    methods.adverbs(this)
  }

  // --Heavy methods--

  // `cory hart's -> cory hart'
  if (options.possessive || options.possessives) {
    this.possessives().strip()
  }
  // 'he walked' -> 'he walk'
  if (options.verbs) {
    this.verbs().toInfinitive()
  }
  // 'three dogs' -> 'three dog'
  if (options.nouns || options.plurals) {
    this.nouns().toSingular()
  }
  // remove 'Mr.' from 'Mr John Smith'
  if (options.honorifics) {
    this.remove('#Honorific')
  }

  return this
}
