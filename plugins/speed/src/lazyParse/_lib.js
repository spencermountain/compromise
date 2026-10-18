const compiled = new WeakMap()
const maxPatterns = 100

const getNet = (nlp, pattern) => {
  if (typeof pattern !== 'string') {
    return pattern
  }
  let cache = compiled.get(nlp)
  if (!cache || cache.hooks !== nlp.hooks()) {
    cache = { hooks: nlp.hooks(), patterns: new Map() }
    compiled.set(nlp, cache)
  }
  let net = cache.patterns.get(pattern)
  if (!net) {
    net = nlp.buildNet([{ match: pattern }])
    if (cache.patterns.size >= maxPatterns) {
      cache.patterns.delete(cache.patterns.keys().next().value)
    }
  }
  cache.patterns.delete(pattern)
  cache.patterns.set(pattern, net)
  return net
}

export default getNet
