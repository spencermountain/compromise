//sometimes you can tell if a verb is plural/singular, just by the verb
// i am / we were
// othertimes you need its subject 'we walk' vs 'i walk'
const isPlural = function(parsed) {
  let vb = parsed.verb
  if (vb.match('(are|were|does)').found) {
    return true
  }
  if (vb.match('(is|am|do|was)').found) {
    return false
  }
  // console.log(vb.before())
  //consider its prior noun
  // let noun = vb.getNoun();
  // if (noun && noun.found) {
  //   if (noun.match('#Plural').found) {
  //     return true;
  //   }
  //   if (noun.match('#Singular').found) {
  //     return false;
  //   }
  // }
  return null
}
module.exports = isPlural
