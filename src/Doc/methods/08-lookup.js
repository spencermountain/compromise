/** lookup an array of words or phrases */
exports.lookup = function(arr) {
  if (typeof arr === 'string') {
    arr = [arr]
  }
  let tokenized = arr.map(str => {
    str = str.toLowerCase()
    return str.split(' ')
  })
  this.cache()
  let found = []
  this.list.forEach(p => {
    tokenized.forEach(a => {
      if (p.cache.words.hasOwnProperty(a[0])) {
        let terms = p.terms()
        let i = p.cache.words[a[0]]
        for (let n = 0; n < a.length; n++) {
          if (terms[i + n].text !== a[n]) {
            return
          }
        }
        let phrase = p.buildFrom(terms[i].id, a.length)
        found.push(phrase)
      }
    })
  })
  let doc = this.buildFrom(found)
  return doc
}
