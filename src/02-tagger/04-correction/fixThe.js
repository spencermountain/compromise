//Determiner-signals
const fixThe = function(doc) {
  let det = doc.if('#Determiner')

  if (det.found === true) {
    let adj = det.if('#Adjective')
    if (adj.found) {
      //the orange.
      adj
        .match('#Determiner #Adjective$')
        .notIf('(#Comparative|#Superlative)')
        .terms(1)
        .tag('Noun', 'the-adj-1')
    }
  }

  let an = doc.if('(a|an)')
  if (an.found === true) {
    //'a/an' can mean 1 - "a hour"
    an.match('[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)', 0)
      .ifNo('#Plural')
      .tag('Value', 'a-is-one')
  }

  return doc
}
module.exports = fixThe
