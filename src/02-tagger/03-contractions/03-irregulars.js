const irregulars = {
  wanna: ['want', 'to'],
  gonna: ['going', 'to'],
  im: ['i', 'am'],
  alot: ['a', 'lot'],
  ive: ['i', 'have'],
  imma: ['I', 'will'],

  "where'd": ['where', 'did'],
  whered: ['where', 'did'],
  "when'd": ['when', 'did'],
  whend: ['when', 'did'],
  "how'd": ['how', 'did'],
  howd: ['how', 'did'],
  "what'd": ['what', 'did'],
  whatd: ['what', 'did'],
  // "let's": ['let', 'us'], //too weird

  //multiple word contractions
  dunno: ['do', 'not', 'know'],
  brb: ['be', 'right', 'back'],
  gtg: ['got', 'to', 'go'],
  irl: ['in', 'real', 'life'],
  tbh: ['to', 'be', 'honest'],
  imo: ['in', 'my', 'opinion'],
  til: ['today', 'i', 'learned'],
  rn: ['right', 'now'],
  twas: ['it', 'was'],
  '@': ['at'],
}

// either 'is not' or 'are not'
const doAint = function(term, phrase) {
  let terms = phrase.terms()
  let index = terms.indexOf(term)
  let before = terms.slice(0, index)
  //look for the preceding noun
  let noun = before.find(t => {
    return t.tags.Noun
  })
  if (noun && noun.tags.Plural) {
    return ['are', 'not']
  }
  return ['is', 'not']
}

//
const checkIrregulars = function(term, phrase) {
  //this word needs it's own logic:
  if (term.clean === `ain't` || term.clean === 'aint') {
    return doAint(term, phrase)
  }
  //check white-list
  if (irregulars.hasOwnProperty(term.clean)) {
    return irregulars[term.clean]
  }
  return null
}
module.exports = checkIrregulars
