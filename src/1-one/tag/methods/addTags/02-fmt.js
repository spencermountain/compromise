import colors from './_colors.js'

const getColor = function (node) {
  if (colors.hasOwnProperty(node.id)) {
    return colors[node.id]
  }
  if (colors.hasOwnProperty(node.is)) {
    return colors[node.is]
  }
  const found = node._cache.parents.find(c => colors[c])
  return colors[found]
}

// convert tags to our final format
const fmt = function (nodes) {
  const res = {}
  nodes.forEach(node => {
    const { not, also, is, novel } = node.props
    let parents = node._cache.parents
    if (also) {
      parents = parents.concat(also)
    }
    res[node.id] = {
      is,
      not,
      novel,
      also,
      parents,
      children: [],
      color: getColor(node),
      alias: node.alias,
    }
  })
  // `also` is another inheritance edge. Resolve its ancestors before building
  // reverse edges, so removing any parent also removes all dependent tags.
  const resolved = new Set()
  const resolving = new Set()
  const resolveParents = function (tag) {
    if (resolved.has(tag)) {
      return res[tag].parents
    }
    if (resolving.has(tag)) {
      throw new Error(`compromise: cyclic tag inheritance at '${tag}'`)
    }
    resolving.add(tag)
    const parents = new Set()
    res[tag].parents.forEach(parent => {
      if (res[parent]) {
        resolveParents(parent).forEach(ancestor => parents.add(ancestor))
      }
      parents.add(parent)
    })
    res[tag].parents = Array.from(parents)
    resolving.delete(tag)
    resolved.add(tag)
    return res[tag].parents
  }
  Object.keys(res).forEach(tag => resolveParents(tag))
  Object.keys(res).forEach(tag => {
    res[tag].parents.forEach(parent => {
      if (res[parent]) {
        res[parent].children.push(tag)
      }
    })
  })

  // Inherit exclusions through every parent, then exclude all descendants of
  // each conflicting tag. Read a snapshot to keep this independent of order.
  const exclusions = {}
  Object.keys(res).forEach(tag => { exclusions[tag] = res[tag].not })
  Object.keys(res).forEach(k => {
    const nots = new Set(exclusions[k])
    res[k].parents.forEach(parent => {
      for (const not of exclusions[parent] || []) {
        nots.add(not)
      }
    })
    Array.from(nots).forEach(not => {
      if (res[not]) {
        res[not].children.forEach(tag => nots.add(tag))
      }
    })
    res[k].not = Array.from(nots)
    // Keep accepting custom definitions, but flag impossible combinations once
    // per tag, after both inheritance and reciprocal exclusions are resolved.
    const conflicts = [k, ...res[k].parents].filter(tag => nots.has(tag))
    if (conflicts.length > 0) {
      const names = conflicts.map(tag => `#${tag}`).join(', ')
      console.warn(`compromise: contradictory tag '#${k}' requires and excludes: ${names}`) // eslint-disable-line no-console
    }
  })
  return res
}

export default fmt
