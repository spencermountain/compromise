import {
  Inf,
  Cop,
  Adj,
  NN,
  Adv,
  Pres,
  Vb,
  Sing,
  Poss,
  Plur,
  Ger,
  Conj,
  Past,
  Frac,
  First,
  Pers,
  Last,
  Org,
  Prep,
  Mod,
  Phrasal,
  Det,
  Pron,
  Prop,
  Expr,
  Participle,
  WeekDay,
  Date,
  Timezone,
  Actor,
  Val,
  PhoneNumber,
  Unit,
  Acronym,
  SportsTeam,
  Region,
  Place,
  Uncountable,
} from '../../preTagger/tagSet/_lib.js'
import expandRules from './expand-rules.js'

const noLy = '(hard|fast|late|early|high|right|deep|close|direct)'
const infNouns =
  '(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)'
const notIf = '(i|we|they)' //we do not go
const companySuffix = '(inc|ltd|llc|co|corp|corporation|company|limited)'

// [match, tag, group, options]; omit group to tag the full match.

// order matters top-matches can get overwritten
const noun = '(#NN && !#Poss && !@hasComma)'
const modifiers = '(#Det|#Poss)? #Adv+? #Adj+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#Adv+? not? (#V && !#Ger && !#Particle)'

const rules = [
  // let the dough [rest] overnight → Infinitive
  ['let (#Det|#Poss)? #Adj+? #NN [(%Noun|Verb% && !#Plur)] (overnight|outside|inside|here)$', Inf, 0],
  // === verbs/passive.js ===

  // got walked → Passive
  ['got (#Past|#VBN)', 'Pass'],
  // was walked; were walked → Passive (keep word-specific hooks)
  ...['were', 'was', 'is', 'are', 'am'].map(word => [`${word} (#Past|#VBN)`, 'Pass']),
  // was being walked → Passive
  ['(was|were|is|are|am) being (#Past|#VBN)', 'Pass'],
  // had been walked → Passive
  ['(had|have|has) been (#Past|#VBN)', 'Pass'],
  // will be cleaned → Passive
  ['will be being? (#Past|#VBN)', 'Pass'],
  // dog was [walked] by the man → Passive
  ['#NN (am|is|are|was|were) #Adv? [(#Past|#VBN)] by (the|a) #NN', 'Pass', 0],

  // === adjective/adjective.js ===

  // Restore the copula when the colour is written without a hyphen.
  // [is] off white → Copula; remove PhrasalVerb
  ['[(is|are|am|was|were)] off white$', Cop, 0, { u: 'PhrV' }],
  // is [off white] → Adjective
  ['(is|are|am|was|were) [off white]$', Adj, 0],
  // [all] the dogs → Noun
  ['[(all|both)] #Det #NN', NN, 0],
  // the door is [closed] → Adjective
  ['#Sing is #Adv? [%Adj|Past%]$', Adj, 0],
  // [forgotten] art is rediscovered → Adjective
  ['[#Past] #Sing is', Adj, 0],
  // [forgotten] stories are lost → Adjective
  ['[#Past] #Plur are', Adj, 0],
  // is [fucked up] → Adjective
  ['#Cop [fucked up?]', Adj, 0],
  // the door seems [opened] → Adjective
  ['#Sing (seems|appears) #Adv? [#Past$]', Adj, 0],
  // jury is out - preposition ➔ adjective
  // jury is [out] → Adjective
  ['#Cop #Adj? [(out|in|through)]$', Adj, 0],
  // [quiet] the room → Infinitive
  ['^[(#Adj && !near && !inside && !outside && !opposite)] (the|your) #NN', Inf, 0, { n: '(all|even)' }],
  // blue-[tinted] → Adjective
  ['(#Adj && #Hyphenated) [(#Hyphenated && #Past)]$', Adj, 0],
  // [blue-tinted] glasses → Adjective
  ['[#Hyphenated (#Hyphenated && #Past)] (#NN|#Conj)', Adj, 0, { n: '#Adv' }],
  // [non-breaking] spaces → Adjective
  ['[#Hyphenated (#Hyphenated && #Ger)] (#NN|#Conj)', Adj, 0, { n: '#Adv' }],
  // [dammed-up] river → Adjective
  ['[#Past (#Hyphenated && #PhrV)] (#NN|#Conj)', Adj, 0],

  // === adjective/adj-adverb.js ===

  // is [far too] cold → Adverb
  [`#Cop [far too] #Adj`, Adv, 0],
  // shops [direct] → Adverb
  [
    `#V [${noLy}] !#NN?`,
    Adv,
    0,
    { n: '(#Cop|be|been|being|get|got|getting|become|became|becoming|feel|feels|feeling|#Det|#Prep)' },
  ],
  // Bare 'be' may still be Infinitive rather than Copula in commands.
  // be [late] → Adjective
  ['(be|been|being) (#Adv|not)+? [late]', Adj, 0],
  // be [early] → Adjective
  ['(be|been|being) (#Adv|not)+? [early]', Adj, 0],
  // [moons] a lot → PresentTense
  [`[#Plur] a lot !like?`, Pres, 0],

  // === adjective/adj-gerund.js ===
  // Gerund-Adjectives - 'amusing, annoying'

  // found it [interesting] → Adjective
  ['found it #Adv? [%Adj|Gerund%]', Adj, 0],
  // found it [isolating], but found it isolating cells → Adjective
  ['found it #Adv? [isolating]$', Adj, 0],
  // a little [fuming] → Adjective
  ['a (little|bit|wee) bit? [#Ger]', Adj, 0],
  // repairing [crumbling] roads → Adjective
  [
    '#Ger [#Ger] #NN',
    Adj,
    0,
    { n: '(impersonating|practicing|considering|assuming|enjoying|avoiding|stopping|starting|finishing)' },
  ],
  // looked [amazing] → Adjective
  ['(looked|look|looks) #Adv? [%Adj|Gerund%]', Adj, 0, { n: '(impersonating|practicing|considering|assuming)' }],
  // meaning alluring → Gerund Adjective
  ['%Noun|Gerund% %Adj|Gerund%', 'Ger #Adj'],

  // === adjective/adj-noun.js ===

  // his [fine] → Noun
  ['(his|its) [%Adj|Noun%] !#NN?', NN, 0, { n: '#Hyphenated' }],
  // is [all] → Noun
  ['#Cop #Adv? [all]', NN, 0],
  // have [fun] with it → Noun
  [`(have|had) [#Adj] #Prep .`, NN, 0],
  // brewing giant → Noun
  [`#Ger (giant|capital|center|zone|application)`, NN],
  // in a [perfect] → Noun
  [`#Prep (a|an) [#Adj]$`, NN, 0],
  // [brand] new → Adverb
  [`[brand #Ger?] new`, Adv, 0],
  // must-win → Adjective
  [`(must && #Hyphenated) .`, Adj],
  // the [present] → Noun
  [`#Det [#Adj]$`, NN, 0, { n: '(this|that|#Comp|#Sup)' }], //are that crazy.
  // company-wide → Adjective
  [`(#NN && #Hyphenated) (#Adj && #Hyphenated)`, Adj, null, { n: '(this|that|#Comp|#Sup)' }],
  // the [poor] were
  // {
  //   m: `#Det [#Adj] (#Cop|#Det)`,
  //   n: '(#Comp|#Sup)',
  //   g: 0,
  //   t: 'NN',
  // },
  // [professional] bodybuilder → Adjective
  [`[(%Adj|Noun% && !#Timezone && !#Value)] #NN`, Adj, 0, { n: '(#Pron|#Prop)' }],

  // === adverb.js ===

  // [way] too hot → Adverb
  ['[way] #Adv #Adj', Adv, 0],
  // sing [like] an angel → Adverb
  ['#V  [like]', Adv, 0, { n: '(#Mod|#PhrV)' }],
  // even left → Adverb Verb
  ['even left', '#Adv #V'],
  // cheering [hard] → Adverb
  [
    '#Pres [(hard|quick|bright|slow|fast|backwards|forwards)]',
    Adv,
    0,
    {
      n: '(#Cop|feel|feels|look|looks|seem|seems|appear|appears|sound|sounds|smell|smells|taste|tastes|become|becomes|grow|grows|get|gets|stay|stays|remain|remains)',
    },
  ],
  // a [bit] cold → Adverb
  ['a [(little|bit|wee) bit?] #Adj', Adv, 0],
  // become overly [weakened] → Adjective
  ['(become|fall|grow) #Adv? [#Past]', Adj, 0],
  // a completely [beaten] man → Adjective
  ['(a|an) #Adv [#VBN] #NN', Adj, 0],
  // a [close] friend
  // { m: '#Det #Adv? [close] #NN', g: 0, t: 'Adj' },
  // does [better] → Adverb
  ['(do|does|did) #Adv? [(better|worse)]', Adv, 0],
  // walking [close] → Adverb
  ['#Ger #Adv? [close]', Adv, 0, { n: '(getting|becoming|feeling)' }],
  // charged [back] → Adverb
  ['(#Pres|#Past) [back]', Adv, 0, { n: '(#PhrV|#Cop)' }],
  // the [well] → Noun
  ['#Det [well] !#Past?', NN, 0, { n: 'well made' }],
  // sees [well] → Adverb
  ['(#Pres && !#Cop) [well]', Adv, 0],

  // === dates/date.js ===

  // ==== WeekDay ====
  // [sun] the 5th → WeekDay
  ['[sun] the #Ord', WeekDay, 0],
  // 1pm next [sun] → WeekDay
  ['#Date (on|this|next|last|during)? [sun]', WeekDay, 0],

  // ==== Month ====
  // this march → Date Month
  ['(this|next|last) march !#Inf?', '#Date #Month'],
  // this may → Date Month
  ['(this|next|last) may !#Inf?', '#Date #Month'],
  // march 5th → Month Date Date
  [`(march|may) the? #Value`, '#Month #Date #Date'],
  // 5th of march → Date Date Month
  [`#Value of? (march|may)`, '#Date #Date #Month'],
  // [march] and feb → Month
  [`[(march|may)] .? #Date`, 'Month', 0],
  // feb to [march] → Month
  [`#Date .? [(march|may)]`, 'Month', 0],
  // quickly [march] → Verb
  [`#Adv [(march|may)]`, Vb, 0, { n: '(early|late)' }],

  // === dates/date-phrase.js ===

  // 5th of June → Date
  ['#Value of #Month', Date],
  // 5 June
  // { m: '#Card #Month', t: 'Date' },
  // June 5 to 7 → Date
  ['#Month #Value to #Value', Date],
  // June the 12th → Date
  ['#Month the #Value', Date],
  // june 7 → Date
  ['(#WeekDay|#Month) #Value', Date],
  // 7 june → Date
  ['#Value (#WeekDay|#Month)', Date],
  // aug 5th 2021 → Date
  [`#Month #Ord #Card`, Date],

  // === timezones ===
  // china standard time → Timezone
  [`(#Place|#Dem) (standard|daylight|central|mountain)? time`, Timezone],

  // === nouns/nouns.js ===

  //'more' is not always an adverb
  // due to [weather] → Noun
  ['due to [#V]', NN, 0],

  // my first [thought] → Noun
  ['#Poss #Ord [#Past]', NN, 0],
  // the nice [walk] → Noun
  ['(the|this|those|these) #Adj [%Noun|Verb%]', NN, 0, { n: '#Cop' }],
  // the truly nice [swim] → Noun
  ['(the|this|those|these) #Adv #Adj [#V]', NN, 0],
  // the [message] from Danny → Noun
  ['the [#V] #Prep .', NN, 0],
  // a type of [shout] → Noun
  ['#Det #NN of [#V]', NN, 0, { n: '#Ger' }],
  // waited until [release] → Noun
  ['#Past #Prep [#Pres]', NN, 0, { n: '#Ger' }],
  // water-flows → Noun
  ['(#Sing && @hasHyphen && !must) #Pres', NN],
  // is no [going] back → Noun
  ['is no [#V]', NN, 0],
  // and check this out! a [walk-in] microwave. → Noun
  [
    '(the|those|these|a|an) #Adj? [(#Pres && !#Ger && !#Cop && !seem && !appear && !include) #Particle?]',
    NN,
    0,
    { n: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)' },
  ],

  // ==== Actor ====
  // Aircraft designer → Actor
  ['#NN #Actor', Actor, null, { n: '(#Pers|#Pron)' }],
  // lighting designer → Actor
  ['#Ger #Actor', Actor],
  // captain sanders
  // { match: '[#Actor+] #ProperNoun', group: 0, tag: 'Honorific' },
  // co founder → Actor
  [`co #Sing`, Actor],
  // [aircraft] designer → Actor
  [`[#NN+] #Actor`, Actor, 0, { n: '(#Hon|#Pron|#Poss)' }],
  // fine-artist → Actor
  [
    `(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #NN? #Actor`,
    Actor,
  ],
  // dance coach → Actor
  [`(#NN && !#Pron)+ (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)`, Actor],
  // chief design officer → Actor
  [`chief . officer`, Actor],
  // chief of police → Actor
  [`chief of #NN+`, Actor],
  // president of marketing → Actor
  [`senior? vice? president of #NN+`, Actor],

  // ==== Singular ====
  // did a [900], paid a [20] → Singular
  ['#V (a|an) [#Value]$', Sing, 0],

  // ==== Possessive ====
  // John Smith's → Possessive
  ['#First #Acronym? (#Poss && #Last)', Poss],
  // Microsoft Research's office → Possessive
  ['#Org+ #Poss', Poss],
  // Los Angeles's fundraiser → Possessive
  ['#Place+ #Poss', Poss],
  // my butt smells → Noun
  ['#Poss #Pres #Particle?', NN, null, { n: '(#Ger|#Copula|her)' }], // anna's eating vs anna's eating lunch
  // my [teachers] dog → Possessive
  ['(my|our|their|her|his|its) [(#Plur && #Actor)] #NN', Poss, 0],

  // 10th of a [second] → Singular; remove Value
  ['#Value of a [second]', Sing, 0, { u: Val }],
  // the euro [sense] → Noun
  [`#Det #NN [${infNouns}] !(#Prep|to|#Adv)?`, NN, 0],
  // [thanks] for the gift are overdue → Plural
  ['[#Pres] (of|by|for) (a|an|the) #NN #Cop', Plur, 0],
  // You eat and [sleep] → Infinitive
  ['#Inf and [%Noun|Verb%]', Inf, 0],
  // dogs and [running] and cats → Noun
  ['#NN and [#V] and #NN', NN, 0],
  // the 1992 [classic] → Noun
  ['the #Card [%Adj|Noun%]', NN, 0],
  // This is the [premier] university in Virginia → Adjective
  ['#Cop the [%Adj|Noun%] #NN', Adj, 0],

  // i ate [me] sandwich (scottish slang)
  // { m: 'i #V [me] #NN', g: 0, t: 'Poss' },
  // He bowed his [head] in prayer → Noun
  ['#Past #Poss [#V]', NN, 0, { n: '(saw|made)' }],
  // 35 [signs] → Plural
  ['#Value [%Plural|Verb%]', Plur, 0, { n: '(one|1|a|an)' }],
  // had [time] → Noun
  ['had [%Noun|Verb%]', NN, 0, { n: '(#Ger|come|become)' }],
  // instant access → Adjective Noun
  ['(%Adj|Noun% && !#Timezone) %Noun|Verb%', '#Adj #NN', null, { n: '#Prop #NN' }],
  // near death experiences, ambitious sales [targets] → Plural
  ['#Adj #NN [%Plural|Verb%]$', Plur, 0, { n: '#Pron' }],
  // your guild [colors] → Plural
  ['#Poss #NN [(colors|colours)]$', Plur, 0],

  // === verbs/noun-gerund.js ===

  // the [upcoming thank]-you → Singular
  ['(this|that|the|a|an) [#Ger #Inf]', Sing, 0],
  // the [upcoming thank]-you → Plural
  ['(that|the) [#Ger #Pres]', Plur, 0, { ifNo: '#Cop' }],
  // lexical [tagging] → Noun
  ['#Adj [#Ger]', NN, 0, { n: '(still|even|just)' }],
  // [walking] is cool → Activity
  ['[#Ger] #Adv? not? #Cop', 'Activity', 0],
  // are [doing] is → Gerund
  ['#Cop [(#Ger|#Activity)] #Cop', Ger, 0],
  // responsibility for [setting] → Gerund
  ['#Sing for [%Noun|Gerund%]', Ger, 0],
  // better for [training] → Gerund
  ['#Comp (for|at) [%Noun|Gerund%]', Ger, 0],
  // apologized for [shouting] → Gerund
  ['(#Past|#Pres) for [%Noun|Gerund%]', Ger, 0],
  // he reads the [upcoming] → Noun
  ['#Pres the [#Ger]', NN, 0],

  // === verbs/verb-noun.js ===

  // A final button label is an object, not a second verb. → PresentTense Noun
  ...['click', 'clicks', 'selects', 'pick', 'picks'].map(word => [
    `(#Pron|#Sing|#Plur) [${word} (submit|save|cancel)]$`,
    'Pres NN',
    0,
  ]),
  // Common intransitive predicates after a singular subject. Keep arbitrary
  // plural/verb switches conservative: 'the dog treats' is a noun phrase.
  // the dog [runs] → PresentTense
  ...['runs', 'walks', 'barks', 'swims', 'sleeps'].map(word => [
    `^(#Det|#Poss) #Adj+? #Sing #Adv+? [${word}] #Adv+?$`,
    Pres,
    0,
  ]),
  // with heads and [arms] rolling around
  // { m: '#Prep #Plur and [%Plural|Verb%] #Ger', g: 0, t: 'Plur' },
  // he can solve the [puzzle] → Noun
  ['#Inf (this|that|the) [#Inf]', NN, 0],
  // keeping the [matter] a secret → Noun
  ['#Ger #Det [#Inf]', NN, 0],
  // the-only-[reason] → Noun
  ['#Det (only|further|just|more|backward) [#Inf]', NN, 0],
  // the [slide] makes noise → Noun
  ['(the|this|a|an) [#Inf] #Adv? #V', NN, 0],
  // Use a pointed [stick] (a pencil) or a similar tool → Noun
  ['#Det #Adj #Adj? [#Inf]', NN, 0, { n: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)' }],
  // the American [thank]-you letter → Noun
  ['#Det #Dem [#Pres]', NN, 0],
  // the next career [read] is brief → Noun
  ['#Adj #NN+ [#Inf] #Cop', NN, 0],
  // at some [thank]-you party → Noun
  ['at some [#Inf]', NN, 0],
  // goes [to sleep] → Preposition Noun
  ['(go|goes|went) [to (sleep|work)]', 'Prep NN', 0],
  // a dog [retrieve] in the field → Noun
  ...['a', 'an'].map(word => [`${word} #Adj? #NN [#Inf] (#Prep|#NN)`, NN, 0, { n: 'from' }]),
  // a software [reinstall] → Noun
  ['(a|an) #NN [#Inf]$', NN, 0],
  // working for [thank]-you letters → Noun
  ['#Ger #Adj? for [#Inf]', NN, 0],
  // artists on [thank]-you cards → Noun
  ['#Plur on [#Inf]', NN, 0],
  // number of [thank]-yous → Noun
  ['number of [#Pres]', NN, 0],
  // make [sense] → Noun
  ['(try|use|attempt|build|make) [%Noun|Verb% #Particle?]', NN, 0, { n: '(#Cop|#NN|sure|fun|up)' }], //make sure of
  // [append] is cloned → Noun
  ['^[#Inf] (is|was)', NN, 0],
  // get much [thank]-you mail
  // { m: '#Inf much [#Inf]', g: 0, t: 'NN' },
  // [cause] i gotta → Conjunction
  ['[cause] #Pron #V', Conj, 0],
  // the US [air] force
  // {
  //   m: 'the #Sing [#Inf] (#NN && !#Poss)',
  //   g: 0,
  //   t: 'NN',
  //   n: '#Pron',
  // },
  // this [rocks] → PresentTense
  ['this [#Plur]', Pres, 0, { n: '(#Prep|#Date)' }],
  // the thing [that runs] → Conjunction PresentTense
  ['#NN [that %Plural|Verb%]', 'Conj Pres', 0, { n: '(#Prep|#Pron|way)' }],
  // that [leads] to
  // { m: 'that [#Plur] to', g: 0, t: 'Pres', n: '#Prep' },
  // let him [father] a child → Infinitive
  ...['let', 'make', 'made'].map(word => [`${word} (him|her|it|#Pers|#Place|#Org)+ [#Sing] (a|an|the|it)`, Inf, 0]),
  // assign all [tasks] → Noun
  ['#V (all|every|each|most|some|no) [#Pres]', NN, 0, { n: '#Mod' }], // PresentTense/Noun ambiguities
  // Possession and copulas; other past verbs use wide-support below. → Noun
  ['(had|have|was|were) #Adj [#Pres]', NN, 0, { n: 'better' }],
  // one big [thank]-you → Noun
  ['#Value #Adj [#Pres]', NN, 0, { n: '#Cop' }],
  // found all [upcoming] words → Noun
  ['#Past #Adj+ [#Pres]', NN, 0, { n: '(#Cop|better)' }],
  // many [thanks] → Noun
  ['(many|few|several|couple) [#Pres]', NN, 0, { n: '#Cop' }],
  // a very big [dream] → Noun
  ['#Det #Adv #Adj [%Noun|Verb%]', NN, 0, { n: '#Cop' }],
  // from start to [finish] → Noun
  ['from #NN to [%Noun|Verb%]', NN, 0],
  // for comparison or [contrast] → Noun
  ['(for|with|of) #NN (and|or|not) [%Noun|Verb%]', NN, 0, { n: '#Pron' }],
  // cute little [thank]-you bags → Noun
  ['#Adj #Adj [#Pres]', NN, 0, { n: '#Cop' }],
  // writing bigger [thank]-you notes → Noun
  ['#Ger #Adv? #Comp [#Pres]', NN, 0, { n: '#Cop' }],
  // to write people [thanks] for helping → Noun
  [`to #Pres #NN [#Pres] #Prep`, NN, 0],
  // waited until [release]
  // {
  //   m: `#Past (until|as|through|without) [(#Pres && !#Ger && !#Cop)]`,
  //   g: 0,
  //   t: 'NN',
  // },
  // selling like hot [thank]-you cards → Plural
  [`#Ger like #Adj? [#Pres]`, Plur, 0],
  // some nice [thank]-you notes → Noun
  [`some #Adj [#Pres]`, NN, 0],
  // for some [thank]-you letters → Noun
  [`for some [#Pres]`, NN, 0],
  // same kind of [shouts] → Noun
  [`(same|some|the|that|a) kind of [#Pres]`, NN, 0],
  // a type of [shout] → Noun
  [`(same|some|the|that|a) type of [#Pres]`, NN, 0],
  // looking good in [thank]-you photos → Noun
  [`#Ger #Adj #Prep [#Pres]`, NN, 0],
  // get better [thank]-you notes → Noun
  [`(get|got|have) #Comp [#Pres]`, NN, 0],
  // give up on [thank]-you letters → Noun
  [`#PhrV #Particle #Prep [#Pres]`, NN, 0],
  // there are [thank]-you notes → Plural
  ['there (are|were) #Adj? [#Pres]', Plur, 0],
  // a thousand [thanks] of gratitude → Plural
  ['#Value [#Pres] of', Plur, 0, { n: '(one|1|#Cop|#Inf)' }],
  // [thanks] are appreciated → Plural
  ['[#Pres] (are|were) #Adj', Plur, 0],
  // [hope] i helped → Infinitive
  ['^[(hope|guess|thought|think)] #Pron #V', Inf, 0],
  // its proper [functioning] → Noun
  ['#Poss #Adj [#V]', NN, 0, { n: '#Cop' }],
  // [tastes] good → PresentTense
  ['[(tastes|smells)] #Adv? #Adj', Pres, 0],
  // Being introduces a predicate rather than a direct object.
  // she is writing [thank]-you letters → Noun
  ['#Cop (#Ger && !being) [(#Pres && !#Ger && !#Cop)] !by?', NN, 0, { n: 'going' }],
  // the [shed] → Noun
  ['#Det #Adj? [(shed|thought|rose|bid|saw|spelt)]', NN, 0],
  // how to [watch] → Infinitive
  ['how to [%Noun|Verb%]', Inf, 0],
  // ready to [stream] → Infinitive
  ['(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]', Inf, 0],
  // bring [to market] → Preposition Noun
  ['(bring|went|go|drive|run|bike) [to (market|work|court|school|bed|church|prison)]', 'Prep NN', 0],
  // can i [sleep], would you [look] → Infinitive
  ['#Mod #NN [%Noun|Verb%]', Inf, 0],
  // is just [spam] → Noun
  ['#Cop just [#Inf]', NN, 0],
  // request copies → Imperative Plural
  ['^%Noun|Verb% %Plural|Verb%', 'Imp #Plur'],
  // homemade pickles and [drinks] → Plural
  ['#Adj #Plur and [%Plural|Verb%]', '#Plur', 0],
  // the 1968 [stand]-off → Noun
  ['#Det #Year [#V]', NN, 0],
  // the [break up] → Noun
  ['#Det [(#PhrV && !#Past) #Particle]', NN, 0],
  // the [individual] goals → Adjective
  ['#Det [(%Adj|Noun% && !#Value)] #NN', Adj, 0, { n: '(#Pron|#Poss|#Prop)' }],
  // [work] or prepare → Infinitive
  ['^[%Noun|Verb%] or #Inf', Inf, 0],
  // to give [thanks] → Noun
  ['to #Inf [#Pres]', NN, 0, { n: '(#Ger|#Cop|help)' }],
  // [Google] me → Verb
  ['[(#NN && !#Pron)] me', Vb, 0],
  // removes wrinkles → PresentTense Plural
  ['%Plural|Verb% %Plural|Verb%', '#Pres #Plur'],
  // i [Google] the answer → Infinitive
  ['i [#NN] the #NN', Inf, 0],
  // did the engine [stop] → Infinitive
  ['(did|does|will) the #NN [%Noun|Verb%]', Inf, 0],
  // 40 gallons of [water] → Noun
  ['#Value #NN of [%Noun|Verb%]', NN, 0],
  // When the rain [stops], we will leave. Whenever the bell [rings], the dog barks.
  // when the dog [looks] → PresentTense
  ...['stops', 'looks', 'rings'].map(word => [
    `(when|whenever|before|after|until|since|as|while|than) (#Det|#Poss) #Adj+? #NN [(%Plural|Verb% && ${word})]$`,
    Pres,
    0,
  ]),
  // The sun [rose]. The river [rose] quickly. → PastTense
  ['(sun|moon|river|water|tide|temperature|prices|he|she|we|they|i) [rose] #Adv+?$', Past, 0],

  // === numbers/money.js ===

  // $5 and $6 → Money
  ['#Money and #Money #Currency?', 'Money'],
  // 6 dollars [and] 5 cents → Money
  ['#Value #Currency [and] #Value (cents|ore|centavos|sens)', 'Money', 0],
  // 5 rand → Money Currency
  ['#Value (mark|rand|won|rub|ore)', '#Money #Currency'],
  // a pound → Money Unit
  ['a pound', '#Money #Unit'],
  // 3 pounds → Money Unit
  ['#Value (pound|pounds)', '#Money #Unit'],

  // === numbers/fractions.js ===

  // [half] a penny → Fraction
  ['[(a|one)? half] of? (a|an|the)', Frac, 0],
  // [quarter] of a dollar → Fraction
  ['[(a|one)? quarter] of? (a|an|the)', Frac, 0],
  // two and a half → Fraction
  ['#Card and a half', Frac],
  // two-halves → Fraction
  ['#Value (halves|halfs|quarters)', Frac],

  // [seven] fifths → Fraction
  ['[#Card+] (#Frac && /s$/)', Frac, 0],
  // [two thirds] of it → Fraction
  // (a singular one is an ordinal: the twenty first of may)
  ['[#Card+ (#Ord && /s$/)] of .', Frac, 0],
  // [100th] of it → Fraction
  ['[(#Numeric && #Ord)] of .', Frac, 0],
  // [a twenty fifth] of it → Fraction
  ['[(a|one) #Card?+ #Ord] of', Frac, 0],

  // a sixteenth, one twenty fifth (without a following noun) → Fraction
  ['[(a|one) #Card+? (#Ord && !first && !second)]$', Frac, 0],
  ['(a|one) (half|quarter)$', Frac],

  // 3 out of 5 → Fraction
  ['#Card+ out? of every? #Card', Frac],

  // === numbers/numbers.js ===

  // ==== Ambiguous numbers ====
  // with [a] hundred jobs → Value
  ['!once? [(a|an)] hundred', Val, 0],
  // with [a] thousand jobs → Value
  ['!once? [(a|an)] thousand', Val, 0],
  // with [a] million jobs → Value
  ['!once? [(a|an)] million', Val, 0],
  // with [a] billion jobs → Value
  ['!once? [(a|an)] billion', Val, 0],
  // with [a] trillion jobs → Value
  ['!once? [(a|an)] trillion', Val, 0],
  // with [a] dozen eggs → Value
  ['!once? [a] dozen', Val, 0, { hook: 'dozen' }],
  // ==== PhoneNumber ====
  // 1 800 555-1234 → PhoneNumber
  ['(1|+1) #Value #PhoneNumber', PhoneNumber],
  // (454) 232-9873 → PhoneNumber
  ['#Numeric #PhoneNumber', PhoneNumber],

  // ==== Currency ====
  // chinese yuan → Currency
  ['#Dem #Currency', 'Currency'],
  // ==== Money ====
  // [5] dollars → Money
  ['[#Value+] #Currency', 'Money', 0],

  // ==== Ordinal ====

  // ==== Units ====
  // Currency can be assigned by left/right rules, so keep this correction late.
  // 5 [dollars] → Unit
  ['#Value+ [#Currency]', Unit, 0],
  // kilometers an hour → Unit
  ['#Unit an hour', Unit],

  // ==== Magnitudes ====
  // thousand and two → Value
  [`#Multiple+ and #Value`, Val],
  // 5 miles [per hour] → Unit
  ['#Value #Unit [(per|an) (hr|hour|sec|second|min|minute)]', Unit, 0],
  // twelve percent → Percent Unit
  ['#Card percent', '#Percent #Unit'],

  // === person/person-phrase.js ===

  // ==== FirstNames ====
  // is [foo] Smith → FirstName
  ['#Cop [(#NN|#Pres)] #Last', First, 0, { n: '#Ger' }],
  // pope francis → Person
  ['(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #Prop', Pers, null, { safe: true }],

  // ==== Nickname ====
  // Dwayne '[the rock]' Johnson → Person
  ['#First [#Det #NN] #Last', Pers, 0],
  // John b Smith → Person
  ['#Prop (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #Prop', Pers, null, { safe: true }],
  // J. Smith → Person
  ['#Acronym #Last', Pers, null, { safe: true }],
  // John jr → Person
  ['#Pers (jr|sr|md)', Pers],
  // Dr. J. → Person
  ['#Hon #Acronym', Pers],
  // John [b] → [Acronym, 'Pers']
  ['#First [/^[bdefghjlmnopqstvwxyz]$/]', [Acronym, 'Pers'], 0],
  // Ludwig van Beethoven → Person
  ['#NN van der? #NN', Pers, null, { safe: true }],
  // king of spain → Person
  ['(king|queen|prince|saint|lady) of #NN', Pers, null, { safe: true }],
  // prince Paris → Person
  ['(prince|lady) #Place', Pers],
  // saint Foo → Person
  ['(king|queen|prince|saint) #Prop', Pers, null, { n: '#Place' }],

  // al Smith → Person
  ['al (#Pers|#Prop)', Pers, null, { safe: true }],
  // ferdinand de almar → Person
  ['#First de #NN', Pers],
  // Osama bin Laden → Person
  ['#First (bin|al) #NN', Pers],
  // John L. Foo → Person
  ['#First #Acronym #Prop', Pers],
  // Mr Foo → Person
  ['#Hon #First? #Prop', Pers],
  // peter the great → Person
  ['#First the #Adj', Pers],

  // John van Smith → Person
  ['#Prop (van|al|bin) #Prop', Pers, null, { safe: true }],
  // jose de Sucre → Person
  ['#Prop (de|du) la? #Prop', Pers, null, { n: '#Place' }],
  // Jani K. Smith → FirstName Person .
  ['#Sing #Acronym #Last', '#First #Pers .', null, { safe: true }],
  // [Toronto] John → Person
  ['[#Prop] #Pers', Pers, 0, { safe: true }],
  // john [keith jones] → Person
  ['#Pers [#Prop #Prop]', Pers, 0, { n: '#Poss', safe: true }],
  // John [Foo] → LastName
  ['#First #Acronym? [#Prop]', Last, 0, { n: '#Poss' }],
  // Joe K. Sombrero → Person
  ['#First #Acronym #NN', Pers, null, { safe: true }],
  // Anthony [de] Marco → LastName
  ['#First [(de|di|du|van|von)] #Pers', Last, 0],

  // baker jenna smith
  // { match: '[#Actor+] #Person', group: 0, tag: 'Person' },
  // [sergeant] major Harold → Honorific
  [
    '[(lieutenant|corporal|sergeant|captain|qeen|king|admiral|major|colonel|marshal|president|queen|king)+] #Prop',
    'Hon',
    0,
  ],
  // ==== Honorics ====
  // [general] John → ['Hon', 'Pers']
  ['[(private|general|major|rear|prime|field|count)] #Hon? #Pers', ['Hon', 'Pers'], 0],
  // [Miss] John → ['Hon', 'Pers']
  ['[(miss && @isTitleCase)] #Pers', ['Hon', 'Pers'], 0],
  // dr john [foobar] → LastName
  ['#Hon #First [#Sing]', Last, 0, { n: '#Poss', safe: true }],
  // [his excellency] John → Honorific
  ['[(his|her) (majesty|honour|worship|excellency|honorable)] #Pers', 'Hon', 0],
  // Dr teacher → Honorific
  ['#Hon #Actor', 'Hon'],
  // [first lady] michelle obama → Honorific
  ['[first lady] #Pers', 'Hon', 0],
  // Louis IV → Person
  ['#Pers the? #RomanNumeral', Pers],

  // === person/ambig-name.js ===
  // const personAdj = '(misty|rusty|dusty|rich|randy|sandy|young|earnest|frank|brown)'

  // ebenezer scrooge → . LastName
  ['#First #NN$', '. #Last', null, { n: '(#Poss|#Org|#Place|#Pron|@hasTitleCase)' }],

  // June Smith → Person
  ['%Person|Date% #Acronym? #Prop', Pers],
  // ===person-noun===
  // Cliff Clavin → Person
  ['%Person|Noun% #Acronym? #Prop', Pers, null, { safe: true }],
  // Rose Microsoft → Organization
  ['%Person|Noun% #Org', Org],
  // ===person-verb===
  // Ollie Faroo → Person
  ['(%Person|Verb% && #Pers) #Acronym? #Prop', Pers, null, { ifNo: '#Actor' }],

  // ===person-verb===
  // really [wade] → Verb
  [`#Adv [(%Person|Verb% && !@isTitleCase)]`, Vb, 0],
  // [drew] closer → Verb
  [`[%Person|Verb%] (#Adv|#Comp)`, Vb, 0],
  // wade smith → Person
  [`(%Person|Verb% && #Pers) #Pers`, Pers],
  // Wade G. Slapgoop → Person
  [`%Person|Verb% #Acronym #Prop`, Pers],
  // Will Smith → Person
  ['(will && @isTitleCase) #Prop', Pers],
  // jack [layton] won → LastName
  ['(#First && !#Poss) [#Sing] #V', Last, 0, { safe: true }],
  // [captain] John walks → Person
  ['^[#Sing] #Pers #V', Pers, 0, { safe: true }],

  // === verbs/verbs.js ===

  // is [pretty] good → Adverb
  ['#Cop [(pretty|dead|full|well|sure)] #Adj', Adv, 0],
  // adj -> gerund
  // i [like] → PresentTense
  ['(#Mod|i|they|we|do) not? [like]', Pres, 0],
  // ==== Tense ====
  // he [left] → PastTense
  ['(#NN && !#Poss) #Adv? [left]', Past, 0],
  // she [bit] her tongue → PastTense
  ['#NN #Adv? [(bit && #Inf)]', Past, 0],
  // will [be] running → Copula
  ['will #Adv? not? #Adv? [be] #Ger', Cop, 0],
  // will [be] nice → Copula
  ['will #Adv? not? #Adv? [be] #Adj', Cop, 0],
  // [march] up → Infinitive
  ['[march] (up|down|back|toward)', Inf, 0, { n: '#Date' }],
  // birds [home] to their nest → Infinitive
  ['(#Pron|#Plur|#Mod) #Adv+? [home] to', Inf, 0],
  // is [home] to birds → Noun
  ['(#Cop|be|been|being) #Adv+? [home] to', NN, 0],
  // is [subject] to change → Adjective
  ['(#Cop|be|been|being|remain|remains|remained) #Adv+? [subject] to', Adj, 0],
  // is subject [to] → Preposition; remove Conjunction
  ['(#Cop|be|been|being|remain|remains|remained) #Adv+? subject [to]', Prep, 0, { u: 'Conj' }],
  // is subject to [change] → Noun
  ['(#Cop|be|been|being|remain|remains|remained) #Adv+? subject to [%Noun|Verb%]', NN, 0],

  // is home [to] dogs → Preposition; remove Conjunction
  ['(#Cop|be|been|being) #Adv+? home [to] #Adj+? #NN', Prep, 0, { u: 'Conj' }],

  // === misc==
  // were being [run] → PastTense
  [`(were|was) being [#Pres]`, Past, 0],
  // had [been broken] → Auxiliary Participle
  [`(had|has|have) [been (#Past && /en$/)]`, 'Aux VBN', 0],
  // had [been] eaten → Auxiliary
  [`(had|has) #Adv? [been] #Adv? #Past`, 'Aux', 0],
  // had to [Google] the answer → Infinitive
  ...['had', 'has'].map(word => [`${word} to [#NN] (#Det|#Poss)`, Inf, 0]),
  // does that [work] → Infinitive
  [`(do|does|did|#Mod) (this|that|these|those) [work]`, Inf, 0],
  // have read → Auxiliary Participle
  [`(has|have|had) read`, 'Aux VBN'],
  // jobs that fit → . Preposition Infinitive
  ['#Plur that %Noun|Verb%', '. #Prep #Inf'],
  // [works] for me → PresentTense
  ['[works] for me', Pres, 0],
  // as we [please] → Infinitive
  ['as #Pron [please]', Inf, 0],
  // verb-prefixes - '[co] write'
  // [co] write → ['V', 'Prefix']
  [
    '[(co|mis|de|inter|intra|pre|re|un|counter)] (#V && !#Cop && !#PhrV)',
    ['V', 'Prefix'],
    0,
    { n: '(#Acronym && @isUpperCase)' },
  ],
  // Keep verb prefixes late: early tagging hides prepositions in left-out-type.
  // [out] run → ['V', 'Prefix']
  ['[(out|under|over)] #Inf', ['V', 'Prefix'], 0],
  // dressed and [left] → PastTense
  ['#Past and [%Adj|Past%]', Past, 0],
  // [melted] and fallen → PastTense
  ['[(%Adj|Past% && !#Adj)] and #Past', Past, 0],
  // is he [stoked] → Adjective
  ['#Cop #Pron [%Adj|Past%]', Adj, 0],

  // === adjective/adj-verb.js ===

  // Resume fragments: developed [scalable React] architecture. → PastTense
  [
    '^[developed] (#Adj|#Prop)+? (backend|frontend|software|architecture|applications|apps|systems)',
    Past,
    0,
    { n: '(#Pres|#Cop|#Mod)' },
  ],
  // does [mean] → Infinitive
  ['does (#Adv|not)? [%Adj|Present%]', Inf, 0],
  // [okay] by me → Adjective
  ['[(fine|okay|cool|ok)] by me', Adj, 0],
  // i [mean] → PresentTense
  ['i (#Adv|do)? not? [mean]', Pres, 0],
  // the ship will near the coast → Auxiliary Infinitive
  ['will #Adj', 'Aux Inf'],
  // I [frequent] this restaurant → Verb
  ['#Pron [#Adj] #Det #Adj? #NN', Vb, 0],
  // rude and [insulting] → Adjective
  ['#Adj and [(%Adj|Gerund% && #Ger)] !#Prep?', Adj, 0],
  // got [tired] of → Adjective
  ['got #Adv? [%Adj|Past%] of', Adj, 0],
  // felt [cheated] → Adjective
  ['(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#Adv|#Adj)? [#Past]', Adj, 0],
  // felt [cheated]
  // { m: '(seem|feel|seemed|felt) [#Past #Particle?]', g: 0, t: 'Adj' },
  // a bit [confused] → Adjective
  ['a (bit|little|tad) [#Past #Particle?]', Adj, 0],
  // do not be [embarrassed] → Adjective
  ['not be [%Adj|Past% #Particle?]', Adj, 0],
  // is just [tired] → Adjective
  ['#Cop just [%Adj|Past% #Particle?]', Adj, 0],
  // [failed] and oppressive → Adjective
  ['[%Adj|Past%] and #Adj', Adj, 0],
  // the fear or [heightened] emotion → Adjective
  ['(#Det|#Prep) #Adj? #NN or [#Past] #NN', Adj, 0, { n: '(#Cop|#Pron)' }],
  // tired and overworked describes a state after a copula → Adjective
  [
    '#Cop #Adv? #Adj and [(overworked|overwhelmed|overpaid|underpaid|overqualified|underqualified|understaffed)]$',
    Adj,
    0,
  ],
  // their [declared] intentions → Adjective
  ['#Poss [#Past] #NN', Adj, 0, { n: '#Cop' }],
  // is he [cool] → Adjective
  ['#Cop #Pron [%Adj|Present%]', Adj, 0],
  // is [crowded] with → Adjective
  [
    '#Cop [%Adj|Past%] with',
    Adj,
    0,
    { n: '(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)' },
  ],
  // is [empty] → Adjective
  ['#Cop #Adv? [%Adj|Present%]$', Adj, 0],
  // she is being [cool] → Adjective
  ['being #Adv? [%Adj|Present%]', Adj, 0],
  // does the store [open] → Infinitive
  ['(does|will) #Det #NN [%Adj|Present%]$', Inf, 0],

  // === verbs/auxiliary.js ===
  // these are some of our heaviest-used matches

  // ought not [to] walk → Auxiliary
  ['ought (#Adv|not)+? [to] (#Adv|not)+? #V', 'Aux', 0],
  // ought to [be] walking → Auxiliary
  ['ought (#Adv|not)+? to (#Adv|not)+? [be] (#Adv|not)+? #V', 'Aux', 0],
  // will [have] walked → Auxiliary
  [`will (#Adv|not)+? [have] (#Adv|not)+? #V`, 'Aux', 0],
  // [was] walking → Auxiliary
  [`[#Cop] (#Adv|not)+? (#Ger|#Past)`, 'Aux', 0],
  // [would] walk → Auxiliary
  [`[(#Mod|did)+] (#Adv|not)+? #V`, 'Aux', 0],
  // would [have] [had] to go → Auxiliary
  [`#Mod (#Adv|not)+? [have] (#Adv|not)+? [had] (#Adv|not)+? #V`, 'Aux', 1],
  // [will] walk → Auxiliary
  ['[(do|does|did|will|have|had|has|got)] (not|#Adv)+? #V', 'Aux', 0, { n: '#Prop' }],
  // [about to] go → ['Aux', 'V']
  ['[about to] #Adv? #V', ['Aux', 'V'], 0],
  // would [be] walking → Auxiliary
  [`#Mod (#Adv|not)+? [be] (#Adv|not)+? #V`, 'Aux', 0],
  // was [being] driven → Auxiliary
  ['[(be|being|been)] #VBN', 'Aux', 0],
  // was [being] walked → Auxiliary
  ['#Cop (#Adv|not)+? [(be|being|been)] #Adv+? #Past', 'Aux', 0],
  // [been] walking → Auxiliary
  ['[(be|been)] (#Adv|not)+? #Ger', 'Aux', 0],
  // [used to] walk → Auxiliary
  ['[used to] #Pres', 'Aux', 0],
  // was [going to] walk → Auxiliary
  ['#Cop (#Adv|not)+? [going to] #Adv+? #Pres', 'Aux', 0],
  // going to [be] watched → Auxiliary
  ['going to (#Adv|not)+? [be] (#Adv|not)+? #Past', 'Aux', 0],
  // there is [no] x → Negative
  ['(is|was) #Adv? [no]', 'Neg', 0],
  // [been] told → Auxiliary
  ['[(been|had|became|came)] #Past', 'Aux', 0, { n: '#PhrV' }],
  // [being] born → Auxiliary
  ['[(being|having|getting)] #V', 'Aux', 0],
  // [better] go → Modal
  ['[better] #Pres', Mod, 0, { n: '(#Cop|#Ger)' }],

  // === verbs/phrasal.js ===

  // walk-up → PhrasalVerb
  ['(#V && @hasHyphen && !#Past) up', Phrasal],
  // walk-off → PhrasalVerb
  ['(#V && @hasHyphen) off', Phrasal],
  // walk-over → PhrasalVerb
  ['(#V && @hasHyphen) over', Phrasal],
  // walk-out → PhrasalVerb
  ['(#V && @hasHyphen) out', Phrasal],
  // [walk in] on → PhrasalVerb Particle
  ['[#V (in|out|up|down|off|back)] (on|in)', 'PhrV Particle', 0, { n: '#Cop' }],
  // went [on] for → PhrasalVerb
  ['(lived|went|crept|go) [on] for', Phrasal, 0],
  // the curtains come down → PhrasalVerb Particle
  ['#V (up|down|in|on|for)$', 'PhrV #Particle', null, { n: '#PhrV' }],
  // work in the office → Verb Preposition Determiner; remove PhrasalVerb
  ['#PhrV (in && #Particle) #Det', '#V #Prep #Det', null, { u: 'PhrV' }],
  // back it [up] → Adverb
  ...['up', 'down'].map(word => [`#V (him|her|it|us|himself|herself|itself|everything|something) [${word}]`, Adv, 0]),
  // runs [around] the lake → Preposition
  ['#PhrV [around] the #NN', Prep, 0],

  // === verbs/imperative.js ===
  // this is really hard to do
  //we do not go

  // do not [go] → Imperative
  ['^do not? [#Inf #Particle?]', 'Imp', 0, { n: notIf }],
  // please [go] → Imperative
  ['^please do? not? [#Inf #Particle?]', 'Imp', 0],
  // just [go] → Imperative
  ['^just do? not? [#Inf #Particle?]', 'Imp', 0],
  // [go] quickly. → Imperative
  ['^[(#Inf && !#Hyphenated)] (#Adj|#Adv|hard|high|fast|slow)$', 'Imp', 0, { n: '(so|such|rather|enough)' }],
  // [turn] down the noise → Imperative
  ['^[#Inf] (up|down|over) #Det', 'Imp', 0],
  // [eat] my shorts → Imperative
  ['^[#Inf] (your|my|the|a|an|any|each|every|some|more|with|on)', 'Imp', 0, { n: 'like' }],
  // Wait for word-specific corrections such as 'wit me' before tagging commands.
  // [tell] him the story → Imperative
  ['^[#Inf] (him|her|it|us|me|there)', 'Imp', 0],
  // [avoid] loud noises → Imperative
  ['^[#Inf] #Adj #NN$', 'Imp', 0],
  // [come] and have a drink → Imperative
  ['^[#Inf] (#Adj|#Adv)? (and|or) #Inf', 'Imp', 0],
  // Keep isolated commands here: pre-tagging also runs on replacement words. → Imperative
  ['^[go] please?$', 'Imp', 0],
  ['^[stop] please?$', 'Imp', 0],
  ['^[wait] please?$', 'Imp', 0],
  ['^[hurry] please?$', 'Imp', 0],
  // let's [leave] → Imperative
  ['^let (us|me) [#Inf]', 'Imp', 0],
  // [shut] the door → Imperative
  ['^[(shut|close|open|start|stop|end|keep)] #Det #NN', 'Imp', 0],
  // [turn off] the light → Imperative
  ['^[#PhrV #Particle] #Det #NN', 'Imp', 0],
  // A modal question alone may ask about ability or knowledge. Require an
  // explicit request marker before treating it as an imperative.
  // can you please [walk] → Imperative
  ['^(can|could|will|would) you (#Adv|not)+? please (#Adv|not)+? [#Inf]', 'Imp', 0],
  // please can you [walk] → Imperative
  ['^please (can|could|will|would) you (#Adv|not)+? [#Inf]', 'Imp', 0],
  // can you [walk] please → Imperative
  ['^(can|could|will|would) you (#Adv|not)+? [#Inf] .+? please$', 'Imp', 0],
  // come have a drink → Imperative
  ['^come #Inf', 'Imp', null, { n: 'on' }],
  // come and have a drink → Imperative . Imperative
  ['^come and #Inf', 'Imp . Imp'],
  // [allow] yourself → Imperative
  ['^(and|but)? (then|please)? [#Inf] (yourself|yourselves)', 'Imp', 0],
  // [look] what happened → Imperative
  ['^[#Inf] what .', 'Imp', 0],
  // [go] to it → Imperative
  ['^[#Inf] (to|for|into|toward|here|there)', 'Imp', 0],
  // [maintain] eye contact → Imperative
  ['^[#Inf] #Adj? #Sing #Sing', 'Imp', 0],
  // don't forget to [clean] → Imperative
  ['^do not (forget|omit|neglect) to [#Inf]', 'Imp', 0],
  // [add] 2 eggs → Imperative
  ['^[#Inf] #Value #NN', 'Imp', 0],

  // === verbs/adj-gerund.js ===

  // The station was [closing]. The shop is [closing] soon. → Gerund
  ['#Cop #Adv+? [closing] (#Adv|soon)+?$', Ger, 0],
  // that were [growing] → Gerund
  ['(that|which) were [%Adj|Gerund%]', Ger, 0],

  // === _misc.js ===
  // order matters

  // the captain [who] → Determiner
  ['#NN [(who|whom)]', Det, 0],
  // who is [that]? → Pronoun
  ['^#QW #Adv+? #Cop #Adv+? [(this|that|these|those)] #Adv+?$', Pron, 0],
  // I like [this] → Pronoun
  ['#V [(this|that|these|those)] #Adv+? (yesterday|today|tonight|tomorrow)?$', Pron, 0],
  // some sort of → Determiner Noun Preposition
  ['some sort of', 'Det NN Prep'],
  // of some sort → Preposition Determiner Noun
  ['of some sort', 'Prep Det NN'],
  // [some] eat apples → Pronoun
  ['^[some] #Inf #NN', Pron, 0],
  // put it [there] → Adverb
  ['(put|puts|putting|place|placed|leave|left) #Pron [there]', Adv, 0],
  // [such] skill → Determiner
  ['[such] (a|an|is)? #NN', Det, 0],
  // [there] she is → There
  ['[there] (#Adv|#Pron)? #Cop', 'There', 0],
  // is [there] food → There
  ['#Cop [there] .', 'There', 0],
  // should [there] → There
  ['#Mod #Adv? [there]', 'There', 0],
  // the person [who] runs → Preposition
  ['#Det #NN+ [who] #V', Prep, 0],
  // the person [which] eats → Preposition
  ['#Det #NN+ [which] #V', Prep, 0],
  // guess who → Infinitive QuestionWord
  ['guess who', '#Inf #QW'],
  // [fucking] ridiculous → Gerund
  ['[fucking] !#V', '#Ger', 0],

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

  // university of Toronto → Organization
  ['university of #Place', Org],
  // Name pairs can be business names without a known organization suffix. → ProperNoun
  ['#Prop & #Prop', Prop],
  // John & Mary Ltd → Organization
  [`#Pers & #Pers ${companySuffix}`, Org],
  // Smith & Rogers → Organization
  ['#Last & #Last', Org],
  // Microsoft of Canada
  // { m: '#Org of the? #Prop', t: 'Org', safe: true },
  // walmart USA → Organization
  ['#Org #Country', Org],
  // Toronto Microsoft → Organization
  ['#Prop #Org', Org, null, { n: '#First' }],
  // FitBit Inc → Organization
  ['#Prop (ltd|co|inc|dept|assn|bros)', Org],
  // the [XYZ corporation] → Organization
  [`the [#Acronym ${companySuffix}]`, Org, 0, { safe: true }],
  // [government of india] → Organization
  ['[government of the? #Place+]', Org, 0],
  // global Microsoft → Organization
  ['(world|global|international|national|#Dem) #Org', Org],
  // Toronto public school → School
  ['#NN+ (public|private) school', 'School'],
  // Toronto Yankees → SportsTeam
  ['#Place+ #SportsTeam', SportsTeam],
  // 'toronto fc' → SportsTeam
  ['#Place+ fc', SportsTeam],

  // the new orleans basketball team → Organization
  ['#Place+ #NN{0,2} (club|society|group|team|committee|commission|association|guild|crew)', Org],

  // === nouns/places.js ===

  // ==== Region ====
  // west Toronto → Region
  ['(west|north|south|east|western|northern|southern|eastern)+ #Place', Region],
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  // Toronto [ca] → Region
  ['#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]', Region, 0],
  // Portland [OR] → Region
  ['portland [(or && @isUpperCase)]', Region, 0],
  // with [turkey] → Uncountable; remove Place
  ['with [(turkey && !@isTitleCase)]', Uncountable, 0, { u: Place }],
  // Toronto point → Place
  ['#Prop+ (cliff|place|range|pit|place|point|room|grounds|ruins)', Place],
  // 123 main street → Address
  [
    '#Value #NN+ (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave|lane|boulevard|blvd|drive|dr|parkway|way)',
    'Address',
  ],
  // port dover → Place
  ['(port|mount|mt) #Prop', Place],

  // === conjunctions.js ===

  // [how] he is driving → Conjunction
  ...['who', 'what', 'where', 'why', 'how', 'when'].map(word => [`[${word}] #NN #Cop #Adv? (#V|#Adj)`, Conj, 0]),
  // things [that] seem cool → Conjunction
  ['#NN [that] #V #Adj', Conj, 0],
  // he was [that] wide → Adverb
  ['#NN #Cop not? [that] #Adj', Adv, 0],
  // [to] lunch → Preposition; remove Conjunction
  ['[to] (#NN && !#V)', Prep, 0, { u: 'Conj' }],
  // I heard rumors [that] drivers save gas → Preposition
  ['#V #Adv? #NN [(that|which)]', Prep, 0],
  // Tuesday, [which] he liked → Preposition
  ['@hasComma [which] (#Pron|#V)', Prep, 0],
  // treated them [like] sons → Preposition
  ['(me|him|her|us|them|it) [like] #NN', Prep, 0],
  // a day [like] this → Preposition
  ['a #NN [like] (#NN|#Det)', Prep, 0],
  // really [like] → Verb
  ['(#Adv && !lot) [like]', Vb, 0],
  // is not [like] me → Preposition
  ['(#Cop|be|been|being) (not|never) [like]', Prep, 0],
  // a lot [like] ours → Preposition
  ['a lot [like] #NN', Prep, 0],
  // treat them [like] → Preposition
  ['#Inf #Pron [like]', Prep, 0],
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
  // { match: '^(how|which)', tag: 'QuestionWord' },
  // [how] he → Preposition
  ['[(#QW && !do && !does)] (#Pron|#Det) !#Cop', Prep, 0, { n: 'what the (hell|heck)' }],
  // children [who] dance → Preposition
  ['#Plur [(who|which|when)] .', Prep, 0],

  // === expressions.js ===

  // come on → Expression
  ['^come on', Expr],
  // // [well]..
  // { m: '^[well] !#Adj?', g: 0, t: 'Expr' },
  // // [so]
  // { m: '^[so] !#Adj?', g: 0, t: 'Expr' },
  // // [okay]
  // { m: '^[okay] !#Adj?', g: 0, t: 'Expr' },
  // // [now]
  // { m: '^[now] !#Adj?', g: 0, t: 'Expr' },
  // // shoot,
  // { m: '^(shoot && @hasComma)', t: 'Expr' },
  // // say,
  // { m: '^(say && @hasComma)', t: 'Expr' },
  // // like, hello
  // { m: '^(like && @hasComma)', t: 'Expr' },

  // Rules promoted from the second pass.

  // const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'

  // Which chair did she [sit] [on]?

  // veggies, [like] kale → Preposition
  ['(#NN && @hasComma) [like] #NN', Prep, 0],
  // Everyone [but] me agreed. → Preposition
  ...['everyone', 'everybody', 'everything', 'anyone', 'anybody', 'anything', 'nobody', 'nothing', 'all'].map(word => [
    `${word} [but] (me|him|her|us|them|#Det|#Poss|#Prop)`,
    Prep,
    0,
  ]),
  // images on a screen [like] humans do → Preposition
  ['#NN [like] #NN+ (do|does|did)$', Prep, 0],
  // cities [like] New York, Boston → Preposition
  ...['', '#Place ', '#Place #Place '].map(prefix => [`#Plur [like] ${prefix}(#Place && @hasComma) #Place`, Prep, 0]),
  // [Like] his brother, he enjoys chess → Preposition
  ['^[like] (#Det|#Poss)? #Adj+? (#NN && @hasComma)', Prep, 0],
  // I like tea, [like] my sister does. → Conjunction
  [`@hasComma [like] ${subject} ${predicate}`, Conj, 0],
  // We talked about the fact [that] she resigned. → Conjunction
  [`#NN [that] ${subject} ${predicate}`, Conj, 0],
  // I have heard that story [before] → Adverb
  ['#V (#Det|#Poss)? #NN+? [(before|since)]$', Adv, 0, { n: '@hasQuestionMark' }],
  // Who did she arrive [before]? → Preposition
  ['^(who|whom) #V #Pron #V [before]$', Prep, 0],
  // We will leave [when] the rain stops. → Conjunction
  ['#Mod #Inf [when] #Det', Conj, 0],

  // [has] running water → remove Auxiliary; possession is not progressive
  ['[(have|has|had)] running water', null, 0, { u: 'Aux' }],
  // [is] enduring art → remove Auxiliary; enduring modifies the noun
  ['[#Cop] (enduring && #Adj) #NN', null, 0, { u: 'Aux' }],
  // Although he [was] [tired], he smiled. He [was] [tired].
  ...['[(#Cop|been)] #Adv+? [tired]$', '[(#Cop|been)] #Adv+? [(tired && @hasComma)]'].flatMap(match => [
    // Although he [was] [tired], he smiled. He [was] [tired]. → Copula; remove Passive
    [match, Cop, 0, { u: 'Pass' }],
    // Although he [was] [tired], he smiled. He [was] [tired]. → remove Auxiliary
    [match, null, 0, { u: 'Aux' }],
    // Although he was [tired], he smiled. He was [tired]. → Adjective (second capture)
    [match, Adj, 1],
  ]),
  // had been tired → remove Passive
  ['(has|have|had) (#Adv|not)+? been #Adv+? tired$', null, null, { u: 'Pass' }],
  // 23 Main Street in Toronto → Place
  ['#Address in #Place', Place],
  // the [sleeping] dog → Adjective
  ['#Det [sleeping] (#Actor|#Pers|puppy|kitten|dog|cat|baby|babies|child|children)', Adj, 0],
  // [water] broke the pipe → Noun
  ['^[%Noun|Verb%] #Past (#Det|#Poss) #Adj+? #NN', NN, 0],
  // the [present] immediately → Noun
  ['#Det [present] #Adv+$', NN, 0],
  // [falls in] June → Verb Preposition
  ['[(fall|falls|fell) in] #Month', '#V #Prep', 0],
  // [had] he walked → Condition
  ['^[had] #NN+ (#Adv|not)+? #Past', 'Condition', 0, { n: '@hasQuestionMark' }],
  // [were] he to walk → Condition
  ['^[were] #NN+ to #Inf *$', 'Condition', 0, { n: '@hasQuestionMark' }],
  // [had] he walked? → Auxiliary
  ['^[had] #NN+ (#Adv|not)+? (#Past && @hasQuestionMark)$', 'Aux', 0, { n: '@hasComma' }],
  // [had] he walked the dog? → Auxiliary
  ['^[had] #NN+ (#Adv|not)+? #Past * @hasQuestionMark$', 'Aux', 0, { n: '@hasComma' }],
  // [This] will be one sentence. [This] might help. → Pronoun
  ['[this] #Adv+? #Mod #Adv+? #Inf', Pron, 0],
  // has [read], had [put] → Participle
  ...['read', 'put'].map(word => [`(has|have|had) (#Adv|not)+? [${word}]`, Participle, 0]),
  // John and Mary [walk] → Infinitive
  ['#Pers and #Pers [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$', Inf, 0],
  // dogs [near] the house [bark]
  // near|on|under|beside|behind
  ...['near', 'on', 'under', 'beside', 'behind'].flatMap(word => [
    // dogs [near] the house bark → Preposition
    [`#Plur [${word}] #Det #Adj+? #NN [%Noun|Verb%]$`, Prep, 0],
    // dogs near the house [bark] → Infinitive (second capture)
    [`#Plur [${word}] #Det #Adj+? #NN [%Noun|Verb%]$`, Inf, 1],
  ]),
  // has eaten and [drunk] → Participle
  ['(has|have|had) (#Adv|not)+? #Past (and|or) #Adv+? [drunk]', Participle, 0],
  // officers and [kids] would leave → Plural
  ['#Plur and [%Plural|Verb%] #Mod', Plur, 0],
]

const matches = expandRules(rules)

// console.log('  ', matches.length, 'matches first-pass')

export default {
  two: {
    matches,
  },
}
