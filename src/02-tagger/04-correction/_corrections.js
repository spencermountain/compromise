const preps = '(in|by|before|during|on|until|after|of|within|all)' //6
const verbs = '(may|march|sat)' //ambiguous month-verbs

const units = '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'

// order matters
const list = [
  //there are reasons
  { match: 'there (are|were) #Adjective? [#PresentTense]', group: 0, tag: 'Plural', reason: 'there-are' },
  //still goodß
  { match: '[still] #Adjective', group: 0, tag: 'Adverb', reason: 'still-advb' },
  //barely even walk
  { match: '(barely|hardly) even', tag: 'Adverb', reason: 'barely-even' },
  //big dreams, critical thinking
  { match: '#Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'adj-presentTense' },
  //will secure our
  { match: 'will [#Adjective]', group: 0, tag: 'Verb', reason: 'will-adj' },
  //cheering hard - dropped -ly's
  { match: '#PresentTense [(hard|quick|long|bright|slow)]', group: 0, tag: 'Adverb', reason: 'lazy-ly' },
  //his fine
  { match: '(his|her|its) [#Adjective]', group: 0, tag: 'Noun', reason: 'his-fine' },
  //he left
  { match: '#Noun #Adverb? [left]', group: 0, tag: 'PastTense', reason: 'left-verb' },
  //he disguised the thing
  { match: '#Pronoun [#Adjective] #Determiner #Adjective? #Noun', group: 0, tag: 'Verb', reason: 'he-adj-the' },

  //quickly march
  { match: `#Adverb [${verbs}]`, group: 0, tag: 'Infinitive', reason: 'quickly-march' },
  { match: `${verbs} [#Adverb]`, group: 0, tag: 'Infinitive', reason: 'march-quickly' },

  //march to
  { match: '[march] (up|down|back|to|toward)', group: 0, tag: 'Infinitive', reason: 'march-to' },
  //must march
  { match: '#Modal [march]', group: 0, tag: 'Infinitive', reason: 'must-march' },
  // sun the 5th
  { match: '[sun] the #Ordinal', tag: 'WeekDay', reason: 'sun-the-5th' },
  //sun feb 2
  { match: '[sun] #Date', group: 0, tag: 'WeekDay', reason: 'sun-feb' },
  //1pm next sun
  { match: '#Date (on|this|next|last|during)? [sun]', group: 0, tag: 'WeekDay', reason: '1pm-sun' },
  //the sun
  { match: '#Determiner [sun]', group: 0, tag: 'Singular', reason: 'the-sun' },

  //sat november
  { match: '[sat] #Date', group: 0, tag: 'WeekDay', reason: 'sat-feb' },
  //this sat
  { match: `${preps} [sat]`, group: 0, tag: 'WeekDay', reason: 'sat' },

  //June 5-7th
  { match: `#Month #DateRange+`, tag: 'Date', reason: 'numberRange' },
  //5th of March
  { match: '#Value of #Month', tag: 'Date', reason: 'value-of-month' },
  //5 March
  { match: '#Cardinal #Month', tag: 'Date', reason: 'cardinal-month' },
  //march 5 to 7
  { match: '#Month #Value to #Value', tag: 'Date', reason: 'value-to-value' },
  //march the 12th
  { match: '#Month the #Value', tag: 'Date', reason: 'month-the-value' },

  //minus 7
  { match: '(minus|negative) #Value', tag: 'Value', reason: 'minus-value' },
  { match: '(#Noun && @hasComma) #Noun (and|or) [#PresentTense]', group: 0, tag: 'Noun', reason: 'noun-list' }, //3 feet
  { match: '#Value [(foot|feet)]', group: 0, tag: 'Unit', reason: 'foot-unit' }, //'u' as pronoun
  { match: '#Conjunction [u]', group: 0, tag: 'Pronoun', reason: 'u-pronoun-2' }, //6 am
  { match: '#Holiday (day|eve)', tag: 'Holiday', reason: 'holiday-day' }, // the captain who
  { match: '#Noun [(who|whom)]', group: 0, tag: 'Determiner', reason: 'captain-who' }, //timezones
  { match: '#Demonym #Currency', tag: 'Currency', reason: 'demonym-currency' }, //about to go
  { match: '[about to] #Adverb? #Verb', group: 0, tag: ['Auxiliary', 'Verb'], reason: 'about-to' }, //right of way
  { match: '(right|rights) of .', tag: 'Noun', reason: 'right-of' }, // a bit
  { match: '[much] #Adjective', group: 0, tag: 'Adverb', reason: 'bit-1' },
  { match: 'a [bit]', group: 0, tag: 'Noun', reason: 'bit-2' },
  { match: 'a bit much', tag: 'Determiner Adverb Adjective', reason: 'bit-3' },
  { match: 'too much', tag: 'Adverb Adjective', reason: 'bit-4' }, // u r cool
  { match: 'u r', tag: 'Pronoun Copula', reason: 'u r' }, // well, ...

  //spencer kelly's
  { match: '#FirstName #Acronym? (#Possessive && #LastName)', tag: 'Possessive', reason: 'name-poss' },
  //Super Corp's fundraiser
  { match: '#Organization+ #Possessive', tag: 'Possessive', reason: 'org-possessive' },
  //Los Angeles's fundraiser
  { match: '#Place+ #Possessive', tag: 'Possessive', reason: 'place-possessive' },

  //let him glue
  {
    match: '(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)',
    group: 0,
    tag: '#Infinitive',
    reason: 'let-him-glue',
  },

  //swear-words as non-expression POS
  //nsfw
  { match: 'holy (shit|fuck|hell)', tag: 'Expression', reason: 'swears-expression' },
  { match: '#Determiner [(shit|damn|hell)]', group: 0, tag: 'Noun', reason: 'swears-noun' },
  // is f*ed up
  { match: '#Copula [fucked up?]', tag: 'Adjective', reason: 'swears-adjective' },

  { match: '[so] #Adjective', group: 0, tag: 'Adverb', reason: 'so-adv' }, //so the
  { match: '[so] #Noun', group: 0, tag: 'Conjunction', reason: 'so-conj' }, //do so
  { match: 'do [so]', group: 0, tag: 'Noun', reason: 'so-noun' },

  //all students
  { match: '[all] #Determiner? #Noun', group: 0, tag: 'Adjective', reason: 'all-noun' }, //it all fell apart
  { match: '[all] #Verb', group: 0, tag: 'Adverb', reason: 'all-verb' }, //remind john that
  { match: '#Verb #Adverb? #Noun [(that|which)]', group: 0, tag: 'Preposition', reason: 'that-prep' }, //that car goes
  { match: 'that #Noun [#Verb]', group: 0, tag: 'Determiner', reason: 'that-determiner' }, //work, which has been done.
  { match: '@hasComma [which] (#Pronoun|#Verb)', group: 0, tag: 'Preposition', reason: 'which-copula' },
  { match: 'just [like]', group: 0, tag: 'Preposition', reason: 'like-preposition' }, //folks like her
  { match: '#Noun [like] #Noun', group: 0, tag: 'Preposition', reason: 'noun-like' }, //look like
  { match: '#Verb [like]', group: 0, tag: 'Adverb', reason: 'verb-like' },

  //District of Foo
  {
    match: '(district|region|province|municipality|territory|burough|state) of @titleCase',

    tag: 'Region',
    reason: 'district-of-Foo',
  },

  //'more' is not always an adverb
  { match: 'more #Noun', tag: 'Noun', reason: 'more-noun' },
  //he quickly foo
  { match: '#Noun #Adverb [#Noun]', group: 0, tag: 'Verb', reason: 'quickly-foo' },
  //fix for busted-up phrasalVerbs
  { match: '#Noun [#Particle]', group: 0, tag: 'Preposition', reason: 'repair-noPhrasal' },
  //John & Joe's
  { match: '#Noun (&|n) #Noun', tag: 'Organization', reason: 'Noun-&-Noun' },
  //Aircraft designer
  { match: '#Noun #Actor', tag: 'Actor', reason: 'thing-doer' },
  //j.k Rowling
  { match: '#Noun van der? #Noun', tag: 'Person', reason: 'von der noun', safe: true },
  //king of spain
  { match: '(king|queen|prince|saint|lady) of? #Noun', tag: 'Person', reason: 'king-of-noun', safe: true },
  //Foo U Ford
  { match: '[#ProperNoun] #Person', group: 0, tag: 'Person', reason: 'proper-person', safe: true },
  // x Lastname
  { match: '[#Noun] #LastName', group: 0, tag: '#FirstName', reason: 'noun-lastname', safe: true },
  // addresses
  {
    match: '#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)',

    tag: 'Address',
    reason: 'address-st',
  },
  // schools
  { match: '#Noun+ (public|private) school', tag: 'School', reason: 'noun-public-school' },

  { match: '#Organization of the? @titleCase', tag: 'Organization', reason: 'org-of-place', safe: true },
  { match: '#Organization #Country', tag: 'Organization', reason: 'org-country' },
  {
    match: '(world|global|international|national|#Demonym) #Organization',

    tag: 'Organization',
    reason: 'global-org',
  },
  //some pressing issues
  { match: 'some [#Verb] #Plural', group: 0, tag: 'Noun', reason: 'determiner6' },
  //this rocks
  { match: '(this|that) [#Plural]', group: 0, tag: 'PresentTense', reason: 'this-verbs' },
  //my buddy
  { match: '#Possessive [#FirstName]', group: 0, tag: 'Person', reason: 'possessive-name' },
  //her polling
  { match: '#Possessive [#Gerund]', group: 0, tag: 'Noun', reason: 'her-polling' },
  //her fines
  { match: '(his|her|its) [#PresentTense]', group: 0, tag: 'Noun', reason: 'its-polling' },

  //linear algebra
  {
    match: '(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'technical-noun',
  },

  { match: '#Honorific #Acronym', tag: 'Person', reason: 'Honorific-TitleCase' }, //remove single 'mr'
  // ['^#Honorific$').unTag('Person', 'single-honorific'}, //first general..
  { match: '[(1st|2nd|first|second)] #Honorific', group: 0, tag: 'Honorific', reason: 'ordinal-honorific' },
  { match: '#Acronym @titleCase', tag: 'Person', reason: 'acronym-titlecase', safe: true }, //ludwig van beethovan
  { match: '#Person (jr|sr|md)', tag: 'Person', reason: 'person-honorific' }, //peter II
  { match: '#Person #Person the? #RomanNumeral', tag: 'Person', reason: 'roman-numeral' }, //'Professor Fink', 'General McCarthy'
  { match: '#FirstName [/^[^aiurck]$/]', group: 0, tag: ['Acronym', 'Person'], reason: 'john-e' }, //Doctor john smith jr
  { match: '#Honorific #Person', tag: 'Person', reason: 'honorific-person' }, //general pearson
  {
    match: '[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person',
    group: 0,
    tag: 'Honorific',
    reason: 'ambg-honorifics',
  },

  // ['#Adverb [' + maybeAdj + ']', group: 0, tag:'Adjective', 'really-rich'},
  // [maybeDate + ' #ProperNoun', null, ['FirstName', 'Person'},'june-smith'},
  // ['(in|during|on|by|before|#Date) [' + maybeDate + ']', group: 0, tag:'Date', 'in-june'},
  // [maybeDate + ' (#Date|#Value)',  tag:'Date', 'june-5th'},
  // ['(in|near|at|from|to|#Place) [' + maybePlace + ']', group: 0, tag:'Place', 'in-paris', true},
  // ['[' + maybePlace + '] #Place', group: 0, tag:'Place', 'paris-france', true},

  //West Norforlk
  {
    match: '(west|north|south|east|western|northern|southern|eastern)+ #Place',

    tag: 'Region',
    reason: 'west-norfolk',
  },

  { match: 'al (#Person|@titleCase)', tag: 'Person', reason: 'al-borlen', safe: true },
  // ['@titleCase al @titleCase',  tag:'Person', 'arabic-al-arabic', true},
  //ferdinand de almar
  { match: '#FirstName de #Noun', tag: 'Person', reason: 'bill-de-noun' },
  //Osama bin Laden
  { match: '#FirstName (bin|al) #Noun', tag: 'Person', reason: 'bill-al-noun' },
  //John L. Foo
  { match: '#FirstName #Acronym @titleCase', tag: 'Person', reason: 'bill-acronym-title' },
  //Andrew Lloyd Webber
  { match: '#FirstName #FirstName @titleCase', tag: 'Person', reason: 'bill-firstname-title' },
  //Mr Foo
  { match: '#Honorific #FirstName? @titleCase', tag: 'Person', reason: 'dr-john-Title' },
  //peter the great
  { match: '#FirstName the #Adjective', tag: 'Person', reason: 'determiner5' },

  //very common-but-ambiguous lastnames
  {
    match: '#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)',

    tag: 'Person',
    reason: 'bill-green',
  },
  //is foo Smith
  { match: '#Copula [(#Noun|#PresentTense)] #LastName', group: 0, tag: 'FirstName', reason: 'copula-noun-lastname' },
  //ambiguous-but-common firstnames
  {
    match: '[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName',
    group: 0,
    tag: 'FirstName',
    reason: 'maybe-lastname',
  },

  //the nice swim
  { match: '(the|this|those|these) #Adjective [#Verb]', group: 0, tag: 'Noun', reason: 'the-adj-verb' },
  // the truly nice swim
  { match: '(the|this|those|these) #Adverb #Adjective [#Verb]', group: 0, tag: 'Noun', reason: 'determiner4' },
  //the orange is
  { match: '#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)', group: 0, tag: 'Noun', reason: 'the-adj-2' },
  // a stream runs
  { match: '(the|this|a|an) [#Infinitive] #Adverb? #Verb', group: 0, tag: 'Noun', reason: 'determiner5' },
  //the test string
  { match: '#Determiner [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'determiner7' },
  //by a bear.
  { match: '#Determiner #Adjective [#Infinitive]$', group: 0, tag: 'Noun', reason: 'a-inf' },
  //the wait to vote
  { match: '(the|this) [#Verb] #Preposition .', group: 0, tag: 'Noun', reason: 'determiner1' },
  //a sense of
  { match: '#Determiner [#Verb] of', group: 0, tag: 'Noun', reason: 'the-verb-of' },
  //the threat of force
  { match: '#Determiner #Noun of [#Verb]', group: 0, tag: 'Noun', reason: 'noun-of-noun' },
  //the western line
  {
    match: '#Determiner [(western|eastern|northern|southern|central)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'western-line',
  },
  //a staggering cost
  { match: '(a|an) [#Gerund]', group: 0, tag: 'Adjective', reason: 'a|an' },
  //did a 900, paid a 20
  { match: '#Verb (a|an) [#Value]', group: 0, tag: 'Singular', reason: 'did-a-value' },
  //a tv show
  { match: '(a|an) #Noun [#Infinitive]', group: 0, tag: 'Noun', reason: 'a-noun-inf' },

  //5 yan
  { match: '#Value+ [#Currency]', group: 0, tag: 'Unit', reason: '5-yan' },
  { match: '#Value+ #Currency', tag: 'Money', reason: '15 usd' },

  // had he survived,
  { match: '[had] #Noun+ #PastTense', group: 0, tag: 'Condition', reason: 'had-he' },
  // were he to survive
  { match: '[were] #Noun+ to #Infinitive', group: 0, tag: 'Condition', reason: 'were-he' },

  //a great run
  { match: '(a|an) #Adjective [(#Infinitive|#PresentTense)]', tag: 'Noun', reason: 'a|an2' },
  //a close
  { match: '#Determiner #Adverb? [close]', group: 0, tag: 'Adjective', reason: 'a-close' },

  //1 800 PhoneNumber
  { match: '1 #Value #PhoneNumber', tag: 'PhoneNumber', reason: '1-800-Value' },
  //(454) 232-9873
  { match: '#NumericValue #PhoneNumber', tag: 'PhoneNumber', reason: '(800) PhoneNumber' },
  //5 kg.
  { match: '#Value #Abbreviation', tag: 'Value', reason: 'value-abbr' },
  //seven point five
  { match: '#Value (point|decimal) #Value', tag: 'Value', reason: 'value-point-value' },
  // ten grand
  { match: '#Value grand', tag: 'Value', reason: 'value-grand' },
  //quarter million
  { match: '(a|the) [(half|quarter)] #Ordinal', group: 0, tag: 'Value', reason: 'half-ordinal' },
  { match: 'a #Value', tag: 'Value', reason: 'a-value' }, //?
  // ['#Ordinal (half|quarter)','Value', 'ordinal-half');//not ready
  { match: `${units} and #Value`, tag: 'Value', reason: 'magnitude-and-value' },

  { match: '[(do|does|will|have|had)] (not|#Adverb)? #Verb', group: 0, tag: 'Auxiliary', reason: 'have-had' },
  //still make
  { match: '[still] #Verb', group: 0, tag: 'Adverb', reason: 'still-verb' },
  //'u' as pronoun
  { match: '[u] #Verb', group: 0, tag: 'Pronoun', reason: 'u-pronoun-1' },
  //is no walk
  { match: 'is no [#Verb]', group: 0, tag: 'Noun', reason: 'is-no-verb' },
  //different views than
  { match: '[#Verb] than', group: 0, tag: 'Noun', reason: 'correction' },
  // smoked poutine is
  { match: '[#PastTense] #Singular is', group: 0, tag: 'Adjective', reason: 'smoked-poutine' },
  // baked onions are
  { match: '[#PastTense] #Plural are', group: 0, tag: 'Adjective', reason: 'baked-onions' },
  // goes to sleep
  { match: '(go|goes|went) to [#Infinitive]', group: 0, tag: 'Noun', reason: 'goes-to-verb' },

  //was walking
  { match: `[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)`, group: 0, tag: 'Auxiliary', reason: 'copula-walking' },
  //support a splattering of auxillaries before a verb
  { match: `[(has|had) (#Adverb|not)+?] #PastTense`, group: 0, tag: 'Auxiliary', reason: 'had-walked' },
  //would walk
  { match: `[(#Modal|did) (#Adverb|not)+?] #Verb`, group: 0, tag: 'Auxiliary', reason: 'modal-verb' },
  //would have had
  {
    match: `[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have',
  },
  //would be walking
  { match: `#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'would-be' },
  //had been walking
  {
    match: `(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-been',
  },

  //jack seems guarded
  { match: '#Singular (seems|appears) #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'seems-filled' },
  //fall over
  { match: '#PhrasalVerb [#PhrasalVerb]', group: 0, tag: 'Particle', reason: 'phrasal-particle' },
  //'the can'
  { match: '#Determiner [(can|will|may)]', group: 0, tag: 'Singular', reason: 'the can' },
  //is mark hughes
  { match: '#Copula [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'is-pres-noun' },
  //
  { match: '[#Infinitive] #Copula', group: 0, tag: 'Noun', reason: 'inf-copula' },
  //sometimes not-adverbs
  { match: '#Copula [(just|alone)]$', group: 0, tag: 'Adjective', reason: 'not-adverb' },
  //jack is guarded
  { match: '#Singular is #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'is-filled' },
  //is eager to go
  { match: '#Copula [#Adjective to] #Verb', group: 0, tag: 'Verb', reason: 'adj-to' },
  //walking is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'gerund-copula' },
  //walking should be fun
  { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'gerund-modal' },
  //running-a-show
  { match: '#Gerund #Determiner [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-a-show' },
  //the word 'how'
  { match: '^how', tag: 'QuestionWord', reason: 'how-question' },
  { match: '[how] (#Determiner|#Copula|#Modal|#PastTense)', group: 0, tag: 'QuestionWord', reason: 'how-is' },
  // //the word 'which'
  { match: '^which', tag: 'QuestionWord', reason: 'which-question' },
  { match: '[which] . (#Noun)+ #Pronoun', group: 0, tag: 'QuestionWord', reason: 'which-question2' },
  { match: 'which', tag: 'QuestionWord', reason: 'which-question3' },

  //air-flow
  { match: '(#Noun && @hasHyphen) #Verb', tag: 'Noun', reason: 'hyphen-verb' },
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  {
    match: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)]',
    group: 0,
    tag: 'Region',
    reason: 'us-state',
  },
  //may twenty five
  { match: '(#TextValue && #Date) #TextValue', tag: 'Date', reason: 'textvalue-date' },

  // Dwayne 'the rock' Johnson
  { match: '#FirstName [#Determiner #Noun] #LastName', group: 0, tag: '#NickName', reason: 'first-noun-last' },

  //john bodego's
  { match: '#FirstName (#Singular|#Possessive)', tag: '#Person', reason: 'first-possessive', safe: true },

  //Jani K. Smith
  { match: '(@titleCase|#Singular) #Acronym? #LastName', tag: '#Person', reason: 'title-acro-noun', safe: true },

  //John Foo
  { match: '#FirstName (#Noun && @titleCase) @titleCase?', tag: 'Person', reason: 'firstname-titlecase' },
  //Joe K. Sombrero
  { match: '#FirstName #Acronym #Noun', tag: 'Person', reason: 'n-acro-noun', safe: true },

  //sometimes adverbs - 'pretty good','well above'
  {
    match: '#Copula (pretty|dead|full|well) (#Adjective|#Noun)',
    tag: '#Copula #Adverb #Adjective',
    reason: 'sometimes-adverb',
  },
  //june 7
  { match: '(#WeekDay|#Month) #Value', tag: 'Date', reason: 'date-value' },
  //7 june
  { match: '#Value (#WeekDay|#Month)', tag: 'Date', reason: 'value-date' },
  // { match: '', tag: '', reason: '' },
  // { match: '', tag: '', reason: '' },

  // ----
]
const pipe = /\|/
const maybeNoun = 'rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity'.split(
  pipe
)
const maybeVerb = 'pat|wade|ollie|will|rob|buck|bob|mark|jack'.split(pipe)
const maybeAdj = 'misty|rusty|dusty|rich|randy'.split(pipe)
const people = 'january|april|may|june|summer|autumn|jan|sep'.split(pipe) //ambiguous month-names
const maybeDate = 'april|june|may|jan|august|eve'.split(pipe)
const maybePlace = 'paris|alexandria|houston|kobe|salvador|sydney'.split(pipe)
//Places: paris or syndey
maybePlace.forEach(place => {
  list.push({ match: '(in|near|at|from|to|#Place) [' + place + ']', group: 0, tag: 'Place', reason: 'in-paris' })
  list.push({ match: '[' + place + '] #Place', group: 0, tag: 'Place', reason: 'paris-france' })
})
maybeNoun.forEach(name => {
  list.push({ match: name + ' #Person', tag: 'Person', reason: 'ray-smith', safe: true })
  list.push({ match: name + ' #Acronym? @titleCase', tag: 'Person', reason: 'ray-a-smith', safe: true })
})
maybeVerb.forEach(verb => {
  list.push({ match: '(#Modal|#Adverb) [' + verb + ']', group: 0, tag: 'Verb', reason: 'would-mark' })
  list.push({ match: verb + ' #Person', tag: 'Person', reason: 'rob-smith' })
  list.push({ match: verb + ' #Acronym? @titleCase', tag: 'Person', reason: 'rob-a-smith' })
  list.push({ match: '(#Modal|#Adverb) [' + verb + ']', group: 0, tag: 'Verb', reason: 'would-mark' })
})
maybeAdj.forEach(adj => {
  list.push({ match: '#Adverb [' + adj + ']', group: 0, tag: 'Adjective', reason: 'really-rich' })
  list.push({ match: adj + ' #Person', tag: 'Person', reason: 'randy-smith' })
  list.push({ match: maybeAdj + ' #Acronym? @titleCase', tag: 'Person', reason: 'rusty-smith' })
})
//Dates: 'june' or 'may'
maybeDate.forEach(date => {
  list.push({ match: date + ' #ProperNoun', tag: 'Person', reason: 'june-smith', safe: true })
  list.push({ match: '(in|during|on|by|before|#Date) [' + date + ']', group: 0, tag: 'Date', reason: 'in-june' })
  list.push({ match: date + ' (#Date|#Value)', tag: 'Date', reason: 'june-5th' })
  list.push({ match: date + ' #Acronym? (@titleCase && !#Month)', tag: 'Person', reason: 'june-smith-jr' })
})
people.forEach(person => {
  //give to april
  list.push({
    match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${person}]`,
    group: 0,
    tag: 'Person',
    reason: 'ambig-person',
  })
  // remind june
  list.push({ match: `#Infinitive [${person}]`, group: 0, tag: 'Person', reason: 'infinitive-person' })
  // may waits for
  list.push({ match: `[${person}] #PresentTense (to|for)`, group: 0, tag: 'Person', reason: 'ambig-active' })
  // april will
  list.push({ match: `[${person}] #Modal`, group: 0, tag: 'Person', reason: 'ambig-modal' })
  // would april
  list.push({ match: `#Modal [${person}]`, group: 0, tag: 'Person', reason: 'modal-ambig' })
  // it is may
  list.push({ match: `#Copula [${person}]`, group: 0, tag: 'Person', reason: 'is-may' })
  // may is
  list.push({ match: `[${person}] #Copula`, group: 0, tag: 'Person', reason: 'may-is' })
  // wednesday april
  list.push({ match: `#Date [${person}]`, group: 0, tag: 'Month', reason: 'date-may' })
  // may 5th
  list.push({ match: `[${person}] the? #Value`, group: 0, tag: 'Month', reason: 'may-5th' })
  // 5th of may
  list.push({ match: `#Value of [${person}]`, group: 0, tag: 'Month', reason: '5th-of-may' })
  // with april
  list.push({ match: `(that|with|for) [${person}]`, group: 0, tag: 'Person', reason: 'that-month' })
  // this april
  list.push({ match: `(next|this|last) [${person}]`, group: 0, tag: 'Month', reason: 'next-may' }) //maybe not 'this'
})
// let obj = {}
// list.forEach(a => {
//   console.log(a[2])
//   if (obj[a[2]] === true) {
//     console.log(a[2])
//   }
//   obj[a[2]] = true
// })
module.exports = list
