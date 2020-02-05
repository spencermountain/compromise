//mostly pos-corections here
const miscCorrection = function(doc) {
  //exactly like
  doc
    .match('#Adverb like')
    .notIf('(really|generally|typically|usually|sometimes|often) [like]')
    .tag('Adverb', 'adverb-like')

  //air-flow
  doc
    .match('@hasHyphen .')
    .match('#Noun #Verb')
    .tag('Noun', 'hyphen-verb')
  //connect hyphenated expressions - 'ooh-wee'
  doc
    .if('#Expression')
    .match('@hasHyphen+')
    .tag('Expression', 'ooh-wee')

  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  doc
    .match('#City [#Acronym]', 0)
    .match('(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)')
    .tag('Region', 'us-state')

  //the orange.
  doc
    .match('#Determiner #Adjective$')
    .notIf('(#Comparative|#Superlative)')
    .terms(1)
    .tag('Noun', 'the-adj-1')

  //'a/an' can mean 1 - "a hour"
  doc
    .match('[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)', 0)
    .ifNo('#Plural')
    .tag('Value', 'a-is-one')

  return doc
}

module.exports = miscCorrection
