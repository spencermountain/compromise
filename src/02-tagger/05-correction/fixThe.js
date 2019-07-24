//Determiner-signals
const fixThe = function(doc) {
  if (doc.has('#Determiner')) {
    //the wait to vote
    doc.match('(the|this) [#Verb] #Preposition .').tag('Noun', 'correction-determiner1')
    //the swim
    doc
      .match('(the|those|these) (#Infinitive|#PresentTense|#PastTense)')
      .term(1)
      .tag('Noun', 'correction-determiner2')

    //the nice swim
    doc.match('(the|this|those|these) #Adjective [#Verb]').tag('Noun', 'the-adj-verb')
    //the truly nice swim
    doc.match('(the|this|those|these) #Adverb #Adjective [#Verb]').tag('Noun', 'correction-determiner4')
    //a stream runs
    doc.match('(the|this|a|an) [#Infinitive] #Adverb? #Verb').tag('Noun', 'correction-determiner5')

    //some pressing issues
    doc.match('some [#Verb] #Plural').tag('Noun', 'correction-determiner6')

    //the orange is
    doc.match('#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)').tag('Noun', 'the-adj-2')
    //a sense of
    doc.match('#Determiner [#Verb] of').tag('Noun', 'the-verb-of')
    //the threat of force
    doc.match('#Determiner #Noun of [#Verb]').tag('Noun', 'noun-of-noun')
    //a close
    doc.match('#Determiner #Adverb? [close]').tag('Adjective', 'a-close')
    //the test string
    doc.match('#Determiner [#Infinitive] #Noun').tag('Noun', 'correction-determiner7')
    //by a bear.
    doc.match('#Determiner [#Infinitive]$').tag('Noun', 'a-inf')

    //the western line
    doc.match('#Determiner [(western|eastern|northern|southern|central)] #Noun').tag('Noun', 'western-line')
  }
  //the orange.
  doc
    .match('#Determiner #Adjective$')
    .notIf('(#Comparative|#Superlative)')
    .term(1)
    .tag('Noun', 'the-adj-1')

  if (doc.has('(a|an)')) {
    //a staggering cost
    doc.match('(a|an) [#Gerund]').tag('Adjective', 'correction-a|an')
    doc
      .match('(a|an) #Adjective (#Infinitive|#PresentTense)')
      .term(2)
      .tag('Noun', 'correction-a|an2')
    //did a 900, paid a 20
    doc.match('#Verb (a|an) [#Value]').tag('Singular', 'a-value')
    //a tv show
    doc.match('(a|an) #Noun [#Infinitive]').tag('Noun', 'a-noun-inf')
    //'a/an' can mean 1 - "a hour"
    doc
      .match('[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)')
      .ifNo('#Plural')
      .tag('Value', 'a-is-one')
  }

  return doc
}
module.exports = fixThe
