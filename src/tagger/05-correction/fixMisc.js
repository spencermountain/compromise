//mostly pos-corections here
const miscCorrection = function(doc) {
  //ambig prepositions/conjunctions
  if (doc.has('so')) {
    //so funny
    doc
      .match('so #Adjective')
      .match('so')
      .tag('Adverb', 'so-adv')
    //so the
    doc
      .match('so #Noun')
      .match('so')
      .tag('Conjunction', 'so-conj')
    //do so
    doc
      .match('do so')
      .match('so')
      .tag('Noun', 'so-noun')
  }
  if (doc.has('all')) {
    //all students
    doc.match('[all] #Determiner? #Noun').tag('Adjective', 'all-noun')
    //it all fell apart
    doc.match('[all] #Verb').tag('Adverb', 'all-verb')
  }
  //the ambiguous word 'that' and 'which'
  if (doc.has('(that|which)')) {
    //remind john that
    doc
      .match('#Verb #Adverb? #Noun (that|which)')
      .lastTerm()
      .tag('Preposition', 'that-prep')
    //that car goes
    doc
      .match('that #Noun #Verb')
      .firstTerm()
      .tag('Determiner', 'that-determiner')
    //work, which has been done.
    doc.match('#Comma [which] (#Pronoun|#Verb)').tag('Preposition', 'which-copula')
    //things that provide
    // doc.match('#Plural (that|which) #Adverb? #Verb').term(1).tag('Preposition', 'noun-that');
  }
  //like
  if (doc.has('like')) {
    doc.match('just [like]').tag('Preposition', 'like-preposition')
    //folks like her
    doc.match('#Noun [like] #Noun').tag('Preposition', 'noun-like')
    //look like
    doc.match('#Verb [like]').tag('Adverb', 'verb-like')
    //exactly like
    doc
      .match('#Adverb like')
      .notIf('(really|generally|typically|usually|sometimes|often) like')
      .lastTerm()
      .tag('Adverb', 'adverb-like')
  }

  if (doc.has('#TitleCase')) {
    //FitBit Inc
    doc.match('#TitleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv')
    //Foo District
    doc
      .match('#TitleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)')
      .tag('Region', 'foo-district')
    //District of Foo
    doc
      .match('(district|region|province|municipality|territory|burough|state) of #TitleCase')
      .tag('Region', 'district-of-Foo')
  }

  if (doc.has('#Hyphenated')) {
    //air-flow
    doc
      .match('#Hyphenated #Hyphenated')
      .match('#Noun #Verb')
      .tag('Noun', 'hyphen-verb')
    let hyphen = doc.match('#Hyphenated+')
    if (hyphen.has('#Expression')) {
      //ooh-wee
      hyphen.tag('Expression', 'ooh-wee')
    }
  }

  if (doc.has('#Place')) {
    //West Norforlk
    doc.match('(west|north|south|east|western|northern|southern|eastern)+ #Place').tag('Region', 'west-norfolk')
    //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
    doc
      .match('#City [#Acronym]')
      .match('(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)')
      .tag('Region', 'us-state')
  }
  //misc:
  //foot/feet
  doc.match('(foot|feet)').tag('Noun', 'foot-noun')
  doc
    .match('#Value (foot|feet)')
    .term(1)
    .tag('Unit', 'foot-unit')
  //'u' as pronoun
  doc.match('#Conjunction [u]').tag('Pronoun', 'u-pronoun-2')
  //'a/an' can mean 1 - "a hour"
  doc
    .match('(a|an) (#Duration|hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)')
    .ifNo('#Plural')
    .term(0)
    .tag('Value', 'a-is-one')
  //swear-words as non-expression POS
  //nsfw
  doc.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression')
  doc
    .match('#Determiner (shit|damn|hell)')
    .term(1)
    .tag('Noun', 'swears-noun')
  doc
    .match('(shit|damn|fuck) (#Determiner|#Possessive|them)')
    .term(0)
    .tag('Verb', 'swears-verb')
  doc
    .match('#Copula fucked up?')
    .not('#Copula')
    .tag('Adjective', 'swears-adjective')
  //6 am
  doc.match('#Holiday (day|eve)').tag('Holiday', 'holiday-day')
  //timezones
  doc.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').tag('Time', 'timezone')
  //canadian dollar, Brazilian pesos
  doc.match('#Demonym #Currency').tag('Currency', 'demonym-currency')
  //about to go
  doc
    .match('about to #Adverb? #Verb')
    .match('about to')
    .tag(['Auxiliary', 'Verb'], 'about-to')
  //Doctor john smith jr
  doc.match('#Honorific #Person').tag('Person', 'honorific-person')
  doc.match('#Person (jr|sr|md)').tag('Person', 'person-honorific')
  //right of way
  doc.match('(right|rights) of .').tag('Noun', 'right-of')
  return doc
}

module.exports = miscCorrection
