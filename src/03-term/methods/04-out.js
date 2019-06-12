//
exports.out = function(options) {
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
exports.json = function(options = {}) {
  let result = {}
  let defaultOn = ['text', 'normal', 'tags']
  defaultOn.forEach(k => {
    if (options[k] !== false) {
      result[k] = this[k]
    }
  })
  let defaultOff = ['preText', 'postText']
  defaultOff.forEach(k => {
    if (options[k] === true) {
      result[k] = this[k]
    }
  })
  return result
}
