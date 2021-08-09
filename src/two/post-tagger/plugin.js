import _model from './model/index.js'
import fns from './methods.js'

const postTagger = function (document, model, methods) {
  let byGroup = fns.compile(model.two.matches, methods)
  let found = fns.bulkMatch(document, byGroup, methods)
  // console.dir(found, { depth: 5 })
  fns.bulkTagger(found, document, model, methods)
  // console.dir(res, { depth: 5 })
  return document
}

const plugin = {
  compute: {
    postTagger,
  },
  methods: {
    canBe: fns.canBe,
    // bulkTagger: fns._methods,
  },
  model: _model,
}
export default plugin
