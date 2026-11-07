import colors from './_colors.js'
import getTagSet from '../_lib.js'

const getColor = function (node) {
  if (Object.hasOwn(colors, node.id)) {
    return colors[node.id]
  }
  if (Object.hasOwn(colors, node.is)) {
    return colors[node.is]
  }
  const found = node._cache.parents.find(c => colors[c])
  return colors[found]
}

// convert tags to our final format
const fmt = function (nodes) {
  const res = {}
  nodes.forEach(node => {
    const { not, allow, also, is, novel } = node.props
    let parents = node._cache.parents
    if (also) {
      parents = parents.concat(also)
    }
    res[node.id] = {
      is,
      not,
      allow,
      novel,
      also,
      parents,
      children: [],
      color: getColor(node),
      // Retain the preferred output name for legacy model consumers.
      alias: node.aliases === undefined ? node.alias : node.aliases[0],
      aliases: node.aliases,
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

  // `allow` names excluded tags that may still coexist with this one. The
  // exception is mutual and covers both sides' descendants. Their parents stay
  // excluded here; setTag keeps a parent only while an allowed tag needs it.
  const allowed = {}
  const permit = function (tag, other) {
    allowed[tag] ||= new Set()
    allowed[tag].add(other)
  }
  Object.keys(res).forEach(k => {
    res[k].allow.forEach(other => {
      if (!res[other]) {
        return
      }
      const ours = [k, ...res[k].children]
      const theirs = [other, ...res[other].children]
      ours.forEach(a => theirs.forEach(b => {
        permit(a, b)
        permit(b, a)
      }))
    })
  })
  Object.keys(res).forEach(k => {
    res[k].allow = Array.from(allowed[k] || [])
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
    if (allowed[k]) {
      allowed[k].forEach(tag => nots.delete(tag))
    }
    res[k].not = Array.from(nots)
    getTagSet(res[k].not)
    getTagSet(res[k].children)
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
