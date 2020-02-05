//mostly pos-corections here
const miscCorrection = function(doc) {
  // had he survived,
  doc
    .match('had #Noun+ #PastTense')
    .ifNo('@hasComma')
    .firstTerm()
    .tag('Condition', 'had-he')
  // were he to survive
  doc
    .match('were #Noun+ to #Infinitive')
    .ifNo('@hasComma')
    .firstTerm()
    .tag('Condition', 'were-he')

  doc
    .match('#Copula fucked up?')
    .not('#Copula')
    .tag('Adjective', 'swears-adjective')

  //like
  let like = doc.if('like')
  if (like.found === true) {
    //exactly like
    like
      .match('#Adverb like')
      .notIf('(really|generally|typically|usually|sometimes|often) [like]')
      .tag('Adverb', 'adverb-like')
  }

  let title = doc.if('@titleCase')
  if (title.found === true) {
  }

  let hyph = doc.if('@hasHyphen')
  if (hyph.found === true) {
    //air-flow
    hyph
      .match('@hasHyphen .')
      .match('#Noun #Verb')
      .tag('Noun', 'hyphen-verb')
    //connect hyphenated expressions - 'ooh-wee'
    hyph
      .if('#Expression')
      .match('@hasHyphen+')
      .tag('Expression', 'ooh-wee')
  }

  let place = doc.if('#Place')
  if (place.found === true) {
    //West Norforlk
    place.match('(west|north|south|east|western|northern|southern|eastern)+ #Place').tag('Region', 'west-norfolk')
    //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
    place
      .match('#City [#Acronym]', 0)
      .match('(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)')
      .tag('Region', 'us-state')
  }

  return doc
}

module.exports = miscCorrection
