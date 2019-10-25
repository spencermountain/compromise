// turn 'would not really walk up' into parts
const parseVerb = function(vb) {
  let parsed = {
    adverb: vb.match('#Adverb+'), // 'really'
    negative: vb.match('#Negative'), // 'not'
    auxiliary: vb.match('#Auxiliary').not('(#Negative|#Adverb)'), // 'will' of 'will go'
    particle: vb.match('#Particle'), // 'up' of 'pull up'
    verb: vb.match('#Verb').not('(#Adverb|#Negative|#Auxiliary|#Particle)'),
  }
  return parsed
}
module.exports = parseVerb