const boundary = /[,;:.!?]/

// Agree only the following noun, without reaching into another phrase.
const agree = (value, singular) => {
  if (boundary.test(value.docs[0].at(-1).post)) {
    return
  }
  const phrase = value.after('^(#Adverb|#Adjective)+? #Noun')
  if (!phrase.found || phrase.docs[0].slice(0, -1).some(term => boundary.test(term.post))) {
    return
  }
  const noun = phrase.lastTerm()
  if (noun.has('(#Pronoun|#Possessive|#ProperNoun|#Uncountable)')) {
    return
  }
  const tag = singular ? 'Singular' : 'Plural'
  if (noun.has('#' + tag)) {
    return
  }
  const { methods, model } = value.world
  const transform = methods.two.transform.noun
  const word = noun.text('normal')
  // A countable reading (two beers) can differ from the lexical mass noun.
  const countModel = { two: { irregularPlurals: model.two.irregularPlurals, uncountable: {} } }
  let str = singular ? transform.toSingular(word, model) : transform.toPlural(word, countModel)
  const original = noun.docs[0][0].text
  if (original === original.toUpperCase()) {
    str = str.toUpperCase()
  } else if (/^\p{Lu}/u.test(original)) {
    str = str.charAt(0).toUpperCase() + str.slice(1)
  }
  noun.replaceWith(str, { tags: true }).tag(tag)
}

export default agree
