import _model from './model/index.js'
import fns from './methods.js'

const postTagger = function (document, model, methods) {
  let byGroup = fns.compile(model.matches, methods)
  let found = fns.bulkMatch(document, byGroup, methods)
  // console.dir(found, { depth: 5 })
  fns.bulkTagger(found, document, model, methods)
  // console.dir(res, { depth: 5 })
  return document
}

// const plugin = function (world) {
//   const { methods, model, parsers } = world
//   methods.postTagger = _methods
//   Object.assign(model, _model)
//   parsers.push(postTagger)
// }
// console.dir(fns, { depth: 1 })
const plugin = {
  methods: {
    postTagger,
    canBe: fns.canBe,
    // bulkTagger: fns._methods,
  },
  model: _model,
  api: {},
}
export default plugin
