'use strict';

const addMethods = (Term) => {

  const methods = {
    toUpperCase: function () {
      this.text = this.text.toUpperCase();
      this.tagAs('#UpperCase', 'toUpperCase');
      return this;
    },
    toLowerCase: function () {
      this.text = this.text.toLowerCase();
      this.unTag('#TitleCase');
      this.unTag('#UpperCase');
      return this;
    },
    toTitleCase: function () {
      this.text = this.text.replace(/^[a-z]/, (x) => x.toUpperCase());
      this.tagAs('#TitleCase', 'toTitleCase');
      return this;
    },
    toCamelCase: function() {
      this.toTitleCase();
      let i = this.index();
      if (i !== 0) {
        this.whitespace.before = '';
      }
      this.whitespace.after = '';
      this.tagAs('#CamelCase', 'toCamelCase');
      return this;
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;
