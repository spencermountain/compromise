// tokenize by term
const tokenize = function(doc) {
  let list = doc.json({ terms: { clean: true }, text: false }).map(o => {
    return o.terms.map(t => t.clean)
  })
  return list
}
module.exports = tokenize
