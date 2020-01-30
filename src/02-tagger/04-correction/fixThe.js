//Determiner-signals
const fixThe = function(doc) {
  let det = doc.if('#Determiner')

  if (det.found === true) {
    let adj = det.if('#Adjective')
    if (adj.found) {
      //the nice swim
      adj.match('(the|this|those|these) #Adjective [#Verb]', 0).tag('Noun', 'the-adj-verb')
      // the truly nice swim
      adj.match('(the|this|those|these) #Adverb #Adjective [#Verb]', 0).tag('Noun', 'correction-determiner4')
      //the orange is
      adj.match('#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)', 0).tag('Noun', 'the-adj-2')
      //the orange.
      adj
        .match('#Determiner #Adjective$')
        .notIf('(#Comparative|#Superlative)')
        .terms(1)
        .tag('Noun', 'the-adj-1')
    }

    let inf = det.if('#Infinitive')
    if (inf.found) {
      // a stream runs
      inf.match('(the|this|a|an) [#Infinitive] #Adverb? #Verb', 0).tag('Noun', 'correction-determiner5')
      //the test string
      inf.match('#Determiner [#Infinitive] #Noun', 0).tag('Noun', 'correction-determiner7')
      //by a bear.
      inf.match('#Determiner #Adjective [#Infinitive]$', 0).tag('Noun', 'a-inf')
    }

    //the wait to vote
    det.match('(the|this) [#Verb] #Preposition .', 0).tag('Noun', 'correction-determiner1')
    //a sense of
    det.match('#Determiner [#Verb] of', 0).tag('Noun', 'the-verb-of')
    //the threat of force
    det.match('#Determiner #Noun of [#Verb]', 0).tag('Noun', 'noun-of-noun')
    //a close
    det.match('#Determiner #Adverb? [close]', 0).tag('Adjective', 'a-close')
    //the western line
    det.match('#Determiner [(western|eastern|northern|southern|central)] #Noun', 0).tag('Noun', 'western-line')
    //the swim
    det
      .match('(the|those|these) #Adjective? [(#Infinitive|#PresentTense|#PastTense)]', 0)
      .tag('Noun', 'correction-determiner2')
  }

  let an = doc.if('(a|an)')
  if (an.found === true) {
    //a staggering cost
    an.match('(a|an) [#Gerund]', 0).tag('Adjective', 'correction-a|an')
    //did a 900, paid a 20
    an.match('#Verb (a|an) [#Value]', 0).tag('Singular', 'a-value')
    //a tv show
    an.match('(a|an) #Noun [#Infinitive]', 0).tag('Noun', 'a-noun-inf')
    //a great run
    an.match('(a|an) #Adjective (#Infinitive|#PresentTense)')
      .terms(2)
      .tag('Noun', 'correction-a|an2')
    //'a/an' can mean 1 - "a hour"
    an.match('[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)', 0)
      .ifNo('#Plural')
      .tag('Value', 'a-is-one')
  }

  return doc
}
module.exports = fixThe
