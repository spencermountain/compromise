'use strict';

//is this sentence asking a question?
const isQuestion = function (ts) {
  let endPunct = ts.getPunctuation();
  let clauses = ts.match('*').splitAfter('#Comma');

  console.log(ts.out('text'));
  console.log(/^\w+\s+/.test(ts.out('text')));
  console.log(ts.out('text').match('/^\w+\s+/ who'))

  switch (true) {
    // If it has a question mark
    // e.g., Is this the real life?
    case /\?/.test(endPunct) === true:
      console.log('1')
      return true;

    // Has ellipsis at the end means it's probably not a question
    // e.g., Is this just fantasy...
    case /\.\.$/.test(ts.out('text')):
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
    // e.g., Must I be come easy come easy go
    case ts.has('^(have|must) you'):
      console.log('7')
      return true;

    // Clause starts with a question word
    // e.g., Anyway the wind blows, what doesn't really matter to me
    case clauses.has('^#QuestionWord'):
      console.log('8')
      return true;

    //is wayne gretskzy alive
    case clauses.has('(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$'):
      console.log('9')
      return true;

    // Probably not a question
    default:
      console.log('10')
      return false;
  }
};
module.exports = isQuestion;
