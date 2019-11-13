const methods = require('./_methods')
/*
  case: true,
  whitespace: true,
  unicode: true,
  punctuation: true,
  emoji: true,
  acronyms:true
  abbreviations:true

  contractions: false,
  parentheses: false,
  quotations: false,
  
  possessives: false,
  verbs: false,
  honorifics: false,
  nouns: false,
  adverbs: false,
*/

const defaults = {
  case: true,
  whitespace: true,
  unicode: true,
  punctuation: true,
  emoji: true,
  acronyms: true,
  abbreviations: true,

  contractions: true,
  parentheses: true,
  quotations: true,

  adverbs: true,
  possessives: false,
  verbs: false,
  honorifics: false,
  nouns: false,
}

/** common ways to clean-up the document, and reduce noise */
exports.normalize = function(options = {}) {
  options = Object.assign({}, defaults, options)
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

  // `isn't` -> 'is not'
  if (options.contraction || options.contractions) {
    this.contractions().expand()
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

  // '(word)' -> 'word'
  if (options.parentheses) {
    this.parentheses().unwrap()
  }
  // remove "" punctuation
  if (options.quotations || options.quotes) {
    methods.quotations(termList)
  }

  // `cory hart's -> cory hart'
  if (options.possessive || options.possessives) {
    this.possessives().strip()
  }
  // remove any un-necessary adverbs
  if (options.adverbs) {
    this.match('#Adverb')
      .not('(not|nary|seldom|never|barely|almost|basically)')
      .remove()
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
