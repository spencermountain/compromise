const getSubject = require('./getSubject')
// turn 'would not really walk up' into parts
const parseVerb = function (vb) {
  let parsed = {
    adverb: vb.match('#Adverb+'), // 'really'
    negative: vb.match('#Negative'), // 'not'
    auxiliary: vb.match('#Auxiliary+').not('(#Negative|#Adverb)'), // 'will' of 'will go'
    particle: vb.match('#Particle'), // 'up' of 'pull up'
    verb: vb.match('#Verb+').not('(#Adverb|#Negative|#Auxiliary|#Particle)'),
    original: vb,
    subject: getSubject(vb),
  }
  // fallback, if no verb found
  if (!parsed.verb.found) {
    // blank-everything
    Object.keys(parsed).forEach(k => {
      parsed[k] = parsed[k].not('.')
    })
    // it's all the verb
    parsed.verb = vb
    return parsed
  }
  //
  if (parsed.adverb && parsed.adverb.found) {
    let match = parsed.adverb.text('reduced') + '$'
    if (vb.has(match)) {
      parsed.adverbAfter = true
    }
  }
  return parsed
}
module.exports = parseVerb
