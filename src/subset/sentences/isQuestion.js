'use strict';

//is this sentence asking a question?
const isQuestion = function (ts) {
  let endPunct = ts.getPunctuation();
  let clauses = ts.match('*').splitAfter('#Comma');

  switch (true) {
    // If it has a question mark
    // e.g., Is this the real life?
    case /\?/.test(endPunct) === true:
      console.log('1')
      return true;

    // Has ellipsis at the end means it's probably not a question
    // e.g., Is this just fantasy...
    case ts.has('\\.\\.$'):
      console.log('2')
      return false;

    // Starts with question word, but has a comma, so probably not a question
    // e.g., Why are we caught in a land slide, no escape from reality
    case ts.has('^#QuestionWord') && ts.has('#Comma'):
      console.log('3')
      return false;

    // Starts with a #QuestionWord
    // e.g., What open your eyes look up to the skies and see
    case ts.has('^#QuestionWord'):
      console.log('4')
      return true;

    // Second word is a #QuestionWord
    // e.g., I'm what a poor boy
    case ts.has('^\w+\s#QuestionWord'):
      console.log('5')
      return true;

    // is it, do you - start of sentence
    // e.g., Do I need no sympathy
    case ts.has('^(do|does|did|is|was|can|could|will|would|may) #Noun'):
      console.log('6')
      return true;

    // these are a little more loose..
    // e.g., Must I  be come easy come easy go
    case ts.has('^(have|must) you'):
      console.log('7')
      return true;


    // Probably not a question
    default:
      return false;


  }

  return;

  // console.log('1')
  // //if it has a question mark..
  // let endPunct = ts.getPunctuation();
  // if (/\?/.test(endPunct) === true) {
  //   return true;
  // }

  // console.log('1st', ts.has('\\.\\.$'));
  // // ends with elipses (..) or (...), it's probably not a question
  // // Might be rhetorical
  // if (ts.has('\\.\\.$')) {
  //   return false;
  // }
  console.log('2')
  //try to actually figure this out without a question-mark
  // Check with starting question word
  // console.log('2nd', ts.has('^\\w\+\\s#QuestionWord'))
  // if (ts.has('^#QuestionWord') || ts.has('^\\w\+\\s#QuestionWord')) {
  //   // If it has a comma in it, it might not be a question
  //   // e.g., how that happened, I don't know
  //   if (ts.has('#Comma')) {
  //     return false;
  //   }

  //   return true;
  // }

  // //is it, do you - start of sentence
  // if (ts.has('^(do|does|did|is|was|can|could|will|would|may) #Noun')) {
  //   return true;
  // }




  // //these are a little more loose..
  // if (ts.has('^(have|must) you')) {
  //   return true;
  // }

  // console.log('here');
  // let clauses = ts.match('*').splitAfter('#Comma');

  // if (clauses.has('^#QuestionWord')) {
  //   return true;
  // }

  // //is wayne gretskzy alive
  // if (clauses.has('(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$')) {
  //   return true;
  // }
  // //not a question, then
  // return false;
};
module.exports = isQuestion;
