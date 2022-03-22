const rules = [
  // === Conjunction ===
  // that the houses
  { match: '[that] #Determiner #Noun', group: 0, chunk: 'Pivot' },
  // estimated that
  { match: '#PastTense [that]', group: 0, chunk: 'Pivot' },

  // === Adjective ===
  // was really nice
  { match: '#Copula #Adverb+? [#Adjective]', group: 0, chunk: 'Adjective' },
  // was nice
  { match: '#Copula [#Adjective]', group: 0, chunk: 'Adjective' },
  // nice and cool
  { match: '#Adjective and #Adjective', chunk: 'Adjective' },
  // really nice
  // { match: '#Adverb+ #Adjective', chunk: 'Adjective' },

  // === Verb ===
  // quickly run
  { match: '#Adverb+ {Verb}', chunk: 'Verb' },
  // quickly and suddenly run
  { match: '#Adverb+ and #Adverb #Verb', chunk: 'Verb' },
  // run quickly
  { match: '{Verb} #Adverb+', chunk: 'Verb' },
  // sitting near
  { match: '#Gerund #Adjective', chunk: 'Verb' },
  // going to walk
  { match: '#Gerund to #Verb', chunk: 'Verb' },
  // is no
  { match: '#Copula no', chunk: 'Verb' },
  // had not
  { match: '#Verb #Negative', chunk: 'Verb' },
  // not seen
  { match: '#Negative #Verb', chunk: 'Verb' },
  // not really
  { match: '#Negative #Adverb ', chunk: 'Verb' },
  // really not
  { match: '#Adverb #Negative', chunk: 'Verb' },
  // want to see
  { match: '(want|wants|wanted) to #Infinitive', chunk: 'Verb' },
  // walk ourselves
  { match: '#Verb #Reflexive', chunk: 'Verb' },
  // tell him the story
  { match: '#Verb [#Pronoun] #Determiner', group: 0, chunk: 'Verb' },
  // tries to walk
  { match: '#Verb [to] #Adverb? #Infinitive', group: 0, chunk: 'Verb' },
  // upon seeing
  { match: '[#Preposition] #Gerund', group: 0, chunk: 'Verb' },

  // === Noun ===
  // the brown fox
  { match: '#Determiner #Adjective+ #Noun', chunk: 'Noun' },
  // the fox
  { match: '(the|this) <Noun>', chunk: 'Noun' },
  // brown fox
  { match: '#Adjective+ <Noun>', chunk: 'Noun' },
  // --- of ---
  // son of a gun
  { match: '<Noun> of #Determiner? #Noun', chunk: 'Noun' },
  // --- in ---
  { match: '#Noun in #Determiner? #Noun', chunk: 'Noun' },
  // indoor and outdoor seating
  { match: '#Singular and #Determiner? #Singular', chunk: 'Noun' },
  // that is why
  // { match: '[that] (is|was)', group: 0, chunk: 'Noun' },
]
let byGroup = null

const setChunks = function (todo, document, methods) {
  const { getDoc } = methods.one
  let terms = getDoc([todo.pointer], document)[0]
  const env = typeof process === 'undefined' ? self.env || {} : process.env
  terms.forEach(term => {
    if (term.chunk === todo.chunk) {
      return
    }
    if (env.DEBUG_CHUNKS) {
      let str = (term.normal + "'").padEnd(8)
      console.log(`  | '${str}  →  \x1b[34m${todo.chunk.padEnd(6)}\x1b[0m - \x1b[2m ${todo.match} \x1b[0m`) // eslint-disable-line
    }
    term.chunk = todo.chunk
  })
}

const matcher = function (document, world) {
  const { methods } = world
  byGroup = byGroup || methods.two.compile(rules, methods)
  let found = methods.two.bulkMatch(document, byGroup, methods)
  found.forEach(todo => {
    setChunks(todo, document, methods)
  })
}
export default matcher
