
const prevSentence = function (m) {
  if (!m.found) {
    return m
  }
  let [n] = m.fullPointer[0]
  if (n && n > 0) {
    return m.update([[n - 1]])
  }
  return m.none()
}

const byGender = function (ppl, gender) {
  if (gender === 'm') {
    return ppl.presumedMale()
  } else if (gender === 'f') {
    return ppl.presumedFemale()
  }
  return ppl
}

const lastPerson = function (m, gender) {
  // look at current sentence
  let ppl = m.before().people()
  let person = byGender(ppl, gender)
  if (person.found) {
    return person
  }
  // look at prev sentence
  let s = prevSentence(m)
  person = byGender(s.people(), gender)
  if (person.found) {
    return person
  }
  // look two sentences backward
  s = prevSentence(s)
  person = byGender(s.people(), gender)
  if (person.found) {
    return person
  }
  return m.none()
}


const addReference = function (pron, m) {
  if (m && m.found) {
    // add reference on the pronoun
    let term = pron.docs[0][0]//pronouns are 1 word only
    term.reference = m.ptrs[0]
  }
}

const coreference = function (view) {
  view.match('(he|she|they|his|her|their|it|its)').forEach(pron => {
    let res = null
    if (pron.has('(he|his)')) {
      res = lastPerson(pron, 'm')
    } else if (pron.has('(she|her)')) {
      res = lastPerson(pron, 'f')
    }
    if (res && res.found) {
      addReference(pron, res)
    }
  })
}
export default coreference