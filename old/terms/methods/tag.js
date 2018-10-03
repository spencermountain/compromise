'use strict';
const addMethod = Terms => {
  const methods = {
    tag: function(tag, reason) {
      let tags = [];
      if (typeof tag === 'string') {
        tags = tag.split(' ');
      }
      //fancy version:
      if (tags.length > 1) {
        //do indepenent tags for each term:
        this.terms.forEach((t, i) => {
          t.tag(tags[i], reason);
        });
        return this;
      }
      //non-fancy version:
      this.terms.forEach(t => {
        t.tag(tag, reason);
      });
      return this;
    },

    unTag: function(tag, reason) {
      let tags = [];
      if (typeof tag === 'string') {
        tags = tag.split(' ');
      }
      //fancy version:
      if (tags.length > 1) {
        //do indepenent tags for each term:
        this.terms.forEach((t, i) => {
          t.unTag(tags[i], reason);
        });
        return this;
      }
      //non-fancy version:
      this.terms.forEach(t => {
        t.unTag(tag, reason);
      });
      return this;
    },

    //which terms are consistent with this tag
    canBe: function(tag) {
      let terms = this.terms.filter(t => t.canBe(tag));
      return new Terms(terms, this.world, this.refText, this.refTerms);
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach(k => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = addMethod;
