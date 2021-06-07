const hasContraction = /'/

const after = {
  // apostrophe s
  s: () => {
    // !possessive,
    // is/has
  },

  // apostrophe d
  d: (terms, i) => {
    let before = terms[i].normal.split(hasContraction)[0]
    // had/would/did
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
module.exports = { before, after }
