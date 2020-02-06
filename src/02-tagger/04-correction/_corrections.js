const people = '(january|april|may|june|summer|autumn|jan|sep)' //ambiguous month-names
const preps = '(in|by|before|during|on|until|after|of|within|all)' //6
const verbs = '(may|march|sat)' //ambiguous month-verbs
const maybeNoun =
  '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)'
const maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
const maybeAdj = '(misty|rusty|dusty|rich|randy)'
const units = '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'

// order matters
const list = [
  //there are reasons
  ['there (are|were) #Adjective? [#PresentTense]', 0, 'Plural', 'there-are'],
  //still goodß
  ['[still] #Adjective', 0, 'Adverb', 'still-advb'],
  //barely even walk
  ['(barely|hardly) even', null, 'Adverb', 'barely-even'],
  //big dreams, critical thinking
  ['#Adjective [#PresentTense]', 0, 'Noun', 'adj-presentTense'],
  //will secure our
  ['will [#Adjective]', 0, 'Verb', 'will-adj'],
  //cheering hard - dropped -ly's
  ['#PresentTense [(hard|quick|long|bright|slow)]', 0, 'Adverb', 'lazy-ly'],
  //his fine
  ['(his|her|its) [#Adjective]', 0, 'Noun', 'his-fine'],
  //he left
  ['#Noun #Adverb? [left]', 0, 'PastTense', 'left-verb'],
  //he disguised the thing
  ['#Pronoun [#Adjective] #Determiner #Adjective? #Noun', 0, 'Verb', 'he-adj-the'],

  //give to april
  [`#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${people}]`, 0, 'Person', 'ambig-person'],
  //remind june
  [`#Infinitive [${people}]`, 0, 'Person', 'infinitive-person'],
  //may waits for
  [`[${people}] #PresentTense (to|for)`, 0, 'Person', 'ambig-active'],
  //april will
  [`[${people}] #Modal`, 0, 'Person', 'ambig-modal'],
  //would april
  [`#Modal [${people}]`, 0, 'Person', 'modal-ambig'],
  //it is may
  [`#Copula [${people}]`, 0, 'Person', 'is-may'],
  //may is
  [`[${people}] #Copula`, 0, 'Person', 'may-is'],
  //wednesday april
  [`#Date [${people}]`, 0, 'Month', 'date-may'],
  //may 5th
  [`[${people}] the? #Value`, 0, 'Month', 'may-5th'],
  //5th of may
  [`#Value of [${people}]`, 0, 'Month', '5th-of-may'],

  //quickly march
  [`#Adverb [${verbs}]`, 0, 'Infinitive', 'quickly-march'],
  [`${verbs} [#Adverb]`, 0, 'Infinitive', 'march-quickly'],

  //march to
  ['[march] (up|down|back|to|toward)', 0, 'Infinitive', 'march-to'],
  //must march
  ['#Modal [march]', 0, 'Infinitive', 'must-march'],
  // sun the 5th
  ['[sun] the #Ordinal', null, 'WeekDay', 'sun-the-5th'],
  //sun feb 2
  ['[sun] #Date', 0, 'WeekDay', 'sun-feb'],
  //1pm next sun
  ['#Date (on|this|next|last|during)? [sun]', 0, 'WeekDay', '1pm-sun'],
  //the sun
  ['#Determiner [sun]', 0, 'Singular', 'the-sun'],

  //sat november
  ['[sat] #Date', 0, 'WeekDay', 'sat-feb'],
  //this sat
  [`${preps} [sat]`, 0, 'WeekDay', 'sat'],

  //June 5-7th
  [`#Month #DateRange+`, null, 'Date', 'numberRange'],
  //5th of March
  ['#Value of #Month', null, 'Date', 'value-of-month'],
  //5 March
  ['#Cardinal #Month', null, 'Date', 'cardinal-month'],
  //march 5 to 7
  ['#Month #Value to #Value', null, 'Date', 'value-to-value'],
  //march the 12th
  ['#Month the #Value', null, 'Date', 'month-the-value'],

  //minus 7
  ['(minus|negative) #Value', null, 'Value', 'minus-value'],
  ['(#Noun && @hasComma) #Noun (and|or) [#PresentTense]', 0, 'Noun', 'noun-list'], //3 feet
  ['#Value [(foot|feet)]', 0, 'Unit', 'foot-unit'], //'u' as pronoun
  ['#Conjunction [u]', 0, 'Pronoun', 'u-pronoun-2'], //6 am
  ['#Holiday (day|eve)', null, 'Holiday', 'holiday-day'], // the captain who
  ['#Noun [(who|whom)]', 0, 'Determiner', 'captain-who'], //timezones
  ['#Demonym #Currency', null, 'Currency', 'demonym-currency'], //about to go
  ['[about to] #Adverb? #Verb', 0, 'Auxiliary', 'Verb', 'about-to'], //right of way
  ['(right|rights) of .', null, 'Noun', 'right-of'], // a bit
  ['[much] #Adjective', 0, 'Adverb', 'bit-1'],
  ['a [bit]', 0, 'Noun', 'bit-2'],
  ['a bit much', null, 'Determiner Adverb Adjective', 'bit-3'],
  ['too much', null, 'Adverb Adjective', 'bit-4'], // u r cool
  ['u r', null, 'Pronoun Copula', 'u r'], // well, ...

  //spencer kelly's
  ['#FirstName #Acronym? (#Possessive && #LastName)', null, 'Possessive', 'name-poss'],
  //Super Corp's fundraiser
  ['#Organization+ #Possessive', null, 'Possessive', 'org-possessive'],
  //Los Angeles's fundraiser
  ['#Place+ #Possessive', null, 'Possessive', 'place-possessive'],

  //let him glue
  [
    '(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)',
    0,
    '#Infinitive',
    'let-him-glue',
  ],

  //swear-words as non-expression POS
  //nsfw
  ['holy (shit|fuck|hell)', null, 'Expression', 'swears-expression'],
  ['#Determiner [(shit|damn|hell)]', 0, 'Noun', 'swears-noun'],
  // is f*ed up
  ['#Copula [fucked up?]', null, 'Adjective', 'swears-adjective'],

  ['[so] #Adjective', 0, 'Adverb', 'so-adv'], //so the
  ['[so] #Noun', 0, 'Conjunction', 'so-conj'], //do so
  ['do [so]', 0, 'Noun', 'so-noun'],

  //all students
  ['[all] #Determiner? #Noun', 0, 'Adjective', 'all-noun'], //it all fell apart
  ['[all] #Verb', 0, 'Adverb', 'all-verb'], //remind john that
  ['#Verb #Adverb? #Noun [(that|which)]', 0, 'Preposition', 'that-prep'], //that car goes
  ['that #Noun [#Verb]', 0, 'Determiner', 'that-determiner'], //work, which has been done.
  ['@hasComma [which] (#Pronoun|#Verb)', 0, 'Preposition', 'which-copula'],
  ['just [like]', 0, 'Preposition', 'like-preposition'], //folks like her
  ['#Noun [like] #Noun', 0, 'Preposition', 'noun-like'], //look like
  ['#Verb [like]', 0, 'Adverb', 'verb-like'],

  //District of Foo
  ['(district|region|province|municipality|territory|burough|state) of @titleCase', null, 'Region', 'district-of-Foo'],

  //'more' is not always an adverb
  ['more #Noun', null, 'Noun', 'more-noun'],
  //he quickly foo
  ['#Noun #Adverb [#Noun]', 0, 'Verb', 'quickly-foo'],
  //fix for busted-up phrasalVerbs
  ['#Noun [#Particle]', 0, 'Preposition', 'repair-noPhrasal'],
  //John & Joe's
  ['#Noun (&|n) #Noun', null, 'Organization', 'Noun-&-Noun'],
  //Aircraft designer
  ['#Noun #Actor', null, 'Actor', 'thing-doer'],
  //j.k Rowling
  ['#Noun van der? #Noun', null, 'Person', 'von der noun', true],
  //king of spain
  ['(king|queen|prince|saint|lady) of? #Noun', null, 'Person', 'king-of-noun', true],
  //Foo U Ford
  ['[#ProperNoun] #Person', 0, 'Person', 'proper-person', true],
  // x Lastname
  ['[#Noun] #LastName', 0, '#FirstName', 'noun-lastname', true],
  // addresses
  ['#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)', null, 'Address', 'address-st'],
  // schools
  ['#Noun+ (public|private) school', null, 'School', 'noun-public-school'],

  ['#Organization of the? @titleCase', null, 'Organization', 'org-of-place', true],
  ['#Organization #Country', null, 'Organization', 'org-country'],
  ['(world|global|international|national|#Demonym) #Organization', null, 'Organization', 'global-org'],
  //some pressing issues
  ['some [#Verb] #Plural', 0, 'Noun', 'determiner6'],
  //this rocks
  ['(this|that) [#Plural]', 0, 'PresentTense', 'this-verbs'],
  //my buddy
  ['#Possessive [#FirstName]', 0, 'Person', 'possessive-name'],
  //her polling
  ['#Possessive [#Gerund]', 0, 'Noun', 'her-polling'],
  //her fines
  ['(his|her|its) [#PresentTense]', 0, 'Noun', 'its-polling'],

  //linear algebra
  [
    '(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun',
    0,
    'Noun',
    'technical-noun',
  ],

  ['#Honorific #Acronym', null, 'Person', 'Honorific-TitleCase'], //remove single 'mr'
  // ['^#Honorific$').unTag('Person', 'single-honorific'],  //first general..
  ['[(1st|2nd|first|second)] #Honorific', 0, 'Honorific', 'ordinal-honorific'],
  ['#Acronym @titleCase', null, 'Person', 'acronym-titlecase', true], //ludwig van beethovan
  ['#Person (jr|sr|md)', null, 'Person', 'person-honorific'], //peter II
  ['#Person #Person the? #RomanNumeral', null, 'Person', 'roman-numeral'], //'Professor Fink', 'General McCarthy'
  ['#FirstName [/^[^aiurck]$/]', 0, ['Acronym', 'Person'], 'john-e'], //Doctor john smith jr
  ['#Honorific #Person', null, 'Person', 'honorific-person'], //general pearson
  [
    '[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person',
    0,
    'Honorific',
    'ambg-honorifics',
  ],

  [maybeNoun + ' #Person', null, 'Person', 'ray-smith', true],
  [maybeVerb + ' #Person', null, 'Person', 'rob-smith'],
  [maybeAdj + ' #Person', null, 'Person', 'randy-smith'],
  // ['#Adverb [' + maybeAdj + ']', 0, 'Adjective', 'really-rich'],
  // [maybeDate + ' #ProperNoun', null, ['FirstName', 'Person'], 'june-smith'],
  // ['(in|during|on|by|before|#Date) [' + maybeDate + ']', 0, 'Date', 'in-june'],
  // [maybeDate + ' (#Date|#Value)', null, 'Date', 'june-5th'],
  // ['(in|near|at|from|to|#Place) [' + maybePlace + ']', 0, 'Place', 'in-paris', true],
  // ['[' + maybePlace + '] #Place', 0, 'Place', 'paris-france', true],

  //West Norforlk
  ['(west|north|south|east|western|northern|southern|eastern)+ #Place', null, 'Region', 'west-norfolk'],

  ['al (#Person|@titleCase)', null, 'Person', 'al-borlen', true],
  // ['@titleCase al @titleCase', null, 'Person', 'arabic-al-arabic', true],
  //ferdinand de almar
  ['#FirstName de #Noun', null, 'Person', 'bill-de-noun'],
  //Osama bin Laden
  ['#FirstName (bin|al) #Noun', null, 'Person', 'bill-al-noun'],
  //John L. Foo
  ['#FirstName #Acronym @titleCase', null, 'Person', 'bill-acronym-title'],
  //Andrew Lloyd Webber
  ['#FirstName #FirstName @titleCase', null, 'Person', 'bill-firstname-title'],
  //Mr Foo
  ['#Honorific #FirstName? @titleCase', null, 'Person', 'dr-john-Title'],
  //peter the great
  ['#FirstName the #Adjective', null, 'Person', 'determiner5'],

  //very common-but-ambiguous lastnames
  ['#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)', null, 'Person', 'bill-green'],
  //is foo Smith
  ['#Copula [(#Noun|#PresentTense)] #LastName', 0, 'FirstName', 'copula-noun-lastname'],
  //ambiguous-but-common firstnames
  [
    '[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName',
    0,
    'FirstName',
    'maybe-lastname',
  ],

  //the nice swim
  ['(the|this|those|these) #Adjective [#Verb]', 0, 'Noun', 'the-adj-verb'],
  // the truly nice swim
  ['(the|this|those|these) #Adverb #Adjective [#Verb]', 0, 'Noun', 'determiner4'],
  //the orange is
  ['#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)', 0, 'Noun', 'the-adj-2'],
  // a stream runs
  ['(the|this|a|an) [#Infinitive] #Adverb? #Verb', 0, 'Noun', 'determiner5'],
  //the test string
  ['#Determiner [#Infinitive] #Noun', 0, 'Noun', 'determiner7'],
  //by a bear.
  ['#Determiner #Adjective [#Infinitive]$', 0, 'Noun', 'a-inf'],
  //the wait to vote
  ['(the|this) [#Verb] #Preposition .', 0, 'Noun', 'determiner1'],
  //a sense of
  ['#Determiner [#Verb] of', 0, 'Noun', 'the-verb-of'],
  //the threat of force
  ['#Determiner #Noun of [#Verb]', 0, 'Noun', 'noun-of-noun'],
  //the western line
  ['#Determiner [(western|eastern|northern|southern|central)] #Noun', 0, 'Noun', 'western-line'],
  //a staggering cost
  ['(a|an) [#Gerund]', 0, 'Adjective', 'a|an'],
  //did a 900, paid a 20
  ['#Verb (a|an) [#Value]', 0, 'Singular', 'did-a-value'],
  //a tv show
  ['(a|an) #Noun [#Infinitive]', 0, 'Noun', 'a-noun-inf'],

  //5 yan
  ['#Value+ [#Currency]', 0, 'Unit', '5-yan'],
  ['#Value+ #Currency', null, 'Money', '15 usd'],

  // had he survived,
  ['[had] #Noun+ #PastTense', 0, 'Condition', 'had-he'],
  // were he to survive
  ['[were] #Noun+ to #Infinitive', 0, 'Condition', 'were-he'],

  //a great run
  ['(a|an) #Adjective [(#Infinitive|#PresentTense)]', null, 'Noun', 'a|an2'],
  //a close
  ['#Determiner #Adverb? [close]', 0, 'Adjective', 'a-close'],

  //1 800 PhoneNumber
  ['1 #Value #PhoneNumber', null, 'PhoneNumber', '1-800-Value'],
  //(454) 232-9873
  ['#NumericValue #PhoneNumber', null, 'PhoneNumber', '(800) PhoneNumber'],
  //5 kg.
  ['#Value #Abbreviation', null, 'Value', 'value-abbr'],
  //seven point five
  ['#Value (point|decimal) #Value', null, 'Value', 'value-point-value'],
  // ten grand
  ['#Value grand', null, 'Value', 'value-grand'],
  //quarter million
  ['(a|the) [(half|quarter)] #Ordinal', 0, 'Value', 'half-ordinal'],
  ['a #Value', null, 'Value', 'a-value'], //?
  // ['#Ordinal (half|quarter)','Value', 'ordinal-half');//not ready
  [`${units} and #Value`, null, 'Value', 'magnitude-and-value'],

  ['[(do|does|will|have|had)] (not|#Adverb)? #Verb', 0, 'Auxiliary', 'have-had'],
  //still make
  ['[still] #Verb', 0, 'Adverb', 'still-verb'],
  //'u' as pronoun
  ['[u] #Verb', 0, 'Pronoun', 'u-pronoun-1'],
  //is no walk
  ['is no [#Verb]', 0, 'Noun', 'is-no-verb'],
  //different views than
  ['[#Verb] than', 0, 'Noun', 'correction'],
  // smoked poutine is
  ['[#PastTense] #Singular is', 0, 'Adjective', 'smoked-poutine'],
  // baked onions are
  ['[#PastTense] #Plural are', 0, 'Adjective', 'baked-onions'],
  // goes to sleep
  ['(go|goes|went) to [#Infinitive]', 0, 'Noun', 'goes-to-verb'],

  //was walking
  [`[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)`, 0, 'Auxiliary', 'copula-walking'],
  //support a splattering of auxillaries before a verb
  [`[(has|had) (#Adverb|not)+?] #PastTense`, 0, 'Auxiliary', 'had-walked'],
  //would walk
  [`[(#Modal|did) (#Adverb|not)+?] #Verb`, 0, 'Auxiliary', 'modal-verb'],
  //would have had
  [`[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`, 0, 'Auxiliary', 'would-have'],
  //would be walking
  [`#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`, 0, 'Auxiliary', 'would-be'],
  //had been walking
  [`(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`, 0, 'Auxiliary', 'had-been'],

  //jack seems guarded
  ['#Singular (seems|appears) #Adverb? [#PastTense$]', 0, 'Adjective', 'seems-filled'],
  //fall over
  ['#PhrasalVerb [#PhrasalVerb]', 0, 'Particle', 'phrasal-particle'],
  //'the can'
  ['#Determiner [(can|will|may)]', 0, 'Singular', 'the can'],
  //is mark hughes
  ['#Copula [#Infinitive] #Noun', 0, 'Noun', 'is-pres-noun'],
  //
  ['[#Infinitive] #Copula', 0, 'Noun', 'inf-copula'],
  //sometimes not-adverbs
  ['#Copula [(just|alone)]$', 0, 'Adjective', 'not-adverb'],
  //jack is guarded
  ['#Singular is #Adverb? [#PastTense$]', 0, 'Adjective', 'is-filled'],
  //is eager to go
  ['#Copula [#Adjective to] #Verb', 0, 'Verb', 'adj-to'],
  //walking is cool
  ['[#Gerund] #Adverb? not? #Copula', 0, 'Activity', 'gerund-copula'],
  //walking should be fun
  ['[#Gerund] #Modal', 0, 'Activity', 'gerund-modal'],
  //running-a-show
  ['#Gerund #Determiner [#Infinitive]', 0, 'Noun', 'running-a-show'],
  //the word 'how'
  ['^how', null, 'QuestionWord', 'how-question'],
  ['[how] (#Determiner|#Copula|#Modal|#PastTense)', 0, 'QuestionWord', 'how-is'],
  // //the word 'which'
  ['^which', null, 'QuestionWord', 'which-question'],
  ['[which] . (#Noun)+ #Pronoun', 0, 'QuestionWord', 'which-question2'],
  ['which', null, 'QuestionWord', 'which-question3'],
]

// let obj = {}
// list.forEach(a => {
//   console.log(a[2])
//   if (obj[a[2]] === true) {
//     console.log(a[2])
//   }
//   obj[a[2]] = true
// })
module.exports = list
