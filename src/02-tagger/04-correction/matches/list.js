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
  //march to
  { match: '[march] (up|down|back|to|toward)', group: 0, tag: 'Infinitive', reason: 'march-to' },
  //must march
  { match: '#Modal [march]', group: 0, tag: 'Infinitive', reason: 'must-march' },

  //the sun
  { match: '#Determiner [sun]', group: 0, tag: 'Singular', reason: 'the-sun' },


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
    match: '(district|region|province|municipality|territory|burough|state) of #ProperNoun',

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
  // addresses
  {
    match: '#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)',

    tag: 'Address',
    reason: 'address-st',
  },
  // schools
  { match: '#Noun+ (public|private) school', tag: 'School', reason: 'noun-public-school' },

  { match: '#Organization of the? #ProperNoun', tag: 'Organization', reason: 'org-of-place', safe: true },
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

  //the word 'second'
  // doc
  // .match('[second] #Noun', 0)
  // .notIf('#Honorific')
  // .unTag('Unit')
  // .tag('Ordinal', 'second-noun')
  { match: '[second] #Noun', group: 0, tag: 'Ordinal', reason: 'second-noun' },
  { match: '[(1st|2nd|first|second)] #Honorific', group: 0, tag: 'Honorific', reason: 'ordinal-honorific' },
  { match: '#Acronym #ProperNoun', tag: 'Person', reason: 'acronym-titlecase', safe: true }, //ludwig van beethovan
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

  //West Norforlk
  {
    match: '(west|north|south|east|western|northern|southern|eastern)+ #Place',

    tag: 'Region',
    reason: 'west-norfolk',
  },

  { match: 'al (#Person|#ProperNoun)', tag: 'Person', reason: 'al-borlen', safe: true },
  //ferdinand de almar
  { match: '#FirstName de #Noun', tag: 'Person', reason: 'bill-de-noun' },
  //Osama bin Laden
  { match: '#FirstName (bin|al) #Noun', tag: 'Person', reason: 'bill-al-noun' },
  //John L. Foo
  { match: '#FirstName #Acronym #ProperNoun', tag: 'Person', reason: 'bill-acronym-title' },
  //Andrew Lloyd Webber
  { match: '#FirstName #FirstName #ProperNoun', tag: 'Person', reason: 'bill-firstname-title' },
  //Mr Foo
  { match: '#Honorific #FirstName? #ProperNoun', tag: 'Person', reason: 'dr-john-Title' },
  //peter the great
  { match: '#FirstName the #Adjective', tag: 'Person', reason: 'name-the-great' },

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

  //a staggering cost
  { match: '(a|an) [#Gerund]', group: 0, tag: 'Adjective', reason: 'a|an' },
  //did a 900, paid a 20
  { match: '#Verb (a|an) [#Value]', group: 0, tag: 'Singular', reason: 'did-a-value' },
  //a tv show
  { match: '(a|an) #Noun [#Infinitive]', group: 0, tag: 'Noun', reason: 'a-noun-inf' },

  // had he survived,
  { match: '[had] #Noun+ #PastTense', group: 0, tag: 'Condition', reason: 'had-he' },
  // were he to survive
  { match: '[were] #Noun+ to #Infinitive', group: 0, tag: 'Condition', reason: 'were-he' },

  //a great run
  { match: '(a|an) #Adjective [(#Infinitive|#PresentTense)]', tag: 'Noun', reason: 'a|an2' },
  //a close
  { match: '#Determiner #Adverb? [close]', group: 0, tag: 'Adjective', reason: 'a-close' },

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

  //Jani K. Smith
  { match: '#Singular #Acronym #LastName', tag: '#Person', reason: 'title-acro-noun', safe: true },

  //John Foo
  { match: '#FirstName (#Noun && #ProperNoun) #ProperNoun?', tag: 'Person', reason: 'firstname-titlecase' },
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

  //organization
  { match: '#ProperNoun #Organization', tag: 'Organization', reason: 'titlecase-org' },
  //'a/an' can mean 1 - "a hour"
  {
    match: '[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)',
    group: 0,
    tag: 'Valye',
    reason: 'a-is-one',
  },

  //how he is driving
  {
    match: '[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)',
    group: 0,
    tag: 'Conjunction',
    reason: 'how-he-is-x',
  },
  {
    match: '[(who|what|where|why|how|when)] #Noun #Adverb? #Infinitive not? #Gerund',
    group: 0,
    tag: 'Conjunction',
    reason: 'when i go fishing',
  },

  //will be running (not copula)
  { match: '[will #Adverb? not? #Adverb? be] #Gerund', group: 0, tag: 'Copula', reason: 'will-be-copula' },
  //for more complex forms, just tag 'be'
  { match: 'will #Adverb? not? #Adverb? [be] #Adjective', group: 0, tag: 'Copula', reason: 'be-copula' },

  //FitBit Inc
  { match: '#ProperNoun (ltd|co|inc|dept|assn|bros)', tag: 'Organization', reason: 'org-abbrv' },
  { match: '#ProperNoun (van|al|bin) #ProperNoun', tag: 'Person', reason: 'title-van-title', safe: true },
  //jose de Sucre
  { match: '#ProperNoun (de|du) la? #ProperNoun', tag: 'Person', reason: 'title-de-title', safe: true },
  //Foo District
  {
    match: '#ProperNoun+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)',
    tag: 'Region',
    reason: 'foo-district',
  },
  // walk the walk
  { match: '(the|those|these) #Adjective? [#Infinitive]', group: 0, tag: 'Noun', reason: 'det-inf' },
  { match: '(the|those|these) #Adjective? [#PresentTense]', group: 0, tag: 'Noun', reason: 'det-pres' },
  { match: '(the|those|these) #Adjective? [#PastTense]', group: 0, tag: 'Noun', reason: 'det-past' },

  // damn them
  { match: '[shit] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear1-verb' },
  { match: '[damn] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear2-verb' },
  { match: '[fuck] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear3-verb' },

  //'foo-up'
  { match: '(#Verb && @hasHyphen) up', group: 0, tag: 'PhrasalVerb', reason: 'foo-up' },
  { match: '(#Verb && @hasHyphen) off', group: 0, tag: 'PhrasalVerb', reason: 'foo-off' },
  { match: '(#Verb && @hasHyphen) over', group: 0, tag: 'PhrasalVerb', reason: 'foo-over' },
  { match: '(#Verb && @hasHyphen) out', group: 0, tag: 'PhrasalVerb', reason: 'foo-out' },

  //pope francis
  { match: '(lady|queen|sister) #ProperNoun', tag: 'FemaleName', reason: 'lady-titlecase', safe: true },
  { match: '(king|pope|father) #ProperNoun', tag: 'MaleName', reason: 'pope-titlecase', safe: true },

  // the OCED
  { match: 'the [#Acronym]', group: 0, tag: 'Organization', reason: 'the-acronym', safe: true },

  // thousand and two
  {
    match: `(hundred|thousand|million|billion|trillion|quadrillion)+ and #Value`,
    tag: 'Value',
    reason: 'magnitude-and-value',
  },
  //all march
  { match: `#Preposition [(march|may)]`, group: 0, tag: 'Month', reason: 'in-month' },
  //this march
  { match: `this [(march|may)]`, group: 0, tag: 'Month', reason: 'this-month' },
  { match: `next [(march|may)]`, group: 0, tag: 'Month', reason: 'this-month' },
  { match: `last [(march|may)]`, group: 0, tag: 'Month', reason: 'this-month' },
  // march 5th
  { match: `[(march|may)] the? #Value`, group: 0, tag: 'Month', reason: 'march-5th' },
  // 5th of march
  { match: `#Value of? [(march|may)]`, group: 0, tag: 'Month', reason: '5th-of-march' },
  // march and feb
  { match: `[(march|may)] .? #Date`, group: 0, tag: 'Month', reason: 'march-and-feb' },
  // feb to march
  { match: `#Date .? [(march|may)]`, group: 0, tag: 'Month', reason: 'feb-and-march' },
  //quickly march
  { match: `#Adverb [(march|may)]`, group: 0, tag: 'Infinitive', reason: 'quickly-march' },
  //march quickly
  { match: `(march|may) [#Adverb]`, group: 0, tag: 'Infinitive', reason: 'march-quickly' },

  // { match: '', group: 0, tag: , reason: '' },
]

// let obj = {}
// list.forEach(a => {
//   if (obj[a.match] === true) {
//     console.log(a.match)
//   }
//   obj[a.match] = true
//   console.log(a.tag)
// })
module.exports = list
