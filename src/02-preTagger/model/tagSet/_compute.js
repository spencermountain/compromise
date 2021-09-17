import grad from 'grad-school'

// i just made these up
const colors = {
  Noun: 'blue',
  Verb: 'green',
  Negative: 'green',
  Date: 'red',
  Value: 'red',
  Adjective: 'magenta',
  Preposition: 'cyan',
  Conjunction: 'cyan',
  Determiner: 'cyan',
  Adverb: 'cyan',
}

const compute = function (allTags) {
  // initial validation
  Object.keys(allTags).forEach(k => {
    allTags[k].not = allTags[k].not || []
    allTags[k].also = allTags[k].also || []
  })
  // not links are bi-directional
  // add any incoming not tags
  Object.keys(allTags).forEach(k => {
    let nots = allTags[k].not || []
    nots.forEach(no => {
      allTags[no].not.push(k)
    })
  })

  // setup graph-lib format
  const flatList = Object.keys(allTags).map(k => {
    let o = allTags[k]
    const props = { not: new Set(o.not), also: o.also, color: colors[k] }
    return { id: k, parent: o.is, props }
  })
  const graph = grad(flatList).cache().fillDown()

  // convert it to our final format
  const tagSet = {}
  const nodes = graph.out('array')
  nodes.forEach(node => {
    let { color, not, also } = node.props
    let parents = node._cache.parents
    if (also) {
      parents = parents.concat(also)
    }
    tagSet[node.id] = {
      color,
      not,
      parents,
      children: node._cache.children,
    }
  })
  // lastly, add all children of all nots
  Object.keys(tagSet).forEach(k => {
    let nots = new Set(tagSet[k].not)
    tagSet[k].not.forEach(not => {
      tagSet[not].children.forEach(tag => nots.add(tag))
    })
    tagSet[k].not = Array.from(nots)
  })
  return tagSet
}
export default compute
