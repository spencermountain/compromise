// split adverbs as before/after the root
const getAdverbs = function (vb, root) {
  if (!vb.has('#Adverb')) {
    return {}
  }
  // pivot on the main verb
  let parts = vb.splitOn(root)
  if (parts.length === 3) {
    return {
      pre: parts.eq(0).adverbs(),
      post: parts.eq(2).adverbs(),
    }
  }
  // it must be the second one
  if (parts.eq(0).is(root)) {
    return { post: parts.eq(1).adverbs() }
  }
  return { pre: parts.eq(0).adverbs() }
}
export default getAdverbs
