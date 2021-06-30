const hasContraction = /'/
// l'amour
const preL = (terms, i) => {
  // le/la
  let after = terms[i].normal.split(hasContraction)[1]
  // quick french gender disambig (rough)
  if (after && after.endsWith('e')) {
    return ['la', after]
  }
  return ['le', after]
}
// d'amerique
const preD = (terms, i) => {
  let after = terms[i].normal.split(hasContraction)[1]
  // quick guess for noun-agreement (rough)
  if (after && after.endsWith('e')) {
    return ['du', after]
  } else if (after && after.endsWith('s')) {
    return ['des', after]
  }
  return ['de', after]
}
export { preL }
export { preD }
export default {
  preL,
  preD,
}
