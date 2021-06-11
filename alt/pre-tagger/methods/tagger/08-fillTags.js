//add deduced parent tags to our terms
const fillTags = function (terms, model) {
  terms.forEach(term => {
    //there is probably just one tag, but we'll allow more
    let tags = Array.from(term.tags)
    for (let i = 0; i < tags.length; i += 1) {
      if (model.tags[tags[i]]) {
        let toAdd = model.tags[tags[i]].parents || []
        toAdd.forEach(tag => term.tags.add(tag))
      } else {
        // console.log('missing ' + tags[i])
        // console.log(term)
      }
    }
  })
}
module.exports = fillTags
