import { Plur } from '../../../2-two/preTagger/tagSet/_lib.js'
import fixVerb from '../../nouns/api/_verb.js'
import isSubordinate from '../../nouns/api/isSubordinate.js'
const boundary = /[,;:.!?]/

// Agree only the following noun, without reaching into another phrase.
const agree = (value, singular, verb) => {
  if (boundary.test(value.docs[0].at(-1).post)) {
    return
  }
  const phrase = value.after('^(#Adv|#Adj)+? #NN')
  if (!phrase.found || phrase.docs[0].slice(0, -1).some(term => boundary.test(term.post))) {
    return
  }
  const noun = phrase.lastTerm()
  if (noun.has('(#Pron|#Poss|#Prop|#Uncountable)')) {
    return
  }
  // unit symbols take no plural - '5 kg', '2 percent'
  if (!singular && noun.has('#Unit')) {
    return
  }
  const tag = singular ? 'Singular' : Plur
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
  // 'two dogs are barking' -> 'one dog is barking' (before the noun moves)
  // a list is plural anyway - 'two dogs and [one cat] are here'
  if (verb && !value.before('and$').found) {
    const m = value.growRight('(#Adv|#Adj)+? #NN')
    fixVerb(m, { isSubordinate: isSubordinate(m) }, !singular)
  }
  noun.replaceWith(str, { tags: true }).tag(tag)
}

export default agree
