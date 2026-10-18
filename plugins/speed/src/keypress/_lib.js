const states = new WeakMap()

const getState = nlp => {
  if (!states.has(nlp)) {
    const state = { revision: 0, lex: null, sessions: new WeakMap() }
    const addWords = nlp.addWords
    // Lexicon updates mutate the model in place, so identity is not sufficient.
    nlp.addWords = function (...args) {
      state.revision += 1
      state.lex = null
      return addWords.apply(this, args)
    }
    states.set(nlp, state)
  }
  return states.get(nlp)
}

const getCache = (nlp, lex, opts) => {
  const state = getState(nlp)
  if (lex && JSON.stringify(lex) !== state.lex) {
    nlp.addWords(lex)
    state.lex = JSON.stringify(lex)
  }
  const key = opts.cache || nlp
  const hooks = nlp.hooks()
  let cache = state.sessions.get(key)
  if (!cache || opts.reset || cache.revision !== state.revision || cache.hooks !== hooks) {
    cache = { revision: state.revision, hooks, sentences: new Map() }
    state.sessions.set(key, cache)
  }
  return cache
}

export default getCache
