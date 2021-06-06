const after = {
  // apostrophe s
  s: () => {
    // !possessive,
    // is/has
  },

  // apostrophe d
  d: () => {
    // had/would/did
  },
  // apostrophe t
  t: () => {
    //ain't -> are/is not
    // "n't": 'not',
  },
}

const before = {
  // l'
  l: () => {
    // le/la
  },
  // d'
  d: () => {
    // de/du/des
  },
}
module.exports = [
  { after: 'll', out: 'will' },
  { after: 've', out: 'have' },
  { after: 're', out: 'are' },
  { after: 'm', out: 'am' },
  { after: 's', out: after.s },
  { after: 'd', out: after.d },
  { after: 't', out: after.t },
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
