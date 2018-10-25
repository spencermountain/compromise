'use strict';

//is this sentence asking a question?
const isQuestion = function (ts) {
  console.log('1')
  //if it has a question mark..
  let endPunct = ts.getPunctuation();
  if (/\?/.test(endPunct) === true) {
    return true;
  }

  console.log('1st', ts.has('\\.\\.$'));
  // ends with elipses (..) or (...), it's probably not a question
  // Might be rhetorical
  if (ts.has('\\.\\.$')) {
    return false;
  }
  console.log('2')
  //try to actually figure this out without a question-mark
  // Check with starting question word
  console.log('2nd', ts.has('^\\w\+\\s#QuestionWord'))
  if (ts.has('^#QuestionWord') || ts.has('^\\w\+\\s#QuestionWord')) {
    // If it has a comma in it, it might not be a question
    // e.g., how that happened, I don't know
    if (ts.has('#Comma')) {
      return false;
    }

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

  console.log('here');
  let clauses = ts.match('*').splitAfter('#Comma');

  if (clauses.has('^#QuestionWord')) {
    return true;
  }

  //is wayne gretskzy alive
  if (clauses.has('(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$')) {
    return true;
  }
  //not a question, then
  return false;
};
module.exports = isQuestion;
