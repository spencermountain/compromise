import { matchCase } from '../../../1-one/change/api/lib/_case.js'

// new words have no chunk, and .nouns() needs one to find them again
const setChunk = function (m) {
  m.docs.forEach(terms => {
    terms.forEach(term => {
      term.chunk = 'Noun'
    })
  })
  return m
}

// a plural possessive keeps its apostrophe in the whitespace - "dogs' bowls"
const hasApostrophe = term => /^['’] /.test(term.post)

// "spencer's" or "the boys'" - these do not inflect
const isPossessive = root => root.has('#Poss') || root.docs.some(terms => terms.some(hasApostrophe))

// an acronym, already pluralized - 'CDs'
const isPluralAcronym = root => /^\p{Lu}{2,}s$/u.test(root.text('trim'))

// these stay as they are, and so do the words around them - "boys'", 'CDs', 'cats/dogs'
const isFixed = root => isPossessive(root) || isPluralAcronym(root) || root.text().includes('/')

export { matchCase, setChunk, hasApostrophe, isPossessive, isFixed }
