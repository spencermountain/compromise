//is this sentence asking a question?
const isQuestion = function (doc) {
  let endPunct = doc.post()
  let clauses = doc.clauses()

  if (/\?/.test(endPunct) === true) {
    return true
  }

  // Has ellipsis at the end means it's probably not a question
  // e.g., Is this just fantasy...
  if (/\.\.$/.test(doc.out('text'))) {
    return false
  }

  // Starts with question word, but has a comma, so probably not a question
  // e.g., Why are we caught in a land slide, no escape from reality
  if (doc.has('^#QuestionWord') && doc.has('#Comma')) {
    return false
  }

  // Starts with a #QuestionWord
  // e.g., What open your eyes look up to the skies and see
  if (doc.has('^#QuestionWord')) {
    return true
  }

  // Second word is a #QuestionWord
  // e.g., I'm what a poor boy
  // case ts.has('^\w+\s#QuestionWord'):
  // return true;

  // is it, do you - start of sentence
  // e.g., Do I need no sympathy
  if (doc.has('^(do|does|did|is|was|can|could|will|would|may) #Noun')) {
    return true
  }

  // these are a little more loose..
  // e.g., Must I be come easy come easy go
  if (doc.has('^(have|must) you')) {
    return true
  }

  // Clause starts with a question word
  // e.g., Anyway the wind blows, what doesn't really matter to me
  if (clauses.has('^#QuestionWord')) {
    return true
  }

  //is wayne gretskzy alive
  if (clauses.has('(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$')) {
    return true
  }

  // Probably not a question
  return false
}
module.exports = isQuestion
