const hasContraction = /'/

const post = {
  // apostrophe s
  s: () => {
    // !possessive,
    // is/has
    return []
  },

  // apostrophe d
  d: (terms, i) => {
    // had/would/did
    let before = terms[i].normal.split(hasContraction)[0]
    return [before, 'would']
  },
  // apostrophe t
  t: (terms, i) => {
    //ain't -> are/is not
    if (terms[i].normal === "ain't" || terms[i].normal === 'aint') {
    }
    let before = terms[i].normal.replace(/n't/, '')
    return [before, 'not']
  },
}

const pre = {
  // l'
  l: (terms, i) => {
    // le/la
    let after = terms[i].normal.split(hasContraction)[1]
    // quick french gender disambig (rough)
    if (after && after.endsWith('e')) {
      return ['la', after]
    }
    return ['le', after]
  },
  // d'
  d: (terms, i) => {
    let after = terms[i].normal.split(hasContraction)[1]
    // quick guess for noun-agreement (rough)
    if (after && after.endsWith('e')) {
      return ['du', after]
    } else if (after && after.endsWith('s')) {
      return ['des', after]
    }
    return ['de', after]
  },
}
module.exports = { pre, post }
