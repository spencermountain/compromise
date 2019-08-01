/** return various text formats of this term */
exports.textOut = function(options) {
  let word = this.text
  let before = this.preText
  let after = this.postText
  if (options.normal === true) {
    word = this.normal
    before = ''
    after = ' '
    if (options.last === true) {
      after = ''
    }
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
  return before + word + after
}

/** return various metadata for this term */
exports.json = function(options) {
  let result = {}
  if (options.text) {
    result.text = this.text
  }
  if (options.tags) {
    result.tags = Object.keys(this.tags)
  }
  if (options.whitespace) {
    result.preText = this.preText
    result.postText = this.postText
  }
  return result
}
