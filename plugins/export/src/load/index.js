//add forward/backward 'linked-list' prev/next ids
const linkTerms = terms => {
  terms.forEach((term, i) => {
    if (i > 0) {
      term.prev = terms[i - 1].id
    }
    if (terms[i + 1]) {
      term.next = terms[i + 1].id
    }
  })
}

//create phrase objects from .json() output
const loadFromJSON = function(json, world) {
  let pool = new Pool()
  let phrases = json.map(p => {
    let terms = p.terms.map(o => {
      let term = new Term(o.text)
      term.pre = o.pre !== undefined ? o.pre : term.pre
      term.post = o.post !== undefined ? o.post : term.post
      if (o.tags) {
        o.tags.forEach(tag => term.tag(tag, '', world))
      }
      pool.add(term)
      return term
    })
    //add prev/next links
    linkTerms(terms)
    // return a proper Phrase object
    return new Phrase(terms[0].id, terms.length, pool)
  })
  return phrases
}

//create phrase objects from .export() output
const loadFromExport = function(json, world) {
  let pool = new Pool()
  //create Phrase objects
  let phrases = json.list.map(terms => {
    //create Term objects
    terms = terms.map(arr => {
      let txt = typeof arr[1] === 'number' ? json.words[arr[1]] : arr[1]
      let term = new Term(txt)
      term.pre = arr[0]
      term.post = arr[2]
      arr[3].split(',').forEach(num => {
        let tag = json.tags[num]
        term.tag(tag, '', world)
      })
      pool.add(term)
      return term
    })
    //add prev/next links
    linkTerms(terms)
    // return a proper Phrase object
    return new Phrase(terms[0].id, terms.length, pool)
  })
  return phrases
}

const isArray = function(thing) {
  return toString.call(thing) === '[object Array]'
}

/** create a word-pool and Phrase objects from .export() json*/
const fromJSON = function(json, world) {
  if (typeof json === 'string') {
    json = JSON.parse(json)
  }
  //is this .export() output?
  if (isArray(json) === false && isArray(json.list) === true) {
    return loadFromExport(json, world)
  }
  //otherwise, assume .json() output
  return loadFromJSON(json, world)
}
module.exports = fromJSON
