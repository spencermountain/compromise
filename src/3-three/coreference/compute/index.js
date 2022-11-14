import getPerson from './findPerson.js'
import getThey from './findThey.js'
import { prevSentence } from './lib.js'

const addReference = function (pron, m) {
  if (m && m.found) {
    // add reference on the pronoun
    let term = pron.docs[0][0]//pronouns are 1 word only
    term.reference = m.ptrs[0]
  }
}

const find = function (m, cb) {
  // 1st - in same sentence
  let s = m.before()
  let res = cb(s)
  if (res.found) {
    return res
  }
  // 2nd - previous sentence
  s = prevSentence(m)
  res = cb(s)
  if (res.found) {
    return res
  }
  // 3rd - two sentences back
  s = prevSentence(s)
  res = cb(s)
  if (res.found) {
    return res
  }
  return m.none()
}

const coreference = function (view) {
  view.match('(he|his|she|her|they|their|it|its)').forEach(pron => {
    let res = null
    if (pron.has('(he|his)')) {
      res = find(pron, (m) => getPerson(m, 'm'))
    } else if (pron.has('(she|her)')) {
      res = find(pron, (m) => getPerson(m, 'f'))
    } else if (pron.has('(they|their)')) {
      res = find(pron, getThey)
    }
    if (res && res.found) {
      addReference(pron, res)
    }
  })
}
export default coreference