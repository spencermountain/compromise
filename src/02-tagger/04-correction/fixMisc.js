//mostly pos-corections here
const miscCorrection = function(doc) {
  //misc:
  //foot/feet
  doc.match('(foot|feet)').tag('Noun', 'foot-noun')
  // blood, sweat, and tears
  doc.match('(#Noun && @hasComma) #Noun (and|or) [#PresentTense]').tag('#Noun', 'noun-list')
  //3 feet
  doc.match('#Value [(foot|feet)]').tag('Unit', 'foot-unit')
  //'u' as pronoun
  doc.match('#Conjunction [u]').tag('Pronoun', 'u-pronoun-2')
  //6 am
  doc.match('#Holiday (day|eve)').tag('Holiday', 'holiday-day')
  // the captain who
  doc.match('#Noun [(who|whom)]').tag('Determiner', 'captain-who')
  //timezones
  doc.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').tag('Time', 'timezone')
  //Brazilian pesos
  doc.match('#Demonym #Currency').tag('Currency', 'demonym-currency')
  //about to go
  doc.match('[about to] #Adverb? #Verb').tag(['Auxiliary', 'Verb'], 'about-to')
  //right of way
  doc.match('(right|rights) of .').tag('Noun', 'right-of')
  // a bit
  doc.match('[much] #Adjective').tag('Adverb', 'bit-1')
  doc.match('a [bit]').tag('Noun', 'bit-2')
  doc.match('a bit much').tag('Determiner Adverb Adjective', 'bit-3')
  doc.match('too much').tag('Adverb Adjective', 'bit-4')
  // u r cool
  doc.match('u r').tag('Pronoun #Copula', 'u r')
  //swear-words as non-expression POS
  //nsfw
  doc.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression')
  doc.match('#Determiner [(shit|damn|hell)]').tag('Noun', 'swears-noun')
  doc.match('[(shit|damn|fuck)] (#Determiner|#Possessive|them)').tag('Verb', 'swears-verb')
  doc
    .match('#Copula fucked up?')
    .not('#Copula')
    .tag('Adjective', 'swears-adjective')

  //ambig prepositions/conjunctions
  let so = doc.if('so')
  if (so.found === true) {
    //so funny
    so.match('[so] #Adjective').tag('Adverb', 'so-adv')
    //so the
    so.match('[so] #Noun').tag('Conjunction', 'so-conj')
    //do so
    so.match('do [so]').tag('Noun', 'so-noun')
  }

  let all = doc.if('all')
  if (all.found === true) {
    //all students
    all.match('[all] #Determiner? #Noun').tag('Adjective', 'all-noun')
    //it all fell apart
    all.match('[all] #Verb').tag('Adverb', 'all-verb')
  }

  //the ambiguous word 'that' and 'which'
  let which = doc.if('which')
  if (which.found === true) {
    //remind john that
    which.match('#Verb #Adverb? #Noun [(that|which)]').tag('Preposition', 'that-prep')
    //that car goes
    which.match('that #Noun [#Verb]').tag('Determiner', 'that-determiner')
    //work, which has been done.
    which.match('@hasComma [which] (#Pronoun|#Verb)').tag('Preposition', 'which-copula')
  }

  //like
  let like = doc.if('like')
  if (like.found === true) {
    like.match('just [like]').tag('Preposition', 'like-preposition')
    //folks like her
    like.match('#Noun [like] #Noun').tag('Preposition', 'noun-like')
    //look like
    like.match('#Verb [like]').tag('Adverb', 'verb-like')
    //exactly like
    like
      .match('#Adverb like')
      .notIf('(really|generally|typically|usually|sometimes|often) [like]')
      .tag('Adverb', 'adverb-like')
  }

  let title = doc.if('@titleCase')
  if (title.found === true) {
    //FitBit Inc
    title.match('@titleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv')
    //Foo District
    title
      .match('@titleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)')
      .tag('Region', 'foo-district')
    //District of Foo
    title
      .match('(district|region|province|municipality|territory|burough|state) of @titleCase')
      .tag('Region', 'district-of-Foo')
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
      .match('#City [#Acronym]')
      .match('(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)')
      .tag('Region', 'us-state')
  }

  return doc
}

module.exports = miscCorrection
