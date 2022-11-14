import findPerson from './lastPerson.js'


const addReference = function (pron, m) {
  if (m && m.found) {
    // add reference on the pronoun
    let term = pron.docs[0][0]//pronouns are 1 word only
    term.reference = m.ptrs[0]
  }
}

const coreference = function (view) {
  view.match('(he|his|she|her|they|their|it|its)').forEach(pron => {
    let res = null
    if (pron.has('(he|his)')) {
      res = findPerson(pron, 'm')
    } else if (pron.has('(she|her)')) {
      res = findPerson(pron, 'f')
    }
    if (res && res.found) {
      addReference(pron, res)
    }
  })
}
export default coreference