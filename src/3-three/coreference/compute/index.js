import getPerson from './findPerson.js'
import getThey from './findThey.js'
import { prevSentence, he, she, they } from './lib.js'

const addReference = function (pron, m) {
  if (m && m.found) {
    // add reference on the pronoun
    const term = pron.docs[0][0]//pronouns are 1 word only
    term.reference = m.ptrs[0]
  }
}

// look in the same sentence, then the previous one, then two sentences back
const stepBack = function (m, cb) {
  let s = m.before()
  let res = cb(s)
  for (let i = 0; i < 2 && !res.found; i += 1) {
    s = prevSentence(i === 0 ? m : s)
    res = cb(s)
  }
  return res.found ? res : m.none()
}

const coreference = function (view) {
  const pronouns = view.pronouns().if('(he|him|his|she|her|hers|they|them|their|theirs|it|its)')
  pronouns.forEach(pron => {
    let res = null
    // connect pronoun to its reference
    if (pron.has(he)) {
      res = stepBack(pron, (m) => getPerson(m, 'm'))
    } else if (pron.has(she)) {
      res = stepBack(pron, (m) => getPerson(m, 'f'))
    } else if (pron.has(they)) {
      res = stepBack(pron, getThey)
    }
    if (res && res.found) {
      addReference(pron, res)
    }
  })
}
export default coreference