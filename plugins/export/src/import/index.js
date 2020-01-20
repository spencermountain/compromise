//create json data from .export() output
const loadFromExport = function(json) {
  if (typeof json === 'string') {
    json = JSON.parse(json)
  }
  //create Phrase objects
  let phrases = json.list.map(termArr => {
    //unpack each term
    let terms = termArr.map(a => {
      //unpack tags
      let tags = a[3].split(',').map(str => json.tags[str])
      return {
        pre: typeof a[0] === 'number' ? json.words[a[0]] : a[0],
        text: typeof a[1] === 'number' ? json.words[a[1]] : a[1],
        post: typeof a[2] === 'number' ? json.words[a[2]] : a[2],
        tags: tags.filter(tag => tag),
      }
    })
    return { terms: terms } //minimum phrase info
  })
  return phrases
}

module.exports = loadFromExport
