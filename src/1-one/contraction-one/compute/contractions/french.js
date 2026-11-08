const hasContraction = /'/
const isFeminine = /(e|é|aison|sion|tion)$/
const isMasculine = /(age|isme|acle|ege|oire)$/
// l' words that end in e, but take le - accents are already stripped
const masculineE = new Set(['homme', 'arbre', 'espace', 'exemple', 'ordre', 'ange', 'etre', 'ete', 'empire', 'oncle', 'angle', 'article', 'orchestre', 'insecte', 'episode'])
// l' words that take la, without ending in e
const feminineEnd = /(eau|tion|sion)$/
// the word after the apostrophe
const getAfter = (terms, i) => terms[i].normal.split(hasContraction)[1]

// l'amour, l'homme, l'eau
const preL = (terms, i) => {
  // le/la
  const after = getAfter(terms, i)
  // quick french gender disambig (rough)
  if (after && ((after.endsWith('e') && !masculineE.has(after)) || feminineEnd.test(after))) {
    return ['la', after]
  }
  return ['le', after]
}

// d'amerique
const preD = (terms, i) => {
  const after = getAfter(terms, i)
  // quick guess for noun-agreement (rough)
  if (after && isFeminine.test(after) && !isMasculine.test(after)) {
    return ['du', after]
  } else if (after && after.endsWith('s')) {
    return ['des', after]
  }
  return ['de', after]
}

// j'aime
const preJ = (terms, i) => ['je', getAfter(terms, i)]

export default {
  preJ,
  preL,
  preD,
}
