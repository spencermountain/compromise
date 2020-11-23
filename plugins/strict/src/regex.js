const { Lexer } = require('chevrotain')
const { MatchParser, allTokens } = require('./parser')
const { pikevm } = require('./pikevm')
const NLPMatchLexer = new Lexer(allTokens)
const parserInstance = new MatchParser()

class NLPRegexParseError {
  constructor(errors) {
    this.errors = errors
  }

  get message() {
    return this.errors[0].message
  }

  toString() {
    return `NLP RegexP Parsing error: ${this.message}`
  }
}

/**
 * Custom NLPRegexP class for regexp compile / cache.
 */
class NLPRegexP {
  /**
   * @param {string} regex - regular expression like string for matching nlp
   * terms.
   */
  constructor(regex) {
    if (regex.prog) {
      // take another NLPRegexP
      this.regex = regex.regex
      this.prog = regex.prog.slice()
      return
    }

    const { tokens } = NLPMatchLexer.tokenize(regex)
    parserInstance.input = tokens
    let parsed = null

    try {
      parsed = parserInstance.matchStatement()
    } catch (e) {
      // catch thrown error
      throw new NLPRegexParseError([e])
    }

    if (parserInstance.errors.length > 0) {
      throw new NLPRegexParseError(parserInstance.errors)
    }

    this.regex = regex
    this.prog = parsed.prog
  }

  exec(docOrPhrase) {
    switch (docOrPhrase.isA.toLowerCase()) {
      case 'doc':
        return this.execDoc(docOrPhrase)
      case 'phrase':
        return this.execPhrase(docOrPhrase)
      default:
        throw new Error('Invalid type, must be Document or Phrase')
    }
  }

  execDoc(doc) {
    return doc.buildFrom(
      doc.list
        .map((phrase) => {
          return this.execPhrase(phrase)
        })
        .filter((p) => p !== null)
    )
  }

  execPhrase(phrase) {
    const { found, saved = [], groups = {} } = pikevm(this.prog, phrase.terms())

    const namedGroups = Object.values(groups).reduce((arr, g) => {
      let obj = Object.assign({}, arr)
      let num = parseInt(g.id, 10)
      obj[num] = {
        group: g.name || `${g.id}`,
        start: g.saved[0] ? g.saved[0].id || 0 : 0,
        length: g.saved.length,
      }
      return obj
    }, {})

    return found && saved[0] && saved[0].id
      ? phrase.buildFrom(saved[0].id, saved.length, namedGroups)
      : null
  }
}
module.exports = {
  NLPMatchLexer: NLPMatchLexer,
  parserInstance: parserInstance,
  NLPRegexParseError: NLPRegexParseError,
  NLPRegexP: NLPRegexP,
}
