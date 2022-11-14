import { prevSentence, findChain } from './lib.js'

// only filter if we know a gender
// ambiguous names like 'jamie smith' will refer to either he or she
const byGender = function (ppl, gender) {
  if (gender === 'm') {
    return ppl.filter(m => !m.presumedFemale().found)
  } else if (gender === 'f') {
    return ppl.filter(m => !m.presumedMale().found)
  }
  return ppl
}

const miscPeople = function (s) {
  return s.nouns().if('#Actor+')
}

const findPerson = function (m, gender) {
  let s = m.before()
  // look at current sentence
  let person = byGender(s.people(), gender)
  if (person.found) {
    return person.last()
  }
  // non-named people, like 'cowboy'
  person = miscPeople(s)
  if (person.found) {
    return person.last()
  }

  // look at prev sentence
  s = prevSentence(m)
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
export default findPerson
