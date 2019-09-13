const hasSpace = /[ -]/
/** return various text formats of this term */
exports.textOut = function(options, showPre, showPost) {
  let word = this.text
  let before = this.pre
  let after = this.post

  if (options.unicode === true) {
    word = this.clean
  }
  if (options.whitespace === true) {
    before = ''
    after = ' '
    if (hasSpace.test(this.post) === false || options.last) {
      after = ''
    }
  }
  if (options.lowercase === true) {
    word = word.toLowerCase()
  }
  if (options.punctuation === true) {
    //normalized end punctuation
    if (this.hasPeriod() === true) {
      after = '.' + after
    } else if (this.hasQuestionMark() === true) {
      after = '?' + after
    } else if (this.hasExclamation() === true) {
      after = '!' + after
    } else if (this.hasComma() === true) {
      after = ',' + after
    } else if (this.hasElipses() === true) {
      after = '...' + after
    }
  }
  if (showPre !== true) {
    before = ''
  }
  if (showPost !== true) {
    after = ''
  }
  return before + word + after
}

/** return various metadata for this term */
exports.json = function(options) {
  let result = {}
  if (options.text) {
    result.text = this.text
  }
  if (options.clean) {
    result.clean = this.clean
  }
  if (options.implicit && this.implicit !== null) {
    result.implicit = this.implicit
  }
  if (options.tags) {
    result.tags = Object.keys(this.tags)
  }
  if (options.whitespace) {
    result.pre = this.pre
    result.post = this.post
  }
  return result
}
