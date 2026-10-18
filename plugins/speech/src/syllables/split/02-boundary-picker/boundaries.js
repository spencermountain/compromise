const onset = /^(bl|br|ch|cl|cr|dr|fl|fr|gl|gr|ph|pl|pr|qu|sh|sk|sl|sm|sn|sp|st|sw|th|tr|tw|wh|scr|shr|spl|spr|str|thr)$/

// Applied in order after onset placement; later rules take precedence.
// left/right are offsets from the surrounding vowel groups' edges.
// minLeft only moves a boundary forward, preserving a longer consonant cluster.
const adjustments = [
  { minGap: 1, maxGap: 1, gap: /^x$/, left: 1 }, // box-es
  { minGap: 2, gap: /^(.)\1/, minLeft: 1 }, // rab-bit
  { minGap: 2, tail: /^ed$/, right: -1 }, // res-ted
  { minGap: 2, gap: /^sh$/, tail: /^(es|ing)$/, right: 0 }, // wish-ing
  { minGap: 2, gap: /l$/, tail: /^es?$/, right: -2 }, // bot-tle, ta-bles
]

export { onset, adjustments }
