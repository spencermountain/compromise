import grad from 'grad-school'

import nouns from './nouns.js'
import verbs from './verbs.js'
import values from './values.js'
import misc from './misc.js'
let allTags = Object.assign({}, nouns, verbs, values, misc)

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

// setup graph-lib format
const nodes = Object.keys(allTags).map(k => {
  let o = allTags[k]
  return { id: k, parent: o.is, props: { not: o.not || [], also: o.also || [], color: colors[k] } }
})
const graph = grad(nodes).cache().fillDown()

// convert it to our final format
const tagSet = {}
graph.out('array').forEach(node => {
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

export default tagSet
