const seq = {
  adverbAdj: '(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)',
  personAdj: '(misty|rusty|dusty|rich|randy|young)',
  personDate: '(april|june|may|jan|august|eve)',
  personMonth: '(january|april|may|june|jan|sep)',
  personVerb: '(pat|wade|ollie|will|rob|buck|bob|mark|jack)',
  personPlace: '(darwin|hamilton|paris|alexandria|houston|kobe|santiago|salvador|sydney|victoria)',
  personNoun:
    '(art|baker|berg|bill|brown|charity|chin|christian|cliff|daisy|dawn|dick|dolly|faith|franco|gene|green|hall|hill|holly|hope|jean|jewel|joy|kelvin|king|kitty|lane|lily|melody|mercedes|miles|olive|penny|ray|reed|robin|rod|rose|sky|summer|trinity|van|viola|violet|wang|white)',
}
// order matters
let matches = [
  { match: 'too much', tag: 'Adverb Adjective', reason: 'bit-4' },
  // u r cool
  { match: 'u r', tag: 'Pronoun Copula', reason: 'u r' },
  //sometimes adverbs - 'pretty good','well above'
  {
    match: '#Copula (pretty|dead|full|well|sure) (#Adjective|#Noun)',
    tag: '#Copula #Adverb #Adjective',
    reason: 'sometimes-adverb',
  },
  //i better ..
  { match: '(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense', group: 0, tag: 'Modal', reason: 'i-better' },
  //walking is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'gerund-copula' },
  //walking should be fun
  { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'gerund-modal' },
  //swear-words as non-expression POS
  { match: 'holy (shit|fuck|hell)', tag: 'Expression', reason: 'swears-expression' },
  //Aircraft designer
  { match: '#Noun #Actor', tag: 'Actor', reason: 'thing-doer' },
  { match: '#Conjunction [u]', group: 0, tag: 'Pronoun', reason: 'u-pronoun-2' },
  //'u' as pronoun
  { match: '[u] #Verb', group: 0, tag: 'Pronoun', reason: 'u-pronoun-1' },
  { match: '#Noun [(who|whom)]', group: 0, tag: 'Determiner', reason: 'captain-who' },
  { match: 'a bit much', tag: 'Determiner Adverb Adjective', reason: 'bit-3' },
  // ==== Propositions ====
  //all students
  { match: '#Verb #Adverb? #Noun [(that|which)]', group: 0, tag: 'Preposition', reason: 'that-prep' },
  //work, which has been done.
  { match: '@hasComma [which] (#Pronoun|#Verb)', group: 0, tag: 'Preposition', reason: 'which-copula' },
  { match: '#Copula just [like]', group: 0, tag: 'Preposition', reason: 'like-preposition' },
  //folks like her
  { match: '#Noun [like] #Noun', group: 0, tag: 'Preposition', reason: 'noun-like' },
  // had he survived,
  { match: '[had] #Noun+ #PastTense', group: 0, tag: 'Condition', reason: 'had-he' },
  // were he to survive
  { match: '[were] #Noun+ to #Infinitive', group: 0, tag: 'Condition', reason: 'were-he' },
  //the word 'how'
  { match: '^how', tag: 'QuestionWord', reason: 'how-question' },
  { match: '[how] (#Determiner|#Copula|#Modal|#PastTense)', group: 0, tag: 'QuestionWord', reason: 'how-is' },
  // //the word 'which'
  { match: '^which', tag: 'QuestionWord', reason: 'which-question' },
  { match: '[so] #Noun', group: 0, tag: 'Conjunction', reason: 'so-conj' },
  //how he is driving
  {
    match: '[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)',
    group: 0,
    tag: 'Conjunction',
    reason: 'how-he-is-x',
  },
  // ==== Holiday ====
  { match: '#Holiday (day|eve)', tag: 'Holiday', reason: 'holiday-day' },
  // ==== WeekDay ====
  // sun the 5th
  { match: '[sun] the #Ordinal', tag: 'WeekDay', reason: 'sun-the-5th' },
  //sun feb 2
  { match: '[sun] #Date', group: 0, tag: 'WeekDay', reason: 'sun-feb' },
  //1pm next sun
  { match: '#Date (on|this|next|last|during)? [sun]', group: 0, tag: 'WeekDay', reason: '1pm-sun' },
  //this sat
  { match: `(in|by|before|during|on|until|after|of|within|all) [sat]`, group: 0, tag: 'WeekDay', reason: 'sat' },
  { match: `(in|by|before|during|on|until|after|of|within|all) [wed]`, group: 0, tag: 'WeekDay', reason: 'wed' },
  { match: `(in|by|before|during|on|until|after|of|within|all) [march]`, group: 0, tag: 'Month', reason: 'march' },
  //sat november
  { match: '[sat] #Date', group: 0, tag: 'WeekDay', reason: 'sat-feb' },
  // in june
  { match: `in [${seq.personDates}]`, group: 0, tag: 'Date', reason: 'in-june' },
  { match: `during [${seq.personDates}]`, group: 0, tag: 'Date', reason: 'in-june' },
  { match: `on [${seq.personDates}]`, group: 0, tag: 'Date', reason: 'in-june' },
  { match: `by [${seq.personDates}]`, group: 0, tag: 'Date', reason: 'by-june' },
  { match: `after [${seq.personDates}]`, group: 0, tag: 'Date', reason: 'after-june' },
  { match: `#Date [${seq.personDates}]`, group: 0, tag: 'Date', reason: 'in-june' },
  // june 1992
  { match: `${seq.personDates} #Value`, tag: 'Date', reason: 'june-5th' },
  { match: `${seq.personDates} #Date`, tag: 'Date', reason: 'june-5th' },
  // June Smith
  { match: `${seq.personDates} #ProperNoun`, tag: 'Person', reason: 'june-smith', safe: true },
  // june m. Cooper
  { match: `${seq.personDates} #Acronym? (#ProperNoun && !#Month)`, tag: 'Person', reason: 'june-smith-jr' },
  // ==== Month ====
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
  { match: `#Adverb [(march|may)]`, group: 0, tag: 'Verb', reason: 'quickly-march' },
  //march quickly
  { match: `[(march|may)] #Adverb`, group: 0, tag: 'Verb', reason: 'march-quickly' },
  //5th of March
  { match: '#Value of #Month', tag: 'Date', reason: 'value-of-month' },
  //5 March
  { match: '#Cardinal #Month', tag: 'Date', reason: 'cardinal-month' },
  //march 5 to 7
  { match: '#Month #Value to #Value', tag: 'Date', reason: 'value-to-value' },
  //march the 12th
  { match: '#Month the #Value', tag: 'Date', reason: 'month-the-value' },
  //june 7
  { match: '(#WeekDay|#Month) #Value', tag: 'Date', reason: 'date-value' },
  //7 june
  { match: '#Value (#WeekDay|#Month)', tag: 'Date', reason: 'value-date' },
  //may twenty five
  { match: '(#TextValue && #Date) #TextValue', tag: 'Date', reason: 'textvalue-date' },
  // 'aug 20-21'
  { match: `#Month #NumberRange`, tag: 'Date', reason: 'aug 20-21' },
  // timezones
  // china standard time
  { match: `(#Place|#Demonmym|#Time) (standard|daylight|central|mountain)? time`, tag: 'Timezone', reason: 'std-time' },
  // eastern time
  {
    match: `(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time`,
    tag: 'Timezone',
    reason: 'eastern-time',
  },
  // 5pm central
  { match: `#Time [(eastern|mountain|pacific|central|est|pst|gmt)]`, group: 0, tag: 'Timezone', reason: '5pm-central' },
  // central european time
  { match: `(central|western|eastern) european time`, tag: 'Timezone', reason: 'cet' },
  // 'second'
  { match: `#Cardinal [second]`, tag: 'Unit', reason: 'one-second' },
  // all fell apart
  { match: '[all] #Determiner? #Noun', group: 0, tag: 'Adjective', reason: 'all-noun' },
  // very rusty
  { match: `#Adverb [${seq.personAdj}]`, group: 0, tag: 'Adjective', reason: 'really-rich' },
  // rusty smith
  { match: `${seq.personAdj} #Person`, tag: 'Person', reason: 'randy-smith' },
  // rusty a. smith
  { match: `${seq.personAdj} #Acronym? #ProperNoun`, tag: 'Person', reason: 'rusty-smith' },
  //sometimes not-adverbs
  { match: '#Copula [(just|alone)]$', group: 0, tag: 'Adjective', reason: 'not-adverb' },
  //jack is guarded
  { match: '#Singular is #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'is-filled' },
  // smoked poutine is
  { match: '[#PastTense] #Singular is', group: 0, tag: 'Adjective', reason: 'smoked-poutine' },
  // baked onions are
  { match: '[#PastTense] #Plural are', group: 0, tag: 'Adjective', reason: 'baked-onions' },
  // well made
  { match: 'well [#PastTense]', group: 0, tag: 'Adjective', reason: 'well-made' },
  // is f*ed up
  { match: '#Copula [fucked up?]', tag: 'Adjective', reason: 'swears-adjective' },
  //jack seems guarded
  { match: '#Singular (seems|appears) #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'seems-filled' },
  // Gerund-Adjectives - 'amusing, annoying'
  //a staggering cost
  { match: '(a|an) [#Gerund]', group: 0, tag: 'Adjective', reason: 'a|an' },
  //as amusing as
  { match: 'as [#Gerund] as', group: 0, tag: 'Adjective', reason: 'as-gerund-as' },
  // more amusing than
  { match: 'more [#Gerund] than', group: 0, tag: 'Adjective', reason: 'more-gerund-than' },
  // very amusing
  { match: '(so|very|extremely) [#Gerund]', group: 0, tag: 'Adjective', reason: 'so-gerund' },
  // it was amusing
  {
    match: '(it|he|she|everything|something) #Adverb? was #Adverb? [#Gerund]',
    group: 0,
    tag: 'Adjective',
    reason: 'it-was-gerund',
  },
  // found it amusing
  { match: '(found|found) it #Adverb? [#Gerund]', group: 0, tag: 'Adjective', reason: 'found-it-gerund' },
  // a bit amusing
  { match: 'a (little|bit|wee) bit? [#Gerund]', group: 0, tag: 'Adjective', reason: 'a-bit-gerund' },
  // jury is out - preposition ➔ adjective
  { match: '#Copula #Adjective? [(out|in|through)]$', group: 0, tag: 'Adjective', reason: 'still-out' },
  // shut the door
  { match: '^[#Adjective] (the|your) #Noun', group: 0, tag: 'Infinitive', reason: 'shut-the' },
  // the said card
  { match: 'the [said] #Noun', group: 0, tag: 'Adjective', reason: 'the-said-card' },
  // a myth that uncovered wounds heal
  {
    match: '#Noun (that|which|whose) [#PastTense && !#Copula] #Noun',
    group: 0,
    tag: 'Adjective',
    reason: 'that-past-noun',
  },
  //there are reasons
  { match: 'there (are|were) #Adjective? [#PresentTense]', group: 0, tag: 'Plural', reason: 'there-are' },
  // ==== Singular ====
  //the sun
  { match: '#Determiner [sun]', group: 0, tag: 'Singular', reason: 'the-sun' },
  //did a 900, paid a 20
  { match: '#Verb (a|an) [#Value]', group: 0, tag: 'Singular', reason: 'did-a-value' },
  //'the can'
  { match: 'the [(can|will|may)]', group: 0, tag: 'Singular', reason: 'the can' },
  // ==== Possessive ====
  //spencer kelly's
  { match: '#FirstName #Acronym? (#Possessive && #LastName)', tag: 'Possessive', reason: 'name-poss' },
  //Super Corp's fundraiser
  { match: '#Organization+ #Possessive', tag: 'Possessive', reason: 'org-possessive' },
  //Los Angeles's fundraiser
  { match: '#Place+ #Possessive', tag: 'Possessive', reason: 'place-possessive' },
  // assign all tasks
  {
    match: '(#Verb && !#Modal) (all|every|each|most|some|no) [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'all-presentTense',
  },
  //the above is clear
  { match: '#Determiner [#Adjective] #Copula', group: 0, tag: 'Noun', reason: 'the-adj-is' },
  //real evil is
  { match: '#Adjective [#Adjective] #Copula', group: 0, tag: 'Noun', reason: 'adj-adj-is' },
  // PresentTense/Noun ambiguities
  // big dreams, critical thinking
  // have big dreams
  { match: '(had|have|#PastTense) #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'adj-presentTense' },
  // excellent answer spencer
  { match: '^#Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'start adj-presentTense' },
  // one big reason
  { match: '#Value #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'one-big-reason' },
  // won widespread support
  { match: '#PastTense #Adjective+ [#PresentTense]', group: 0, tag: 'Noun', reason: 'won-wide-support' },
  // many poses
  { match: '(many|few|several|couple) [#PresentTense]', group: 0, tag: 'Noun', reason: 'many-poses' },
  // very big dreams
  { match: '#Adverb #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'very-big-dream' },
  // good wait staff
  { match: '#Adjective [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'good-wait-staff' },
  // adorable little store
  { match: '#Adjective #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'adorable-little-store' },
  // of basic training
  { match: '#Preposition #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'of-basic-training' },
  // early warning
  { match: '#Adjective [#Gerund]', group: 0, tag: 'Noun', reason: 'early-warning' },
  // justifiying higher costs
  { match: '#Gerund #Adverb? #Comparative [#PresentTense]', group: 0, tag: 'Noun', reason: 'higher-costs' },
  // do the dance
  { match: '#Infinitive (this|that|the) [#Infinitive]', group: 0, tag: 'Noun', reason: 'do-this-dance' },
  //his fine
  { match: '(his|her|its) [#Adjective]', group: 0, tag: 'Noun', reason: 'his-fine' },
  //some pressing issues
  { match: 'some [#Verb] #Plural', group: 0, tag: 'Noun', reason: 'determiner6' },
  //'more' is not always an adverb
  { match: 'more #Noun', tag: 'Noun', reason: 'more-noun' },
  { match: '(#Noun && @hasComma) #Noun (and|or) [#PresentTense]', group: 0, tag: 'Noun', reason: 'noun-list' },
  { match: '(right|rights) of .', tag: 'Noun', reason: 'right-of' },
  { match: 'a [bit]', group: 0, tag: 'Noun', reason: 'bit-2' },
  // my first thought
  { match: '#Possessive #Ordinal [#PastTense]', group: 0, tag: 'Noun', reason: 'first-thought' },
  //running-a-show
  { match: '#Gerund #Determiner [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-a-show' },
  //the-only-reason
  { match: '#Determiner #Adverb [#Infinitive]', group: 0, tag: 'Noun', reason: 'the-reason' },
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
  //a nice deal
  { match: '#Determiner #Adjective #Adjective? [#Infinitive]', group: 0, tag: 'Noun', reason: 'a-nice-inf' },
  //the wait to vote
  { match: 'the [#Verb] #Preposition .', group: 0, tag: 'Noun', reason: 'determiner1' },
  //a sense of
  { match: '#Determiner [#Verb] of', group: 0, tag: 'Noun', reason: 'the-verb-of' },
  //next career move
  { match: '#Adjective #Noun+ [#Infinitive] #Copula', group: 0, tag: 'Noun', reason: 'career-move' },
  //the threat of force
  { match: '#Determiner #Noun of [#Verb]', group: 0, tag: 'Noun', reason: 'noun-of-noun' },
  //the western line
  {
    match: '#Determiner [(western|eastern|northern|southern|central)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'western-line',
  },
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
  // a blown motor
  { match: '(the|those|these|a|an) [#Participle] #Noun', group: 0, tag: 'Adjective', reason: 'blown-motor' },
  // walk the walk
  { match: '(the|those|these|a|an) #Adjective? [#Infinitive]', group: 0, tag: 'Noun', reason: 'det-inf' },
  { match: '(the|those|these|a|an) #Adjective? [#PresentTense]', group: 0, tag: 'Noun', reason: 'det-pres' },
  { match: '(the|those|these|a|an) #Adjective? [#PastTense]', group: 0, tag: 'Noun', reason: 'det-past' },
  // this swimming
  { match: '(this|that) [#Gerund]', group: 0, tag: 'Noun', reason: 'this-gerund' },
  // at some point
  { match: 'at some [#Infinitive]', group: 0, tag: 'Noun', reason: 'at-some-inf' },
  //air-flow
  { match: '(#Noun && @hasHyphen) #Verb', tag: 'Noun', reason: 'hyphen-verb' },
  //is no walk
  { match: 'is no [#Verb]', group: 0, tag: 'Noun', reason: 'is-no-verb' },
  //different views than
  { match: '[#Verb] than', group: 0, tag: 'Noun', reason: 'correction' },
  // goes to sleep
  { match: '(go|goes|went) to [#Infinitive]', group: 0, tag: 'Noun', reason: 'goes-to-verb' },
  //a close watch on
  { match: '(a|an) #Noun [#Infinitive] (#Preposition|#Noun)', group: 0, tag: 'Noun', reason: 'a-noun-inf' },
  //a tv show
  { match: '(a|an) #Noun [#Infinitive]$', group: 0, tag: 'Noun', reason: 'a-noun-inf2' },
  //do so
  { match: 'do [so]', group: 0, tag: 'Noun', reason: 'so-noun' },
  //is mark hughes
  { match: '#Copula [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'is-pres-noun' },
  //a close
  { match: '#Determiner #Adverb? [close]', group: 0, tag: 'Adjective', reason: 'a-close' },
  // what the hell
  { match: '#Determiner [(shit|damn|hell)]', group: 0, tag: 'Noun', reason: 'swears-noun' },
  // the staff were
  { match: '(the|these) [#Singular] (were|are)', group: 0, tag: 'Plural', reason: 'singular-were' },
  // running for congress
  { match: '#Gerund #Adjective? for [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-for' },
  // running to work
  { match: '#Gerund #Adjective to [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-to' },
  // any questions for
  { match: '(many|any|some|several) [#PresentTense] for', group: 0, tag: 'Noun', reason: 'any-verbs-for' },
  // have fun
  { match: `(have|had) [#Adjective] #Preposition .`, group: 0, tag: 'Noun', reason: 'have-fun' },
  // co-founder
  { match: `co #Noun`, tag: 'Actor', reason: 'co-noun' },
  // to facilitate gas exchange with
  { match: `to #PresentTense #Noun [#PresentTense] #Preposition`, group: 0, tag: 'Noun', reason: 'gas-exchange' },
  // a comdominium, or simply condo
  { match: `a #Noun+ or #Adverb+? [#Verb]`, group: 0, tag: 'Noun', reason: 'noun-or-noun' },
  // operating system
  { match: `[#Gerund] system`, group: 0, tag: 'Noun', reason: 'operating-system' },
  // waited until release
  {
    match: `#PastTense (until|as|through|without) [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'waited-until-release',
  },
  // selling like hot cakes
  { match: `#Gerund like #Adjective? [#PresentTense]`, group: 0, tag: 'Plural', reason: 'like-hot-cakes' },
  // some valid reason
  { match: `some #Adjective [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-reason' },
  // for some reason
  { match: `for some [#PresentTense]`, group: 0, tag: 'Noun', reason: 'for-some-reason' },
  // same kind of shouts
  { match: `(same|some|the|that|a) kind of [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-kind-of' },
  // a type of shout
  { match: `(same|some|the|that|a) type of [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-type-of' },
  // doing better for fights
  { match: `#Gerund #Adjective #Preposition [#PresentTense]`, group: 0, tag: 'Noun', reason: 'doing-better-for-x' },
  // get better aim
  { match: `(get|got|have|had) #Comparative [#PresentTense]`, group: 0, tag: 'Noun', reason: 'got-better-aim' },
  // i think tipping sucks
  { match: `#Pronoun #Infinitive [#Gerund] #PresentTense`, group: 0, tag: 'Noun', reason: 'tipping-sucks' },
  //still good
  { match: '[still] #Adjective', group: 0, tag: 'Adverb', reason: 'still-advb' },
  //still make
  { match: '[still] #Verb', group: 0, tag: 'Adverb', reason: 'still-verb' },
  // so hot
  { match: '[so] #Adjective', group: 0, tag: 'Adverb', reason: 'so-adv' },
  // way hotter
  { match: '[way] #Comparative', group: 0, tag: 'Adverb', reason: 'way-adj' },
  // way too hot
  { match: '[way] #Adverb #Adjective', group: 0, tag: 'Adverb', reason: 'way-too-adj' },
  // all singing
  { match: '[all] #Verb', group: 0, tag: 'Adverb', reason: 'all-verb' },
  // sing like an angel
  { match: '(#Verb && !#Modal) [like]', group: 0, tag: 'Adverb', reason: 'verb-like' },
  //barely even walk
  { match: '(barely|hardly) even', tag: 'Adverb', reason: 'barely-even' },
  //even held
  { match: '[even] #Verb', group: 0, tag: 'Adverb', reason: 'even-walk' },
  // even left
  { match: 'even left', tag: '#Adverb #Verb', reason: 'even-left' },
  //cheering hard - dropped -ly's
  {
    match: '(#PresentTense && !#Copula) [(hard|quick|long|bright|slow|fast|backwards|forwards)]',
    group: 0,
    tag: 'Adverb',
    reason: 'lazy-ly',
  },
  // much appreciated
  { match: '[much] #Adjective', group: 0, tag: 'Adverb', reason: 'bit-1' },
  // is well
  { match: '#Copula [#Adverb]$', group: 0, tag: 'Adjective', reason: 'is-well' },
  // a bit cold
  { match: 'a [(little|bit|wee) bit?] #Adjective', group: 0, tag: 'Adverb', reason: 'a-bit-cold' },
  // dark green
  { match: `[${seq.personAdj}] #Adjective`, group: 0, tag: 'Adverb', reason: 'dark-green' },
  // kinda sparkly
  { match: `#Adverb [#Adverb]$`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly' },
  { match: `#Adverb [#Adverb] (and|or|then)`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly-and' },
  // super strong
  { match: `[super] #Adjective #Noun`, group: 0, tag: 'Adverb', reason: 'super-strong' },
  // ==== PhoneNumber ====
  //1 800 ...
  { match: '1 #Value #PhoneNumber', tag: 'PhoneNumber', reason: '1-800-Value' },
  //(454) 232-9873
  { match: '#NumericValue #PhoneNumber', tag: 'PhoneNumber', reason: '(800) PhoneNumber' },
  // ==== Currency ====
  // chinese yuan
  { match: '#Demonym #Currency', tag: 'Currency', reason: 'demonym-currency' },
  // ==== Ordinal ====
  { match: '[second] #Noun', group: 0, tag: 'Ordinal', reason: 'second-noun' },
  // ==== Unit ====
  //5 yan
  { match: '#Value+ [#Currency]', group: 0, tag: 'Unit', reason: '5-yan' },
  { match: '#Value [(foot|feet)]', group: 0, tag: 'Unit', reason: 'foot-unit' },
  //minus 7
  { match: '(minus|negative) #Value', tag: 'Value', reason: 'minus-value' },
  //5 kg.
  { match: '#Value [#Abbreviation]', group: 0, tag: 'Unit', reason: 'value-abbr' },
  { match: '#Value [k]', group: 0, tag: 'Unit', reason: 'value-k' },
  { match: '#Unit an hour', tag: 'Unit', reason: 'unit-an-hour' },
  //seven point five
  { match: '#Value (point|decimal) #Value', tag: 'Value', reason: 'value-point-value' },
  // ten bucks
  { match: '(#Value|a) [(buck|bucks|grand)]', group: 0, tag: 'Currency', reason: 'value-bucks' },
  //quarter million
  { match: '#Determiner [(half|quarter)] #Ordinal', group: 0, tag: 'Value', reason: 'half-ordinal' },
  { match: 'a #Value', tag: 'Value', reason: 'a-value' },
  // ==== Money ====
  { match: '[#Value+] #Currency', group: 0, tag: 'Money', reason: '15 usd' },
  // thousand and two
  {
    match: `(hundred|thousand|million|billion|trillion|quadrillion)+ and #Value`,
    tag: 'Value',
    reason: 'magnitude-and-value',
  },
  //'a/an' can mean 1 - "a hour"
  {
    match: '!once [(a|an)] (#Duration|hundred|thousand|million|billion|trillion)',
    group: 0,
    tag: 'Value',
    reason: 'a-is-one',
  },
  // adj -> gerund
  // amusing his aunt
  { match: '[#Adjective] #Possessive #Noun', group: 0, tag: 'Verb', reason: 'gerund-his-noun' },
  // loving you
  { match: '[#Adjective] (us|you)', group: 0, tag: 'Gerund', reason: 'loving-you' },
  // slowly stunning
  { match: '(slowly|quickly) [#Adjective]', group: 0, tag: 'Gerund', reason: 'slowly-adj' },
  // like
  { match: '(#Modal|i|they|we|do) not? [like]', group: 0, tag: 'PresentTense', reason: 'modal-like' },
  // do not simply like
  {
    match: 'do (simply|just|really|not)+ [(#Adjective|like)]',
    group: 0,
    tag: 'Verb',
    reason: 'do-simply-like',
  },
  // does mean
  { match: 'does (#Adverb|not)? [#Adjective]', group: 0, tag: 'PresentTense', reason: 'does-mean' },
  // i mean
  { match: 'i (#Adverb|do)? not? [mean]', group: 0, tag: 'PresentTense', reason: 'i-mean' },
  // { match: '!are (i|you|we) (#Adverb|do)? [#Adjective]', group: 0, tag: 'PresentTense', reason: 'i-mean' },
  // ==== Tense ====
  //he left
  { match: '#Noun #Adverb? [left]', group: 0, tag: 'PastTense', reason: 'left-verb' },
  //this rocks
  { match: '(this|that) [#Plural]', group: 0, tag: 'PresentTense', reason: 'this-verbs' },
  // ==== Auxiliary ====
  //was walking
  { match: `[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)`, group: 0, tag: 'Auxiliary', reason: 'copula-walking' },
  //support a splattering of auxillaries before a verb
  { match: `[(has|had) (#Adverb|not)+?] #PastTense`, group: 0, tag: 'Auxiliary', reason: 'had-walked' },
  //would walk
  { match: `#Adverb+? [(#Modal|did)+ (#Adverb|not)+?] #Verb`, group: 0, tag: 'Auxiliary', reason: 'modal-verb' },
  //would have had
  {
    match: `[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have',
  },
  //would be walking
  // { match: `#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'would-be' },
  //had been walking
  // {
  //   match: `(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`,
  //   group: 0,
  //   tag: 'Auxiliary',
  //   reason: 'had-been',
  // },
  //support a splattering of auxillaries before a verb
  { match: `[(has|had) (#Adverb|not)+?] #PastTense`, group: 0, tag: 'Auxiliary', reason: 'had-walked' },
  // will walk
  { match: '[(do|does|will|have|had)] (not|#Adverb)+? #Verb', group: 0, tag: 'Auxiliary', reason: 'have-had' },
  // about to go
  { match: '[about to] #Adverb? #Verb', group: 0, tag: ['Auxiliary', 'Verb'], reason: 'about-to' },
  //would be walking
  { match: `#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'would-be' },
  //were being run
  { match: `(were|was) being [#PresentTense]`, group: 0, tag: 'PastTense', reason: 'was-being' },
  //have run
  // { match: `have #PresentTense`, group: 0, tag: 'PastTense', reason: 'have-vb' },
  //would have had
  {
    match: `[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have',
  },
  //had been walking
  {
    match: `(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-been',
  },
  // was being driven
  { match: '[(be|being|been)] #Participle', group: 0, tag: 'Auxiliary', reason: 'being-foo' },
  // ==== Phrasal ====
  //'foo-up'
  { match: '(#Verb && @hasHyphen) up', tag: 'PhrasalVerb', reason: 'foo-up' },
  { match: '(#Verb && @hasHyphen) off', tag: 'PhrasalVerb', reason: 'foo-off' },
  { match: '(#Verb && @hasHyphen) over', tag: 'PhrasalVerb', reason: 'foo-over' },
  { match: '(#Verb && @hasHyphen) out', tag: 'PhrasalVerb', reason: 'foo-out' },
  //fall over
  { match: '#PhrasalVerb [#PhrasalVerb]', group: 0, tag: 'Particle', reason: 'phrasal-particle' },
  // went on for
  { match: '(lived|went|crept|go) [on] for', group: 0, tag: 'PhrasalVerb', reason: 'went-on' },
  //back it up
  {
    match: '#Verb (him|her|it|us|himself|herself|itself|everything|something) [(up|down)]',
    group: 0,
    tag: 'Adverb',
    reason: 'phrasal-pronoun-advb',
  },
  // ==== Copula ====
  //will be running (not copula)
  { match: '[will #Adverb? not? #Adverb? be] #Gerund', group: 0, tag: 'Copula', reason: 'will-be-copula' },
  //for more complex forms, just tag 'be'
  { match: 'will #Adverb? not? #Adverb? [be] #Adjective', group: 0, tag: 'Copula', reason: 'be-copula' },
  // ==== Infinitive ====
  //march to
  { match: '[march] (up|down|back|to|toward)', group: 0, tag: 'Infinitive', reason: 'march-to' },
  //must march
  { match: '#Modal [march]', group: 0, tag: 'Infinitive', reason: 'must-march' },
  //let him glue
  {
    match: '(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)',
    group: 0,
    tag: 'Infinitive',
    reason: 'let-him-glue',
  },
  //he quickly foo
  // { match: '#Noun #Adverb [#Noun]', group: 0, tag: 'Verb', reason: 'quickly-foo' },
  //will secure our
  { match: 'will [#Adjective]', group: 0, tag: 'Verb', reason: 'will-adj' },
  //he disguised the thing
  { match: '#Pronoun [#Adjective] #Determiner #Adjective? #Noun', group: 0, tag: 'Verb', reason: 'he-adj-the' },
  //is eager to go
  { match: '#Copula [#Adjective] to #Verb', group: 0, tag: 'Verb', reason: 'adj-to' },
  // open the door
  { match: '[open] #Determiner', group: 0, tag: 'Infinitive', reason: 'open-the' },
  // compromises are possible
  { match: '[#PresentTense] (are|were|was) #Adjective', group: 0, tag: 'Plural', reason: 'compromises-are-possible' },
  // would wade
  { match: `#Modal [${seq.personVerb}]`, group: 0, tag: 'Verb', reason: 'would-mark' },
  { match: `#Adverb [${seq.personVerb}]`, group: 0, tag: 'Verb', reason: 'really-mark' },
  //to mark
  { match: '(to|#Modal) [mark]', group: 0, tag: 'PresentTense', reason: 'to-mark' },
  // checkmate is
  { match: '^[#Infinitive] (is|was)', group: 0, tag: 'Noun', reason: 'checkmate-is' },
  // wade smith
  { match: `${seq.personVerb} #Person`, tag: 'Person', reason: 'rob-smith' },
  // wade m. Cooper
  { match: `${seq.personVerb} #Acronym #ProperNoun`, tag: 'Person', reason: 'rob-a-smith' },
  // damn them
  { match: '[shit] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear1-verb' },
  { match: '[damn] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear2-verb' },
  { match: '[fuck] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear3-verb' },
  // become overly weakened
  { match: '(become|fall|grow) #Adverb? [#PastTense]', group: 0, tag: 'Adjective', reason: 'overly-weakened' },
  // a completely beaten man
  { match: '(a|an) #Adverb [#Participle] #Noun', group: 0, tag: 'Adjective', reason: 'completely-beaten' },
  // whose name was
  { match: 'whose [#PresentTense] #Copula', group: 0, tag: 'Noun', reason: 'whos-name-was' },
  // give up on reason
  { match: `#PhrasalVerb #PhrasalVerb #Preposition [#PresentTense]`, group: 0, tag: 'Noun', reason: 'given-up-on-x' },
  // ==== Region ====
  //West Norforlk
  {
    match: '(west|north|south|east|western|northern|southern|eastern)+ #Place',
    tag: 'Region',
    reason: 'west-norfolk',
  },
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  {
    match: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]',
    group: 0,
    tag: 'Region',
    reason: 'us-state',
  },
  // portland oregon
  {
    match: 'portland [or]',
    group: 0,
    tag: 'Region',
    reason: 'portland-or',
  },
  //Foo District
  {
    match: '#ProperNoun+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)',
    tag: 'Region',
    reason: 'foo-district',
  },
  //District of Foo
  {
    match: '(district|region|province|municipality|territory|burough|state) of #ProperNoun',
    tag: 'Region',
    reason: 'district-of-Foo',
  },
  // in Foo California
  {
    match: 'in [#ProperNoun] #Place',
    group: 0,
    tag: 'Place',
    reason: 'propernoun-place',
  },
  // ==== Address ====
  {
    match: '#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)',
    tag: 'Address',
    reason: 'address-st',
  },
  //John & Joe's
  { match: '#Noun (&|n) #Noun', tag: 'Organization', reason: 'Noun-&-Noun' },
  // teachers union of Ontario
  { match: '#Organization of the? #ProperNoun', tag: 'Organization', reason: 'org-of-place', safe: true },
  //walmart USA
  { match: '#Organization #Country', tag: 'Organization', reason: 'org-country' },
  //organization
  { match: '#ProperNoun #Organization', tag: 'Organization', reason: 'titlecase-org' },
  //FitBit Inc
  { match: '#ProperNoun (ltd|co|inc|dept|assn|bros)', tag: 'Organization', reason: 'org-abbrv' },
  // the OCED
  { match: 'the [#Acronym]', group: 0, tag: 'Organization', reason: 'the-acronym', safe: true },
  // global trade union
  {
    match: '(world|global|international|national|#Demonym) #Organization',
    tag: 'Organization',
    reason: 'global-org',
  },
  // schools
  { match: '#Noun+ (public|private) school', tag: 'School', reason: 'noun-public-school' },
  // ==== Honorific ====
  { match: '[(1st|2nd|first|second)] #Honorific', group: 0, tag: 'Honorific', reason: 'ordinal-honorific' },
  {
    match: '[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person',
    group: 0,
    tag: 'Honorific',
    reason: 'ambg-honorifics',
  },
  // ==== FirstNames ====
  //is foo Smith
  { match: '#Copula [(#Noun|#PresentTense)] #LastName', group: 0, tag: 'FirstName', reason: 'copula-noun-lastname' },
  //pope francis
  { match: '(lady|queen|sister) #ProperNoun', tag: 'FemaleName', reason: 'lady-titlecase', safe: true },
  { match: '(king|pope|father) #ProperNoun', tag: 'MaleName', reason: 'pope-titlecase', safe: true },
  //ambiguous-but-common firstnames
  {
    match: '[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName',
    group: 0,
    tag: 'FirstName',
    reason: 'maybe-lastname',
  },
  // ==== Nickname ====
  // Dwayne 'the rock' Johnson
  { match: '#FirstName [#Determiner #Noun] #LastName', group: 0, tag: 'NickName', reason: 'first-noun-last' },
  {
    match: '#ProperNoun (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #ProperNoun',
    tag: 'Person',
    reason: 'titlecase-acronym-titlecase',
    safe: true,
  },
  { match: '#Acronym #LastName', tag: 'Person', reason: 'acronym-lastname', safe: true },
  { match: '#Person (jr|sr|md)', tag: 'Person', reason: 'person-honorific' },
  { match: '#Person #Person the? #RomanNumeral', tag: 'Person', reason: 'roman-numeral' },
  { match: '#FirstName [/^[^aiurck]$/]', group: 0, tag: ['Acronym', 'Person'], reason: 'john-e' },
  //general pearson
  { match: '#Honorific #Person', tag: 'Person', reason: 'honorific-person' },
  //remove single 'mr'
  { match: '#Honorific #Acronym', tag: 'Person', reason: 'Honorific-TitleCase' },
  //j.k Rowling
  { match: '#Noun van der? #Noun', tag: 'Person', reason: 'van der noun', safe: true },
  //king of spain
  { match: '(king|queen|prince|saint|lady) of #Noun', tag: 'Person', reason: 'king-of-noun', safe: true },
  //lady Florence
  { match: '(prince|lady) #Place', tag: 'Person', reason: 'lady-place' },
  //saint Foo
  { match: '(king|queen|prince|saint) #ProperNoun', tag: 'Person', reason: 'saint-foo' },
  //Foo U Ford
  { match: '[#ProperNoun] #Person', group: 0, tag: 'Person', reason: 'proper-person', safe: true },
  // al sharpton
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
  // faith smith
  { match: `${seq.personNoun} #Person`, tag: 'Person', reason: 'ray-smith', safe: true },
  // faith m. Smith
  { match: `${seq.personNoun} #Acronym? #ProperNoun`, tag: 'Person', reason: 'ray-a-smith', safe: true },
  //give to april
  {
    match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${seq.personMonth}]`,
    group: 0,
    tag: 'Person',
    reason: 'ambig-person',
  },
  // remind june
  { match: `#Infinitive [${seq.personMonth}]`, group: 0, tag: 'Person', reason: 'infinitive-person' },
  // may waits for
  // { match: `[${months}] #PresentTense for`, group: 0, tag: 'Person', reason: 'ambig-active-for' },
  // may waits to
  // { match: `[${months}] #PresentTense to`, group: 0, tag: 'Person', reason: 'ambig-active-to' },
  // april will
  { match: `[${seq.personMonth}] #Modal`, group: 0, tag: 'Person', reason: 'ambig-modal' },
  // may be
  { match: `[may] be`, group: 0, tag: 'Verb', reason: 'may-be' },
  // would april
  { match: `#Modal [${seq.personMonth}]`, group: 0, tag: 'Person', reason: 'modal-ambig' },
  // it is may
  { match: `#Copula [${seq.personMonth}]`, group: 0, tag: 'Person', reason: 'is-may' },
  // may is
  { match: `[${seq.personMonth}] #Copula`, group: 0, tag: 'Person', reason: 'may-is' },
  // with april
  { match: `(that|with|for) [${seq.personMonth}]`, group: 0, tag: 'Person', reason: 'that-month' },
  // may 5th
  { match: `[${seq.personMonth}] the? #Value`, group: 0, tag: 'Month', reason: 'may-5th' },
  // 5th of may
  { match: `#Value of [${seq.personMonth}]`, group: 0, tag: 'Month', reason: '5th-of-may' },
  // dick van dyke
  { match: '#ProperNoun (van|al|bin) #ProperNoun', tag: 'Person', reason: 'title-van-title', safe: true },
  //jose de Sucre
  { match: '#ProperNoun (de|du) la? #ProperNoun', tag: 'Person', reason: 'title-de-title', safe: true },
  //Jani K. Smith
  { match: '#Singular #Acronym #LastName', tag: 'Person', reason: 'title-acro-noun', safe: true },
  //John Foo
  { match: '#FirstName (#Noun && #ProperNoun) #ProperNoun?', tag: 'Person', reason: 'firstname-titlecase' },
  //Joe K. Sombrero
  { match: '#FirstName #Acronym #Noun', tag: 'Person', reason: 'n-acro-noun', safe: true },
  //Anthony de Marco
  { match: '#FirstName [(de|di|du|van|von) #Person]', group: 0, tag: 'LastName', reason: 'de-firstname' },
  // Paris Berelc
  { match: `[${seq.personPlace}] (#ProperNoun && !#Place)`, group: 0, tag: 'FirstName', reason: 'place-firstname' },
]
export default matches
