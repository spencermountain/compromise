// dashed prefixes that are not independent words
//  'mid-century', 'pre-history'
export default [
  // 'anti',
  // 'bi',
  // 'co',
  // 'contra',
  // 'de',
  // 'extra',
  // 'infra',
  // 'inter',
  // 'intra',
  // 'macro',
  // 'micro',
  // 'mid',
  // 'mis',
  // 'mono',
  // 'multi',
  // 'peri',
  // 'pre',
  // 'pro',
  // 'proto',
  // 'pseudo',
  // 're',
  // 'sub',
  // 'supra',
  // 'trans',
  // 'tri',
  // 'un',
  // 'out',
  // 'non',
  // 'over',
  // 'post',
  // 'semi',
  // 'super', //'super-cool'
  // 'ultra', //'ulta-cool'
  // 'under',
  // 'whole',
  // 'counter',
].reduce((h, str) => {
  h[str] = true
  return h
}, {})