const doesMatch = require('./match');

module.exports = {

  hasComma: function() {
    return this.postText.includes(',');
  },
  hasPeriod: function() {
    return this.postText.includes('.') === true && this.postText.includes('...') === false;
  },
  hasExclamation: function() {
    return this.postText.includes('!');
  },
  hasQuestionMark: function() {
    return this.postText.includes('?') || this.postText.includes('¿');
  },
  hasElipses: function() {
    return this.postText.includes('..') || this.postText.includes('…');
  },
  hasSemicolon: function() {
    return this.postText.includes(';');
  },
  punctuation() {
    let str = this.postText.trim();
    console.log(this.postText);
    if (/[\.,\?\!]/.test(str) === true) {
      return str;
    }
    return null;
  },
  doesMatch: function(reg) {
    return doesMatch(this, reg);
  },
  toUpperCase: function() {
    this.text = this.text.toUpperCase();
    this.tag('#UpperCase', 'toUpperCase');
    return this;
  },
  toLowerCase: function() {
    this.text = this.text.toLowerCase();
    this.unTag('#TitleCase');
    this.unTag('#UpperCase');
    return this;
  },
  toTitleCase: function() {
    this.text = this.text.replace(/^ *[a-z]/, x => x.toUpperCase());
    this.tag('#TitleCase', 'toTitleCase');
    return this;
  }
};
