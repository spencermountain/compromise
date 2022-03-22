export default [
  // simple mappings
  { word: '@', out: ['at'] },
  { word: 'alot', out: ['a', 'lot'] },
  { word: 'brb', out: ['be', 'right', 'back'] },
  { word: 'cannot', out: ['can', 'not'] },
  { word: 'cant', out: ['can', 'not'] },
  { word: 'dont', out: ['do', 'not'] },
  { word: 'dun', out: ['do', 'not'] },
  { word: 'wont', out: ['will', 'not'] },
  { word: "can't", out: ['can', 'not'] },
  { word: "shan't", out: ['should', 'not'] },
  { word: "won't", out: ['will', 'not'] },
  { word: "that's", out: ['that', 'is'] },
  { word: 'dunno', out: ['do', 'not', 'know'] },
  { word: 'gonna', out: ['going', 'to'] },
  { word: 'gotta', out: ['have', 'got', 'to'] }, //hmm
  { word: 'gtg', out: ['got', 'to', 'go'] },
  { word: 'im', out: ['i', 'am'] },
  { word: 'imma', out: ['I', 'will'] },
  { word: 'imo', out: ['in', 'my', 'opinion'] },
  { word: 'irl', out: ['in', 'real', 'life'] },
  { word: 'ive', out: ['i', 'have'] },
  { word: 'rn', out: ['right', 'now'] },
  { word: 'tbh', out: ['to', 'be', 'honest'] },
  { word: 'wanna', out: ['want', 'to'] },
  // apostrophe d
  { word: 'howd', out: ['how', 'did'] },
  { word: 'whatd', out: ['what', 'did'] },
  { word: 'whend', out: ['when', 'did'] },
  { word: 'whered', out: ['where', 'did'] },

  // { after: `cause`, out: ['because'] },
  { word: "'tis", out: ['it', 'is'] },
  { word: "'twas", out: ['it', 'was'] },
  { word: 'twas', out: ['it', 'was'] },
  { word: 'y\'know', out: ['you', 'know'] },
  { word: "ne'er", out: ['never'] },
  { word: "o'er ", out: ['over'] },
  // contraction-part mappings
  { after: 'll', out: ['will'] },
  { after: 've', out: ['have'] },
  { after: 're', out: ['are'] },
  { after: 'm', out: ['am'] },
  // french contractions
  { before: 'c', out: ['ce'] },
  { before: 'm', out: ['me'] },
  { before: 'n', out: ['ne'] },
  { before: 'qu', out: ['que'] },
  { before: 's', out: ['se'] },
  { before: 't', out: ['tu'] }, // t'aime
  // more-complex ones
  // { after: 's', out: apostropheS }, //spencer's
  // { after: 'd', out: apostropheD }, //i'd
  // { after: 't', out: apostropheT }, //isn't
  // { before: 'l', out: preL }, // l'amour
  // { before: 'd', out: preD }, // d'amerique
]
