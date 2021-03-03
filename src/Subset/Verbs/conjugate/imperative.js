// verb-phrases that are orders - 'close the door'
// these should not be conjugated
const isImperative = function (parsed) {
  // console.log(parsed)
  let vb = parsed.original
  let aux = parsed.auxiliary
  let subj = parsed.subject

  // speak the truth
  if (parsed.verb.has('^#Infinitive')) {
    // get the *actual* full sentence (awk)
    let s = vb.parents()[0] || vb
    // s = s.sentence()
    // s.debug()
    // s.sentence().debug()
    // s.debug()
    // you eat?
    if (s.has('@hasQuestionMark')) {
      return false
    }
    // 'i speak' is not imperative
    if (subj.has('(i|we|they)')) {
      return false
    }
    // do the dishes
    if (aux.has('do')) {
      return true
    }
    // go fast!
    if (s.has('^#Infinitive #Adverb?$')) {
      // s.debug()
      // console.log('=-=-=-= here -=-=-=-')
      return true
    }
    // 'you should speak' is
    if (aux.has('(should|must)')) {
      return true
    }
    // shut the door
    if (s.has('^#Infinitive (#Determiner|#Possessive) #Noun')) {
      return true
    }
  }
  return false
}

module.exports = isImperative
