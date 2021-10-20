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
  // "how'd": ['how', 'did'], //'how would?'
  // "what'd": ['what', 'did'], //'what would?'
  howd: ['how', 'did'],
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

//
const checkIrregulars = function (term) {
  //check white-list
  if (irregulars.hasOwnProperty(term.clean)) {
    return irregulars[term.clean]
  }
  return null
}
module.exports = checkIrregulars
