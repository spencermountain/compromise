

//
const out = function(options) {
  let word = this.text;
  let before = this.preText;
  let after = this.postText;
  if (options.normal === true) {
    word = this.normal;
    before = '';
    after = ' ';
    if (options.last === true) {
      after = '';
    }
    //normalized end punctuation
    if (this.hasPeriod() === true) {
      after = '.' + after;
    } else if (this.hasQuestionMark() === true) {
      after = '?' + after;
    } else if (this.hasExclamation() === true) {
      after = '!' + after;
    } else if (this.hasComma() === true) {
      after = ',' + after;
    } else if (this.hasElipses() === true) {
      after = '...' + after;
    }
  }
  return before + word + after;
};
module.exports = out;
