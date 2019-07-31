let guessVerb = {
  Gerund: ['ing'],
  Actor: ['erer'],
  Infinitive: [
    'ate',
    'ize',
    'tion',
    'rify',
    'then',
    'ress',
    'ify',
    'age',
    'nce',
    'ect',
    'ise',
    'ine',
    'ish',
    'ace',
    'ash',
    'ure',
    'tch',
    'end',
    'ack',
    'and',
    'ute',
    'ade',
    'ock',
    'ite',
    'ase',
    'ose',
    'use',
    'ive',
    'int',
    'nge',
    'lay',
    'est',
    'ain',
    'ant',
    'ent',
    'eed',
    'er',
    'le',
    'own',
    'unk',
    'ung',
    'en',
  ],
  PastTense: ['ed', 'lt', 'nt', 'pt', 'ew', 'ld'],
  PresentTense: [
    'rks',
    'cks',
    'nks',
    'ngs',
    'mps',
    'tes',
    'zes',
    'ers',
    'les',
    'acks',
    'ends',
    'ands',
    'ocks',
    'lays',
    'eads',
    'lls',
    'els',
    'ils',
    'ows',
    'nds',
    'ays',
    'ams',
    'ars',
    'ops',
    'ffs',
    'als',
    'urs',
    'lds',
    'ews',
    'ips',
    'es',
    'ts',
    'ns',
  ],
}
//flip it into l
guessVerb = Object.keys(guessVerb).reduce((h, k) => {
  guessVerb[k].forEach(a => (h[a] = k))
  return h
}, {})

const fromTense = function(verb) {
  // 1. decide from known-tags
  if (verb.has('#PastTense')) {
    return 'PastTense'
  } else if (verb.has('#Gerund')) {
    return 'Gerund'
  } else if (verb.has('#PresentTense')) {
    return 'PresentTense'
  } else if (verb.has('#Participle')) {
    return 'Participle'
  } else if (verb.has('#Actor')) {
    return 'Actor'
  }
  // 2. guess a little-bit
  let str = verb.out('normal')
  let three = str.substr(str.length - 3)
  if (guessVerb.hasOwnProperty(three) === true) {
    return guessVerb[three]
  }
  let two = str.substr(str.length - 2)
  if (guessVerb.hasOwnProperty(two === true)) {
    return guessVerb[two]
  }
  let one = str.substr(str.length - 1)
  if (one === 's') {
    return 'PresentTense'
  }
  return null
}
module.exports = fromTense
