'use strict';
//true/false information for Sentence()
let sentence = {
  /**is the sentence a normal statement - (not a question, or exclamation) */
  statement: (s) => {
    return s.info('sentenceType') === 'Statement'
  },
  /**is the sentence a question */
  question: (s) => {
    return s.info('sentenceType') === 'Question'
  },
  /**is the sentence an exclamation, like "Good job!" */
  exclamation: (s) => {
    return s.info('sentenceType') === 'Exclamation'
  },
  /** is the sentence in the passive voice - "he was hugged by david"*/
  passive: (s) => {
    return false //TODO
  }
}
module.exports = sentence
