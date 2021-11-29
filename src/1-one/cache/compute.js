
const cache = function (view) {
  view._cache = view.methods.one.cacheDoc(view.document)
}

export default {
  cache
}