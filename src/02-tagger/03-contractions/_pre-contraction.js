// these tags need to be cleared-up before our contraction-splitting
// they're seperated for code-clarity

/** disambiguate complex apostrophe-s situations*/
const preContraction = function(doc) {
  let m = doc.if(`/'s$/`)
  if (m.found) {
    // fix for 'jamie's bite' mis-tagging
    let fix = m.match(`/'s$/ #Adverb? #Adjective? #Infinitive`)
    fix.firstTerm().tagSafe('#Possessive', 'poss-inf')
    fix.lastTerm().tagSafe('#Noun', 'poss-inf')
    // rocket's red glare
    m.match(`[/'s$/] #Adverb? #Adjective? #Noun`).tagSafe('Possessive')
  }
  return doc
}
module.exports = preContraction
