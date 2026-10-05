const adverbAdj = `(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)`
const noLy = '(hard|fast|late|early|high|right|deep|close|direct)'
const infNouns =
  '(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)'
const notIf = '(i|we|they)' //we do not go
const companySuffix = '(inc|ltd|llc|co|corp|corporation|company|limited)'
const noun = '(#Noun && !#Possessive && !@hasComma)'
const modifiers = '(#Determiner|#Possessive)? #Adverb+? #Adjective+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#Adverb+? not? (#Verb && !#Gerund && !#Particle)'
const seatedQuestion = '^(which|what) #Adjective+? #Noun (did|does|do|#Modal) #Pronoun [sit] [on]$'
// Retain the pass boundary without a fixed rule count.
let secondPassStart

/*
{ m: match
  g: group,
  t: tag,
  r: reason}
*/

// order matters top-matches can get overwritten
const rules = [
  // === verbs/passive.js ===

  // got walked
  { m: 'got (#PastTense|#Participle)', t: 'Passive', r: 'got-pass' },
  // Share the pattern while keeping cheap word-specific hooks.
  ...['were', 'was', 'is', 'are', 'am'].map(word => ({
    m: `${word} (#PastTense|#Participle)`,
    t: 'Passive',
    r: `${word}-pass`,
  })),
  // was being walked
  { m: '(was|were|is|are|am) being (#PastTense|#Participle)', t: 'Passive', r: 'being-pass' },
  // had been walked
  { m: '(had|have|has) been (#PastTense|#Participle)', t: 'Passive', r: 'been-pass' },
  // will be cleaned
  { m: 'will be being? (#PastTense|#Participle)', t: 'Passive', r: 'will-be-pass' },
  // dog was [walked] by the man
  {
    m: '#Noun (am|is|are|was|were) #Adverb? [(#PastTense|#Participle)] by (the|a) #Noun',
    g: 0,
    t: 'Passive',
    r: 'suffered-by',
  },

  // === adjective/adjective.js ===

  // off-white
  { m: '(off && #Hyphenated) white', t: 'Adjective', r: 'off-white' },
  // Restore the copula when the colour is written without a hyphen.
  // [is] off white
  {
    m: '[(is|are|am|was|were)] off white$',
    g: 0,
    u: 'PhrasalVerb',
    t: 'Copula',
    r: 'off-white-cop',
  },
  // is [off white]
  { m: '(is|are|am|was|were) [off white]$', g: 0, t: 'Adjective', r: 'off-white-pred' },
  // [all] the dogs
  { m: '[(all|both)] #Determiner #Noun', g: 0, t: 'Noun', r: 'all-noun' },
  // the door is [closed]
  { m: '#Singular is #Adverb? [%Adj|Past%]$', g: 0, t: 'Adjective', r: 'is-filled' },
  // [forgotten] art is rediscovered
  { m: '[#PastTense] #Singular is', g: 0, t: 'Adjective', r: 'smoked-poutine' },
  // [forgotten] stories are lost
  { m: '[#PastTense] #Plural are', g: 0, t: 'Adjective', r: 'baked-onions' },
  // is [fucked up]
  { m: '#Copula [fucked up?]', g: 0, t: 'Adjective', r: 'swears-adj' },
  // the door seems [opened]
  { m: '#Singular (seems|appears) #Adverb? [#PastTense$]', g: 0, t: 'Adjective', r: 'seems-filled' },
  // jury is out - preposition ➔ adjective
  // jury is [out]
  { m: '#Copula #Adjective? [(out|in|through)]$', g: 0, t: 'Adjective', r: 'still-out' },
  // [quiet] the room
  {
    m: '^[(#Adjective && !near && !inside && !outside && !opposite)] (the|your) #Noun',
    g: 0,
    n: '(all|even)',
    t: 'Infinitive',
    r: 'shut-the',
  },
  // blue-[tinted]
  {
    m: '(#Adjective && #Hyphenated) [(#Hyphenated && #PastTense)]$',
    g: 0,
    t: 'Adjective',
    r: 'red-shouldered',
  },
  // [blue-tinted] glasses
  {
    m: '[#Hyphenated (#Hyphenated && #PastTense)] (#Noun|#Conjunction)',
    g: 0,
    t: 'Adjective',
    n: '#Adverb',
    r: 'faith-based',
  },
  // [non-breaking] spaces
  {
    m: '[#Hyphenated (#Hyphenated && #Gerund)] (#Noun|#Conjunction)',
    g: 0,
    t: 'Adjective',
    n: '#Adverb',
    r: 'self-driving',
  },
  // [dammed-up] river
  {
    m: '[#PastTense (#Hyphenated && #PhrasalVerb)] (#Noun|#Conjunction)',
    g: 0,
    t: 'Adjective',
    r: 'dammed-up',
  },
  // two-fold
  { m: '(#Hyphenated && #Value) fold', t: 'Adjective', r: 'two-fold' },
  // must-win
  { m: 'must (#Hyphenated && #Infinitive)', t: 'Adjective', r: 'must-win' },
  // vacuum-sealed
  {
    m: `(#Hyphenated && #Infinitive) #Hyphenated`,
    t: 'Adjective',
    n: '#PhrasalVerb',
    r: 'vacuum-sealed',
  },
  // too much
  { m: 'too much', t: 'Adverb Adjective', r: 'too-much' },
  // a bit much
  { m: 'a bit much', t: 'Determiner Adverb Adjective', r: 'a-bit-much' },

  // === adjective/adj-adverb.js ===

  // [dark] green
  { m: `[${adverbAdj}] #Adjective`, g: 0, t: 'Adverb', r: 'dark-green' },
  // is [far too] cold
  { m: `#Copula [far too] #Adjective`, g: 0, t: 'Adverb', r: 'far-too' },
  // shops [direct]
  {
    m: `#Verb [${noLy}] !#Noun?`,
    g: 0,
    n: '(#Copula|be|been|being|get|got|getting|become|became|becoming|feel|feels|feeling|#Determiner|#Preposition)',
    t: 'Adverb',
    r: 'shops-direct',
  },
  // Bare 'be' may still be Infinitive rather than Copula in commands.
  // be [late]
  { m: '(be|been|being) (#Adverb|not)+? [late]', g: 0, t: 'Adjective', r: 'be-late' },
  // be [early]
  { m: '(be|been|being) (#Adverb|not)+? [early]', g: 0, t: 'Adjective', r: 'be-early' },
  // [moons] a lot
  { m: `[#Plural] a lot !like?`, g: 0, t: 'PresentTense', r: 'studies-a-lot' },

  // === adjective/adj-gerund.js ===
  // Gerund-Adjectives - 'amusing, annoying'

  // found it [interesting]
  { m: 'found it #Adverb? [%Adj|Gerund%]', g: 0, t: 'Adjective', r: 'found-it-ger' },
  // found it [isolating], but found it isolating cells
  { m: 'found it #Adverb? [isolating]$', g: 0, t: 'Adjective', r: 'it-isolating' },
  // a little [fuming]
  { m: 'a (little|bit|wee) bit? [#Gerund]', g: 0, t: 'Adjective', r: 'a-bit-ger' },
  // repairing [crumbling] roads
  {
    m: '#Gerund [#Gerund] #Noun',
    g: 0,
    t: 'Adjective',
    n: '(impersonating|practicing|considering|assuming|enjoying|avoiding|stopping|starting|finishing)',
    r: 'look-annoying',
  },
  // looked [amazing]
  {
    m: '(looked|look|looks) #Adverb? [%Adj|Gerund%]',
    g: 0,
    t: 'Adjective',
    n: '(impersonating|practicing|considering|assuming)',
    r: 'looked-amazing',
  },
  // [boring] the audience
  { m: '[%Adj|Gerund%] #Determiner', g: 0, t: 'Gerund', r: 'developing-a' },
  // meaning alluring
  { m: '%Noun|Gerund% %Adj|Gerund%', t: 'Gerund #Adjective', r: 'alluring' },

  // === adjective/adj-noun.js ===

  // his [fine]
  { m: '(his|its) [%Adj|Noun%] !#Noun?', g: 0, t: 'Noun', n: '#Hyphenated', r: 'his-fine' },
  // is [all]
  { m: '#Copula #Adverb? [all]', g: 0, t: 'Noun', r: 'is-all' },
  // have [fun] with it
  { m: `(have|had) [#Adjective] #Preposition .`, g: 0, t: 'Noun', r: 'have-fun' },
  // brewing giant
  { m: `#Gerund (giant|capital|center|zone|application)`, t: 'Noun', r: 'brewing-giant' },
  // in a [perfect]
  { m: `#Preposition (a|an) [#Adjective]$`, g: 0, t: 'Noun', r: 'an-instant' },
  // [brand] new
  { m: `[brand #Gerund?] new`, g: 0, t: 'Adverb', r: 'brand-new' },
  // some [kind] of teacher
  { m: `(#Determiner|#Comparative|new|different) [kind] of`, g: 0, t: 'Noun', r: 'some-kind' },
  // her [favourite] sport
  { m: `#Possessive [%Adj|Noun%] #Noun`, g: 0, t: 'Adjective', r: 'her-favourite' },
  // must-win
  { m: `(must && #Hyphenated) .`, t: 'Adjective', r: 'must-hyphen' },
  // the [present]
  {
    m: `#Determiner [#Adjective]$`,
    g: 0,
    t: 'Noun',
    n: '(this|that|#Comparative|#Superlative)',
    r: 'det-adj',
  }, //are that crazy.
  // company-wide
  {
    m: `(#Noun && #Hyphenated) (#Adjective && #Hyphenated)`,
    t: 'Adjective',
    n: '(this|that|#Comparative|#Superlative)',
    r: 'company-wide',
  },
  // the [poor] were
  {
    m: `#Determiner [#Adjective] (#Copula|#Determiner)`,
    n: '(#Comparative|#Superlative)',
    g: 0,
    t: 'Noun',
    r: 'poor',
  },
  // [professional] bodybuilder
  {
    m: `[%Adj|Noun%] #Noun`,
    n: '(#Pronoun|#ProperNoun)',
    g: 0,
    t: 'Adjective',
    r: 'stable',
  },

  // === adverb.js ===
  // const adverbAdj = '(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)'

  // [way] too hot
  { m: '[way] #Adverb #Adjective', g: 0, t: 'Adverb', r: 'way-too-adj' },
  // sing [like] an angel
  { m: '#Verb  [like]', g: 0, n: '(#Modal|#PhrasalVerb)', t: 'Adverb', r: 'verb-like' },
  // barely even walk
  { m: '(barely|hardly) even', t: 'Adverb', r: 'barely-even' },
  // even left
  { m: 'even left', t: '#Adverb #Verb', r: 'even-left' },
  // cheering [hard]
  {
    m: '#PresentTense [(hard|quick|bright|slow|fast|backwards|forwards)]',
    n: '(#Copula|feel|feels|look|looks|seem|seems|appear|appears|sound|sounds|smell|smells|taste|tastes|become|becomes|grow|grows|get|gets|stay|stays|remain|remains)',
    g: 0,
    t: 'Adverb',
    r: 'lazy-ly',
  },
  // is [well]
  { m: '#Copula [#Adverb]$', g: 0, t: 'Adjective', r: 'is-well' },
  // a [bit] cold
  { m: 'a [(little|bit|wee) bit?] #Adjective', g: 0, t: 'Adverb', r: 'a-bit-cold' },
  // become overly [weakened]
  { m: '(become|fall|grow) #Adverb? [#PastTense]', g: 0, t: 'Adjective', r: 'weakened' },
  // a completely [beaten] man
  { m: '(a|an) #Adverb [#Participle] #Noun', g: 0, t: 'Adjective', r: 'beaten' },
  // a [close] friend
  { m: '#Determiner #Adverb? [close] #Noun', g: 0, t: 'Adjective', r: 'a-close' },
  // does [better]
  { m: '(do|does|did) #Adverb? [(better|worse)]', g: 0, t: 'Adverb', r: 'do-better' },
  // walking [close]
  {
    m: '#Gerund #Adverb? [close]',
    g: 0,
    t: 'Adverb',
    n: '(getting|becoming|feeling)',
    r: 'being-close',
  },
  // charged [back]
  {
    m: '(#PresentTense|#PastTense) [back]',
    g: 0,
    t: 'Adverb',
    n: '(#PhrasalVerb|#Copula)',
    r: 'charge-back',
  },
  // the [well]
  { m: '#Determiner [well] !#PastTense?', g: 0, t: 'Noun', r: 'well' },
  // sees [well]
  { m: '(#PresentTense && !#Copula) [well]', g: 0, t: 'Adverb', r: 'sees-well' },

  // === dates/date.js ===

  // ==== WeekDay ====
  // [sun] the 5th
  { m: '[sun] the #Ordinal', g: 0, t: 'WeekDay', r: 'sun-the-5th' },
  // 1pm next [sun]
  { m: '#Date (on|this|next|last|during)? [sun]', g: 0, t: 'WeekDay', r: '1pm-sun' },
  // on [sat]
  { m: `(in|by|before|during|on|until|after|of|within|all) [sat]`, g: 0, t: 'WeekDay', r: 'sat' },

  // ==== Month ====
  // in [march]
  { m: `#Preposition [(march|may)]`, g: 0, t: 'Month', r: 'in-month' },
  // this march
  { m: '(this|next|last) march !#Infinitive?', t: '#Date #Month', r: 'this-march' },
  // this may
  { m: '(this|next|last) may !#Infinitive?', t: '#Date #Month', r: 'this-may' },
  // march 5th
  { m: `(march|may) the? #Value`, t: '#Month #Date #Date', r: 'march-5th' },
  // 5th of march
  { m: `#Value of? (march|may)`, t: '#Date #Date #Month', r: '5th-of-march' },
  // [march] and feb
  { m: `[(march|may)] .? #Date`, g: 0, t: 'Month', r: 'march-and-feb' },
  // feb to [march]
  { m: `#Date .? [(march|may)]`, g: 0, t: 'Month', r: 'feb-and-march' },
  // quickly [march]
  { m: `#Adverb [(march|may)]`, g: 0, t: 'Verb', n: '(early|late)', r: 'quickly-march' },
  // 12 am
  { m: `#Value (am|pm)`, t: 'Time', r: '2-am' },

  // === dates/date-phrase.js ===

  // 5th of June
  { m: '#Value of #Month', t: 'Date', r: 'value-of-month' },
  // 5 June
  { m: '#Cardinal #Month', t: 'Date', r: 'cardinal-month' },
  // June 5 to 7
  { m: '#Month #Value to #Value', t: 'Date', r: 'value-to-value' },
  // June the 12th
  { m: '#Month the #Value', t: 'Date', r: 'month-value' },
  // june 7
  { m: '(#WeekDay|#Month) #Value', t: 'Date', r: 'date-value' },
  // 7 june
  { m: '#Value (#WeekDay|#Month)', t: 'Date', r: 'value-date' },
  // aug 20-21
  { m: `#Month #NumberRange`, t: 'Date', r: 'aug-20-21' },
  // Wednesday June 5th
  { m: `#WeekDay #Month #Ordinal`, t: 'Date', r: 'weekday-date' },
  // aug 5th 2021
  { m: `#Month #Ordinal #Cardinal`, t: 'Date', r: 'month-day-year' },

  // === timezones ===
  // china standard time
  { m: `(#Place|#Demonym) (standard|daylight|central|mountain)? time`, t: 'Timezone', r: 'standard-time' },
  // eastern time
  {
    m: `(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time`,
    t: 'Timezone',
    r: 'eastern-time',
  },
  // central european time
  { m: `(central|western|eastern) european time`, t: 'Timezone', r: 'central-time' },

  // === nouns/nouns.js ===

  //'more' is not always an adverb
  // [rights] of man
  { m: '[(right|rights)] of .', g: 0, t: 'Noun', r: 'right-of' },
  // we [all]
  { m: '(we|us) [all]', g: 0, t: 'Noun', r: 'we-all' },
  // due to [weather]
  { m: 'due to [#Verb]', g: 0, t: 'Noun', r: 'due-to' },

  // my first [thought]
  { m: '#Possessive #Ordinal [#PastTense]', g: 0, t: 'Noun', r: 'first-thought' },
  // the nice [walk]
  {
    m: '(the|this|those|these) #Adjective [%Noun|Verb%]',
    g: 0,
    t: 'Noun',
    n: '#Copula',
    r: 'adj-verb',
  },
  // the truly nice [swim]
  { m: '(the|this|those|these) #Adverb #Adjective [#Verb]', g: 0, t: 'Noun', r: 'det-adv-verb' },
  // the [message] from Danny
  { m: 'the [#Verb] #Preposition .', g: 0, t: 'Noun', r: 'det-verb-prep' },
  // a type of [shout]
  { m: '#Determiner #Noun of [#Verb]', g: 0, t: 'Noun', n: '#Gerund', r: 'noun-of-noun' },
  // waited until [release]
  {
    m: '#PastTense #Preposition [#PresentTense]',
    g: 0,
    n: '#Gerund',
    t: 'Noun',
    r: 'ended-in-ruins',
  },
  // water-flows
  { m: '(#Singular && @hasHyphen) #PresentTense', t: 'Noun', r: 'hyphen-verb' },
  // is no [going] back
  { m: 'is no [#Verb]', g: 0, t: 'Noun', r: 'is-no-verb' },
  // what the [hell]
  { m: '#Determiner [(shit|damn|hell)]', g: 0, t: 'Noun', r: 'swears-noun' },
  // go to [shit]
  { m: 'to [(shit|hell)]', g: 0, t: 'Noun', r: 'to-swears' },
  // and check this out! a [walk-in] microwave.
  {
    m: '(the|those|these|a|an) #Adjective? [(#PresentTense && !#Gerund && !#Copula && !seem && !appear && !include) #Particle?]',
    g: 0,
    t: 'Noun',
    n: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)',
    r: 'det-inf',
  },

  // ==== Actor ====
  // Aircraft designer
  { m: '#Noun #Actor', t: 'Actor', n: '(#Person|#Pronoun)', r: 'thing-doer' },
  // lighting designer
  { m: '#Gerund #Actor', t: 'Actor', r: 'ger-doer' },
  // captain sanders
  // { match: '[#Actor+] #ProperNoun', group: 0, tag: 'Honorific', reason: 'sgt-kelly' },
  // co founder
  { m: `co #Singular`, t: 'Actor', r: 'co-noun' },
  // [aircraft] designer
  {
    m: `[#Noun+] #Actor`,
    g: 0,
    t: 'Actor',
    n: '(#Honorific|#Pronoun|#Possessive)',
    r: 'air-traffic',
  },
  // fine-artist
  {
    m: `(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #Noun? #Actor`,
    t: 'Actor',
    r: 'fine-artist',
  },
  // dance coach
  {
    m: `#Noun+ (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)`,
    t: 'Actor',
    r: 'dance-coach',
  },
  // chief design officer
  { m: `chief . officer`, t: 'Actor', r: 'chief-officer' },
  // chief of police
  { m: `chief of #Noun+`, t: 'Actor', r: 'chief-police' },
  // president of marketing
  { m: `senior? vice? president of #Noun+`, t: 'Actor', r: 'president-of' },

  // ==== Singular ====
  // did a [900], paid a [20]
  { m: '#Verb (a|an) [#Value]$', g: 0, t: 'Singular', r: 'did-a-value' },
  // the [can]
  { m: 'the [(can|will|may)]', g: 0, t: 'Singular', r: 'can' },

  // ==== Possessive ====
  // John Smith's
  { m: '#FirstName #Acronym? (#Possessive && #LastName)', t: 'Possessive', r: 'name-poss' },
  // Microsoft Research's office
  { m: '#Organization+ #Possessive', t: 'Possessive', r: 'org-poss' },
  // Los Angeles's fundraiser
  { m: '#Place+ #Possessive', t: 'Possessive', r: 'place-poss' },
  // my butt smells
  { m: '#Possessive #PresentTense #Particle?', n: '(#Gerund|her)', t: 'Noun', r: 'poss-verb' }, // anna's eating vs anna's eating lunch
  // my [teachers] dog
  { m: '(my|our|their|her|his|its) [(#Plural && #Actor)] #Noun', g: 0, t: 'Possessive', r: 'my-dads' },

  // 10th of a [second]
  { m: '#Value of a [second]', g: 0, u: 'Value', t: 'Singular', r: '10th-second' },
  // the euro [sense]
  {
    m: `#Determiner #Noun [${infNouns}] !(#Preposition|to|#Adverb)?`,
    g: 0,
    t: 'Noun',
    r: 'noun-sense',
  },
  // [thanks] for the gift are overdue
  { m: '[#PresentTense] (of|by|for) (a|an|the) #Noun #Copula', g: 0, t: 'Plural', r: 'photographs-of' },
  // You eat and [sleep]
  { m: '#Infinitive and [%Noun|Verb%]', g: 0, t: 'Infinitive', r: 'fight-and-win' },
  // dogs and [running] and cats
  { m: '#Noun and [#Verb] and #Noun', g: 0, t: 'Noun', r: 'and-flowers' },
  // the 1992 [classic]
  { m: 'the #Cardinal [%Adj|Noun%]', g: 0, t: 'Noun', r: '1992-classic' },
  // This is the [premier] university in Virginia
  { m: '#Copula the [%Adj|Noun%] #Noun', g: 0, t: 'Adjective', r: 'premier-uni' },

  // i ate [me] sandwich (scottish slang)
  { m: 'i #Verb [me] #Noun', g: 0, t: 'Possessive', r: 'scottish-me' },
  // He bowed his [head] in prayer
  { m: '#PastTense #Possessive [#Verb]', g: 0, t: 'Noun', n: '(saw|made)', r: 'left-her-boots' },
  // 35 [signs]
  { m: '#Value [%Plural|Verb%]', g: 0, t: 'Plural', n: '(one|1|a|an)', r: '35-signs' },
  // had [time]
  { m: 'had [%Noun|Verb%]', g: 0, t: 'Noun', n: '(#Gerund|come|become)', r: 'had-time' },
  // instant access
  { m: '%Adj|Noun% %Noun|Verb%', t: '#Adjective #Noun', n: '#ProperNoun #Noun', r: 'instant-access' },
  // near death experiences, ambitious sales [targets]
  {
    m: '#Adjective #Noun [%Plural|Verb%]$',
    g: 0,
    t: 'Plural',
    n: '#Pronoun',
    r: 'near-death',
  },
  // your guild [colors]
  { m: '#Possessive #Noun [(colors|colours)]$', g: 0, t: 'Plural', r: 'guild-colors' },

  // === verbs/noun-gerund.js ===

  // the [upcoming thank]-you
  { m: '(this|that|the|a|an) [#Gerund #Infinitive]', g: 0, t: 'Singular', r: 'planning' },
  // the [upcoming thank]-you
  { m: '(that|the) [#Gerund #PresentTense]', g: 0, ifNo: '#Copula', t: 'Plural', r: 'paving-stones' },
  // i think [tipping] sucks
  { m: `#Pronoun #Infinitive [#Gerund] #PresentTense`, g: 0, t: 'Noun', r: 'tipping-sucks' },
  // lexical [tagging]
  { m: '#Adjective [#Gerund]', g: 0, t: 'Noun', n: '(still|even|just)', r: 'early-warning' },
  // [walking] is cool
  { m: '[#Gerund] #Adverb? not? #Copula', g: 0, t: 'Activity', r: 'ger-cop' },
  // are [doing] is
  { m: '#Copula [(#Gerund|#Activity)] #Copula', g: 0, t: 'Gerund', r: 'are-doing-is' },
  // responsibility for [setting]
  { m: '#Singular for [%Noun|Gerund%]', g: 0, t: 'Gerund', r: 'noun-for-ger' },
  // better for [training]
  { m: '#Comparative (for|at) [%Noun|Gerund%]', g: 0, t: 'Gerund', r: 'better-for-ger' },
  // apologized for [shouting]
  {
    m: '(#PastTense|#PresentTense) for [%Noun|Gerund%]',
    g: 0,
    t: 'Gerund',
    r: 'for-shouting',
  },
  // he reads the [upcoming]
  { m: '#PresentTense the [#Gerund]', g: 0, t: 'Noun', r: 'touching' },

  // === verbs/verb-noun.js ===

  // A final button label is an object, not a second verb.
  ...['click', 'clicks', 'selects', 'pick', 'picks'].map(word => ({
    m: `(#Pronoun|#Singular|#Plural) [${word} (submit|save|cancel)]$`,
    g: 0,
    t: 'PresentTense Noun',
    r: 'click-button',
  })),
  // Common intransitive predicates after a singular subject. Keep arbitrary
  // plural/verb switches conservative: 'the dog treats' is a noun phrase.
  // the dog [runs]
  ...['runs', 'walks', 'barks', 'swims', 'sleeps'].map(word => ({
    m: `^(#Determiner|#Possessive) #Adjective+? #Singular #Adverb+? [${word}] #Adverb+?$`,
    g: 0,
    t: 'PresentTense',
    r: 'sing-subj-verb',
  })),
  // with heads and [arms] rolling around
  { m: '#Preposition #Plural and [%Plural|Verb%] #Gerund', g: 0, t: 'Plural', r: 'coord-pl' },
  // he can solve the [puzzle]
  { m: '#Infinitive (this|that|the) [#Infinitive]', g: 0, t: 'Noun', r: 'do-this-dance' },
  // keeping the [matter] a secret
  { m: '#Gerund #Determiner [#Infinitive]', g: 0, t: 'Noun', r: 'running-a-show' },
  // the-only-[reason]
  {
    m: '#Determiner (only|further|just|more|backward) [#Infinitive]',
    g: 0,
    t: 'Noun',
    r: 'only-reason',
  },
  // the [slide] makes noise
  { m: '(the|this|a|an) [#Infinitive] #Adverb? #Verb', g: 0, t: 'Noun', r: 'det-verb-subj' },
  // Use a pointed [stick] (a pencil) or a similar tool
  {
    m: '#Determiner #Adjective #Adjective? [#Infinitive]',
    g: 0,
    t: 'Noun',
    n: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)',
    r: 'a-nice-inf',
  },
  // the American [thank]-you letter
  { m: '#Determiner #Demonym [#PresentTense]', g: 0, t: 'Noun', r: 'mexican-train' },
  // the next career [read] is brief
  { m: '#Adjective #Noun+ [#Infinitive] #Copula', g: 0, t: 'Noun', r: 'career-move' },
  // at some [thank]-you party
  { m: 'at some [#Infinitive]', g: 0, t: 'Noun', r: 'at-some-inf' },
  // goes [to sleep]
  { m: '(go|goes|went) [to (sleep|work)]', g: 0, t: 'Preposition Noun', r: 'goes-to-verb' },
  // a dog [retrieve] in the field
  ...['a', 'an'].map(word => ({
    m: `${word} #Adjective? #Noun [#Infinitive] (#Preposition|#Noun)`,
    g: 0,
    n: 'from',
    t: 'Noun',
    r: 'a-noun-inf',
  })),
  // a software [reinstall]
  { m: '(a|an) #Noun [#Infinitive]$', g: 0, t: 'Noun', r: 'noun-inf-end' },
  // working for [thank]-you letters
  { m: '#Gerund #Adjective? for [#Infinitive]', g: 0, t: 'Noun', r: 'running-for' },
  // artists on [thank]-you cards
  { m: '#Plural on [#Infinitive]', g: 0, t: 'Noun', r: 'on-stage' },
  // number of [thank]-yous
  { m: 'number of [#PresentTense]', g: 0, t: 'Noun', r: 'number-of-x' },
  // make [sense]
  {
    m: '(try|use|attempt|build|make) [%Noun|Verb% #Particle?]',
    n: '(#Copula|#Noun|sure|fun|up)',
    g: 0,
    t: 'Noun',
    r: 'do-verb',
  }, //make sure of
  // [append] is cloned
  { m: '^[#Infinitive] (is|was)', g: 0, t: 'Noun', r: 'checkmate-is' },
  // get much [thank]-you mail
  { m: '#Infinitive much [#Infinitive]', g: 0, t: 'Noun', r: 'get-much' },
  // [cause] i gotta
  { m: '[cause] #Pronoun #Verb', g: 0, t: 'Conjunction', r: 'cause-cuz' },
  // the US [air] force
  {
    m: 'the #Singular [#Infinitive] (#Noun && !#Possessive)',
    g: 0,
    t: 'Noun',
    n: '#Pronoun',
    r: 'cardio-dance',
  },
  // this [rocks]
  { m: 'this [#Plural]', g: 0, t: 'PresentTense', n: '(#Preposition|#Date)', r: 'this-verbs' },
  // the thing [that runs]
  {
    m: '#Noun [that %Plural|Verb%]',
    g: 0,
    t: 'Conjunction PresentTense',
    n: '(#Preposition|#Pronoun|way)',
    r: 'that-rocks',
  },
  // that [leads] to
  { m: 'that [#Plural] to', g: 0, t: 'PresentTense', n: '#Preposition', r: 'that-leads-to' },
  // let him [father] a child
  ...['let', 'make', 'made'].map(word => ({
    m: `${word} (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)`,
    g: 0,
    t: 'Infinitive',
    r: 'let-him-glue',
  })),
  // assign all [tasks]
  {
    m: '#Verb (all|every|each|most|some|no) [#PresentTense]',
    n: '#Modal',
    g: 0,
    t: 'Noun',
    r: 'quant-verb-noun',
  }, // PresentTense/Noun ambiguities
  // big dreams, critical thinking
  // found all [upcoming] words
  {
    m: '(had|have|#PastTense) #Adjective [#PresentTense]',
    g: 0,
    t: 'Noun',
    n: 'better',
    r: 'adj-verb-noun',
  },
  // one big [thank]-you
  { m: '#Value #Adjective [#PresentTense]', g: 0, t: 'Noun', n: '#Copula', r: 'one-big-reason' },
  // found all [upcoming] words
  {
    m: '#PastTense #Adjective+ [#PresentTense]',
    g: 0,
    t: 'Noun',
    n: '(#Copula|better)',
    r: 'wide-support',
  },
  // many [thanks]
  { m: '(many|few|several|couple) [#PresentTense]', g: 0, t: 'Noun', n: '#Copula', r: 'many-poses' },
  // a very big [dream]
  {
    m: '#Determiner #Adverb #Adjective [%Noun|Verb%]',
    g: 0,
    t: 'Noun',
    n: '#Copula',
    r: 'very-big-dream',
  },
  // from start to [finish]
  { m: 'from #Noun to [%Noun|Verb%]', g: 0, t: 'Noun', r: 'start-finish' },
  // for comparison or [contrast]
  {
    m: '(for|with|of) #Noun (and|or|not) [%Noun|Verb%]',
    g: 0,
    t: 'Noun',
    n: '#Pronoun',
    r: 'food-and-gas',
  },
  // cute little [thank]-you bags
  { m: '#Adjective #Adjective [#PresentTense]', g: 0, t: 'Noun', n: '#Copula', r: 'little-store' },
  // writing bigger [thank]-you notes
  {
    m: '#Gerund #Adverb? #Comparative [#PresentTense]',
    g: 0,
    t: 'Noun',
    n: '#Copula',
    r: 'higher-costs',
  },
  // to write people [thanks] for helping
  { m: `to #PresentTense #Noun [#PresentTense] #Preposition`, g: 0, t: 'Noun', r: 'gas-exchange' },
  // waited until [release]
  {
    m: `#PastTense (until|as|through|without) [(#PresentTense && !#Gerund && !#Copula)]`,
    g: 0,
    t: 'Noun',
    r: 'until-release',
  },
  // selling like hot [thank]-you cards
  { m: `#Gerund like #Adjective? [#PresentTense]`, g: 0, t: 'Plural', r: 'like-hot-cakes' },
  // some nice [thank]-you notes
  { m: `some #Adjective [#PresentTense]`, g: 0, t: 'Noun', r: 'some-reason' },
  // for some [thank]-you letters
  { m: `for some [#PresentTense]`, g: 0, t: 'Noun', r: 'for-some' },
  // same kind of [shouts]
  { m: `(same|some|the|that|a) kind of [#PresentTense]`, g: 0, t: 'Noun', r: 'some-kind-of' },
  // a type of [shout]
  { m: `(same|some|the|that|a) type of [#PresentTense]`, g: 0, t: 'Noun', r: 'some-type-of' },
  // looking good in [thank]-you photos
  { m: `#Gerund #Adjective #Preposition [#PresentTense]`, g: 0, t: 'Noun', r: 'better-for' },
  // get better [thank]-you notes
  { m: `(get|got|have) #Comparative [#PresentTense]`, g: 0, t: 'Noun', r: 'got-better-aim' },
  // give up on [thank]-you letters
  { m: `#PhrasalVerb #Particle #Preposition [#PresentTense]`, g: 0, t: 'Noun', r: 'given-up-on-x' },
  // there are [thank]-you notes
  { m: 'there (are|were) #Adjective? [#PresentTense]', g: 0, t: 'Plural', r: 'there-are' },
  // a thousand [thanks] of gratitude
  {
    m: '#Value [#PresentTense] of',
    g: 0,
    n: '(one|1|#Copula|#Infinitive)',
    t: 'Plural',
    r: '2-trains',
  },
  // [thanks] are appreciated
  { m: '[#PresentTense] (are|were) #Adjective', g: 0, t: 'Plural', r: 'compromises' },
  // [hope] i helped
  { m: '^[(hope|guess|thought|think)] #Pronoun #Verb', g: 0, t: 'Infinitive', r: 'suppose-i' },
  // its proper [functioning]
  { m: '#Possessive #Adjective [#Verb]', g: 0, t: 'Noun', n: '#Copula', r: 'full-support' },
  // [tastes] good
  { m: '[(tastes|smells)] #Adverb? #Adjective', g: 0, t: 'PresentTense', r: 'tastes-good' },
  // Being introduces a predicate rather than a direct object.
  // she is writing [thank]-you letters
  {
    m: '#Copula (#Gerund && !being) [(#PresentTense && !#Gerund)] !by?',
    g: 0,
    t: 'Noun',
    n: 'going',
    r: 'ignoring',
  },
  // the [shed]
  { m: '#Determiner #Adjective? [(shed|thought|rose|bid|saw|spelt)]', g: 0, t: 'Noun', r: 'noun-past' },
  // how to [watch]
  { m: 'how to [%Noun|Verb%]', g: 0, t: 'Infinitive', r: 'how-to-noun' },
  // ready to [stream]
  {
    m: '(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]',
    g: 0,
    t: 'Infinitive',
    r: 'ready-to-noun',
  },
  // bring [to market]
  {
    m: '(bring|went|go|drive|run|bike) [to (market|work|court|school|bed|church|prison)]',
    g: 0,
    t: 'Preposition Noun',
    r: 'bring-to-noun',
  },
  // can i [sleep], would you [look]
  { m: '#Modal #Noun [%Noun|Verb%]', g: 0, t: 'Infinitive', r: 'would-you-look' },
  // is just [spam]
  { m: '#Copula just [#Infinitive]', g: 0, t: 'Noun', r: 'is-just-spam' },
  // request copies
  { m: '^%Noun|Verb% %Plural|Verb%', t: 'Imperative #Plural', r: 'req-copies' },
  // homemade pickles and [drinks]
  { m: '#Adjective #Plural and [%Plural|Verb%]', g: 0, t: '#Plural', r: 'and-drinks' },
  // the 1968 [stand]-off
  { m: '#Determiner #Year [#Verb]', g: 0, t: 'Noun', r: '1968-film' },
  // the [break up]
  { m: '#Determiner [#PhrasalVerb #Particle]', g: 0, t: 'Noun', r: 'break-up' },
  // the [individual] goals
  {
    m: '#Determiner [%Adj|Noun%] #Noun',
    g: 0,
    t: 'Adjective',
    n: '(#Pronoun|#Possessive|#ProperNoun)',
    r: 'individual',
  },
  // [work] or prepare
  { m: '^[%Noun|Verb%] or #Infinitive', g: 0, t: 'Infinitive', r: 'work-or' },
  // to give [thanks]
  {
    m: 'to #Infinitive [#PresentTense]',
    g: 0,
    t: 'Noun',
    n: '(#Gerund|#Copula|help)',
    r: 'to-give-thanks',
  },
  // [Google] me
  { m: '[(#Noun && !#Pronoun)] me', g: 0, t: 'Verb', r: 'kills-me' },
  // removes wrinkles
  { m: '%Plural|Verb% %Plural|Verb%', t: '#PresentTense #Plural', r: 'removes' },
  // i [Google] the answer
  { m: 'i [#Noun] the #Noun', g: 0, t: 'Infinitive', r: 'i-water' },
  // did the engine [stop]
  {
    m: '(did|does|will) the #Noun [%Noun|Verb%]',
    g: 0,
    t: 'Infinitive',
    r: 'q-noun-verb',
  },
  // 40 gallons of [water]
  {
    m: '#Value #Noun of [%Noun|Verb%]',
    g: 0,
    t: 'Noun',
    r: 'qty-of-noun',
  },
  // When the rain [stops], we will leave. Whenever the bell [rings], the dog barks.
  // when the dog [looks]
  ...['stops', 'looks', 'rings'].map(word => ({
    m: `(when|whenever|before|after|until|since|as|while|than) (#Determiner|#Possessive) #Adjective+? #Noun [(%Plural|Verb% && ${word})]$`,
    g: 0,
    t: 'PresentTense',
    r: `${word}-clause-verb`,
  })),
  // The sun [rose]. The river [rose] quickly.
  {
    m: '(sun|moon|river|water|tide|temperature|prices|he|she|we|they|i) [rose] #Adverb+?$',
    g: 0,
    t: 'PastTense',
    r: 'sun-rose',
  },
  // The cat [woke]. Before the dog and the cat [woke], she left.
  { m: '(#Noun && !#Possessive) [woke] #Adverb+?$', g: 0, t: 'PastTense', r: 'cat-woke' },

  // === numbers/money.js ===

  // $5 and $6
  { m: '#Money and #Money #Currency?', t: 'Money', r: 'money-and' },
  // 6 dollars [and] 5 cents
  { m: '#Value #Currency [and] #Value (cents|ore|centavos|sens)', g: 0, t: 'Money', r: 'and-5-cents' },
  // 5 rand
  { m: '#Value (mark|rand|won|rub|ore)', t: '#Money #Currency', r: '4-mark' },
  // a pound
  { m: 'a pound', t: '#Money #Unit', r: 'a-pound' },
  // 3 pounds
  { m: '#Value (pound|pounds)', t: '#Money #Unit', r: '4-pounds' },

  // === numbers/fractions.js ===

  // [half] a penny
  { m: '[half] of? (a|an)', g: 0, t: 'Fraction', r: 'half-a' },
  // [quarter] of a dollar
  { m: '[quarter] of? (a|an)', g: 0, t: 'Fraction', r: 'quarter-a' },
  // two and a half
  { m: '#Cardinal and a half', t: 'Fraction', r: 'and-a-half' },
  // two-halves
  { m: '#Value (halves|halfs|quarters)', t: 'Fraction', r: 'two-halves' },

  // [seven] fifths
  { m: '[#Cardinal+] (#Fraction && /s$/)', g: 0, t: 'Fraction', r: 'seven-fifths' },
  // [one third] of it
  { m: '[#Cardinal+ #Ordinal] of .', g: 0, t: 'Fraction', r: 'ord-of' },
  // [100th] of it
  { m: '[(#NumericValue && #Ordinal)] of .', g: 0, t: 'Fraction', r: 'num-ord-of' },
  // [a twenty fifth] of it
  { m: '[(a|one) #Cardinal?+ #Ordinal] of', g: 0, t: 'Fraction', r: 'a-ord' },

  // a sixteenth, one twenty fifth (without a following noun)
  {
    m: '[(a|one) #Cardinal+? (#Ordinal && !first && !second)]$',
    g: 0,
    t: 'Fraction',
    r: 'solo-fraction',
  },

  // 3 out of 5
  { m: '#Cardinal+ out? of every? #Cardinal', t: 'Fraction', r: 'out-of' },

  // === numbers/numbers.js ===

  // ==== Ambiguous numbers ====
  // with [a] hundred jobs
  {
    m: '!once? [(a|an)] hundred',
    g: 0,
    t: 'Value',
    r: 'a-hundred',
  },
  // with [a] thousand jobs
  {
    m: '!once? [(a|an)] thousand',
    g: 0,
    t: 'Value',
    r: 'a-thousand',
  },
  // with [a] million jobs
  {
    m: '!once? [(a|an)] million',
    g: 0,
    t: 'Value',
    r: 'a-million',
  },
  // with [a] billion jobs
  {
    m: '!once? [(a|an)] billion',
    g: 0,
    t: 'Value',
    r: 'a-billion',
  },
  // with [a] trillion jobs
  {
    m: '!once? [(a|an)] trillion',
    g: 0,
    t: 'Value',
    r: 'a-trillion',
  },
  // ==== PhoneNumber ====
  // 1 800 555-1234
  { m: '(1|+1) #Value #PhoneNumber', t: 'PhoneNumber', r: 'country-code' },
  // (454) 232-9873
  { m: '#NumericValue #PhoneNumber', t: 'PhoneNumber', r: 'area-code' },

  // ==== Currency ====
  // chinese yuan
  { m: '#Demonym #Currency', t: 'Currency', r: 'demonym-curr' },
  // ==== Money ====
  // [5] dollars
  { m: '[#Value+] #Currency', g: 0, t: 'Money', r: 'value-curr' },

  // ==== Ordinal ====

  // ==== Units ====
  // 5 [dollars]
  { m: '#Value+ [#Currency]', g: 0, t: 'Unit', r: 'curr-unit' },
  // 5 [feet]
  { m: '#Value [(foot|feet)]', g: 0, t: 'Unit', r: 'foot-unit' },
  // kilometers an hour
  { m: '#Unit an hour', t: 'Unit', r: 'unit-an-hour' },

  // ==== Magnitudes ====
  // minus 7
  { m: '(minus|negative) #Value', t: 'Value', r: 'minus-value' },
  // seven point five
  { m: '#Value (point|decimal) #Value', t: 'Value', r: 'decimal-point' },
  // thousand and two
  { m: `#Multiple+ and #Value`, t: 'Value', r: 'mag-and-value' },
  // 5 miles [per hour]
  { m: '#Value #Unit [(per|an) (hr|hour|sec|second|min|minute)]', g: 0, t: 'Unit', r: 'unit-per-dur' },
  // twelve percent
  { m: '#Cardinal percent', t: '#Percent #Unit', r: 'value-percent' },

  // === person/person-phrase.js ===

  // ==== FirstNames ====
  // is [foo] Smith
  {
    m: '#Copula [(#Noun|#PresentTense)] #LastName',
    g: 0,
    t: 'FirstName',
    n: '#Gerund',
    r: 'cop-noun-last',
  },
  // pope francis
  {
    m: '(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #ProperNoun',
    t: 'Person',
    r: 'lady-title',
    safe: true,
  },

  // ==== Nickname ====
  // Dwayne '[the rock]' Johnson
  { m: '#FirstName [#Determiner #Noun] #LastName', g: 0, t: 'Person', r: 'first-noun-last' },
  // John b Smith
  {
    m: '#ProperNoun (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #ProperNoun',
    t: 'Person',
    r: 'name-init-name',
    safe: true,
  },
  // J. Smith
  { m: '#Acronym #LastName', t: 'Person', r: 'acro-last', safe: true },
  // John jr
  { m: '#Person (jr|sr|md)', t: 'Person', r: 'person-hon' },
  // Dr. J.
  { m: '#Honorific #Acronym', t: 'Person', r: 'hon-init' },
  // John Smith III
  { m: '#Person #Person the? #RomanNumeral', t: 'Person', r: 'roman-numeral' },
  // John [b]
  { m: '#FirstName [/^[bdefghjlmnopqstvwxyz]$/]', g: 0, t: ['Acronym', 'Person'], r: 'john-e' },
  // Ludwig van Beethoven
  { m: '#Noun van der? #Noun', t: 'Person', r: 'van-der-noun', safe: true },
  // king of spain
  { m: '(king|queen|prince|saint|lady) of #Noun', t: 'Person', r: 'king-of-noun', safe: true },
  // prince Paris
  { m: '(prince|lady) #Place', t: 'Person', r: 'lady-place' },
  // saint Foo
  { m: '(king|queen|prince|saint) #ProperNoun', t: 'Person', n: '#Place', r: 'saint-foo' },

  // al Smith
  { m: 'al (#Person|#ProperNoun)', t: 'Person', r: 'al-borlen', safe: true },
  // ferdinand de almar
  { m: '#FirstName de #Noun', t: 'Person', r: 'bill-de-noun' },
  // Osama bin Laden
  { m: '#FirstName (bin|al) #Noun', t: 'Person', r: 'bill-al-noun' },
  // John L. Foo
  { m: '#FirstName #Acronym #ProperNoun', t: 'Person', r: 'bill-acro-title' },
  // Andrew Lloyd Webber
  { m: '#FirstName #FirstName #ProperNoun', t: 'Person', r: 'bill-first-title' },
  // Mr Foo
  { m: '#Honorific #FirstName? #ProperNoun', t: 'Person', r: 'dr-john-title' },
  // peter the great
  { m: '#FirstName the #Adjective', t: 'Person', r: 'name-the-great' },

  // John van Smith
  { m: '#ProperNoun (van|al|bin) #ProperNoun', t: 'Person', r: 'title-van-title', safe: true },
  // jose de Sucre
  { m: '#ProperNoun (de|du) la? #ProperNoun', t: 'Person', n: '#Place', r: 'title-de-title' },
  // Jani K. Smith
  { m: '#Singular #Acronym #LastName', t: '#FirstName #Person .', r: 'title-acro-noun', safe: true },
  // [Toronto] John
  { m: '[#ProperNoun] #Person', g: 0, t: 'Person', r: 'proper-person', safe: true },
  // john [keith jones]
  {
    m: '#Person [#ProperNoun #ProperNoun]',
    g: 0,
    t: 'Person',
    n: '#Possessive',
    r: 'three-names',
    safe: true,
  },
  // John [Foo]
  {
    m: '#FirstName #Acronym? [#ProperNoun]',
    g: 0,
    t: 'LastName',
    n: '#Possessive',
    r: 'first-title',
  },
  // Joe K. Sombrero
  { m: '#FirstName #Acronym #Noun', t: 'Person', r: 'n-acro-noun', safe: true },
  // Anthony [de] Marco
  { m: '#FirstName [(de|di|du|van|von)] #Person', g: 0, t: 'LastName', r: 'de-first' },

  // baker jenna smith
  // { match: '[#Actor+] #Person', group: 0, tag: 'Person', reason: 'baker-sam' },
  // [sergeant] major Harold
  {
    m: '[(lieutenant|corporal|sergeant|captain|qeen|king|admiral|major|colonel|marshal|president|queen|king)+] #ProperNoun',
    g: 0,
    t: 'Honorific',
    r: 'sergeant-john',
  },
  // ==== Honorics ====
  // [general] John
  {
    m: '[(private|general|major|rear|prime|field|count)] #Honorific? #Person',
    g: 0,
    t: ['Honorific', 'Person'],
    r: 'ambg-hon',
  },
  // [Miss] John
  { m: '[(miss && @isTitleCase)] #Person', g: 0, t: ['Honorific', 'Person'], r: 'miss-hon' },
  // dr john [foobar]
  {
    m: '#Honorific #FirstName [#Singular]',
    g: 0,
    t: 'LastName',
    n: '#Possessive',
    r: 'dr-john-foo',
    safe: true,
  },
  // [his excellency] John
  {
    m: '[(his|her) (majesty|honour|worship|excellency|honorable)] #Person',
    g: 0,
    t: 'Honorific',
    r: 'his-excellency',
  },
  // Dr teacher
  { m: '#Honorific #Actor', t: 'Honorific', r: 'lt-colonel' },
  // [first lady] michelle obama
  { m: '[first lady] #Person', g: 0, t: 'Honorific', r: 'first-lady' },
  // first lady, second admiral
  { m: '(first|second|third|1st|2nd|3rd) lieutenant', t: 'Honorific', r: 'ord-lt' },
  // Louis IV
  { m: '#Person #RomanNumeral', t: 'Person', r: 'louis-iv' },

  // === person/ambig-name.js ===
  // const personAdj = '(misty|rusty|dusty|rich|randy|sandy|young|earnest|frank|brown)'

  // ebenezer scrooge
  {
    m: '#FirstName #Noun$',
    t: '. #LastName',
    n: '(#Possessive|#Organization|#Place|#Pronoun|@hasTitleCase)',
    r: 'first-noun',
  },

  // June Smith
  { m: '%Person|Date% #Acronym? #ProperNoun', t: 'Person', r: 'jan-thierson' },
  // ===person-noun===
  // Cliff Clavin
  { m: '%Person|Noun% #Acronym? #ProperNoun', t: 'Person', r: 'switch-person', safe: true },
  // Rose Microsoft
  { m: '%Person|Noun% #Organization', t: 'Organization', r: 'olive-garden' },
  // ===person-verb===
  // Ollie Faroo
  { m: '(%Person|Verb% && #Person) #Acronym? #ProperNoun', t: 'Person', r: 'verb-proper', ifNo: '#Actor' },

  // ===person-verb===
  // really [wade]
  { m: `#Adverb [(%Person|Verb% && !@isTitleCase)]`, g: 0, t: 'Verb', r: 'really-mark' },
  // [drew] closer
  { m: `[%Person|Verb%] (#Adverb|#Comparative)`, g: 0, t: 'Verb', r: 'drew-closer' },
  // wade smith
  { m: `(%Person|Verb% && #Person) #Person`, t: 'Person', r: 'rob-smith' },
  // Wade G. Slapgoop
  { m: `%Person|Verb% #Acronym #ProperNoun`, t: 'Person', r: 'rob-a-smith' },
  // Will Smith
  { m: '(will && @isTitleCase) #ProperNoun', t: 'Person', r: 'will-name' },
  // jack [layton] won
  {
    m: '(#FirstName && !#Possessive) [#Singular] #Verb',
    g: 0,
    safe: true,
    t: 'LastName',
    r: 'jack-layton',
  },
  // [captain] John walks
  { m: '^[#Singular] #Person #Verb', g: 0, safe: true, t: 'Person', r: 'sherwood' },

  // === verbs/verbs.js ===

  // is [pretty] good
  {
    m: '#Copula [(pretty|dead|full|well|sure)] #Adjective',
    g: 0,
    t: 'Adverb',
    r: 'sometimes-adv',
  },
  // i [better] go
  { m: '(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense', g: 0, t: 'Modal', r: 'i-better' },
  // adj -> gerund
  // i [like]
  { m: '(#Modal|i|they|we|do) not? [like]', g: 0, t: 'PresentTense', r: 'modal-like' },
  // ==== Tense ====
  // he [left]
  { m: '(#Noun && !#Possessive) #Adverb? [left]', g: 0, t: 'PastTense', r: 'left-verb' },
  // she [bit] her tongue
  { m: '#Noun #Adverb? [(bit && #Infinitive)]', g: 0, t: 'PastTense', r: 'bit-past' },
  // will [be] running
  { m: 'will #Adverb? not? #Adverb? [be] #Gerund', g: 0, t: 'Copula', r: 'will-be-cop' },
  // will [be] nice
  { m: 'will #Adverb? not? #Adverb? [be] #Adjective', g: 0, t: 'Copula', r: 'be-cop' },
  // [march] up
  { m: '[march] (up|down|back|toward)', n: '#Date', g: 0, t: 'Infinitive', r: 'march-to' },
  // birds [home] to their nest
  { m: '(#Pronoun|#Plural|#Modal) #Adverb+? [home] to', g: 0, t: 'Infinitive', r: 'birds-home-to' },
  // is [home] to birds
  { m: '(#Copula|be|been|being) #Adverb+? [home] to', g: 0, t: 'Noun', r: 'is-home-to' },
  // is [subject] to change
  {
    m: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? [subject] to',
    g: 0,
    t: 'Adjective',
    r: 'is-subj-to',
  },
  // is subject [to]
  {
    m: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? subject [to]',
    g: 0,
    u: 'Conjunction',
    t: 'Preposition',
    r: 'pred-to',
  },
  // is subject to [change]
  {
    m: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? subject to [%Noun|Verb%]',
    g: 0,
    t: 'Noun',
    r: 'pred-to-noun',
  },

  // is home [to] dogs
  {
    m: '(#Copula|be|been|being) #Adverb+? home [to] #Adjective+? #Noun',
    g: 0,
    u: 'Conjunction',
    t: 'Preposition',
    r: 'home-to-noun',
  },

  // === misc==
  // were being [run]
  { m: `(were|was) being [#PresentTense]`, g: 0, t: 'PastTense', r: 'was-being' },
  // had [been broken]
  {
    m: `(had|has|have) [been (#PastTense && /en$/)]`,
    g: 0,
    t: 'Auxiliary Participle',
    r: 'been-broken',
  },
  // had [been smoked]
  { m: `(had|has|have) [been (#PastTense && /ed$/)]`, g: 0, t: 'Auxiliary PastTense', r: 'been-smoked' },
  // had [been] eaten
  { m: `(had|has) #Adverb? [been] #Adverb? #PastTense`, g: 0, t: 'Auxiliary', r: 'had-been-adj' },
  // had to [Google] the answer
  ...['had', 'has'].map(word => ({
    m: `${word} to [#Noun] (#Determiner|#Possessive)`,
    g: 0,
    t: 'Infinitive',
    r: 'had-to-noun',
  })),
  // does that [work]
  {
    m: `(do|does|did|#Modal) (this|that|these|those) [work]`,
    g: 0,
    t: 'Infinitive',
    r: 'does-that-work',
  },
  // have read
  { m: `(has|have|had) read`, t: 'Auxiliary Participle', r: 'read-read' },
  // were [under paid]
  ...['under', 'over'].map(word => ({
    m: `(is|was|were) [${word} #PastTense]`,
    g: 0,
    t: 'Adverb Adjective',
    r: 'under-cooked',
  })),

  // [shit] them
  { m: '[shit] (#Determiner|#Possessive|them)', g: 0, t: 'Verb', r: 'shit-verb' },
  // [damn] them
  { m: '[damn] (#Determiner|#Possessive|them)', g: 0, t: 'Verb', r: 'damn-verb' },
  // [fuck] them
  { m: '[fuck] (#Determiner|#Possessive|them)', g: 0, t: 'Verb', r: 'fuck-verb' },

  // jobs that fit
  { m: '#Plural that %Noun|Verb%', t: '. #Preposition #Infinitive', r: 'jobs-that-work' },
  // [works] for me
  { m: '[works] for me', g: 0, t: 'PresentTense', r: 'works-for-me' },
  // as we [please]
  { m: 'as #Pronoun [please]', g: 0, t: 'Infinitive', r: 'as-we-please' },
  // verb-prefixes - '[co] write'
  // [co] write
  {
    m: '[(co|mis|de|inter|intra|pre|re|un|counter)] #Verb',
    g: 0,
    t: ['Verb', 'Prefix'],
    n: '(#Copula|#PhrasalVerb)',
    r: 'co-write',
  },
  // [out] run
  { m: '[(out|under|over)] #Infinitive', g: 0, t: ['Verb', 'Prefix'], r: 'dir-verb-pre' },
  // dressed and [left]
  { m: '#PastTense and [%Adj|Past%]', g: 0, t: 'PastTense', r: 'past-and-ambig' },
  // [melted] and fallen
  { m: '[(%Adj|Past% && !#Adjective)] and #PastTense', g: 0, t: 'PastTense', r: 'ambig-and-past' },
  // is he [stoked]
  { m: '#Copula #Pronoun [%Adj|Past%]', g: 0, t: 'Adjective', r: 'is-he-stoked' },
  // to [dream] of
  { m: 'to [%Noun|Verb%] #Preposition', g: 0, t: 'Infinitive', r: 'to-dream-of' },

  // === adjective/adj-verb.js ===

  // Resume fragments: developed [scalable React] architecture.
  {
    m: '^[developed] (#Adjective|#ProperNoun)+? (backend|frontend|software|architecture|applications|apps|systems)',
    g: 0,
    t: 'PastTense',
    n: '(#PresentTense|#Copula|#Modal)',
    r: 'developed',
  },
  // does [mean]
  { m: 'does (#Adverb|not)? [%Adj|Present%]', g: 0, t: 'Infinitive', r: 'does-mean' },
  // [okay] by me
  { m: '[(fine|okay|cool|ok)] by me', g: 0, t: 'Adjective', r: 'okay-by-me' },
  // i [mean]
  { m: 'i (#Adverb|do)? not? [mean]', g: 0, t: 'PresentTense', r: 'i-mean' },
  // the ship will near the coast
  { m: 'will #Adjective', t: 'Auxiliary Infinitive', r: 'will-adj' },
  // I [frequent] this restaurant
  { m: '#Pronoun [#Adjective] #Determiner #Adjective? #Noun', g: 0, t: 'Verb', r: 'he-adj-the' },
  // rude and [insulting]
  {
    m: '#Adjective and [(%Adj|Gerund% && #Gerund)] !#Preposition?',
    g: 0,
    t: 'Adjective',
    r: 'rude-and-x',
  },
  // was under [paid]
  { m: '#Copula #Adverb? (over|under) [#PastTense]', g: 0, t: 'Adjective', r: 'over-cooked' },
  // got [tired] of
  { m: 'got #Adverb? [%Adj|Past%] of', g: 0, t: 'Adjective', r: 'got-tired-of' },
  // felt [cheated]
  {
    m: '(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#Adverb|#Adjective)? [#PastTense]',
    g: 0,
    t: 'Adjective',
    r: 'felt-loved',
  },
  // felt [cheated]
  { m: '(seem|feel|seemed|felt) [#PastTense #Particle?]', g: 0, t: 'Adjective', r: 'seem-confused' },
  // a bit [confused]
  { m: 'a (bit|little|tad) [#PastTense #Particle?]', g: 0, t: 'Adjective', r: 'a-bit-confused' },
  // do not be [embarrassed]
  { m: 'not be [%Adj|Past% #Particle?]', g: 0, t: 'Adjective', r: 'not-be-adj' },
  // is just [tired]
  { m: '#Copula just [%Adj|Past% #Particle?]', g: 0, t: 'Adjective', r: 'is-just-right' },
  // [failed] and oppressive
  { m: '[%Adj|Past%] and #Adjective', g: 0, t: 'Adjective', r: 'failed-and' },
  // the fear or [heightened] emotion
  {
    m: '(#Determiner|#Preposition) #Adjective? #Noun or [#PastTense] #Noun',
    g: 0,
    t: 'Adjective',
    n: '(#Copula|#Pronoun)',
    r: 'or-heightened',
  },
  // tired and overworked describes a state after a copula
  {
    m: '#Copula #Adverb? #Adjective and [(overworked|overwhelmed|overpaid|underpaid|overqualified|underqualified|understaffed)]$',
    g: 0,
    t: 'Adjective',
    r: 'coord-state',
  },
  // their [declared] intentions
  { m: '#Possessive [#PastTense] #Noun', g: 0, n: '#Copula', t: 'Adjective', r: 'declared' },
  // is he [cool]
  { m: '#Copula #Pronoun [%Adj|Present%]', g: 0, t: 'Adjective', r: 'is-he-cool' },
  // is [crowded] with
  {
    m: '#Copula [%Adj|Past%] with',
    g: 0,
    t: 'Adjective',
    n: '(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)',
    r: 'crowded-with',
  },
  // is [empty]
  { m: '#Copula #Adverb? [%Adj|Present%]$', g: 0, t: 'Adjective', r: 'cop-adj' },
  // she is being [cool]
  { m: 'being #Adverb? [%Adj|Present%]', g: 0, t: 'Adjective', r: 'being-adj' },
  // does the store [open]
  {
    m: '(does|will) #Determiner #Noun [%Adj|Present%]$',
    g: 0,
    t: 'Infinitive',
    r: 'q-adj-verb',
  },

  // === verbs/auxiliary.js ===
  // these are some of our heaviest-used matches

  // ought not [to] walk
  {
    m: 'ought (#Adverb|not)+? [to] (#Adverb|not)+? #Verb',
    g: 0,
    t: 'Auxiliary',
    r: 'ought-to',
  },
  // ought to [be] walking
  {
    m: 'ought (#Adverb|not)+? to (#Adverb|not)+? [be] (#Adverb|not)+? #Verb',
    g: 0,
    t: 'Auxiliary',
    r: 'ought-to-be',
  },
  // will [have] walked
  { m: `will (#Adverb|not)+? [have] (#Adverb|not)+? #Verb`, g: 0, t: 'Auxiliary', r: 'will-have-vb' },
  // [was] walking
  { m: `[#Copula] (#Adverb|not)+? (#Gerund|#PastTense)`, g: 0, t: 'Auxiliary', r: 'cop-walking' },
  // [would] walk
  { m: `[(#Modal|did)+] (#Adverb|not)+? #Verb`, g: 0, t: 'Auxiliary', r: 'modal-verb' },
  // would [have] [had] to go
  {
    m: `#Modal (#Adverb|not)+? [have] (#Adverb|not)+? [had] (#Adverb|not)+? #Verb`,
    g: 0,
    t: 'Auxiliary',
    r: 'would-have',
  },
  // [has] walked
  { m: `[(has|had)] (#Adverb|not)+? #PastTense`, g: 0, t: 'Auxiliary', r: 'had-walked' },
  // [will] walk
  {
    m: '[(do|does|did|will|have|had|has|got)] (not|#Adverb)+? #Verb',
    g: 0,
    t: 'Auxiliary',
    r: 'have-had',
  },
  // [about to] go
  { m: '[about to] #Adverb? #Verb', g: 0, t: ['Auxiliary', 'Verb'], r: 'about-to' },
  // would [be] walking
  { m: `#Modal (#Adverb|not)+? [be] (#Adverb|not)+? #Verb`, g: 0, t: 'Auxiliary', r: 'would-be' },
  // was [being] driven
  { m: '[(be|being|been)] #Participle', g: 0, t: 'Auxiliary', r: 'being-driven' },
  // [may] want
  { m: '[may] #Adverb? #Infinitive', g: 0, t: 'Auxiliary', r: 'may-want' },
  // was [being] walked
  {
    m: '#Copula (#Adverb|not)+? [(be|being|been)] #Adverb+? #PastTense',
    g: 0,
    t: 'Auxiliary',
    r: 'being-walked',
  },
  // [been] walking
  { m: '[(be|been)] (#Adverb|not)+? #Gerund', g: 0, t: 'Auxiliary', r: 'been-walking' },
  // [used to] walk
  { m: '[used to] #PresentTense', g: 0, t: 'Auxiliary', r: 'used-to-walk' },
  // was [going to] walk
  {
    m: '#Copula (#Adverb|not)+? [going to] #Adverb+? #PresentTense',
    g: 0,
    t: 'Auxiliary',
    r: 'going-to-walk',
  },
  // going to [be] watched
  {
    m: 'going to (#Adverb|not)+? [be] (#Adverb|not)+? #PastTense',
    g: 0,
    t: 'Auxiliary',
    r: 'to-be-watched',
  },
  // there is [no] x
  { m: '(is|was) #Adverb? [no]', g: 0, t: 'Negative', r: 'is-no' },
  // [been] told
  {
    m: '[(been|had|became|came)] #PastTense',
    g: 0,
    n: '#PhrasalVerb',
    t: 'Auxiliary',
    r: 'been-told',
  },
  // [being] born
  { m: '[(being|having|getting)] #Verb', g: 0, t: 'Auxiliary', r: 'being-born' },
  // [better] go
  { m: '[better] #PresentTense', g: 0, t: 'Modal', n: '(#Copula|#Gerund)', r: 'better-go' },
  // even better
  { m: 'even better', t: 'Adverb #Comparative', r: 'even-better' },

  // === verbs/phrasal.js ===

  // walk-up
  { m: '(#Verb && @hasHyphen) up', t: 'PhrasalVerb', r: 'foo-up' },
  // walk-off
  { m: '(#Verb && @hasHyphen) off', t: 'PhrasalVerb', r: 'foo-off' },
  // walk-over
  { m: '(#Verb && @hasHyphen) over', t: 'PhrasalVerb', r: 'foo-over' },
  // walk-out
  { m: '(#Verb && @hasHyphen) out', t: 'PhrasalVerb', r: 'foo-out' },
  // [walk in] on
  {
    m: '[#Verb (in|out|up|down|off|back)] (on|in)',
    g: 0,
    n: '#Copula',
    t: 'PhrasalVerb Particle',
    r: 'walk-in-on',
  },
  // went [on] for
  { m: '(lived|went|crept|go) [on] for', g: 0, t: 'PhrasalVerb', r: 'went-on' },
  // the curtains come down
  { m: '#Verb (up|down|in|on|for)$', t: 'PhrasalVerb #Particle', n: '#PhrasalVerb', r: 'come-down' },
  // work in the office
  {
    m: '#PhrasalVerb (in && #Particle) #Determiner',
    t: '#Verb #Preposition #Determiner',
    u: 'PhrasalVerb',
    r: 'work-in-the',
  },
  // back it [up]
  ...['up', 'down'].map(word => ({
    m: `#Verb (him|her|it|us|himself|herself|itself|everything|something) [${word}]`,
    g: 0,
    t: 'Adverb',
    r: 'phr-pron-adv',
  })),
  // runs [around] the lake
  {
    m: '#PhrasalVerb [around] the #Noun',
    g: 0,
    t: 'Preposition', //(breaks the phrasal)
    r: 'around-noun',
  },

  // === verbs/imperative.js ===
  // this is really hard to do
  //we do not go

  // do not [go]
  { m: '^do not? [#Infinitive #Particle?]', n: notIf, g: 0, t: 'Imperative', r: 'do-eat' },
  // please [go]
  { m: '^please do? not? [#Infinitive #Particle?]', g: 0, t: 'Imperative', r: 'please-go' },
  // just [go]
  { m: '^just do? not? [#Infinitive #Particle?]', g: 0, t: 'Imperative', r: 'just-go' },
  // [go] quickly.
  {
    m: '^[#Infinitive] (#Adjective|#Adverb|hard|high|fast|slow)$',
    g: 0,
    t: 'Imperative',
    n: '(so|such|rather|enough)',
    r: 'go-quickly',
  },
  // [turn] down the noise
  { m: '^[#Infinitive] (up|down|over) #Determiner', g: 0, t: 'Imperative', r: 'turn-down' },
  // [eat] my shorts
  {
    m: '^[#Infinitive] (your|my|the|a|an|any|each|every|some|more|with|on)',
    g: 0,
    n: 'like',
    t: 'Imperative',
    r: 'eat-my-shorts',
  },
  // [tell] him the story
  { m: '^[#Infinitive] (him|her|it|us|me|there)', g: 0, t: 'Imperative', r: 'tell-him' },
  // [avoid] loud noises
  { m: '^[#Infinitive] #Adjective #Noun$', g: 0, t: 'Imperative', r: 'loud-noises' },
  // [come] and have a drink
  { m: '^[#Infinitive] (#Adjective|#Adverb)? and #Infinitive', g: 0, t: 'Imperative', r: 'and-reserve' },
  // [go]
  { m: '^[go] please?$', g: 0, t: 'Imperative', r: 'go-imp' },
  // [stop]
  { m: '^[stop] please?$', g: 0, t: 'Imperative', r: 'stop-imp' },
  // [wait]
  { m: '^[wait] please?$', g: 0, t: 'Imperative', r: 'wait-imp' },
  // [hurry]
  { m: '^[hurry] please?$', g: 0, t: 'Imperative', r: 'hurry-imp' },
  // let's [leave]
  { m: '^let (us|me) [#Infinitive]', g: 0, t: 'Imperative', r: 'lets-leave' },
  // [shut] the door
  {
    m: '^[(shut|close|open|start|stop|end|keep)] #Determiner #Noun',
    g: 0,
    t: 'Imperative',
    r: 'shut-the-door',
  },
  // [turn off] the light
  { m: '^[#PhrasalVerb #Particle] #Determiner #Noun', g: 0, t: 'Imperative', r: 'turn-off' },
  // [go] to toronto
  { m: '^[go] to .', g: 0, t: 'Imperative', r: 'go-to-toronto' },
  // A modal question alone may ask about ability or knowledge. Require an
  // explicit request marker before treating it as an imperative.
  // can you please [walk]
  {
    m: '^(can|could|will|would) you (#Adverb|not)+? please (#Adverb|not)+? [#Infinitive]',
    g: 0,
    t: 'Imperative',
    r: 'would-please',
  },
  // please can you [walk]
  {
    m: '^please (can|could|will|would) you (#Adverb|not)+? [#Infinitive]',
    g: 0,
    t: 'Imperative',
    r: 'please-you',
  },
  // can you [walk] please
  {
    m: '^(can|could|will|would) you (#Adverb|not)+? [#Infinitive] .+? please$',
    g: 0,
    t: 'Imperative',
    r: 'please-end',
  },
  // come have a drink
  { m: '^come #Infinitive', t: 'Imperative', n: 'on', r: 'come-have' },
  // come and have a drink
  { m: '^come and #Infinitive', t: 'Imperative . Imperative', r: 'come-and-have' },
  // [keep] it silent
  { m: '^[keep] it #Adjective', g: 0, t: 'Imperative', r: 'keep-it-cool' },
  // [allow] yourself
  {
    m: '^(and|but)? (then|please)? [#Infinitive] (yourself|yourselves)',
    g: 0,
    t: 'Imperative',
    r: 'allow-yourself',
  },
  // [look] what happened
  { m: '^[#Infinitive] what .', g: 0, t: 'Imperative', r: 'look-what' },
  // [go] to it
  { m: '^[#Infinitive] (to|for|into|toward|here|there)', g: 0, t: 'Imperative', r: 'go-to' },
  // [come] and have a drink
  { m: '^[#Infinitive] (and|or) #Infinitive', g: 0, t: 'Imperative', r: 'inf-and-inf' },
  // [maintain] eye contact
  { m: '^[#Infinitive] #Adjective? #Singular #Singular', g: 0, t: 'Imperative', r: 'eye-contact' },
  // don't forget to [clean]
  { m: '^do not (forget|omit|neglect) to [#Infinitive]', g: 0, t: 'Imperative', r: 'do-not-forget' },
  // [add] 2 eggs
  { m: '^[#Infinitive] #Value #Noun', g: 0, t: 'Imperative', r: 'add-2-eggs' },

  // === verbs/adj-gerund.js ===

  // The station was [closing]. The shop is [closing] soon.
  { m: '#Copula #Adverb+? [closing] (#Adverb|soon)+?$', g: 0, t: 'Gerund', r: 'closing' },
  // that were [growing]
  { m: '(that|which) were [%Adj|Gerund%]', g: 0, t: 'Gerund', r: 'were-growing' },

  // === _misc.js ===
  // order matters

  // u r cool
  { m: 'u r', t: '#Pronoun #Copula', r: 'u-r' },
  // the captain [who]
  { m: '#Noun [(who|whom)]', g: 0, t: 'Determiner', r: 'captain-who' },
  // who is [that]?
  {
    m: '^#QuestionWord #Adverb+? #Copula #Adverb+? [(this|that|these|those)] #Adverb+?$',
    g: 0,
    t: 'Pronoun',
    r: 'who-is-that',
  },
  // I like [this]
  {
    m: '#Verb [(this|that|these|those)] #Adverb+? (yesterday|today|tonight|tomorrow)?$',
    g: 0,
    t: 'Pronoun',
    r: 'dem-obj',
  },
  // some sort of
  { m: 'some sort of', t: 'Determiner Noun Preposition', r: 'some-sort-of' },
  // of some sort
  { m: 'of some sort', t: 'Preposition Determiner Noun', r: 'of-some-sort' },
  // [some] eat apples
  { m: '^[some] #Infinitive #Noun', g: 0, t: 'Pronoun', r: 'some-subj' },
  // put it [there]
  {
    m: '(put|puts|putting|place|placed|leave|left) #Pronoun [there]',
    g: 0,
    t: 'Adverb',
    r: 'loc-there',
  },
  // [such] skill
  { m: '[such] (a|an|is)? #Noun', g: 0, t: 'Determiner', r: 'such-skill' },
  // are [ya]
  { m: '(are|#Modal|see|do|for) [ya]', g: 0, t: 'Pronoun', r: 'are-ya' },
  // [long live] the king
  { m: '[long live] .', g: 0, t: '#Adverb #Infinitive', r: 'long-live' },
  // [there] she is
  { m: '[there] (#Adverb|#Pronoun)? #Copula', g: 0, t: 'There', r: 'there-is' },
  // is [there] food
  { m: '#Copula [there] .', g: 0, t: 'There', r: 'is-there' },
  // should [there]
  { m: '#Modal #Adverb? [there]', g: 0, t: 'There', r: 'should-there' },
  // [do] you
  { m: '^[do] (you|we|they)', g: 0, t: 'QuestionWord', r: 'do-you' },
  // [does] he
  { m: '^[does] (he|she|it|#ProperNoun)', g: 0, t: 'QuestionWord', r: 'does-he' },
  // the person [who] runs
  { m: '#Determiner #Noun+ [who] #Verb', g: 0, t: 'Preposition', r: 'x-who' },
  // the person [which] eats
  { m: '#Determiner #Noun+ [which] #Verb', g: 0, t: 'Preposition', r: 'x-which' },
  // guess who
  { m: 'guess who', t: '#Infinitive #QuestionWord', r: 'guess-who' },
  // [fucking] ridiculous
  { m: '[fucking] !#Verb', g: 0, t: '#Gerund', r: 'f-as-ger' },

  // === nouns/organizations.js ===
  // import orgWords from './_orgWords.js'
  // let orgMap = `(${orgWords.join('|')})`

  /*
const multi = [
  'building society',
  'central bank',
  'department store',
  'institute of technology',
  'liberation army',
  'people party',
  'social club',
  'state police',
  'state university',
]
*/

  // university of Toronto
  { m: 'university of #Place', t: 'Organization', r: 'uni-place' },
  // Name pairs can be business names without a known organization suffix.
  { m: '#ProperNoun & #ProperNoun', t: 'ProperNoun', r: 'name-and-name' },
  // John & Mary Ltd
  { m: `#Person & #Person ${companySuffix}`, t: 'Organization', r: 'person-and' },
  // Smith & Rogers
  { m: '#LastName & #LastName', t: 'Organization', r: 'last-and-last' },
  // Microsoft of Canada
  { m: '#Organization of the? #ProperNoun', t: 'Organization', r: 'org-of-place', safe: true },
  // walmart USA
  { m: '#Organization #Country', t: 'Organization', r: 'org-country' },
  // Toronto Microsoft
  { m: '#ProperNoun #Organization', t: 'Organization', n: '#FirstName', r: 'title-org' },
  // FitBit Inc
  { m: '#ProperNoun (ltd|co|inc|dept|assn|bros)', t: 'Organization', r: 'org-abbrv' },
  // the [XYZ corporation]
  { m: `the [#Acronym ${companySuffix}]`, g: 0, t: 'Organization', r: 'acro', safe: true },
  // [government of india]
  { m: '[government of the? #Place+]', g: 0, t: 'Organization', r: 'gov-of-x' },
  // school board
  { m: '(health|school|commerce) board', t: 'Organization', r: 'school-board' },
  // special committee
  {
    m: '(nominating|special|conference|executive|steering|central|congressional) committee',
    t: 'Organization',
    r: 'special',
  },
  // global Microsoft
  {
    m: '(world|global|international|national|#Demonym) #Organization',
    t: 'Organization',
    r: 'global-org',
  },
  // Toronto public school
  { m: '#Noun+ (public|private) school', t: 'School', r: 'public-school' },
  // Toronto Yankees
  { m: '#Place+ #SportsTeam', t: 'SportsTeam', r: 'place-team' },
  // 'manchester united'
  {
    m: '(dc|atlanta|minnesota|manchester|newcastle|sheffield) united',
    t: 'SportsTeam',
    r: 'united-team',
  },
  // 'toronto fc'
  { m: '#Place+ fc', t: 'SportsTeam', r: 'fc-team' },

  // the new orleans basketball team
  {
    m: '#Place+ #Noun{0,2} (club|society|group|team|committee|commission|association|guild|crew)',
    t: 'Organization',
    r: 'place-society',
  },

  // === nouns/places.js ===

  // ==== Region ====
  // west Toronto
  { m: '(west|north|south|east|western|northern|southern|eastern)+ #Place', t: 'Region', r: 'west-norfolk' },
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  // Toronto [ca]
  {
    m: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]',
    g: 0,
    t: 'Region',
    r: 'us-state',
  },
  // Portland [OR]
  { m: 'portland [(or && @isUpperCase)]', g: 0, t: 'Region', r: 'portland-or' },
  // with [turkey]
  { m: 'with [(turkey && !@isTitleCase)]', g: 0, u: 'Place', t: 'Uncountable', r: 'with-turkey' },
  // Toronto point
  {
    m: '#ProperNoun+ (cliff|place|range|pit|place|point|room|grounds|ruins)',
    t: 'Place',
    r: 'foo-point',
  },
  // 123 main street
  {
    m: '#Value #Noun+ (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave|lane|boulevard|blvd|drive|dr|parkway|way)',
    t: 'Address',
    r: 'address-st',
  },
  // port dover
  { m: '(port|mount|mt) #ProperNoun', t: 'Place', r: 'port-name' },

  // === conjunctions.js ===

  // [how] he is driving
  ...['who', 'what', 'where', 'why', 'how', 'when'].map(word => ({
    m: `[${word}] #Noun #Copula #Adverb? (#Verb|#Adjective)`,
    g: 0,
    t: 'Conjunction',
    r: 'how-he-is-x',
  })),
  // is [when] he
  { m: '#Copula [(who|what|where|why|how|when)] #Noun', g: 0, t: 'Conjunction', r: 'when-he' },
  // things [that] seem cool
  { m: '#Noun [that] #Verb #Adjective', g: 0, t: 'Conjunction', r: 'that-seem' },
  // he was [that] wide
  { m: '#Noun #Copula not? [that] #Adjective', g: 0, t: 'Adverb', r: 'that-adj' },
  // [to] the store - a determiner/possessive/pronoun opens a noun-phrase, so this 'to' is never an infinitive-marker
  // [to] the store
  {
    m: '[to] (#Determiner|#Possessive|#Pronoun|#Email|#Url)',
    g: 0,
    u: 'Conjunction',
    t: 'Preposition',
    r: 'to-the-store',
  },
  // [to] lunch
  { m: '[to] (#Noun && !#Verb)', g: 0, u: 'Conjunction', t: 'Preposition', r: 'to-noun' },
  // well [above] the clouds, directly [under] the bridge
  ...['above', 'below', 'under', 'over'].flatMap(prep =>
    ['well', 'just', 'right', 'directly'].map(word => ({
      m: `${word} [${prep}] (#Determiner|#Possessive|#Pronoun|#ProperNoun)`,
      g: 0,
      t: 'Preposition',
      r: `well-${prep}`,
    }))
  ),
  // I heard rumors [that] drivers save gas
  { m: '#Verb #Adverb? #Noun [(that|which)]', g: 0, t: 'Preposition', r: 'that-prep' },
  // Tuesday, [which] he liked
  { m: '@hasComma [which] (#Pronoun|#Verb)', g: 0, t: 'Preposition', r: 'which-cop' },
  // treated them [like] sons
  { m: '(me|him|her|us|them|it) [like] #Noun', g: 0, t: 'Preposition', r: 'noun-like' },
  // a day [like] this
  { m: 'a #Noun [like] (#Noun|#Determiner)', g: 0, t: 'Preposition', r: 'a-noun-like' },
  // really [like]
  { m: '(#Adverb && !lot) [like]', g: 0, t: 'Verb', r: 'really-like' },
  // is not [like] me
  { m: '(#Copula|be|been|being) (not|never) [like]', g: 0, t: 'Preposition', r: 'neg-like' },
  // a lot [like] ours
  { m: 'a lot [like] #Noun', g: 0, t: 'Preposition', r: 'lot-like' },
  // treat them [like]
  { m: '#Infinitive #Pronoun [like]', g: 0, t: 'Preposition', r: 'treat-like' },
  // [before] dinner
  {
    m: '[before] (#Determiner|#Possessive|#Noun|#Gerund|#Date)',
    g: 0,
    t: 'Preposition',
    r: 'before-nominal',
  },

  // ==== Questions ====
  // where
  // why
  // when
  // who
  // whom
  // whose
  // what
  // which
  //the word 'how many'
  // { match: '^(how|which)', tag: 'QuestionWord', reason: 'how-q' },
  // [how] he
  { m: '[#QuestionWord] (#Pronoun|#Determiner)', g: 0, t: 'Preposition', r: 'how-he' },
  // [when] stolen
  { m: '[#QuestionWord] #Participle', g: 0, t: 'Preposition', r: 'when-stolen' },
  // [how] is
  { m: '[how] (#Determiner|#Copula|#Modal|#PastTense)', g: 0, t: 'QuestionWord', r: 'how-is' },
  // children [who] dance
  { m: '#Plural [(who|which|when)] .', g: 0, t: 'Preposition', r: 'people-who' },

  // === expressions.js ===

  // holy shit
  { m: 'holy (shit|fuck|hell)', t: 'Expression', r: 'swears-expr' },
  // [well]..
  { m: '^[well] !#Adjective?', g: 0, t: 'Expression', r: 'well-expr' },
  // [so]
  { m: '^[so] !#Adjective?', g: 0, t: 'Expression', r: 'so-expr' },
  // [okay]
  { m: '^[okay] !#Adjective?', g: 0, t: 'Expression', r: 'okay-expr' },
  // [now]
  { m: '^[now] !#Adjective?', g: 0, t: 'Expression', r: 'now-expr' },
  // come on
  { m: '^come on', t: 'Expression', r: 'come-on' },
  // shoot,
  { m: '^(shoot && @hasComma)', t: 'Expression', r: 'shoot-comma-expr' },
  // say,
  { m: '^(say && @hasComma)', t: 'Expression', r: 'say-expr' },
  // like, hello
  { m: '^(like && @hasComma)', t: 'Expression', r: 'like-expr' },

  // === second-pass.js ===
  // Corrections matched against the main sweep's output, before any are applied.
  // const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'

  // Which chair did she [sit] [on]?

  // veggies, [like] kale
  (secondPassStart = {
    m: '(#Noun && @hasComma) [like] #Noun',
    g: 0,
    t: 'Preposition',
    r: 'comma-like-ex',
  }),
  // Keep comma context, but don't turn unambiguous verbs into list items.
  ...['%Noun|Verb%', '%Plural|Verb%', 'thanks'].map(target => ({
    m: `(#Noun && @hasComma) #Noun (and|or) [(${target} && #PresentTense)]`,
    g: 0,
    t: 'Noun',
    n: '#Copula',
    r: 'noun-list',
  })),

  // === connectors.js (second pass) ===
  // Before the meal ended, we left.
  // Before the meal, we left.
  // After the news that she resigned, we called.

  ...['before', 'after', 'since', 'until', 'till', 'as', 'than', 'when', 'whereas'].flatMap(word => [
    // [before] she left
    // [after] she left
    // [since] she left...
    { m: `[${word}] ${subject} ${predicate}`, g: 0, t: 'Conjunction', r: `${word}-clause` },
    // [Before] the guests from the village arrived, we ate.
    // [After] the guests from the village arrived, we ate.
    // [Since] the guests from the village arrived, we ate. ...
    {
      m: `[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`,
      g: 0,
      t: 'Conjunction',
      r: `${word}-mod-subj`,
    },
  ]),
  // [Before] the dog and the cat woke, she left.
  // [before] the dog and the cat woke
  // [after] the dog and the cat woke...
  ...['before', 'after', 'until', 'when', 'while'].map(word => ({
    m: `^[${word}] ${subject} and ${subject} ${predicate}`,
    g: 0,
    t: 'Conjunction',
    r: `${word}-joint-subj`,
  })),
  // She bought flowers, [for] I was ill.
  { m: `@hasComma [for] ${subject} ${predicate}`, g: 0, t: 'Conjunction', r: 'causal-for' },
  // Everyone [but] me agreed.
  ...['everyone', 'everybody', 'everything', 'anyone', 'anybody', 'anything', 'nobody', 'nothing', 'all'].map(word => ({
    m: `${word} [but] (me|him|her|us|them|#Determiner|#Possessive|#ProperNoun)`,
    g: 0,
    t: 'Preposition',
    r: 'exceptive-but',
  })),

  // The cat slept [under] the table. He sat [beside] me.
  // the plane flew well [above] the clouds
  // she stood directly [below] the window...
  ...['above', 'below', 'under', 'over', 'beside', 'behind', 'against', 'outside', 'inside', 'near'].map(word => ({
    m: `[(${word} && !#Verb)] (#Determiner|#Possessive|#Pronoun|#ProperNoun)`,
    g: 0,
    t: 'Preposition',
    r: `${word}-space-obj`,
  })),
  // We looked [under] the bed.
  { m: '#Verb [under] (#Determiner|#Possessive|#Pronoun)', g: 0, t: 'Preposition', r: 'under-obj' },
  // She sings [like] her mother
  {
    m: '(#Verb && !#Auxiliary && !#Modal && !do && !does && !did && !have && !has && !had) [like] (#Noun|#Determiner|#Possessive)',
    g: 0,
    t: 'Preposition',
    r: 'like-like',
  },
  // images on a screen [like] humans do
  { m: '#Noun [like] #Noun+ (do|does|did)$', g: 0, t: 'Preposition', r: 'noun-like-cmp' },
  // cities [like] New York, Boston
  ...['', '#Place ', '#Place #Place '].map(prefix => ({
    m: `#Plural [like] ${prefix}(#Place && @hasComma) #Place`,
    g: 0,
    t: 'Preposition',
    r: 'like-place',
  })),
  // [Like] his brother, he enjoys chess
  {
    m: '^[like] (#Determiner|#Possessive)? #Adjective+? (#Noun && @hasComma)',
    g: 0,
    t: 'Preposition',
    r: 'init-like',
  },
  // She sings [like] her mother does
  {
    m: `(#Verb && !#Auxiliary && !#Modal && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`,
    g: 0,
    t: 'Conjunction',
    r: 'manner-like',
  },
  // I like tea, [like] my sister does.
  { m: `@hasComma [like] ${subject} ${predicate}`, g: 0, t: 'Conjunction', r: 'comma-like-cl' },
  // We talked about the fact [that] she resigned.
  { m: `#Noun [that] ${subject} ${predicate}`, g: 0, t: 'Conjunction', r: 'noun-that' },
  // I have heard that story [before]
  {
    m: '#Verb (#Determiner|#Possessive)? #Noun+? [(before|since)]$',
    g: 0,
    t: 'Adverb',
    n: '@hasQuestionMark',
    r: 'time-adv',
  },
  // We met shortly [after].
  { m: '(shortly|soon|long) [after]$', g: 0, t: 'Adverb', r: 'after-adv' },
  // She has [since] moved.
  { m: '(has|have|had) [since] #PastTense', g: 0, t: 'Adverb', r: 'perf-since-adv' },
  // She has not arrived [yet].
  { m: '#PastTense [yet]$', g: 0, t: 'Adverb', r: 'yet-adv' },
  // Who did she arrive [before]?
  {
    m: '^(who|whom) #Verb #Pronoun #Verb [before]$',
    g: 0,
    t: 'Preposition',
    r: 'before-end',
  },
  // We will leave [when] the rain stops.
  {
    m: '#Modal #Infinitive [when] #Determiner',
    g: 0,
    t: 'Conjunction',
    r: 'leave-when',
  },

  // Possession of running water and enduring noun phrases are not progressives.
  { m: '[(have|has|had)] running water', g: 0, u: 'Auxiliary', r: 'have-water' },
  { m: '[#Copula] (enduring && #Adjective) #Noun', g: 0, u: 'Auxiliary', r: 'enduring-cop' },
  // Although he [was] [tired], he smiled. He [was] [tired].
  ...[
    // He [was] [tired].
    { match: '[(#Copula|been)] #Adverb+? [tired]$', position: 'end' },
    // Although he [was] [tired], he smiled.
    { match: '[(#Copula|been)] #Adverb+? [(tired && @hasComma)]', position: 'comma' },
  ].flatMap(({ match, position }) => [
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 0, t: 'Copula', u: 'Passive', r: `tired-${position}-cop` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 0, u: 'Auxiliary', r: `tired-${position}-unaux` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 1, t: 'Adjective', r: `tired-${position}-adj` },
  ]),
  // had been tired
  { m: '(has|have|had) (#Adverb|not)+? been #Adverb+? tired$', u: 'Passive', r: 'tired-unpass' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 0, u: 'PhrasalVerb', r: 'sit-q-unphr' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 1, t: 'Preposition', r: 'sit-q-prep' },
  // “May twenty five”
  { m: '(#TextValue && #Date) #TextValue', t: 'Date', r: 'textvalue-date' },
  // 23 Main Street in Toronto
  { m: '#Address in #Place', t: 'Place', r: 'address-place' },
  // the very [professional] actor
  {
    m: '#Determiner (very|remarkably|extremely|quite|unusually) [%Adj|Noun%] #Actor',
    g: 0,
    t: 'Adjective',
    r: 'degree-actor',
  },
  // the [sleeping] dog
  {
    m: '#Determiner [sleeping] (#Actor|#Person|puppy|kitten|dog|cat|baby|babies|child|children)',
    g: 0,
    t: 'Adjective',
    r: 'sleeping-mod',
  },
  // he ate, and [left]
  {
    m: '(#PastTense && @hasComma) and [%Adj|Past%] #Adverb+?$',
    g: 0,
    t: 'PastTense',
    r: 'past-list',
  },
  // [water] broke the pipe
  {
    m: '^[%Noun|Verb%] #PastTense (#Determiner|#Possessive) #Adjective+? #Noun',
    g: 0,
    t: 'Noun',
    r: 'bare-subj-past',
  },
  // the [present] immediately
  { m: '#Determiner [present] #Adverb+$', g: 0, t: 'Noun', r: 'present-obj' },
  // [falls in] June
  { m: '[(fall|falls|fell) in] #Month', g: 0, t: '#Verb #Preposition', r: 'fall-in-month' },
  // [had] he walked
  {
    m: '^[had] #Noun+ (#Adverb|not)+? #PastTense',
    g: 0,
    t: 'Condition',
    r: 'had-cond',
    n: '@hasQuestionMark',
  },
  // [were] he to walk
  {
    m: '^[were] #Noun+ to #Infinitive *$',
    g: 0,
    t: 'Condition',
    r: 'were-he',
    n: '@hasQuestionMark',
  },
  // [had] he walked?
  {
    m: '^[had] #Noun+ (#Adverb|not)+? (#PastTense && @hasQuestionMark)$',
    g: 0,
    t: 'Auxiliary',
    r: 'had-q-end',
    n: '@hasComma',
  },
  // [had] he walked the dog?
  {
    m: '^[had] #Noun+ (#Adverb|not)+? #PastTense * @hasQuestionMark$',
    g: 0,
    t: 'Auxiliary',
    r: 'had-q-obj',
    n: '@hasComma',
  },
  // then, [had] he walked
  {
    m: '@hasComma [had] #Noun+ (#Adverb|not)+? #PastTense',
    g: 0,
    t: 'Condition',
    r: 'had-comma-cond',
    n: '@hasQuestionMark',
  },
  // does [this] work
  {
    m: '(do|does|did|#Modal) [(this|that|these|those)] #Adverb+? #Infinitive',
    g: 0,
    t: 'Pronoun',
    r: 'dem-q',
  },
  // [This] is useful. Hope [this] helps. [This] really rocks.
  {
    m: '[this] #Adverb+? (#PresentTense && !#Infinitive && !#Gerund)',
    g: 0,
    t: 'Pronoun',
    r: 'this-finite-subj',
  },
  // [This] will be one sentence. [This] might help.
  { m: '[this] #Adverb+? #Modal #Adverb+? #Infinitive', g: 0, t: 'Pronoun', r: 'this-modal-subj' },
  // has [read], had [put]
  ...['read', 'put'].map(word => ({
    m: `(has|have|had) (#Adverb|not)+? [${word}]`,
    g: 0,
    t: 'Participle',
    r: 'perf-invar',
  })),
  // what [work] he did
  { m: '(which|what|whose) [%Noun|Verb%] #Pronoun', g: 0, t: 'Noun', r: 'embed-wh-obj' },
  // what [walks] he took
  { m: '(which|what|whose) [%Plural|Verb%] #Pronoun', g: 0, t: 'Plural', r: 'embed-wh-pl' },
  // John and Mary [walk]
  {
    m: '#Person and #Person [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$',
    g: 0,
    t: 'Infinitive',
    r: 'joint-subj-verb',
  },
  // dogs [near] the house [bark]
  // near|on|under|beside|behind
  ...['near', 'on', 'under', 'beside', 'behind'].flatMap(word => [
    {
      m: `#Plural [${word}] #Determiner #Adjective+? #Noun [%Noun|Verb%]$`,
      g: 0,
      t: 'Preposition',
      r: 'subj-loc',
    },
    {
      m: `#Plural [${word}] #Determiner #Adjective+? #Noun [%Noun|Verb%]$`,
      g: 1,
      t: 'Infinitive',
      r: 'subj-loc-verb',
    },
  ]),
  // { match: locative, group: 0, tag: 'Preposition', reason: 'subj-loc' },
  // { match: locative, group: 1, tag: 'Infinitive', reason: 'subj-loc-verb' },
  // being [injured] and treated
  {
    m: 'being #Adverb+? [%Adj|Past%] (and|or) #Adverb+? (#PastTense|#Participle)',
    g: 0,
    t: 'PastTense',
    r: 'coord-pass',
  },
  // has eaten and [drunk]
  {
    m: '(has|have|had) (#Adverb|not)+? #PastTense (and|or) #Adverb+? [drunk]',
    g: 0,
    t: 'Participle',
    r: 'coord-drunk',
  },
  // dogs, [including] the poodle
  {
    m: '(#Noun && @hasComma) [including] all? #Determiner? #Cardinal+? #Adverb+? #Adjective+? #Noun',
    g: 0,
    t: 'Preposition',
    r: 'including-list',
  },
  // can you [walk], please?
  {
    m: '^(can|could|will|would) you (#Adverb|not)+? [(#Infinitive && @hasComma)] please$',
    g: 0,
    t: 'Imperative',
    r: 'req-verb-comma',
  },
  // can you [walk] the dog, please?
  {
    m: '^(can|could|will|would) you (#Adverb|not)+? [#Infinitive] * @hasComma please$',
    g: 0,
    t: 'Imperative',
    r: 'req-obj-comma',
  },
  // [Will] walked home
  { m: '[(will && @isTitleCase)] #PastTense', g: 0, t: 'FirstName', r: 'will-past-subj' },
  // jack the ripper
  { m: '%Person|Verb% (the && #Person) #Person', t: 'Person', r: 'known-nickname' },
  // she drew a picture
  { m: '(drew && #Verb)', t: 'PastTense', r: 'drew-a-picture' },
  // keep the lid [closed]
  {
    m: '#Imperative #Determiner #Noun+ [%Adj|Past%]',
    g: 0,
    t: 'Adjective',
    r: 'lid-closed',
  },
  // console.log('  ', rules.length, 'matches second-pass\n\n')
]

// Expand compact rule keys once, preserving the pass-boundary object.
const keys = { m: 'match', g: 'group', t: 'tag', r: 'reason', n: 'notIf', u: 'unTag' }
rules.forEach(rule => {
  Object.keys(rule).forEach(key => {
    const name = keys[key]
    if (name) {
      rule[name] = rule[key]
      delete rule[key]
    }
  })
})

const boundary = rules.indexOf(secondPassStart)
const matches = rules.slice(0, boundary)
const secondPassRules = rules.slice(boundary)

console.log('  ', matches.length, 'matches first-pass')

export { secondPassRules }

export default {
  two: {
    matches,
  },
}
