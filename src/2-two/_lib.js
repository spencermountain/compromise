// does the term have any of these tags?
const hasAny = (term, ...tags) => tags.some(tag => term.tags.has(tag))

// 'a b c' -> Set
const toSet = str => new Set(str.split(' '))

export { hasAny, toSet }
