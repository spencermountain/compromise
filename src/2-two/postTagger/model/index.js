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
  Aux,
  Pass,
  Imp,
  Prefix,
  Hon,
  Money,
} from '../../preTagger/tagSet/_lib.js'
import expandRules from './expand-rules.js'
import { subject, predicate } from './_phrases.js'

const noLy = '(hard|fast|late|early|high|right|deep|close|direct)'
const infNouns =
  '(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)'
const notIf = '(i|we|they)' //we do not go
const companySuffix = '(inc|ltd|llc|co|corp|corporation|company|limited)'
const fractionNoun = '(the|this|that|each|every|last|final|next|#Ord|#Poss)'
const singularDet = 'a|an|this|that|each|every|another'
const afterModal = '#Inf|have|not' // may [be], may [have], may [not]
const titles =
  '(lieutenant|corporal|sergeant|captain|admiral|major|colonel|marshal|president|queen|king|minister|senator|governor|chancellor|mayor|judge|congressman|chairman|professor|ambassador)'

// is, remains, ... with any adverbs
const copula = '(#Cop|be|been|being|remain|remains|remained) #Adv+?'
// the poor, the rich → a noun phrase, not an adjective
const theGroup = 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)'
// gerunds that take an object, so the next word is a noun
const activeGer = 'impersonating|practicing|considering|assuming'

// [match, tag, group, options]; omit group to tag the full match.

