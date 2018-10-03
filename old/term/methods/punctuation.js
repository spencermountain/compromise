'use strict';
// const endPunct = /([^\/,:;.()!?]{0,1})([\/,:;.()!?]+)$/i;
const endPunct = /([a-z ])([,:;.!?]+)$/i; //old

const addMethods = Term => {
  const methods = {
    /** the punctuation at the end of this term*/
    getPunctuation: function() {
      let m = this.text.match(endPunct);
      if (m) {
        return m[2];
      }
      return null;
    },

    setPunctuation: function(punct) {
      this.killPunctuation();
      this.text += punct;
      if (punct === ',') {
        this.tags.Comma = true;
      }
      return this;
    },

    /** check if the term ends with a comma */
    hasComma: function() {
      if (this.getPunctuation() === ',') {
        return true;
      }
      return false;
    },

    killPunctuation: function() {
      this.text = this._text.replace(endPunct, '$1');
      delete this.tags.Comma;
      delete this.tags.ClauseEnd;
      return this;
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach(k => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;
