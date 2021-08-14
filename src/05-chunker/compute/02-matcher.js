const rules = [
  // === Adjective ===
  // was really nice
  { match: '#Copula [#Adverb+? {Adjective}]', group: 0, chunk: 'Adjective' },
  // really nice
  { match: '#Adverb+ {Adjective}', chunk: 'Adjective' },

  // === Verb ===
  // quickly run
  { match: '#Adverb+ {Verb}', chunk: 'Verb' },
  // run quickly
  { match: '{Verb} #Adverb+', chunk: 'Verb' },

  // === Noun ===
  // the brown fox
  { match: '#Determiner #Adjective+ {Noun}', chunk: 'Noun' },
  // the fox
  { match: '#Determiner {Noun}', chunk: 'Noun' },
  // brown fox
  { match: '#Adjective+ {Noun}', chunk: 'Noun' },
  // son of a gun
  { match: '{Noun} of #Determiner {Noun}', chunk: 'Noun' },
  //
  { match: '{Noun} and {Noun}', chunk: 'Noun' },
]

const setChunks = function (todo, document, methods) {
  const { getDoc } = methods.one
  let terms = getDoc([todo.pointer], document)[0]
  terms.forEach(term => {
    term.chunk = term.chunk || todo.chunk
  })
}

const matcher = function (document, world) {
  const { methods } = world
  let byGroup = methods.two.compile(rules, methods)
  let found = methods.two.bulkMatch(document, byGroup, methods)
  found.forEach(todo => {
    setChunks(todo, document, methods)
  })
}
export default matcher
