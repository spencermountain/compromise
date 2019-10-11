const hasSpace = /[ -]/

/** return various text formats of this term */
exports.textOut = function(options, showPre, showPost) {
  options = options || {}
  let word = this.text
  let before = this.pre
  let after = this.post

  if (options.unicode === true) {
    word = this.clean
  }
  if (options.implicit === true && this.implicit) {
    word = this.implicit
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
  return before + word + after
}
