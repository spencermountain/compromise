const killUnicode = require('../normalize/unicode')
const hasSpace = /[\s-]/
const normalize = require('../../Doc/methods/transform/_methods')

/** return various text formats of this term */
exports.textOut = function(options, showPre, showPost) {
  options = options || {}
  let word = this.text
  let before = this.pre
  let after = this.post

  // -word-
  if (options.reduced === true) {
    word = this.reduced || ''
  }
  if (options.root === true) {
    word = this.root || ''
  }
  if (options.implicit === true && this.implicit) {
    word = this.implicit || ''
  }
  if (options.unicode === true) {
    word = killUnicode(word)
  }
  if (options.case === true) {
    word = word.toLowerCase()
  }
  // remove the '.'s from 'F.B.I.' (safely)
  if (options.acronyms === true && this.tags.Acronym) {
    word = word.replace(/\./g, '')
  }

  // -before/after-
  if (options.whitespace === true) {
    before = ''
    after = ' '
    if ((hasSpace.test(this.post) === false || options.last) && !this.implicit) {
      after = ''
    }
  }
  if (options.punctuation === true) {
    //normalized end punctuation
    if (this.hasPost('.') === true) {
      after = '.' + after
    } else if (this.hasPost('?') === true) {
      after = '?' + after
    } else if (this.hasPost('!') === true) {
      after = '!' + after
    } else if (this.hasPost(',') === true) {
      after = ',' + after
    } else if (this.hasEllipses() === true) {
      after = '...' + after
    }
  }
  if (showPre !== true) {
    before = ''
  }
  if (showPost !== true) {
    after = ''
  }
  // remove the '.' from 'Mrs.' (safely)
  if (options.abbreviations === true && this.tags.Abbreviation) {
    after = after.replace(/^\./, '')
  }
  return before + word + after
}
