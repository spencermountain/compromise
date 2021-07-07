const killUnicode = require('../normalize/unicode')
const hasSpace = /[\s-]/
const isUpperCase = /^[A-Z-]+$/

// const titleCase = str => {
//   return str.charAt(0).toUpperCase() + str.substr(1)
// }

/** return various text formats of this term */
exports.textOut = function (options, showPre, showPost) {
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
  if (options.normal === true) {
    word = this.clean || this.text || ''
  }
  if (options.root === true) {
    word = this.root || this.reduced || ''
  }
  if (options.unicode === true) {
    word = killUnicode(word)
  }
  // cleanup case
  if (options.titlecase === true) {
    if (this.tags.ProperNoun && !this.titleCase()) {
      // word = titleCase(word)
    } else if (this.tags.Acronym) {
      word = word.toUpperCase() //uppercase acronyms
    } else if (isUpperCase.test(word) && !this.tags.Acronym) {
      // lowercase everything else
      word = word.toLowerCase()
    }
  }
  if (options.lowercase === true) {
    word = word.toLowerCase()
  }
  // remove the '.'s from 'F.B.I.' (safely)
  if (options.acronyms === true && this.tags.Acronym) {
    word = word.replace(/\./g, '')
  }

  // -before/after-
  if (options.whitespace === true || options.root === true) {
    before = ''
    after = ' '
    if ((hasSpace.test(this.post) === false || options.last) && !this.implicit) {
      after = ''
    }
  }
  if (options.punctuation === true && !options.root) {
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
    // let keep = after.match(/\)/) || ''
    after = '' //keep //after.replace(/[ .?!,]+/, '')
  }
  // remove the '.' from 'Mrs.' (safely)
  if (options.abbreviations === true && this.tags.Abbreviation) {
    after = after.replace(/^\./, '')
  }
  return before + word + after
}
