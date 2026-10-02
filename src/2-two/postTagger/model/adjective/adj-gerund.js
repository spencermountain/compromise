// Gerund-Adjectives - 'amusing, annoying'
export default [
  // as [entertaining] as
  { match: 'as [#Gerund] as', group: 0, tag: 'Adjective', reason: 'as-gerund-as' },
  // more [amusing] than
  { match: 'more [#Gerund] than', group: 0, tag: 'Adjective', reason: 'more-gerund-than' },
  // very [entertaining]
  { match: '(so|very|extremely) [#Gerund]', group: 0, tag: 'Adjective', reason: 'so-gerund' },
  // found it [interesting]
  { match: 'found it #Adverb? [%Adj|Gerund%]', group: 0, tag: 'Adjective', reason: 'found-it-gerund' },
  // found it [isolating], but found it isolating cells
  { match: 'found it #Adverb? [isolating]$', group: 0, tag: 'Adjective', reason: 'found-it-isolating' },
  // enduring symbols, running water
  { match: '[enduring] (symbols|legacy|legacies|appeal|influence|value|values)', group: 0, tag: 'Adjective', reason: 'enduring-noun' },
  { match: '(have|has|had|#Determiner|#Possessive) [running] water', group: 0, tag: 'Adjective', reason: 'running-water' },
  // a little [fuming]
  { match: 'a (little|bit|wee) bit? [#Gerund]', group: 0, tag: 'Adjective', reason: 'a-bit-gerund' },
  // repairing [crumbling] roads
  {
    match: '#Gerund [#Gerund] #Noun',
    group: 0,
    tag: 'Adjective',
    notIf: '(impersonating|practicing|considering|assuming|enjoying|avoiding|stopping|starting|finishing)',
    reason: 'looking-annoying',
  },
  // looked [amazing]
  {
    match: '(looked|look|looks) #Adverb? [%Adj|Gerund%]',
    group: 0,
    tag: 'Adjective',
    notIf: '(impersonating|practicing|considering|assuming)',
    reason: 'looked-amazing',
  },
  // [boring] the audience
  { match: '[%Adj|Gerund%] #Determiner', group: 0, tag: 'Gerund', reason: 'developing-a' },
  // world's [leading] manufacturer
  { match: '#Possessive [%Adj|Gerund%] #Noun', group: 0, tag: 'Adjective', reason: 'leading-manufacturer' },
  // meaning alluring
  { match: '%Noun|Gerund% %Adj|Gerund%', tag: 'Gerund #Adjective', reason: 'meaning-alluring' },
]
