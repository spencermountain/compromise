'use strict';

//is this sentence asking a question?
const isQuestion = function(ts) {
  //if it has a question mark..
  let endPunct = ts.getPunctuation();
  if (/\?/.test(endPunct) === true) {
    return true;
  }
  //try to actually figure this out without a question-mark
  if (ts.has('#QuestionWord')) {
    return true;
  }

  //is it, do you - start of sentence
  if (ts.has('^(do|does|did|is|was|can|could|will|would|may) #Noun')) {
    return true;
  }
  //these are a little more loose..
  if (ts.has('^(have|must) you')) {
    return true;
  }

  let clauses = ts.match('*').splitAfter('#Comma');
  //is wayne gretskzy alive
  if (clauses.has('(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$')) {
    return true;
  }
  //not a question, then
  return false;
};
module.exports = isQuestion;
