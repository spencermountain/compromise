// these are some of our heaviest-used matches
export default [
  // ought not to walk: retain the infinitival marker inside the modal phrase.
  // ought not to walk
  { match: 'ought (#Adverb|not)+? [to] (#Adverb|not)+? #Verb', hook: 'ought', group: 0, tag: 'Auxiliary', reason: 'ought-to' },
  // ought to be walking
  { match: 'ought (#Adverb|not)+? to (#Adverb|not)+? [be] (#Adverb|not)+? #Verb', hook: 'ought', group: 0, tag: 'Auxiliary', reason: 'ought-to-be' },
  // ==== Auxiliary ====
  // will have walked
  { match: `will (#Adverb|not)+? [have] (#Adverb|not)+? #Verb`, hook: 'will', group: 0, tag: 'Auxiliary', reason: 'will-have-vb' },
  // was walking
  { match: `[#Copula] (#Adverb|not)+? (#Gerund|#PastTense)`, hook: '#Copula', group: 0, tag: 'Auxiliary', reason: 'copula-walking' },
  // would walk
  { match: `[(#Modal|did)+] (#Adverb|not)+? #Verb`, hook: '#Verb', group: 0, tag: 'Auxiliary', reason: 'modal-verb' },
  // would have had to go
  { match: `#Modal (#Adverb|not)+? [have] (#Adverb|not)+? [had] (#Adverb|not)+? #Verb`, hook: 'had', group: 0, tag: 'Auxiliary', reason: 'would-have' },
  // has walked
  { match: `[(has|had)] (#Adverb|not)+? #PastTense`, hook: '#PastTense', group: 0, tag: 'Auxiliary', reason: 'had-walked' },
  // will walk
  { match: '[(do|does|did|will|have|had|has|got)] (not|#Adverb)+? #Verb', hook: '#Verb', group: 0, tag: 'Auxiliary', reason: 'have-had' },
  // about to go
  { match: '[about to] #Adverb? #Verb', hook: 'about', group: 0, tag: ['Auxiliary', 'Verb'], reason: 'about-to' },
  // would be walking
  { match: `#Modal (#Adverb|not)+? [be] (#Adverb|not)+? #Verb`, hook: 'be', group: 0, tag: 'Auxiliary', reason: 'would-be' },
  // had been walking
  { match: `[(#Modal|had|has)] (#Adverb|not)+? [been] (#Adverb|not)+? #Verb`, hook: 'been', group: 0, tag: 'Auxiliary', reason: 'had-been' },
  // was being driven
  { match: '[(be|being|been)] #Participle', hook: '#Participle', group: 0, tag: 'Auxiliary', reason: 'being-driven' },
  // may want
  { match: '[may] #Adverb? #Infinitive', hook: 'may', group: 0, tag: 'Auxiliary', reason: 'may-want' },
  // was being walked
  { match: '#Copula (#Adverb|not)+? [(be|being|been)] #Adverb+? #PastTense', hook: '#PastTense', group: 0, tag: 'Auxiliary', reason: 'being-walked' },
  // will be walked
  { match: 'will [be] #PastTense', hook: 'will', group: 0, tag: 'Auxiliary', reason: 'will-be-x' },
  // been walking
  { match: '[(be|been)] (#Adverb|not)+? #Gerund', hook: '#Gerund', group: 0, tag: 'Auxiliary', reason: 'been-walking' },
  // used to walk
  { match: '[used to] #PresentTense', hook: 'used', group: 0, tag: 'Auxiliary', reason: 'used-to-walk' },
  // was going to walk
  { match: '#Copula (#Adverb|not)+? [going to] #Adverb+? #PresentTense', hook: 'going', group: 0, tag: 'Auxiliary', reason: 'going-to-walk' },
  // going to be watched
  { match: 'going to (#Adverb|not)+? [be] (#Adverb|not)+? #PastTense', hook: 'going', group: 0, tag: 'Auxiliary', reason: 'going-to-be-watched' },
  // kiss him
  { match: '#Imperative [(me|him|her)]', hook: '#Imperative', group: 0, tag: 'Reflexive', reason: 'tell-him' },
  // there is no x
  { match: '(is|was) #Adverb? [no]', hook: 'no', group: 0, tag: 'Negative', reason: 'is-no' },
  // been told
  { match: '[(been|had|became|came)] #PastTense', hook: '#PastTense', group: 0, notIf: '#PhrasalVerb', tag: 'Auxiliary', reason: 'been-told' },
  // being born
  { match: '[(being|having|getting)] #Verb', hook: '#Verb', group: 0, tag: 'Auxiliary', reason: 'being-born' },
  // better go
  { match: '[better] #PresentTense', hook: 'better', group: 0, tag: 'Modal', notIf: '(#Copula|#Gerund)', reason: 'better-go' },
  // even better
  { match: 'even better', hook: 'even', tag: 'Adverb #Comparative', reason: 'even-better' },
]
