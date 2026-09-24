import parse from './01-parse.js'
import buildIndex from './02-index.js'

// do some indexing on the list of matches
const buildNet = function (matches, world) {
  // turn match-syntax into json
  matches = parse(matches, world)

  // collect by wants and needs
  const hooks = {}
  matches.forEach(obj => {
    // add needs
    obj.needs.forEach(str => {
      hooks[str] = Array.isArray(hooks[str]) ? hooks[str] : []
      hooks[str].push(obj)
    })
    // add wants
    obj.wants.forEach(str => {
      hooks[str] = Array.isArray(hooks[str]) ? hooks[str] : []
      hooks[str].push(obj)
    })
  })
  // Record enumeration order, including numeric keys, so input-driven lookup
  // can preserve the order in which tag actions have always been applied.
  const hookOrder = Object.create(null)
  Object.keys(hooks).forEach((k, i) => {
    hookOrder[k] = i
    // remove duplicates
    const already = new Set()
    hooks[k] = hooks[k].filter(obj => {
      if (already.has(obj)) {
        return false
      }
      already.add(obj)
      return true
    })
  })

  // keep all un-cacheable matches (those with no needs) 
  const always = matches.filter(o => o.needs.length === 0 && o.wants.length === 0)
  return {
    hooks,
    hookOrder,
    index: buildIndex(matches, hooks, hookOrder),
    always
  }
}

export default buildNet
