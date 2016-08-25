'use strict';

const Result = require('./index');
const forms = {
  NounList: require('./subclass/nounList'),
  ValueList: require('./subclass/valueList'),
  VerbList: require('./subclass/verbList'),
  SentenceList: require('./subclass/sentenceList'),
};
const Terms = require('./terms');

Result.prototype.verbs = function() {
  let arr = this.arr;
  let verbList = [];
  for(let i = 0; i < arr.length; i++) {
    let verbs = [];
    for(let o = 0; o < arr[i].length; o++) {
      let t = arr[i].get(o);
      if (t.tag.Verb || t.tag.VerbPhrase) {
        verbs.push(t);
      }
    }
    if (verbs.length) {
      verbList.push(verbs);
    }
  }
  return new forms.VerbList(verbList);
};
