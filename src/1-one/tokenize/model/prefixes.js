// dashed prefixes that are not independent words
//  'mid-century', 'pre-history'
export default [
  'anti',
  'bi',
  'co',
  'contra',
  'counter',
  'de',
  'extra',
  'infra',
  'inter',
  'intra',
  'macro',
  'micro',
  'mid',
  'mis',
  'mono',
  'multi',
  'non',
  'over',
  'peri',
  'post',
  'pre',
  'pro',
  'proto',
  'pseudo',
  're',
  'semi',
  'sub',
  // 'super', //'super-cool'
  'supra',
  'trans',
  'tri',
  // 'ultra', //'ulta-cool'
  'un',
  'out',
  // 'under',
  // 'whole',
].reduce((h, str) => {
  h[str] = true
  return h
}, {})