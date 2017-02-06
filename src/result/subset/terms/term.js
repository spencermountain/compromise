'use strict';
const Terms = require('../../paths').Terms;
const tagList = require('../../paths').tags;

class Term extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.t = this.terms[0];
  }
  bestTag() {
    let tags = Object.keys(this.t.tag);
    tags = tags.sort((a, b) => {
      if (tagList[a].parents.length > tagList[b].parents.length) {
        return -1;
      }
      return 1;
    });
    return tags[0];
  }
  data() {
    let t = this.t;
    return {
      spaceBefore: t.whitespace.before,
      text: t.text,
      spaceAfter: t.whitespace.after,
      normal: t.normal,
      implicit: t.silent_term,
      bestTag: this.bestTag(),
      tags: Object.keys(t.tag),
    };
  }
}
module.exports = Term;
