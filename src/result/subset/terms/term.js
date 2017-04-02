'use strict';
const Terms = require('../../paths').Terms;
const tagSet = require('../../paths').tags;
const boringTags = {
  Auxiliary: 1,
  Possessive: 1,
  TitleCase: 1,
  ClauseEnd: 1,
  Comma: 1,
  CamelCase: 1,
  UpperCase: 1,
  Hyphenated: 1,
};

class Term extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.t = this.terms[0];
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
      tags: Object.keys(t.tags),
    };
  }
  bestTag() {
    let tags = Object.keys(this.t.tags);
    tags = tags.sort(); //alphabetical, first
    //then sort by #of parent tags
    tags = tags.sort((a, b) => {
      //bury the tags we dont want
      if (boringTags[b] || !tagSet[a] || !tagSet[b]) {
        return -1;
      }
      if (tagSet[a].downward.length > tagSet[b].downward.length) {
        return -1;
      }
      return 1;
    });
    return tags[0];
  }
}
module.exports = Term;
