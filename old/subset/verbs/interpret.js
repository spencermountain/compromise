'use strict';
const predict = require('./methods/predict');
const isPlural = require('./methods/isPlural');

//'walking' - aka progressive
const isContinuous = function(ts) {
  return ts.match('#Gerund').found;
};

//will not walk
const isNegative = function(ts) {
  let negs = ts.match('#Negative').list;
  if (negs.length === 2) {
    return false;
  }
  if (negs.length === 1) {
    return true;
  }
  return false;
};

//been walked by..
const isPassive = function(ts) {
  if (ts.match('is being #PastTense').found) {
    return true;
  }
  if (ts.match('(had|has) been #PastTense').found) {
    return true;
  }
  if (ts.match('will have been #PastTense').found) {
    return true;
  }
  return false;
};

//had walked
const isPerfect = function(ts) {
  if (ts.match('^(had|have) #PastTense')) {
    return true;
  }
  return false;
};

//should walk, could walk
const getModal = function(ts) {
  let modal = ts.match('#Modal');
  if (!modal.found) {
    return null;
  }
  return modal.out('normal');
};

//past/present/future
const getTense = function(ts) {
  //look at the preceding words
  if (ts.auxiliary.found) {
    //'will'
    if (ts.match('will have #PastTense').found) {
      return 'Past';
    }
    if (ts.auxiliary.match('will').found) {
      return 'Future';
    }
    //'was'
    if (ts.auxiliary.match('was').found) {
      return 'Past';
    }
  }
  //look at the main verb tense
  if (ts.verb) {
    const tenses = {
      PastTense: 'Past',
      FutureTense: 'Future',
      FuturePerfect: 'Future',
    };
    let tense = predict(ts.verb); //yikes
    return tenses[tense] || 'Present';
  }
  return 'Present';
};

// const isImperative = function(ts) {};
// const isConditional = function(ts) {};

// detect signals in Auxiliary verbs
// 'will' -> future, 'have'->perfect, modals, negatives, adverbs
const interpret = (ts) => {
  let isNeg = isNegative(ts);
  // let aux = ts.Auxiliary.clone();
  // aux = aux.not('(#Negative|#Adverb)');
  let obj = {
    negative: isNeg,
    continuous: isContinuous(ts),
    passive: isPassive(ts),
    perfect: isPerfect(ts),
    plural: isPlural(ts),
    modal: getModal(ts),
    tense: getTense(ts),
  };
  return obj;
};
module.exports = interpret;
