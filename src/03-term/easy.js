module.exports = {
  hasComma: function() {
    return this.postText.includes(',');
  },
  hasPeriod: function() {
    return this.postText.includes('.');
  },
  hasExclamation: function() {
    return this.postText.includes('!');
  },
  hasQuestionMark: function() {
    return this.postText.includes('?');
  },
  startsQuote: function() {
    return this.preText.includes('"');
  },
  endsQuote: function() {
    return this.postText.includes('"');
  },
  startsParentheses: function() {
    return this.preText.includes('(');
  },
  endsParentheses: function() {
    return this.postText.includes(')');
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
  },
};
