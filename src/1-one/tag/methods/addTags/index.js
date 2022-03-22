import grad from 'grad-school'
import fmt from './02-fmt.js'
import validate from './01-validate.js'

// 'fill-down' parent logic inference
const compute = function (allTags) {
  // setup graph-lib format
  const flatList = Object.keys(allTags).map(k => {
    let o = allTags[k]
    const props = { not: new Set(o.not), also: o.also, is: o.is }
    return { id: k, parent: o.is, props, children: [] }
  })
  const graph = grad(flatList).cache().fillDown()
  return graph.out('array')
}

const addTags = function (tags, already) {
  tags = validate(tags, already)

  let allTags = Object.assign({}, already, tags)
  // do some basic setting-up
  // 'fill-down' parent logic
  const nodes = compute(allTags)
  // convert it to our final format
  const res = fmt(nodes)
  return res
}
export default addTags
