export default [
  // the [above] is clear
  { match: '#Determiner [#Adjective] #Copula', hook: '#Copula', group: 0, tag: 'Noun', reason: 'the-adj-is' },
  // real [evil] is
  { match: '#Adjective [#Adjective] #Copula', hook: '#Copula', group: 0, tag: 'Noun', reason: 'adj-adj-is' },
  // his [fine]
  { match: '(his|its) [%Adj|Noun%]', hook: '%Adj|Noun%', group: 0, tag: 'Noun', notIf: '#Hyphenated', reason: 'his-fine' },
  // is [all]
  { match: '#Copula #Adverb? [all]', hook: 'all', group: 0, tag: 'Noun', reason: 'is-all' },
  // have [fun] with it
  { match: `(have|had) [#Adjective] #Preposition .`, hook: '#Preposition', group: 0, tag: 'Noun', reason: 'have-fun' },
  // brewing giant
  { match: `#Gerund (giant|capital|center|zone|application)`, hook: '#Gerund', tag: 'Noun', reason: 'brewing-giant' },
  // in a [perfect]
  { match: `#Preposition (a|an) [#Adjective]$`, hook: '#Preposition', group: 0, tag: 'Noun', reason: 'an-instant' },
  // no [golden] would
  { match: `no [#Adjective] #Modal`, hook: 'no', group: 0, tag: 'Noun', reason: 'no-golden' },
  // [brand] new
  { match: `[brand #Gerund?] new`, hook: 'brand', group: 0, tag: 'Adverb', reason: 'brand-new' },
  // some [kind] of teacher
  { match: `(#Determiner|#Comparative|new|different) [kind] of`, hook: 'kind', group: 0, tag: 'Noun', reason: 'some-kind' },
  // a new [kind]
  { match: '(#Determiner|#Comparative|new|different) [kind]$', hook: 'kind', group: 0, tag: 'Noun', reason: 'some-kind-end' },
  // her [favourite] sport
  { match: `#Possessive [%Adj|Noun%] #Noun`, hook: '#Possessive', group: 0, tag: 'Adjective', reason: 'her-favourite' },
  // must-win
  { match: `(must && #Hyphenated) .`, hook: 'must', tag: 'Adjective', reason: 'must-hyphen' },
  // the [present]
  {
    match: `#Determiner [#Adjective]$`, hook: '#Adjective',
    group: 0,
    tag: 'Noun',
    notIf: '(this|that|#Comparative|#Superlative)',
    reason: 'determiner-adjective',
  }, //are that crazy.
  // company-wide
  {
    match: `(#Noun && #Hyphenated) (#Adjective && #Hyphenated)`, hook: '#Hyphenated',
    tag: 'Adjective',
    notIf: '(this|that|#Comparative|#Superlative)',
    reason: 'company-wide',
  },
  // the [poor] were
  {
    match: `#Determiner [#Adjective] (#Copula|#Determiner)`, hook: '#Adjective',
    notIf: '(#Comparative|#Superlative)',
    group: 0,
    tag: 'Noun',
    reason: 'the-poor',
  },
  // [professional] bodybuilder
  {
    match: `[%Adj|Noun%] #Noun`, hook: '#Noun',
    notIf: '(#Pronoun|#ProperNoun)',
    group: 0,
    tag: 'Adjective',
    reason: 'stable-foundations',
  },
]
