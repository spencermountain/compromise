// always a contracttion
const always = new Set([
  'here',
  'there',
  'she',
  'it',
  'he',
  'that',
  'here',
  'there',
  'your',
  'who',
  'what',
  'where',
  'why',
  'when',
  'how',
  'let',
  'else',

  'name', //name's dave
  // 'god', //god's gift
])

// // always a posessive
// const never = new Set([
//   'one',
//   'men',
//   'man',
//   'woman',
//   'women',
//   'girl',
//   'boy',
//   'mankind',
//   'world',
//   'today',
//   'tomorrow',
// ])

// // spencer's cool
const afterYes = new Set([
  //   'cool',
  //   'nice',
  //   'beautiful',
  //   'ugly',
  //   'good',
  //   'bad',
  //   'ok',
  //   'right',
  //   'wrong',
  //   'big',
  //   'small',
  //   'large',
  //   'huge',
  //   'above',
  //   'below',
  //   'in',
  //   'out',
  //   'inside',
  //   'outside',
  //   'always',
  //   'even',
  //   'same',
  //   'still',
  //   'cold',
  //   'hot',
  //   'old',
  //   'young',
  //   'rich',
  //   'poor',
  //   'early',
  //   'late',
  // 'new',
  // 'old',
  // 'tiny',
  // 'huge',

  // adverbs
  'really',
  'very',
  'barely',
  'also',
  'not',
  'just',
  'more',
  'only',
  'often',
  'quite',
  'so',
  'too',
  'well',
])

const shouldSplit = (terms, i) => {
  let term = terms[i]

  const byApostrophe = /'s/
  let [before] = term.normal.split(byApostrophe)
  if (always.has(before)) {
    return true
  }
  // if (never.has(before)) {
  //   return false
  // }

  // gandhi's so cool
  let nextTerm = terms[i + 1]
  if (nextTerm && afterYes.has(nextTerm.normal)) {
    return true
  }

  // if (nextTerm) {
  //   console.log(term.normal, nextTerm.normal)

  // } else {
  //   console.log(term.normal)
  // }
  // console.log(before)
  // these can't be possessive
  // if (hereThere.hasOwnProperty(term.machine)) {
  //   return false
  // }
  // // if we already know it
  // if (term.tags.has('Possessive')) {
  //   return true
  // }
  // //a pronoun can't be possessive - "he's house"
  // if (term.tags.has('Pronoun') || term.tags.has('QuestionWord')) {
  //   return false
  // }
  // if (banList.hasOwnProperty(term.normal)) {
  //   return false
  // }
  // //if end of sentence, it is possessive - "was spencer's"
  // let nextTerm = terms[i + 1]
  // if (!nextTerm) {
  //   return true
  // }
  // //a gerund suggests 'is walking'
  // if (nextTerm.tags.has('Verb')) {
  //   //fix 'jamie's bite'
  //   if (nextTerm.tags.has('Infinitive')) {
  //     return true
  //   }
  //   //fix 'spencer's runs'
  //   if (nextTerm.tags.has('PresentTense')) {
  //     return true
  //   }
  //   return false
  // }
  // //spencer's house
  // if (nextTerm.tags.has('Noun')) {
  //   // 'spencer's here'
  //   if (hereThere.hasOwnProperty(nextTerm.normal) === true) {
  //     return false
  //   }
  //   return true
  // }
  // //rocket's red glare
  // let twoTerm = terms[i + 2]
  // if (twoTerm && twoTerm.tags.has('Noun') && !twoTerm.tags.has('Pronoun')) {
  //   return true
  // }
  // //othwerwise, an adjective suggests 'is good'
  // if (nextTerm.tags.has('Adjective') || nextTerm.tags.has('Adverb') || nextTerm.tags.has('Verb')) {
  //   return false
  // }
  // default to posessive
  return false
}
export default shouldSplit
