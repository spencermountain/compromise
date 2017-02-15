'use strict';

const addMethods = (Term) => {

  const methods = {
    /** the punctuation at the end of this term*/
    endPunctuation: function() {
      let m = this.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i);
      if (m) {
        const allowed = {
          ',': 'comma',
          ':': 'colon',
          ';': 'semicolon',
          '.': 'period',
          '...': 'elipses',
          '!': 'exclamation',
          '?': 'question'
        };
        if (allowed[m[1]]) {
          return m[1];
        }
      }
      return null;
    },
    setPunctuation: function(punct) {
      this.text = this.text.replace(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i, '');
      this.text += punct;
      return this;
    },

    /** check if the term ends with a comma */
    hasComma: function () {
      if (this.endPunctuation() === 'comma') {
        return true;
      }
      return false;
    },

    killPunctuation: function () {
      this.text = this._text.replace(/([,:;\/.(\.\.\.)\!\?]+)$/, '');
      return this;
    },
  };
  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;
