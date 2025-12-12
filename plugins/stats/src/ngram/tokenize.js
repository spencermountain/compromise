// tokenize by term
const tokenize = function (doc) {
  const list = doc.json({ text: false }).map(o => {
    return o.terms.map(t => t.normal)
  })
  return list
}
export default tokenize
