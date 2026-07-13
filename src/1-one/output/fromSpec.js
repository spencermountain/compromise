// parse the adhoc output of out('spec')
const fromSpec = function (spec) {
  let world = this.world()
  let sentences = spec.split('\n').map(line => {
    // split on the last { only
    let [text] = line.split(' {').slice(0, -1)
    text = text.trim()
    // tags = tags.split(',').map(tag => tag.trim())
    return text
  })
  let clean = sentences.join('\n')
  let doc = this.tokenize(clean)
  doc.compute(world.hooks)
  return doc
}
export default fromSpec