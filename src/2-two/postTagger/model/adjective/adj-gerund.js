// Gerund-Adjectives - 'amusing, annoying'
export default [
  //a staggering cost
  // { match: '(a|an) [#Gerund]', group: 0, tag: 'Adjective', reason: 'a|an' },
  //as amusing as
  { match: 'as [#Gerund] as', hook: 'as', group: 0, tag: 'Adjective', reason: 'as-gerund-as' },
  // more amusing than
  { match: 'more [#Gerund] than', hook: 'more', group: 0, tag: 'Adjective', reason: 'more-gerund-than' },
  // very amusing
  { match: '(so|very|extremely) [#Gerund]', hook: '#Gerund', group: 0, tag: 'Adjective', reason: 'so-gerund' },
  // found it amusing
  { match: '(found|found) it #Adverb? [#Gerund]', hook: 'it', group: 0, tag: 'Adjective', reason: 'found-it-gerund' },
  // a bit amusing
  { match: 'a (little|bit|wee) bit? [#Gerund]', hook: 'a', group: 0, tag: 'Adjective', reason: 'a-bit-gerund' },
  // looking annoying
  {
    match: '#Gerund [#Gerund]', hook: '#Gerund',
    group: 0,
    tag: 'Adjective',
    notIf: '(impersonating|practicing|considering|assuming)',
    reason: 'looking-annoying',
  },
  // looked amazing
  {
    match: '(looked|look|looks) #Adverb? [%Adj|Gerund%]', hook: '%Adj|Gerund%',
    group: 0,
    tag: 'Adjective',
    notIf: '(impersonating|practicing|considering|assuming)',
    reason: 'looked-amazing',
  },
  // were really amazing
  // { match: '(looked|look|looks) #Adverb [%Adj|Gerund%]', group: 0, tag: 'Adjective', notIf: '(impersonating|practicing|considering|assuming)', reason: 'looked-amazing' },
  // developing a
  { match: '[%Adj|Gerund%] #Determiner', hook: '#Determiner', group: 0, tag: 'Gerund', reason: 'developing-a' },
  // world's leading manufacturer
  { match: '#Possessive [%Adj|Gerund%] #Noun', hook: '#Possessive', group: 0, tag: 'Adjective', reason: 'leading-manufacturer' },
  // meaning alluring
  { match: '%Noun|Gerund% %Adj|Gerund%', hook: '%Adj|Gerund%', tag: 'Gerund #Adjective', reason: 'meaning-alluring' },

  // face shocking revelations
  {
    match: '(face|embrace|reveal|stop|start|resume) %Adj|Gerund%', hook: '%Adj|Gerund%',
    tag: '#PresentTense #Adjective',
    reason: 'face-shocking',
  },
  // are enduring symbols
  { match: '(are|were) [%Adj|Gerund%] #Plural', hook: '#Plural', group: 0, tag: 'Adjective', reason: 'are-enduring-symbols' },
]
