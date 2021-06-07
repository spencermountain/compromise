const { before, after } = require('./tricky')

module.exports = [
  // simple mappings
  { word: '@', out: ['at'] },
  { word: 'alot', out: ['a', 'lot'] },
  { word: 'brb', out: ['be', 'right', 'back'] },
  { word: 'cannot', out: ['can', 'not'] },
  { word: 'cant', out: ['can', 'not'] },
  { word: 'dont', out: ['do', 'not'] },
  { word: 'dun', out: ['do', 'not'] },
  { word: 'dunno', out: ['do', 'not', 'know'] },
  { word: 'gonna', out: ['going', 'to'] },
  { word: 'gtg', out: ['got', 'to', 'go'] },
  { word: 'howd', out: ['how', 'did'] },
  { word: 'im', out: ['i', 'am'] },
  { word: 'imma', out: ['I', 'will'] },
  { word: 'imo', out: ['in', 'my', 'opinion'] },
  { word: 'irl', out: ['in', 'real', 'life'] },
  { word: 'ive', out: ['i', 'have'] },
  { word: 'rn', out: ['right', 'now'] },
  { word: 'tbh', out: ['to', 'be', 'honest'] },
  { word: 'til', out: ['today', 'i', 'learned'] },
  { word: 'twas', out: ['it', 'was'] },
  { word: 'wanna', out: ['want', 'to'] },
  { word: 'whatd', out: ['what', 'did'] },
  { word: 'whend', out: ['when', 'did'] },
  { word: 'whered', out: ['where', 'did'] },
  { word: 'wont', out: ['will', 'not'] },
  { word: "can't", out: ['can', 'not'] },
  { word: "shan't", out: ['should', 'not'] },
  { word: "when'd", out: ['when', 'did'] },
  { word: "where'd", out: ['where', 'did'] },
  { word: "won't", out: ['will', 'not'] },

  // contraction-part mappings
  { after: 'll', out: 'will' }, //i'll
  { after: 've', out: 'have' }, //i've
  { after: 're', out: 'are' }, //we're
  { after: 'm', out: 'am' }, //i'm
  { after: 's', out: after.s }, //spencer's
  { after: 'd', out: after.d }, //i'd
  { after: 't', out: after.t }, //isn't

  // french contractions
  { before: 'l', out: before.l }, // l'amour
  { before: 'd', out: before.d }, // d'amerique
  { before: 'c', out: 'ce' }, // c'est
  { before: 'm', out: 'me' }, // m'appelle
  { before: 'n', out: 'ne' }, // n'est
  { before: 'qu', out: 'que' }, // qu'il
  { before: 's', out: 'se' }, // s'appelle
  { before: 't', out: 'tu' }, // t'aime
]
