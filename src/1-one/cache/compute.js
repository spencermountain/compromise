
const cache = function (document, _world, view) {
  view._cache = view.methods.one.cacheDoc(document)
}

export default {
  cache
}