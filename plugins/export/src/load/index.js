//create phrase objects from .export() output
const loadFromExport = function(json) {
  if (typeof json === 'string') {
    json = JSON.parse(json)
  }

  //create Phrase objects
  let phrases = json.list.map(terms => {
    //   //create Term objects
    terms = terms.map(arr => {})
    //     let txt = typeof arr[1] === 'number' ? json.words[arr[1]] : arr[1]
    //     let term = new Term(txt)
    //     term.pre = arr[0]
    //     term.post = arr[2]
    //     arr[3].split(',').forEach(num => {
    //       let tag = json.tags[num]
    //       term.tag(tag, '', world)
    //     })
    //     pool.add(term)
    //     return term
    //   })
    //   //add prev/next links
    //   linkTerms(terms)
    //   // return a proper Phrase object
    // return new Phrase(terms[0].id, terms.length, pool)
  })
  let result = [
    {
      terms: [
        { text: 'hi', tags: ['Foo'] },
        { text: 'world', tags: ['Bar'] },
      ],
    },
  ]
  return result
  // return new cl.Doc([], undefined, world)
}

module.exports = loadFromExport
