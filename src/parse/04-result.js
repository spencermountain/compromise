'use strict';
const Result = require('../models/result');
const log = require('../logger');
const forms = {
  SentenceList: require('../models/result/subclass/sentenceList'),
  VerbList: require('../models/result/subclass/verbList'),
  NounList: require('../models/result/subclass/nounList'),
  ValueList: require('../models/result/subclass/valueList')
};
const path = 'result';

const profilePOS = (arr) => {
  let terms = 0;
  let tags = {
    verb: 0,
    noun: 0,
    value: 0,
  };
  for(let i = 0; i < arr.length; i++) {
    for(let o = 0; o < arr[i].length; o++) {
      let t = arr[i].get(o);
      terms += 1;
      if (t.tag.Verb) {
        tags.verb += 1;
      }
      if (t.tag.Noun) {
        tags.noun += 1;
      }
      if (t.tag.Value) {
        tags.value += 1;
      }
    }
  }
  //set the averages
  Object.keys(tags).forEach((k) => {
    tags[k] = parseInt((tags[k] / terms) * 100, 10);
  });
  return {
    terms: terms,
    tags: tags
  };
};

//
const findResult = function(arr, context) {
  const profile = profilePOS(arr);
  //anything long is a sentence-list
  if (profile.terms > 5) {
    log.tell('-sentenceList-', path);
    return new forms.SentenceList(arr);
  }
  if (profile.tags.verb > 80) {
    log.tell('-VerbList-', path);
    return new forms.VerbList(arr);
  }
  //a couple ambiguous words is a sentence
  if (profile.terms >= 3) {
    log.tell('-sentenceList-', path);
    return new forms.SentenceList(arr);
  }
  return new Result(arr);
};

module.exports = findResult;