// order matters top-matches can get overwritten
const rules = [
  // let the dough [rest] overnight → Infinitive
  ['let (#Det|#Poss)? #Adj+? #NN [(%Noun|Verb% && !#Plur)] (overnight|outside|inside|here)$', Inf],
  // === verbs/passive.js ===

  // got walked → Passive
  ['got (#Past|#VBN)', Pass],
  // was walked; were walked → Passive (keep word-specific hooks)
  ...['were', 'was', 'is', 'are', 'am'].map(word => [`${word} (#Past|#VBN)`, Pass]),
  // was being walked → Passive
  ['(was|were|is|are|am) being (#Past|#VBN)', Pass],
  // had been walked → Passive
  ['(had|have|has) been (#Past|#VBN)', Pass],
  // will be cleaned → Passive
  ['will be being? (#Past|#VBN)', Pass],
  // dog was [walked] by the man → Passive
  ['#NN (am|is|are|was|were) #Adv? [(#Past|#VBN)] by (the|a) #NN', Pass],

  // === adjective/adjective.js ===

  // Restore the copula when the colour is written without a hyphen.
  // [is] off white → Copula; remove PhrasalVerb
  ['[(is|are|am|was|were)] off white$', Cop, { u: Phrasal }],
  // is [off white] → Adjective
  ['(is|are|am|was|were) [off white]$', Adj],
  // [all] the dogs → Noun
  ['[(all|both)] #Det #NN', NN],
  // the door is [closed] → Adjective
  ['#Sing is #Adv? [%Adj|Past%]$', Adj],
  // [forgotten] art is rediscovered → Adjective
  ['[#Past] #Sing is', Adj],
  // [forgotten] stories are lost → Adjective (not: i said times are changing)
  ['(#NN && !#Poss)? [#Past] #Plur are', Adj, { n: '(#NN && !#Poss) #Past' }],
  // is [fucked up] → Adjective
  ['#Cop [fucked up?]', Adj],
  // jury is out - preposition ➔ adjective
  // jury is [out] → Adjective
  ['#Cop #Adj? [(out|in|through)]$', Adj],
  // [quiet] the room → Infinitive
  ['^[(#Adj && !near && !inside && !outside && !opposite)] (the|your) #NN', Inf, { n: '(all|even)' }],
  // blue-[tinted] → Adjective
  ['(#Adj && #Hyphenated) [(#Hyphenated && #Past)]$', Adj],
  // [blue-tinted] glasses → Adjective
  ['[#Hyphenated (#Hyphenated && #Past)] (#NN|#Conj)', Adj, { n: '#Adv' }],
  // [non-breaking] spaces → Adjective
  ['[#Hyphenated (#Hyphenated && #Ger)] (#NN|#Conj)', Adj, { n: '#Adv' }],
  // [dammed-up] river → Adjective
  ['[#Past (#Hyphenated && #PhrV)] (#NN|#Conj)', Adj],

  // === adjective/adj-adverb.js ===

  // is [far too] cold → Adverb
  [`#Cop [far too] #Adj`, Adv],
  // shops [direct] → Adverb
  [
    `#V [${noLy}] !#NN?`,
    Adv,
    0,
    { n: '(#Cop|be|been|being|get|got|getting|become|became|becoming|feel|feels|feeling|#Det|#Prep)' },
  ],
  // Bare 'be' may still be Infinitive rather than Copula in commands.
  // [moons] a lot → PresentTense
  [`[#Plur] a lot !like?`, Pres],

  // === adjective/adj-gerund.js ===
  // Gerund-Adjectives - 'amusing, annoying'

  // found it [isolating], but found it isolating cells → Adjective
  ['found it #Adv? [isolating]$', Adj],
  // a little [fuming] → Adjective
  ['a (little|bit|wee) bit? [#Ger]', Adj],
  // repairing [crumbling] roads → Adjective
  [
    '#Ger [#Ger] #NN',
    Adj,
    0,
    { n: `(${activeGer}|enjoying|avoiding|stopping|starting|finishing)` },
  ],
  // looked [amazing] → Adjective
  ['(looked|look|looks) #Adv? [%Adj|Gerund%]', Adj, { n: `(${activeGer})` }],
  // meaning alluring → Gerund Adjective
  ['%Noun|Gerund% %Adj|Gerund%', 'Ger #Adj'],

  // === adjective/adj-noun.js ===

  // his [fine] → Noun
  ['(his|its) [%Adj|Noun%] !#NN?', NN, { n: '#Hyphenated' }],
  // is [all] → Noun, but not 'is all right'
  ['#Cop #Adv? [(all && !#Adv)]', NN],
  // have [fun] with it → Noun
  [`(have|had) [#Adj] #Prep .`, NN],
  // brewing giant → Noun
  [`#Ger (giant|capital|center|zone|application)`, NN],
  // in a [perfect] → Noun
  [`#Prep (a|an) [#Adj]$`, NN],
  // [brand] new → Adverb
  [`[brand #Ger?] new`, Adv],
  // must-win → Adjective
  [`(must && #Hyphenated) .`, Adj],
  // the [present] → Noun
  [`#Det [#Adj]$`, NN, { n: '(this|that|#Comp|#Sup)' }], //are that crazy.
  // company-wide → Adjective
  [`(#NN && #Hyphenated) (#Adj && #Hyphenated)`, Adj, { n: '(this|that|#Comp|#Sup)' }],
  // the [poor] were
  // {
  //   m: `#Det [#Adj] (#Cop|#Det)`,
  //   n: '(#Comp|#Sup)',
  //   g: 0,
  //   t: 'NN',
  // },
  // [professional] bodybuilder → Adjective
  [`[(%Adj|Noun% && !#Tz && !#Val)] #NN`, Adj, { n: '(#Pron|#Prop)' }],

  // === adverb.js ===

  // [way] too hot → Adverb
  ['[way] #Adv #Adj', Adv],
  // [way] too soon → Adverb (not: on his way up)
  ['[way] (too|more|less|so) #Adv', Adv],
  // sing [like] an angel → Adverb
  ['#V  [like]', Adv, { n: '(#Mod|#PhrV)' }],
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
  ['a [(little|bit|wee) bit?] #Adj', Adv],
  // become overly [weakened] → Adjective
  ['(become|fall|grow) #Adv? [#Past]', Adj],
  // a completely [beaten] man → Adjective
  ['(a|an) #Adv [#VBN] #NN', Adj],
  // a [close] friend
  // { m: '#Det #Adv? [close] #NN', g: 0, t: 'Adj' },
  // does [better] → Adverb
  ['(do|does|did) #Adv? [(better|worse)]', Adv],
  // walking [close] → Adverb
  ['#Ger #Adv? [close]', Adv, { n: '(getting|becoming|feeling)' }],
  // charged [back] → Adverb
  ['(#Pres|#Past) [back]', Adv, { n: '(#PhrV|#Cop)' }],
  // the [well] → Noun
  ['#Det [well] !#Past?', NN, { n: 'well made' }],
  // sees [well] → Adverb
  ['(#Pres && !#Cop) [well]', Adv],

  // === dates/date.js ===

  // ==== WeekDay ====
  // [sun] the 5th → WeekDay
  ['[sun] the #Ord', WeekDay],
  // 1pm next [sun] → WeekDay
  ['#Date (on|this|next|last|during)? [sun]', WeekDay],
  // (stays here - it repairs the later left-right rule '#Prep _ -> #Month')
  [`(as|than) [may] #Adv? (${afterModal})`, Mod],

  // === dates/date-phrase.js ===

  // 5th of June → Date
  ['#Val of #Month', Date],
  // 5 June
  // { m: '#Card #Month', t: 'Date' },
  // June 5 to 7 → Date
  ['#Month #Val to #Val', Date],
  // June the 12th → Date
  ['#Month the #Val', Date],
  // june 7 → Date
  ['(#WeekDay|#Month) #Val', Date],
  // 7 june → Date
  ['#Val (#WeekDay|#Month)', Date],
  // aug 5th 2021 → Date
  [`#Month #Ord #Card`, Date],

  // === timezones ===
  // china standard time → Timezone
  [`(#Place|#Dem) (standard|daylight|central|mountain)? time`, Timezone],

  // === nouns/nouns.js ===

  //'more' is not always an adverb
  // due to [weather] → Noun
  ['due to [#V]', NN],

  // my first [thought] → Noun
  ['#Poss #Ord [#Past]', NN],
  // the nice [walk] → Noun
  ['(the|this|those|these) #Adj [%Noun|Verb%]', NN, { n: '#Cop' }],
  // the truly nice [swim] → Noun
  ['(the|this|those|these) #Adv #Adj [#V]', NN],
  // the [message] from Danny → Noun
  ['the [#V] #Prep .', NN],
  // a type of [shout] → Noun
  ['#Det #NN of [#V]', NN, { n: '#Ger' }],
  // waited until [release] → Noun
  ['#Past #Prep [#Pres]', NN, { n: '#Ger' }],
  // water-flows → Noun (#Hyphenated is a rarer hook than #Sing; both halves carry it)
  ['(#Sing && #Hyphenated && !must) (#Pres && #Hyphenated)', NN],
  // is no [going] back → Noun
  ['is no [#V]', NN],
  // and check this out! a [walk-in] microwave. → Noun
  [
    '(the|those|these|a|an) #Adj? [(#Pres && !#Ger && !#Cop && !seem && !appear && !include) #Particle?]',
    NN,
    0,
    { n: theGroup },
  ],

  // ==== Actor ====
  // Aircraft designer → Actor
  ['#NN #Actor', Actor, { n: '(#Pers|#Pron)' }],
  // lighting designer → Actor
  ['#Ger #Actor', Actor],
  // captain sanders
  // { match: '[#Actor+] #ProperNoun', group: 0, tag: 'Honorific' },
  // co founder → Actor
  [`co #Sing`, Actor],
  // [aircraft] designer → Actor
  [`[#NN+] #Actor`, Actor, { n: '(#Hon|#Pron|#Poss)' }],
  // fine-artist → Actor
  [
    `(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #NN? #Actor`,
    Actor,
  ],
  // dance coach → Actor
  [`(#NN && !#Pron) (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)`, Actor],
  // chief design officer → Actor
  [`chief . officer`, Actor],
  // chief of police → Actor
  [`chief of #NN+`, Actor],
  // president of marketing → Actor
  [`senior? vice? president of #NN+`, Actor],

  // ==== Singular ====
  // did a [900], paid a [20] → Singular
  ['#V (a|an) [#Val]$', Sing],

  // ==== Possessive ====
  // John Smith's → Possessive
  ['#First #Acronym? (#Poss && #Last)', Poss],
  // Microsoft Research's office → Possessive
  ['#Org+ #Poss', Poss],
  // Los Angeles's fundraiser → Possessive
  ['#Place+ #Poss', Poss],
  // my butt smells → Noun
  ['#Poss #Pres #Particle?', NN, { n: '(#Ger|#Cop|her)' }], // anna's eating vs anna's eating lunch
  // my [teachers] dog → Possessive
  ['(my|our|their|her|his|its) [(#Plur && #Actor)] #NN', Poss],

  // 10th of a [second] → Singular; remove Value
  ['#Val of a [second]', Sing, { u: Val }],
  // the euro [sense] → Noun
  [`#Det #NN [${infNouns}] !(#Prep|to|#Adv)?`, NN],
  // [thanks] for the gift are overdue → Plural
  ['[#Pres] (of|by|for) (a|an|the) #NN #Cop', Plur],
  // You eat and [sleep] → Infinitive
  ['#Inf and [%Noun|Verb%]', Inf],
  // dogs and [running] and cats → Noun
  ['#NN and [#V] and #NN', NN],
  // the 1992 [classic] → Noun
  ['the #Card [%Adj|Noun%]', NN],
  // This is the [premier] university in Virginia → Adjective
  ['#Cop the [%Adj|Noun%] #NN', Adj],

  // i ate [me] sandwich (scottish slang)
  // { m: 'i #V [me] #NN', g: 0, t: 'Poss' },
  // He bowed his [head] in prayer → Noun
  ['#Past #Poss [#V]', NN, { n: '(saw|made)' }],
  // 35 [signs] → Plural
  ['#Val [%Plural|Verb%]', Plur, { n: '(one|1|a|an)' }],
  // a 4 hour [drive] → Noun
  ['#Val (#Dur && #Sing) [%Noun|Verb%]', NN],
  // had [time] → Noun
  ['had [%Noun|Verb%]', NN, { n: '(#Ger|come|become)' }],
  // instant access → Adjective Noun
  ['(%Adj|Noun% && !#Tz) %Noun|Verb%', '#Adj #NN', { n: '#Prop #NN' }],
  // near death experiences, ambitious sales [targets] → Plural
  // (not 'a good plan helps', where a singular determiner leads the noun)
  [`(${singularDet})? #Adv+? #Adj+ #NN [%Plural|Verb%]$`, Plur, { n: `(#Pron|${singularDet})` }],
  // your guild [colors] → Plural
  ['#Poss #NN [(colors|colours)]$', Plur],

  // === verbs/noun-gerund.js ===

  // the [upcoming thank]-you → Singular
  ['(this|that|the|a|an) [#Ger #Inf]', Sing],
  // the [upcoming thank]-you → Plural
  ['(that|the) [#Ger #Pres]', Plur, { ifNo: '#Cop' }],
  // lexical [tagging] → Noun
  ['#Adj [#Ger]', NN, { n: '(still|even|just)' }],
  // [walking] is cool → Activity
  ['[#Ger] #Adv? not? #Cop', 'Activity'],
  // are [doing] is → Gerund
  ['#Cop [(#Ger|#Activity)] #Cop', Ger],
  // responsibility for [setting] → Gerund
  ['#Sing for [%Noun|Gerund%]', Ger],
  // better for [training] → Gerund
  ['#Comp (for|at) [%Noun|Gerund%]', Ger],
  // apologized for [shouting] → Gerund
  ['(#Past|#Pres) for [%Noun|Gerund%]', Ger],
  // he reads the [upcoming] → Noun
  ['#Pres the [#Ger]', NN],
  // the only painting → Noun
  ['#Det only [%Noun|Gerund%]', NN],

  // === verbs/verb-noun.js ===

  // A final button label is an object, not a second verb. → PresentTense Noun
  ...['click', 'clicks'].map(word => [`(#Pron|#Sing|#Plur) [${word} (submit|save|cancel)]$`, 'Pres NN']),
  // Common intransitive predicates after a singular subject. Keep arbitrary
  // plural/verb switches conservative: 'the dog treats' is a noun phrase.
  // the dog [runs] → PresentTense
  ...['runs', 'walks', 'barks', 'sleeps'].map(word => [`^(#Det|#Poss) #Adj+? #Sing #Adv+? [${word}] #Adv+?$`, Pres]),
  // with heads and [arms] rolling around
  // { m: '#Prep #Plur and [%Plural|Verb%] #Ger', g: 0, t: 'Plur' },
  // he can solve the [puzzle] → Noun
  ['#Inf (this|that|the) [#Inf]', NN],
  // keeping the [matter] a secret → Noun
  ['#Ger #Det [#Inf]', NN],
  // the-only-[reason] → Noun
  ['#Det (only|further|just|more|backward) [#Inf]', NN],
  // the [slide] makes noise → Noun
  ['(the|this|a|an) [#Inf] #Adv? #V', NN],
  // Use a pointed [stick] (a pencil) or a similar tool → Noun
  ['#Det #Adj #Adj? [#Inf]', NN, { n: theGroup }],
  // the American [thank]-you letter → Noun
  ['#Det #Dem [#Pres]', NN],
  // the next career [read] is brief → Noun
  ['#Adj #NN+ [#Inf] #Cop', NN],
  // at some [thank]-you party → Noun
  ['at some [#Inf]', NN],
  // goes [to sleep] → Preposition Noun
  ['(go|goes|went) [to (sleep|work)]', 'Prep NN'],
  // a dog [retrieve] in the field → Noun
  ...['a', 'an'].map(word => [`${word} #Adj? #NN [#Inf] (#Prep|#NN)`, NN, { n: 'from' }]),
  // a software [reinstall] → Noun
  ['(a|an) #NN [#Inf]$', NN],
  // working for [thank]-you letters → Noun
  ['#Ger #Adj? for [#Inf]', NN],
  // artists on [thank]-you cards → Noun
  ['#Plur on [#Inf]', NN],
  // number of [thank]-yous → Noun
  ['number of [#Pres]', NN],
  // make [sense] → Noun
  ['(try|use|attempt|build|make) [%Noun|Verb% #Particle?]', NN, { n: '(#Cop|#NN|sure|fun|up)' }], //make sure of
  // [append] is cloned → Noun
  ['^[#Inf] (is|was)', NN],
  // get much [thank]-you mail
  // { m: '#Inf much [#Inf]', g: 0, t: 'NN' },
  // [cause] i gotta → Conjunction
  ['[cause] #Pron #V', Conj],
  // the US [air] force
  // {
  //   m: 'the #Sing [#Inf] (#NN && !#Poss)',
  //   g: 0,
  //   t: 'NN',
  //   n: '#Pron',
  // },
  // this [rocks] → PresentTense
  ['this [#Plur]', Pres, { n: '(#Prep|#Date)' }],
  // the thing [that runs] → Conjunction PresentTense
  ['#NN [that %Plural|Verb%]', 'Conj Pres', { n: '(#Prep|#Pron|way)' }],
  // that [leads] to
  // { m: 'that [#Plur] to', g: 0, t: 'Pres', n: '#Prep' },
  // let him [father] a child → Infinitive
  ...['let', 'make', 'made'].map(word => [`${word} (him|her|it|#Pers|#Place|#Org)+ [#Sing] (a|an|the|it)`, Inf]),
  // assign all [tasks] → Noun
  ['#V (all|every|each|most|some|no) [#Pres]', NN, { n: '#Mod' }], // PresentTense/Noun ambiguities
  // Possession and copulas; other past verbs use wide-support below. → Noun
  ['(had|have|was|were) #Adj [#Pres]', NN, { n: 'better' }],
  // one big [thank]-you → Noun
  ['#Val #Adj [#Pres]', NN, { n: '#Cop' }],
  // found all [upcoming] words → Noun
  ['#Past #Adj+ [#Pres]', NN, { n: '(#Cop|better)' }],
  // many [thanks] → Noun
  ['(many|few|several|couple) [#Pres]', NN, { n: '#Cop' }],
  // a very big [dream] → Noun
  ['#Det #Adv #Adj [%Noun|Verb%]', NN, { n: '#Cop' }],
  // from start to [finish] → Noun
  ['from #NN to [%Noun|Verb%]', NN],
  // for comparison or [contrast] → Noun
  ['(for|with|of) #NN (and|or|not) [%Noun|Verb%]', NN, { n: '#Pron' }],
  // cute little [thank]-you bags → Noun
  ['#Adj #Adj [#Pres]', NN, { n: '#Cop' }],
  // writing bigger [thank]-you notes → Noun
  ['#Ger #Adv? #Comp [#Pres]', NN, { n: '#Cop' }],
  // to write people [thanks] for helping → Noun
  [`to #Pres #NN [#Pres] #Prep`, NN],
  // waited until [release]
  // {
  //   m: `#Past (until|as|through|without) [(#Pres && !#Ger && !#Cop)]`,
  //   g: 0,
  //   t: 'NN',
  // },
  // selling like hot [thank]-you cards → Plural
  [`#Ger like #Adj? [#Pres]`, Plur],
  // some nice [thank]-you notes → Noun
  [`some #Adj [#Pres]`, NN],
  // for some [thank]-you letters → Noun
  [`for some [#Pres]`, NN],
  // same kind of [shouts] → Noun
  [`(same|some|the|that|a) kind of [#Pres]`, NN],
  // a type of [shout] → Noun
  [`(same|some|the|that|a) type of [#Pres]`, NN],
  // looking good in [thank]-you photos → Noun
  [`#Ger #Adj #Prep [#Pres]`, NN],
  // get better [thank]-you notes → Noun
  [`(get|got|have) #Comp [#Pres]`, NN],
  // give up on [thank]-you letters → Noun
  [`#PhrV #Particle #Prep [#Pres]`, NN],
  // there are [thank]-you notes → Plural
  ['there (are|were) #Adj? [#Pres]', Plur],
  // a thousand [thanks] of gratitude → Plural
  ['#Val [#Pres] of', Plur, { n: '(one|1|#Cop|#Inf)' }],
  // [thanks] are appreciated → Plural
  ['[#Pres] (are|were) #Adj', Plur],
  // [hope] i helped → Infinitive
  ['^[(hope|guess|thought|think)] #Pron #V', Inf],
  // its proper [functioning] → Noun
  ['#Poss #Adj [#V]', NN, { n: '#Cop' }],
  // [tastes] good → PresentTense
  ['[(tastes|smells)] #Adv? #Adj', Pres],
  // Being introduces a predicate rather than a direct object.
  // she is writing [thank]-you letters → Noun
  ['#Cop (#Ger && !being) [(#Pres && !#Ger && !#Cop)] !by?', NN, { n: 'going' }],
  // the [shed] → Noun
  ['#Det #Adj? [(shed|thought|rose|bid|saw|spelt)]', NN],
  // how to [watch] → Infinitive
  ['how to [%Noun|Verb%]', Inf],
  // ready to [stream] → Infinitive
  ['(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]', Inf],
  // bring [to market] → Preposition Noun
  ['(bring|went|go|drive|run|bike) [to (market|work|court|school|bed|church|prison)]', 'Prep NN'],
  // can i [sleep], would you [look] → Infinitive
  ['#Mod #NN [%Noun|Verb%]', Inf],
  // is just [spam] → Noun
  ['#Cop just [#Inf]', NN],
  // request copies → Imperative Plural
  ['^%Noun|Verb% %Plural|Verb%', 'Imp #Plur'],
  // homemade pickles and [drinks] → Plural
  ['#Adj #Plur and [%Plural|Verb%]', '#Plur'],
  // the 1968 [stand]-off → Noun
  ['#Det #Year [#V]', NN],
  // the [break up] → Noun
  ['#Det [(#PhrV && !#Past) #Particle]', NN],
  // the [individual] goals → Adjective
  ['#Det [(%Adj|Noun% && !#Val)] #NN', Adj, { n: '(#Pron|#Poss|#Prop)' }],
  // [work] or prepare → Infinitive
  ['^[%Noun|Verb%] or #Inf', Inf],
  // to give [thanks] → Noun
  ['to #Inf [#Pres]', NN, { n: '(#Ger|#Cop|help)' }],
  // [Google] me → Verb
  ['[(#NN && !#Pron)] me', Vb],
  // removes wrinkles → PresentTense Plural
  ['%Plural|Verb% %Plural|Verb%', '#Pres #Plur'],
  // i [Google] the answer → Infinitive
  ['i [#NN] the #NN', Inf],
  // did the engine [stop] → Infinitive
  ['(did|does|will) the #NN [%Noun|Verb%]', Inf],
  // 40 gallons of [water] → Noun
  ['#Val #NN of [%Noun|Verb%]', NN],
  // When the rain [stops], we will leave. Whenever the bell [rings], the dog barks.
  // when the dog [looks] → PresentTense
  ...['stops', 'looks', 'rings'].map(word => [
    `(when|whenever|before|after|until|since|as|while|than) (#Det|#Poss) #Adj+? #NN [(%Plural|Verb% && ${word})]$`,
    Pres,
    0,
  ]),
  // The sun [rose]. The river [rose] quickly. → PastTense
  ['(sun|moon|river|water|tide|temperature|prices|he|she|we|they|i) [rose] #Adv+?$', Past],

  // === numbers/money.js ===

  // $5 and $6 → Money
  ['#Money and #Money #Currency?', Money],
  // 6 dollars [and] 5 cents → Money
  ['#Val #Currency [and] #Val (cents|ore|centavos|sens)', Money],
  // 5 rand → Money Currency
  ['#Val (mark|rand|won|rub|ore)', '#Money #Currency'],
  // a pound → Money Unit
  ['a pound', '#Money #Unit'],
  // 3 pounds → Money Unit
  ['#Val (pound|pounds)', '#Money #Unit'],

  // === numbers/fractions.js ===

  // [half] a penny, [quarter] of a dollar → Fraction
  // (not the third quarter of the game, or my half of the deal)
  ['[(a|one) (half|quarter)] of? (a|an|the)', Frac, { u: Date }],
  [`${fractionNoun}? [(a|one)? (half|quarter)] of #Pron`, Frac, { n: `${fractionNoun} (half|quarter)`, u: Date }],
  [
    `${fractionNoun}? #Adj? [(half|quarter)] of? (a|an|the)`,
    Frac,
    0,
    { n: `${fractionNoun} #Adj? (half|quarter)`, u: Date },
  ],
  // two and a half → Fraction
  ['#Card and a half', Frac],
  // two-halves → Fraction
  ['#Val (halves|halfs|quarters)', Frac],

  // [seven] fifths → Fraction
  ['[#Card+] (#Frac && /s$/)', Frac],
  // [two thirds] of it → Fraction
  // (a singular one is an ordinal: the twenty first of may)
  // [100th] of it → Fraction
  ['[(#Numeric && #Ord)] of .', Frac],
  // [a twenty fifth] of it → Fraction
  ['[(a|one) #Card?+ #Ord] of', Frac],

  // a sixteenth, one twenty fifth (without a following noun) → Fraction
  ['[(a|one) #Card+? (#Ord && !first && !second)]$', Frac],
  ['(a|one) (half|quarter)$', Frac],

  // 3 out of 5 → Fraction
  ['#Card+ out? of every? #Card', Frac],

  // === numbers/numbers.js ===

  // version [10.11.12] → Singular; remove Date (but not release 15.03.2020)
  [
    '(version|ver|v|build|patch|firmware|kernel|revision|rev|release) [(#Date && /\\.[0-9][0-9]?$/)]',
    Sing,
    0,
    { u: Date },
  ],
  // ==== Ambiguous numbers ====
  // with [a] hundred jobs → Value
  ...['hundred', 'thousand', 'million', 'billion', 'trillion'].map(word => [`!once? [(a|an)] ${word}`, Val]),
  // with [a] dozen eggs → Value
  ['!once? [a] dozen', Val, { hook: 'dozen' }],
  // ==== PhoneNumber ====
  // 1 800 555-1234 → PhoneNumber
  ['(1|+1) #Val #PhoneNumber', PhoneNumber],
  // (454) 232-9873 → PhoneNumber
  ['#Numeric #PhoneNumber', PhoneNumber],

  // ==== Currency ====
  // chinese yuan → Currency
  ['#Dem #Currency', 'Currency'],
  // ==== Money ====
  // [5] dollars → Money
  ['[#Val+] #Currency', Money],

  // ==== Ordinal ====

  // ==== Units ====
  // Currency can be assigned by left/right rules, so keep this correction late.
  // 5 [dollars] → Unit
  ['#Val+ [#Currency]', Unit],
  // kilometers an hour → Unit
  ['#Unit an hour', Unit],

  // ==== Magnitudes ====
  // thousand and two → Value
  [`#Mult+ and #Val`, Val],
  // 5 miles [per hour] → Unit
  ['#Val #Unit [(per|an) (hr|hour|sec|second|min|minute)]', Unit],
  // twelve percent → Percent Unit
  ['#Card percent', '#Pct #Unit'],

  // === person/person-phrase.js ===

  // ==== FirstNames ====
  // is [foo] Smith → FirstName
  ['#Cop [(#NN|#Pres)] #Last', First, { n: '#Ger' }],
  // pope francis → Person
  ['(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #Prop', Pers, { s: true }],

  // ==== Nickname ====
  // Dwayne '[the rock]' Johnson → Person
  ['#First [#Det #NN] #Last', Pers],
  // John b Smith → Person
  ['#Prop (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #Prop', Pers, { s: true }],
  // J. Smith → Person
  ['#Acronym #Last', Pers, { s: true }],
  // Dr. J. → Person
  ['#Hon #Acronym', Pers],
  // John [b] → [Acronym, Pers] (not a, i, or texting c, k, r, u)
  ['#First [(b|d|e|f|g|h|j|l|m|n|o|p|q|s|t|v|w|x|y|z)]', [Acronym, Pers]],
  // Ludwig van Beethoven → Person
  ['#NN van der? #NN', Pers, { s: true }],
  // king of spain → Person
  ['(king|queen|prince|saint|lady) of #NN', Pers, { s: true }],
  // prince Paris → Person
  ['(prince|lady) #Place', Pers],
  // saint Foo → Person
  ['(king|queen|prince|saint) #Prop', Pers, { n: '#Place' }],

  // al Smith → Person
  ['al (#Pers|#Prop)', Pers, { s: true }],
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
  ['#Prop (van|al|bin) #Prop', Pers, { s: true }],
  // jose de Sucre → Person
  ['#Prop (de|du) la? #Prop', Pers, { n: '#Place' }],
  // Jani K. Smith → FirstName Person .
  ['#Sing #Acronym #Last', '#First #Pers .', { s: true }],
  // [Toronto] John → Person
  ['[#Prop] #Pers', Pers, { s: true }],
  // john [keith jones] → Person
  ['#Pers [#Prop #Prop]', Pers, { n: '#Poss', s: true }],
  // John [Foo] → LastName - but not John's [Honda], or Herman [USA]
  ['(#First && !#Poss) #Acronym? [(#Prop && !#Acronym)]', Last],
  // Joe K. Sombrero → Person
  ['#First #Acronym #NN', Pers, { s: true }],
  // Anthony [de] Marco → LastName
  ['#First [(de|di|du|van|von)] #Pers', Last],

  // baker jenna smith
  // { match: '[#Actor+] #Person', group: 0, tag: 'Person' },
  // [sergeant major] Harold → Honorific - but not [King] Street
  // a title is also #Prop, so a repeat would stop at the second one
  [`[${titles} ${titles}?] (#Prop && !#Place)`, Hon],
  // [vice chairman] Harold, [deputy prime minister] Harold → Honorific
  ['[(senior|executive|deputy)? (vice|prime|deputy) (#Actor|premier|chair|principal)] #Prop', Hon],
  // ==== Honorics ====
  // [general] John → [Hon, Pers]
  ['[(private|general|major|rear|prime|field|count)] #Hon? #Pers', [Hon, Pers]],
  // [Miss] John → [Hon, Pers]
  ['[(miss && @isTitleCase)] #Pers', [Hon, Pers]],
  // dr john [foobar] → LastName
  ['#Hon #First [#Sing]', Last, { n: '#Poss', s: true }],
  // [his excellency] John → Honorific
  ['[(his|her) (majesty|honour|worship|excellency|honorable)] #Pers', Hon],
  // Dr teacher → Honorific
  ['#Hon #Actor', Hon],
  // [first lady] michelle obama → Honorific
  ['[first lady] #Pers', Hon],
  // Louis IV → Person
  ['#Pers the? #RomNum', Pers],

  // === person/ambig-name.js ===
  // const personAdj = '(misty|rusty|dusty|rich|randy|sandy|young|earnest|frank|brown)'

  // ebenezer scrooge → . LastName
  // not 'we saw John there' - only the first name is capitalized
  // not 'i gave john money' - this verb needs a person and a thing
  // not 'john things', 'john everyone' - indefinite pronouns are tagged as nouns
  [
    '(give|gives|gave|giving|lend|lends|lent|hand|hands|handed|buy|buys|bought)? #First [#NN]$',
    Last,
    0,
    {
      n: '(#Poss|#Org|#Place|#Pron|there|/things?$/|someone|anyone|everyone|somebody|anybody|everybody|nobody|@isTitleCase !@isTitleCase|#Verb . !@isTitleCase)',
    },
  ],
  // Jack [D.], Yong-[hwa]
  ['#First (#Acronym|#Hyphenated)$', '. #Last', { n: '(#Poss|#Org|#Place|#Pron|!#NN)' }],

  // June Smith → Person
  ['%Person|Date% #Acronym? #Prop', Pers],
  // ===person-noun===
  // Cliff Clavin → Person
  ['%Person|Noun% #Acronym? #Prop', Pers, { s: true }],
  // Rose Microsoft → Organization
  ['%Person|Noun% #Org', Org],
  // ===person-verb===
  // Ollie Faroo → Person
  ['(%Person|Verb% && #Pers) #Acronym? #Prop', Pers, { ifNo: '#Actor' }],

  // ===person-verb===
  // [drew] closer → Verb
  [`[%Person|Verb%] (#Adv|#Comp)`, Vb],
  // Will Smith → Person
  ['(will && @isTitleCase) #Prop', Pers],
  // jack [layton] won → LastName
  ['(#First && !#Poss) [#Sing] #V', Last, { s: true }],
  // [captain] John walks → Person
  ['^[#Sing] #Pers #V', Pers, { s: true }],

  // === verbs/verbs.js ===

  // is [pretty] good → Adverb
  ['#Cop [(pretty|dead|full|well|sure)] #Adj', Adv],
  // adj -> gerund
  // i [like] → PresentTense
  ['(#Mod|i|they|we|do) not? [like]', Pres],
  // ==== Tense ====
  // he [left] → PastTense
  ['(#NN && !#Poss) #Adv? [left]', Past],
  // she [bit] her tongue → PastTense
  ['#NN #Adv? [(bit && #Inf)]', Past],
  // will [be] running → Copula
  ['will #Adv? not? #Adv? [be] #Ger', Cop],
  // will [be] nice → Copula
  ['will #Adv? not? #Adv? [be] #Adj', Cop],
  // birds [home] to their nest → Infinitive
  ['(#Pron|#Plur|#Mod) #Adv+? [home] to', Inf],
  // is [subject] to change → Adjective
  [`${copula} [subject] to`, Adj],
  // is subject [to] → Preposition; remove Conjunction
  [`${copula} subject [to]`, Prep, { u: Conj }],
  // is subject to [change] → Noun
  [`${copula} subject to [%Noun|Verb%]`, NN],

  // is home [to] dogs → Preposition; remove Conjunction
  ['(#Cop|be|been|being) #Adv+? home [to] #Adj+? #NN', Prep, { u: Conj }],

  // === misc==
  // were being [run] → PastTense
  [`(were|was) being [#Pres]`, Past],
  // had [been broken], had [been known] → Auxiliary Participle
  [`(had|has|have) [been (#Past && /[ew]n$/)]`, 'Aux VBN'],
  // had [been] eaten → Auxiliary
  [`(had|has) #Adv? [been] #Adv? #Past`, Aux],
  // had to [Google] the answer → Infinitive
  ...['had', 'has'].map(word => [`${word} to [#NN] (#Det|#Poss)`, Inf]),
  // does that [work] → Infinitive
  [`(do|does|did|#Mod) (this|that|these|those) [work]`, Inf],
  // have read → Auxiliary Participle
  [`(has|have|had) read`, 'Aux VBN'],
  // jobs that fit → . Preposition Infinitive
  ['#Plur that %Noun|Verb%', '. #Prep #Inf'],
  // [works] for me → PresentTense
  ['[works] for me', Pres],
  // as we [please] → Infinitive
  ['as #Pron [please]', Inf],
  // verb-prefixes - '[co] write'
  // [co] write → [Vb, Prefix]
  [
    '[(co|mis|de|inter|intra|pre|re|un|counter)] (#V && !#Cop && !#PhrV)',
    [Vb, Prefix],
    0,
    { n: '(#Acronym && @isUpperCase)' },
  ],
  // Keep verb prefixes late: early tagging hides prepositions in left-out-type.
  // [out] run → [Vb, Prefix]
  ['[(out|under|over)] #Inf', [Vb, Prefix]],
  // dressed and [left] → PastTense
  ['#Past and [%Adj|Past%]', Past],
  // [melted] and fallen → PastTense
  ['[(%Adj|Past% && !#Adj)] and #Past', Past],
  // is he [stoked] → Adjective
  ['#Cop #Pron [%Adj|Past%]', Adj],

  // === adjective/adj-verb.js ===

  // Resume fragments: developed [scalable React] architecture. → PastTense
  [
    '^[developed] (#Adj|#Prop)+? (backend|frontend|software|architecture|applications|apps|systems)',
    Past,
    0,
    { n: '(#Pres|#Cop|#Mod)' },
  ],
  // does [mean] → Infinitive
  ['does (#Adv|not)? [%Adj|Present%]', Inf],
  // [okay] by me → Adjective
  ['[(fine|okay|cool|ok)] by me', Adj],
  // i [mean] → PresentTense
  ['i (#Adv|do)? not? [mean]', Pres],
  // the ship will near the coast → Auxiliary Infinitive
  ['will #Adj', 'Aux Inf'],
  // I [frequent] this restaurant → Verb
  ['#Pron [#Adj] #Det #Adj? #NN', Vb],
  // rude and [insulting] → Adjective
  ['#Adj and [(%Adj|Gerund% && #Ger)] !#Prep?', Adj],
  // felt [cheated] → Adjective
  ['(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#Adv|#Adj)? [#Past]', Adj],
  // felt [cheated]
  // { m: '(seem|feel|seemed|felt) [#Past #Particle?]', g: 0, t: 'Adj' },
  // a bit [confused] → Adjective
  ['a (bit|little|tad) [#Past #Particle?]', Adj],
  // do not be [embarrassed] → Adjective
  ['not be [%Adj|Past% #Particle?]', Adj],
  // is just [tired] → Adjective
  ['#Cop just [%Adj|Past% #Particle?]', Adj],
  // [failed] and oppressive → Adjective
  ['[%Adj|Past%] and #Adj', Adj],
  // the fear or [heightened] emotion → Adjective
  ['(#Det|#Prep) #Adj? #NN or [#Past] #NN', Adj, { n: '(#Cop|#Pron)' }],
  // tired and overworked describes a state after a copula → Adjective
  [
    '#Cop #Adv? #Adj and [(overworked|overwhelmed|overpaid|underpaid|overqualified|underqualified|understaffed)]$',
    Adj,
    0,
  ],
  // their [declared] intentions → Adjective
  ['#Poss [#Past] #NN', Adj, { n: '#Cop' }],
  // is he [cool] → Adjective
  ['#Cop #Pron [%Adj|Present%]', Adj],
  // is [crowded] with → Adjective
  [
    '#Cop [%Adj|Past%] with',
    Adj,
    0,
    { n: '(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)' },
  ],
  // is [empty] → Adjective
  ['#Cop #Adv? [%Adj|Present%]$', Adj],
  // she is being [cool] → Adjective
  ['being #Adv? [%Adj|Present%]', Adj],
  // does the store [open] → Infinitive
  ['(does|will) #Det #NN [%Adj|Present%]$', Inf],

  // === verbs/auxiliary.js ===
  // these are some of our heaviest-used matches

  // ought not [to] walk → Auxiliary
  ['ought (#Adv|not)+? [to] (#Adv|not)+? #V', Aux],
  // ought to [be] walking → Auxiliary
  ['ought (#Adv|not)+? to (#Adv|not)+? [be] (#Adv|not)+? #V', Aux],
  // will [have] walked → Auxiliary
  [`will (#Adv|not)+? [have] (#Adv|not)+? #V`, Aux],
  // [was] walking → Auxiliary
  [`[#Cop] (#Adv|not)+? (#Ger|#Past)`, Aux],
  // [would] walk → Auxiliary
  [`[(#Mod|did)+] (#Adv|not)+? #V`, Aux],
  // would [have] [had] to go → Auxiliary
  [`#Mod (#Adv|not)+? [have] (#Adv|not)+? [had] (#Adv|not)+? #V`, Aux, 1],
  // [will] walk → Auxiliary
  ['[(do|does|did|will|have|had|has|got)] (not|#Adv)+? #V', Aux, { n: '#Prop' }],
  // [about to] go → [Aux, Vb]
  ['[about to] #Adv? #V', [Aux, Vb]],
  // would [be] walking → Auxiliary
  [`#Mod (#Adv|not)+? [be] (#Adv|not)+? #V`, Aux],
  // was [being] driven → Auxiliary
  ['[(be|being|been)] #VBN', Aux],
  // was [being] walked → Auxiliary
  ['#Cop (#Adv|not)+? [(be|being|been)] #Adv+? #Past', Aux],
  // [been] walking → Auxiliary
  ['[(be|been)] (#Adv|not)+? #Ger', Aux],
  // [used to] walk → Auxiliary
  ['[used to] #Pres', Aux],
  // was [going to] walk → Auxiliary
  ['#Cop (#Adv|not)+? [going to] #Adv+? #Pres', Aux],
  // going to [be] watched → Auxiliary
  ['going to (#Adv|not)+? [be] (#Adv|not)+? #Past', Aux],
  // there is [no] x → Negative
  ['(is|was) #Adv? [no]', 'Neg'],
  // [been] told → Auxiliary
  ['[(been|had|became|came)] #Past', Aux, { n: '#PhrV' }],
  // [being] born → Auxiliary
  ['[(being|having|getting)] #V', Aux],
  // [better] go → Modal
  ['[better] #Pres', Mod, { n: '(#Cop|#Ger)' }],

  // === verbs/phrasal.js ===

  // walk-up → PhrasalVerb
  ['(#V && @hasHyphen && !#Past) up', Phrasal],
  // walk-off, walk-over, walk-out → PhrasalVerb
  ...['off', 'over', 'out'].map(word => [`(#V && @hasHyphen) ${word}`, Phrasal]),
  // [walk in] on → PhrasalVerb Particle
  ['[#V (in|out|up|down|off|back)] (on|in)', 'PhrV Particle', { n: '#Cop' }],
  // went [on] for → PhrasalVerb
  ['(lived|went|crept|go) [on] for', Phrasal],
  // the curtains come down → PhrasalVerb Particle
  ['#V (up|down|in|on|for)$', 'PhrV #Particle', { n: '#PhrV' }],
  // work in the office → Verb Preposition Determiner; remove PhrasalVerb
  ['#PhrV (in && #Particle) #Det', '#V #Prep #Det', { u: Phrasal }],
  // back it [up] → Adverb
  ...['up', 'down'].map(word => [`#V (him|her|it|us|himself|herself|itself|everything|something) [${word}]`, Adv]),
  // runs [around] the lake → Preposition
  ['#PhrV [around] the #NN', Prep],

  // === verbs/imperative.js ===
  // this is really hard to do
  //we do not go

  // do not [go] → Imperative
  ['^do not? [#Inf #Particle?]', Imp, { n: notIf }],
  // please [go] → Imperative
  ['^please do? not? [#Inf #Particle?]', Imp],
  // just [go] → Imperative
  ['^just do? not? [#Inf #Particle?]', Imp],
  // [go] quickly. → Imperative
  // (moved to preTagger/compute/tagger/3rd-pass/08-imperative.js)
  // ['^[(#Inf && !#Hyphenated)] (#Adj|#Adv|hard|high|fast|slow)$', Imp, { n: '(so|such|rather|enough)' }],
  // [turn] down the noise → Imperative
  ['^[#Inf] (up|down|over) #Det', Imp],
  // [eat] my shorts → Imperative
  ['^[#Inf] (your|my|the|a|an|any|each|every|some|more|with|on)', Imp, { n: 'like' }],
  // Wait for word-specific corrections such as 'wit me' before tagging commands.
  // [tell] him the story → Imperative
  ['^[#Inf] (him|her|it|us|me|there)', Imp],
  // [avoid] loud noises → Imperative
  ['^[#Inf] #Adj #NN$', Imp],
  // [come] and have a drink → Imperative
  ['^[#Inf] (#Adj|#Adv)? (and|or) #Inf', Imp],
  // Keep isolated commands here: pre-tagging also runs on replacement words. → Imperative
  ...['go', 'stop', 'wait', 'hurry'].map(word => [`^[${word}] please?$`, Imp]),
  // let's [leave] → Imperative
  ['^let (us|me) [#Inf]', Imp],
  // [shut] the door → Imperative
  ['^[(shut|close|open|start|stop|end|keep)] #Det #NN', Imp],
  // [turn off] the light → Imperative
  ['^[#PhrV #Particle] #Det #NN', Imp],
  // A modal question alone may ask about ability or knowledge. Require an
  // explicit request marker before treating it as an imperative.
  // can you please [walk] → Imperative
  ['^(can|could|will|would) you (#Adv|not)+? please (#Adv|not)+? [#Inf]', Imp],
  // please can you [walk] → Imperative
  ['^please (can|could|will|would) you (#Adv|not)+? [#Inf]', Imp],
  // can you [walk] please → Imperative
  ['^(can|could|will|would) you (#Adv|not)+? [#Inf] .+? please$', Imp],
  // come have a drink → Imperative
  ['^come #Inf', Imp, { n: 'on' }],
  // come and have a drink → Imperative . Imperative
  ['^come and #Inf', 'Imp . Imp'],
  // [allow] yourself → Imperative
  ['^(and|but)? (then|please)? [#Inf] (yourself|yourselves)', Imp],
  // [look] what happened → Imperative
  ['^[#Inf] what .', Imp],
  // [go] to it → Imperative
  ['^[#Inf] (to|for|into|toward|here|there)', Imp],
  // [maintain] eye contact → Imperative
  ['^[#Inf] #Adj? #Sing #Sing', Imp],
  // don't forget to [clean] → Imperative
  ['^do not (forget|omit|neglect) to [#Inf]', Imp],
  // [add] 2 eggs → Imperative
  ['^[#Inf] #Val #NN', Imp],

  // === verbs/adj-gerund.js ===

  // === _misc.js ===
  // order matters

  // the captain [who] → Determiner
  ['#NN [(who|whom)]', Det],
  // who is [that]? → Pronoun
  ['^#QW #Adv+? #Cop #Adv+? [(this|that|these|those)] #Adv+?$', Pron],
  // I like [this] → Pronoun
  ['#V [(this|that|these|those)] #Adv+? (yesterday|today|tonight|tomorrow)?$', Pron],
  // some sort of → Determiner Noun Preposition
  ['some sort of', 'Det NN Prep'],
  // of some sort → Preposition Determiner Noun
  ['of some sort', 'Prep Det NN'],
  // [some] eat apples → Pronoun
  ['^[some] #Inf #NN', Pron],
  // put it [there] → Adverb
  ['(put|puts|putting|place|placed|leave|left) #Pron [there]', Adv],
  // [such] skill → Determiner
  ['[such] (a|an|is)? #NN', Det],
  // [there] she is → There
  ['[there] (#Adv|#Pron)? #Cop', 'There'],
  // is [there] food → There
  ['#Cop [there] .', 'There'],
  // should [there] → There
  ['#Mod #Adv? [there]', 'There'],
  // the person [who] runs, the person [which] eats → Preposition
  ...['who', 'which'].map(word => [`#Det #NN+ [${word}] #V`, Prep]),
  // guess who → Infinitive QuestionWord
  ['guess who', '#Inf #QW'],
  // [fucking] ridiculous → Gerund
  ['[fucking] !#V', '#Ger'],

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
  // { m: '#Org of the? #Prop', t: 'Org', s: true },
  // walmart USA → Organization
  ['#Org #Country', Org],
  // Toronto Microsoft → Organization
  ['#Prop #Org', Org, { n: '#First' }],
  // FitBit Inc → Organization
  ['#Prop (ltd|co|inc|dept|assn|bros)', Org],
  // [government of india] → Organization
  ['[government of the? #Place+]', Org],
  // global Microsoft → Organization
  ['(world|global|international|national|#Dem) #Org', Org],
  // Toronto public school → School
  ['#NN+ (public|private) school', 'School'],
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
  ['#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]', Region],
  // Portland [OR] → Region
  ['portland [(or && @isUpperCase)]', Region],
  // with [turkey] → Uncountable; remove Place
  ['with [(turkey && !@isTitleCase)]', Uncountable, { u: Place }],
  // Toronto point → Place
  ['#Prop+ (cliff|place|range|pit|place|point|room|grounds|ruins)', Place],
  // 123 main street → Address
  // (not a 4 hour drive, 2,800 km road, or four wheel drive)
  [
    '#Val (#NN && !#Dur && !#Unit)+ (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave|lane|boulevard|blvd|drive|dr|parkway|way)',
    'Address',
    null,
    { n: '(#TxtNum && !@isTitleCase)' },
  ],
  // port dover → Place
  ['(port|mount|mt) #Prop', Place],

  // === conjunctions.js ===

  // [how] he is driving → Conjunction
  ...['who', 'what', 'where', 'why', 'how', 'when'].map(word => [`[${word}] #NN #Cop #Adv? (#V|#Adj)`, Conj]),
  // things [that] seem cool → Conjunction
  ['#NN [that] #V #Adj', Conj],
  // we found [that] eggs hatch → Conjunction (but not: he owns that sports car)
  ['#V #Adv? [that] (#Plur && !#Prop && !%Plural|Verb%) #Sing?', Conj, { n: 'that #Plur #Sing' }],
  // he was [that] wide → Adverb
  ['#NN #Cop not? [that] #Adj', Adv],
  // [to] lunch → Preposition; remove Conjunction
  ['[to] (#NN && !#V)', Prep, { u: Conj }],
  // I heard rumors [that] drivers save gas → Preposition
  ['#V #Adv? #NN [(that|which)]', Prep],
  // Tuesday, [which] he liked → Preposition
  ['@hasComma [which] (#Pron|#V)', Prep],
  // treated them [like] sons → Preposition
  ['(me|him|her|us|them|it) [like] #NN', Prep],
  // a day [like] this → Preposition
  ['a #NN [like] (#NN|#Det)', Prep],
  // really [like] → Verb
  ['(#Adv && !lot) [like]', Vb],
  // is not [like] me → Preposition
  ['(#Cop|be|been|being) (not|never) [like]', Prep],
  // a lot [like] ours → Preposition
  ['a lot [like] #NN', Prep],
  // treat them [like] → Preposition
  ['#Inf #Pron [like]', Prep],
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
  ['[(#QW && !do && !does)] (#Pron|#Det) !#Cop', Prep, { n: 'what the (hell|heck)' }],
  // children [who] dance → Preposition
  ['#Plur [(who|which|when)] .', Prep],

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
  ['(#NN && @hasComma) [like] #NN', Prep],
  // Everyone [but] me agreed. → Preposition
  ...['everyone', 'everything', 'anyone', 'anybody', 'anything', 'nobody', 'nothing', 'all'].map(word => [
    `${word} [but] (me|him|her|us|them|#Det|#Poss|#Prop)`,
    Prep,
    0,
  ]),
  // images on a screen [like] humans do → Preposition
  ['#NN [like] #NN+ (do|does|did)$', Prep],
  // cities [like] New York, Boston → Preposition
  ...['', '#Place '].map(prefix => [`#Plur [like] ${prefix}(#Place && @hasComma) #Place`, Prep]),
  // [Like] his brother, he enjoys chess → Preposition
  ['^[like] (#Det|#Poss)? #Adj+? (#NN && @hasComma)', Prep],
  // I like tea, [like] my sister does. → Conjunction
  [`@hasComma [like] ${subject} ${predicate}`, Conj],
  // We talked about the fact [that] she resigned. → Conjunction (not: May that year was hot)
  [`#NN [that] ${subject} ${predicate}`, Conj, { n: '#Month that #Date' }],
  // I have heard that story [before] → Adverb
  ['#V (#Det|#Poss)? #NN+? [(before|since)]$', Adv, { n: '@hasQuestionMark' }],
  // Who did she arrive [before]? → Preposition
  ['^(who|whom) #V #Pron #V [before]$', Prep],
  // We will leave [when] the rain stops. → Conjunction
  ['#Mod #Inf [when] #Det', Conj],

  // Although he [was] [tired], he smiled. He [was] [tired].
  ...['[(#Cop|been)] #Adv+? [tired]$'].flatMap(match => [
    // Although he [was] [tired], he smiled. He [was] [tired]. → Copula; remove Passive
    [match, Cop, { u: Pass }],
    // Although he [was] [tired], he smiled. He [was] [tired]. → remove Auxiliary
    [match, null, { u: Aux }],
    // Although he was [tired], he smiled. He was [tired]. → Adjective (second capture)
    [match, Adj, 1],
  ]),
  // the [sleeping] dog → Adjective
  ['#Det [sleeping] (#Actor|#Pers|puppy|kitten|dog|cat|baby|babies|child|children)', Adj],
  // [water] broke the pipe → Noun
  ['^[%Noun|Verb%] #Past (#Det|#Poss) #Adj+? #NN', NN],
  // the [present] immediately → Noun
  ['#Det [present] #Adv+$', NN],
  // [falls in] June → Verb Preposition
  ['[(fall|falls|fell) in] #Month', '#V #Prep'],
  // [had] he walked → Condition
  ['^[had] #NN+ (#Adv|not)+? #Past', 'Condition', { n: '@hasQuestionMark' }],
  // [were] he to walk → Condition
  ['^[were] #NN+ to #Inf *$', 'Condition', { n: '@hasQuestionMark' }],
  // [had] he walked? → Auxiliary
  ['^[had] #NN+ (#Adv|not)+? (#Past && @hasQuestionMark)$', Aux, { n: '@hasComma' }],
  // [had] he walked the dog? → Auxiliary
  ['^[had] #NN+ (#Adv|not)+? #Past * @hasQuestionMark$', Aux, { n: '@hasComma' }],
  // [This] will be one sentence. [This] might help. → Pronoun
  ['[this] #Adv+? #Mod #Adv+? #Inf', Pron],
  // has [read], had [put] → Participle
  ...['read', 'put'].map(word => [`(has|have|had) (#Adv|not)+? [${word}]`, Participle]),
  // John and Mary [walk] → Infinitive
  ['#Pers and #Pers [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$', Inf],
  // dogs [near] the house [bark]
  // near|on|under|beside|behind
  ...['near', 'on', 'under', 'beside', 'behind'].flatMap(word => [
    // dogs [near] the house bark → Preposition
    [`#Plur [${word}] #Det #Adj+? #NN [%Noun|Verb%]$`, Prep],
    // dogs near the house [bark] → Infinitive (second capture)
    [`#Plur [${word}] #Det #Adj+? #NN [%Noun|Verb%]$`, Inf, 1],
  ]),
  // has eaten and [drunk] → Participle
  ['(has|have|had) (#Adv|not)+? #Past (and|or) #Adv+? [drunk]', Participle],
  // officers and [kids] would leave → Plural
  ['#Plur and [%Plural|Verb%] #Mod', Plur],
]

const matches = expandRules(rules)

// console.log('  ', matches.length, 'matches first-pass')

export default {
  two: {
    matches,
  },
}
