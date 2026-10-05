// Gerund-Adjectives - 'amusing, annoying'
export default [
  // found it [interesting]
  { match: 'found it #Adverb? [%Adj|Gerund%]', group: 0, tag: 'Adjective', reason: 'found-it-ger' },
  // found it [isolating], but found it isolating cells
  { match: 'found it #Adverb? [isolating]$', group: 0, tag: 'Adjective', reason: 'it-isolating' },
  // a little [fuming]
  { match: 'a (little|bit|wee) bit? [#Gerund]', group: 0, tag: 'Adjective', reason: 'a-bit-ger' },
  // repairing [crumbling] roads
  {
    match: '#Gerund [#Gerund] #Noun',
    group: 0,
    tag: 'Adjective',
    notIf: '(impersonating|practicing|considering|assuming|enjoying|avoiding|stopping|starting|finishing)',
    reason: 'look-annoying',
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
  // meaning alluring
  { match: '%Noun|Gerund% %Adj|Gerund%', tag: 'Gerund #Adjective', reason: 'alluring' },
]
