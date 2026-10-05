import expandTags from './_lib.js'

const adverbAdj = `(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)`
const noLy = '(hard|fast|late|early|high|right|deep|close|direct)'
const infNouns =
  '(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)'
const notIf = '(i|we|they)' //we do not go
const companySuffix = '(inc|ltd|llc|co|corp|corporation|company|limited)'
const noun = '(#NN && !#Poss && !@hasComma)'
const modifiers = '(#Det|#Poss)? #RB+? #JJ+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#RB+? not? (#V && !#VBG && !#RP)'
const seatedQuestion = '^(which|what) #JJ+? #NN (did|does|do|#MD) #PRP [sit] [on]$'
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
  { m: 'got (#Past|#Part)', t: 'Pass', r: 'got-pass' },
  // Share the pattern while keeping cheap word-specific hooks.
  ...['were', 'was', 'is', 'are', 'am'].map(word => ({
    m: `${word} (#Past|#Part)`,
    t: 'Pass',
    r: `${word}-pass`,
  })),
  // was being walked
  { m: '(was|were|is|are|am) being (#Past|#Part)', t: 'Pass', r: 'being-pass' },
  // had been walked
  { m: '(had|have|has) been (#Past|#Part)', t: 'Pass', r: 'been-pass' },
  // will be cleaned
  { m: 'will be being? (#Past|#Part)', t: 'Pass', r: 'will-be-pass' },
  // dog was [walked] by the man
  {
    m: '#NN (am|is|are|was|were) #RB? [(#Past|#Part)] by (the|a) #NN',
    g: 0,
    t: 'Pass',
    r: 'suffered-by',
  },

  // === adjective/adjective.js ===

  // off-white
  { m: '(off && #Hyphenated) white', t: 'JJ', r: 'off-white' },
  // Restore the copula when the colour is written without a hyphen.
  // [is] off white
  {
    m: '[(is|are|am|was|were)] off white$',
    g: 0,
    u: 'PhrV',
    t: 'Cop',
    r: 'off-white-cop',
  },
  // is [off white]
  { m: '(is|are|am|was|were) [off white]$', g: 0, t: 'JJ', r: 'off-white-pred' },
  // [all] the dogs
  { m: '[(all|both)] #Det #NN', g: 0, t: 'NN', r: 'all-noun' },
  // the door is [closed]
  { m: '#NNs is #RB? [%Adj|Past%]$', g: 0, t: 'JJ', r: 'is-filled' },
  // [forgotten] art is rediscovered
  { m: '[#Past] #NNs is', g: 0, t: 'JJ', r: 'smoked-poutine' },
  // [forgotten] stories are lost
  { m: '[#Past] #Plur are', g: 0, t: 'JJ', r: 'baked-onions' },
  // is [fucked up]
  { m: '#Cop [fucked up?]', g: 0, t: 'JJ', r: 'swears-adj' },
  // the door seems [opened]
  { m: '#NNs (seems|appears) #RB? [#Past$]', g: 0, t: 'JJ', r: 'seems-filled' },
  // jury is out - preposition ➔ adjective
  // jury is [out]
  { m: '#Cop #JJ? [(out|in|through)]$', g: 0, t: 'JJ', r: 'still-out' },
  // [quiet] the room
  {
    m: '^[(#JJ && !near && !inside && !outside && !opposite)] (the|your) #NN',
    g: 0,
    n: '(all|even)',
    t: 'Inf',
    r: 'shut-the',
  },
  // blue-[tinted]
  {
    m: '(#JJ && #Hyphenated) [(#Hyphenated && #Past)]$',
    g: 0,
    t: 'JJ',
    r: 'red-shouldered',
  },
  // [blue-tinted] glasses
  {
    m: '[#Hyphenated (#Hyphenated && #Past)] (#NN|#Conj)',
    g: 0,
    t: 'JJ',
    n: '#RB',
    r: 'faith-based',
  },
  // [non-breaking] spaces
  {
    m: '[#Hyphenated (#Hyphenated && #VBG)] (#NN|#Conj)',
    g: 0,
    t: 'JJ',
    n: '#RB',
    r: 'self-driving',
  },
  // [dammed-up] river
  {
    m: '[#Past (#Hyphenated && #PhrV)] (#NN|#Conj)',
    g: 0,
    t: 'JJ',
    r: 'dammed-up',
  },
  // two-fold
  { m: '(#Hyphenated && #Value) fold', t: 'JJ', r: 'two-fold' },
  // must-win
  { m: 'must (#Hyphenated && #Inf)', t: 'JJ', r: 'must-win' },
  // vacuum-sealed
  {
    m: `(#Hyphenated && #Inf) #Hyphenated`,
    t: 'JJ',
    n: '#PhrV',
    r: 'vacuum-sealed',
  },
  // too much
  { m: 'too much', t: 'RB JJ', r: 'too-much' },
  // a bit much
  { m: 'a bit much', t: 'Det RB JJ', r: 'a-bit-much' },

  // === adjective/adj-adverb.js ===

  // [dark] green
  { m: `[${adverbAdj}] #JJ`, g: 0, t: 'RB', r: 'dark-green' },
  // is [far too] cold
  { m: `#Cop [far too] #JJ`, g: 0, t: 'RB', r: 'far-too' },
  // shops [direct]
  {
    m: `#V [${noLy}] !#NN?`,
    g: 0,
    n: '(#Cop|be|been|being|get|got|getting|become|became|becoming|feel|feels|feeling|#Det|#IN)',
    t: 'RB',
    r: 'shops-direct',
  },
  // Bare 'be' may still be Infinitive rather than Copula in commands.
  // be [late]
  { m: '(be|been|being) (#RB|not)+? [late]', g: 0, t: 'JJ', r: 'be-late' },
  // be [early]
  { m: '(be|been|being) (#RB|not)+? [early]', g: 0, t: 'JJ', r: 'be-early' },
  // [moons] a lot
  { m: `[#Plur] a lot !like?`, g: 0, t: 'Pres', r: 'studies-a-lot' },

  // === adjective/adj-gerund.js ===
  // Gerund-Adjectives - 'amusing, annoying'

  // found it [interesting]
  { m: 'found it #RB? [%Adj|Gerund%]', g: 0, t: 'JJ', r: 'found-it-ger' },
  // found it [isolating], but found it isolating cells
  { m: 'found it #RB? [isolating]$', g: 0, t: 'JJ', r: 'it-isolating' },
  // a little [fuming]
  { m: 'a (little|bit|wee) bit? [#VBG]', g: 0, t: 'JJ', r: 'a-bit-ger' },
  // repairing [crumbling] roads
  {
    m: '#VBG [#VBG] #NN',
    g: 0,
    t: 'JJ',
    n: '(impersonating|practicing|considering|assuming|enjoying|avoiding|stopping|starting|finishing)',
    r: 'look-annoying',
  },
  // looked [amazing]
  {
    m: '(looked|look|looks) #RB? [%Adj|Gerund%]',
    g: 0,
    t: 'JJ',
    n: '(impersonating|practicing|considering|assuming)',
    r: 'looked-amazing',
  },
  // [boring] the audience
  { m: '[%Adj|Gerund%] #Det', g: 0, t: 'VBG', r: 'developing-a' },
  // meaning alluring
  { m: '%Noun|Gerund% %Adj|Gerund%', t: 'VBG #JJ', r: 'alluring' },

  // === adjective/adj-noun.js ===

  // his [fine]
  { m: '(his|its) [%Adj|Noun%] !#NN?', g: 0, t: 'NN', n: '#Hyphenated', r: 'his-fine' },
  // is [all]
  { m: '#Cop #RB? [all]', g: 0, t: 'NN', r: 'is-all' },
  // have [fun] with it
  { m: `(have|had) [#JJ] #IN .`, g: 0, t: 'NN', r: 'have-fun' },
  // brewing giant
  { m: `#VBG (giant|capital|center|zone|application)`, t: 'NN', r: 'brewing-giant' },
  // in a [perfect]
  { m: `#IN (a|an) [#JJ]$`, g: 0, t: 'NN', r: 'an-instant' },
  // [brand] new
  { m: `[brand #VBG?] new`, g: 0, t: 'RB', r: 'brand-new' },
  // some [kind] of teacher
  { m: `(#Det|#JJR|new|different) [kind] of`, g: 0, t: 'NN', r: 'some-kind' },
  // her [favourite] sport
  { m: `#Poss [%Adj|Noun%] #NN`, g: 0, t: 'JJ', r: 'her-favourite' },
  // must-win
  { m: `(must && #Hyphenated) .`, t: 'JJ', r: 'must-hyphen' },
  // the [present]
  {
    m: `#Det [#JJ]$`,
    g: 0,
    t: 'NN',
    n: '(this|that|#JJR|#JJS)',
    r: 'det-adj',
  }, //are that crazy.
  // company-wide
  {
    m: `(#NN && #Hyphenated) (#JJ && #Hyphenated)`,
    t: 'JJ',
    n: '(this|that|#JJR|#JJS)',
    r: 'company-wide',
  },
  // the [poor] were
  {
    m: `#Det [#JJ] (#Cop|#Det)`,
    n: '(#JJR|#JJS)',
    g: 0,
    t: 'NN',
    r: 'poor',
  },
  // [professional] bodybuilder
  {
    m: `[%Adj|Noun%] #NN`,
    n: '(#PRP|#NNP)',
    g: 0,
    t: 'JJ',
    r: 'stable',
  },

  // === adverb.js ===
  // const adverbAdj = '(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)'

  // [way] too hot
  { m: '[way] #RB #JJ', g: 0, t: 'RB', r: 'way-too-adj' },
  // sing [like] an angel
  { m: '#V  [like]', g: 0, n: '(#MD|#PhrV)', t: 'RB', r: 'verb-like' },
  // barely even walk
  { m: '(barely|hardly) even', t: 'RB', r: 'barely-even' },
  // even left
  { m: 'even left', t: '#RB #V', r: 'even-left' },
  // cheering [hard]
  {
    m: '#Pres [(hard|quick|bright|slow|fast|backwards|forwards)]',
    n: '(#Cop|feel|feels|look|looks|seem|seems|appear|appears|sound|sounds|smell|smells|taste|tastes|become|becomes|grow|grows|get|gets|stay|stays|remain|remains)',
    g: 0,
    t: 'RB',
    r: 'lazy-ly',
  },
  // is [well]
  { m: '#Cop [#RB]$', g: 0, t: 'JJ', r: 'is-well' },
  // a [bit] cold
  { m: 'a [(little|bit|wee) bit?] #JJ', g: 0, t: 'RB', r: 'a-bit-cold' },
  // become overly [weakened]
  { m: '(become|fall|grow) #RB? [#Past]', g: 0, t: 'JJ', r: 'weakened' },
  // a completely [beaten] man
  { m: '(a|an) #RB [#Part] #NN', g: 0, t: 'JJ', r: 'beaten' },
  // a [close] friend
  { m: '#Det #RB? [close] #NN', g: 0, t: 'JJ', r: 'a-close' },
  // does [better]
  { m: '(do|does|did) #RB? [(better|worse)]', g: 0, t: 'RB', r: 'do-better' },
  // walking [close]
  {
    m: '#VBG #RB? [close]',
    g: 0,
    t: 'RB',
    n: '(getting|becoming|feeling)',
    r: 'being-close',
  },
  // charged [back]
  {
    m: '(#Pres|#Past) [back]',
    g: 0,
    t: 'RB',
    n: '(#PhrV|#Cop)',
    r: 'charge-back',
  },
  // the [well]
  { m: '#Det [well] !#Past?', g: 0, t: 'NN', r: 'well' },
  // sees [well]
  { m: '(#Pres && !#Cop) [well]', g: 0, t: 'RB', r: 'sees-well' },

  // === dates/date.js ===

  // ==== WeekDay ====
  // [sun] the 5th
  { m: '[sun] the #Ord', g: 0, t: 'WeekDay', r: 'sun-the-5th' },
  // 1pm next [sun]
  { m: '#Date (on|this|next|last|during)? [sun]', g: 0, t: 'WeekDay', r: '1pm-sun' },
  // on [sat]
  { m: `(in|by|before|during|on|until|after|of|within|all) [sat]`, g: 0, t: 'WeekDay', r: 'sat' },

  // ==== Month ====
  // in [march]
  { m: `#IN [(march|may)]`, g: 0, t: 'Month', r: 'in-month' },
  // this march
  { m: '(this|next|last) march !#Inf?', t: '#Date #Month', r: 'this-march' },
  // this may
  { m: '(this|next|last) may !#Inf?', t: '#Date #Month', r: 'this-may' },
  // march 5th
  { m: `(march|may) the? #Value`, t: '#Month #Date #Date', r: 'march-5th' },
  // 5th of march
  { m: `#Value of? (march|may)`, t: '#Date #Date #Month', r: '5th-of-march' },
  // [march] and feb
  { m: `[(march|may)] .? #Date`, g: 0, t: 'Month', r: 'march-and-feb' },
  // feb to [march]
  { m: `#Date .? [(march|may)]`, g: 0, t: 'Month', r: 'feb-and-march' },
  // quickly [march]
  { m: `#RB [(march|may)]`, g: 0, t: 'V', n: '(early|late)', r: 'quickly-march' },
  // 12 am
  { m: `#Value (am|pm)`, t: 'Time', r: '2-am' },

  // === dates/date-phrase.js ===

  // 5th of June
  { m: '#Value of #Month', t: 'Date', r: 'value-of-month' },
  // 5 June
  { m: '#CD #Month', t: 'Date', r: 'cardinal-month' },
  // June 5 to 7
  { m: '#Month #Value to #Value', t: 'Date', r: 'value-to-value' },
  // June the 12th
  { m: '#Month the #Value', t: 'Date', r: 'month-value' },
  // june 7
  { m: '(#WeekDay|#Month) #Value', t: 'Date', r: 'date-value' },
  // 7 june
  { m: '#Value (#WeekDay|#Month)', t: 'Date', r: 'value-date' },
  // aug 20-21
  { m: `#Month #NumRange`, t: 'Date', r: 'aug-20-21' },
  // Wednesday June 5th
  { m: `#WeekDay #Month #Ord`, t: 'Date', r: 'weekday-date' },
  // aug 5th 2021
  { m: `#Month #Ord #CD`, t: 'Date', r: 'month-day-year' },

  // === timezones ===
  // china standard time
  { m: `(#Place|#Dem) (standard|daylight|central|mountain)? time`, t: 'Timezone', r: 'standard-time' },
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
  { m: '[(right|rights)] of .', g: 0, t: 'NN', r: 'right-of' },
  // we [all]
  { m: '(we|us) [all]', g: 0, t: 'NN', r: 'we-all' },
  // due to [weather]
  { m: 'due to [#V]', g: 0, t: 'NN', r: 'due-to' },

  // my first [thought]
  { m: '#Poss #Ord [#Past]', g: 0, t: 'NN', r: 'first-thought' },
  // the nice [walk]
  {
    m: '(the|this|those|these) #JJ [%Noun|Verb%]',
    g: 0,
    t: 'NN',
    n: '#Cop',
    r: 'adj-verb',
  },
  // the truly nice [swim]
  { m: '(the|this|those|these) #RB #JJ [#V]', g: 0, t: 'NN', r: 'det-adv-verb' },
  // the [message] from Danny
  { m: 'the [#V] #IN .', g: 0, t: 'NN', r: 'det-verb-prep' },
  // a type of [shout]
  { m: '#Det #NN of [#V]', g: 0, t: 'NN', n: '#VBG', r: 'noun-of-noun' },
  // waited until [release]
  {
    m: '#Past #IN [#Pres]',
    g: 0,
    n: '#VBG',
    t: 'NN',
    r: 'ended-in-ruins',
  },
  // water-flows
  { m: '(#NNs && @hasHyphen) #Pres', t: 'NN', r: 'hyphen-verb' },
  // is no [going] back
  { m: 'is no [#V]', g: 0, t: 'NN', r: 'is-no-verb' },
  // what the [hell]
  { m: '#Det [(shit|damn|hell)]', g: 0, t: 'NN', r: 'swears-noun' },
  // go to [shit]
  { m: 'to [(shit|hell)]', g: 0, t: 'NN', r: 'to-swears' },
  // and check this out! a [walk-in] microwave.
  {
    m: '(the|those|these|a|an) #JJ? [(#Pres && !#VBG && !#Cop && !seem && !appear && !include) #RP?]',
    g: 0,
    t: 'NN',
    n: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)',
    r: 'det-inf',
  },

  // ==== Actor ====
  // Aircraft designer
  { m: '#NN #Actor', t: 'Actor', n: '(#Pers|#PRP)', r: 'thing-doer' },
  // lighting designer
  { m: '#VBG #Actor', t: 'Actor', r: 'ger-doer' },
  // captain sanders
  // { match: '[#Actor+] #ProperNoun', group: 0, tag: 'Honorific', reason: 'sgt-kelly' },
  // co founder
  { m: `co #NNs`, t: 'Actor', r: 'co-noun' },
  // [aircraft] designer
  {
    m: `[#NN+] #Actor`,
    g: 0,
    t: 'Actor',
    n: '(#Hon|#PRP|#Poss)',
    r: 'air-traffic',
  },
  // fine-artist
  {
    m: `(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #NN? #Actor`,
    t: 'Actor',
    r: 'fine-artist',
  },
  // dance coach
  {
    m: `#NN+ (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)`,
    t: 'Actor',
    r: 'dance-coach',
  },
  // chief design officer
  { m: `chief . officer`, t: 'Actor', r: 'chief-officer' },
  // chief of police
  { m: `chief of #NN+`, t: 'Actor', r: 'chief-police' },
  // president of marketing
  { m: `senior? vice? president of #NN+`, t: 'Actor', r: 'president-of' },

  // ==== Singular ====
  // did a [900], paid a [20]
  { m: '#V (a|an) [#Value]$', g: 0, t: 'NNs', r: 'did-a-value' },
  // the [can]
  { m: 'the [(can|will|may)]', g: 0, t: 'NNs', r: 'can' },

  // ==== Possessive ====
  // John Smith's
  { m: '#FN #Acronym? (#Poss && #LN)', t: 'Poss', r: 'name-poss' },
  // Microsoft Research's office
  { m: '#Org+ #Poss', t: 'Poss', r: 'org-poss' },
  // Los Angeles's fundraiser
  { m: '#Place+ #Poss', t: 'Poss', r: 'place-poss' },
  // my butt smells
  { m: '#Poss #Pres #RP?', n: '(#VBG|her)', t: 'NN', r: 'poss-verb' }, // anna's eating vs anna's eating lunch
  // my [teachers] dog
  { m: '(my|our|their|her|his|its) [(#Plur && #Actor)] #NN', g: 0, t: 'Poss', r: 'my-dads' },

  // 10th of a [second]
  { m: '#Value of a [second]', g: 0, u: 'Value', t: 'NNs', r: '10th-second' },
  // the euro [sense]
  {
    m: `#Det #NN [${infNouns}] !(#IN|to|#RB)?`,
    g: 0,
    t: 'NN',
    r: 'noun-sense',
  },
  // [thanks] for the gift are overdue
  { m: '[#Pres] (of|by|for) (a|an|the) #NN #Cop', g: 0, t: 'Plur', r: 'photographs-of' },
  // You eat and [sleep]
  { m: '#Inf and [%Noun|Verb%]', g: 0, t: 'Inf', r: 'fight-and-win' },
  // dogs and [running] and cats
  { m: '#NN and [#V] and #NN', g: 0, t: 'NN', r: 'and-flowers' },
  // the 1992 [classic]
  { m: 'the #CD [%Adj|Noun%]', g: 0, t: 'NN', r: '1992-classic' },
  // This is the [premier] university in Virginia
  { m: '#Cop the [%Adj|Noun%] #NN', g: 0, t: 'JJ', r: 'premier-uni' },

  // i ate [me] sandwich (scottish slang)
  { m: 'i #V [me] #NN', g: 0, t: 'Poss', r: 'scottish-me' },
  // He bowed his [head] in prayer
  { m: '#Past #Poss [#V]', g: 0, t: 'NN', n: '(saw|made)', r: 'left-her-boots' },
  // 35 [signs]
  { m: '#Value [%Plural|Verb%]', g: 0, t: 'Plur', n: '(one|1|a|an)', r: '35-signs' },
  // had [time]
  { m: 'had [%Noun|Verb%]', g: 0, t: 'NN', n: '(#VBG|come|become)', r: 'had-time' },
  // instant access
  { m: '%Adj|Noun% %Noun|Verb%', t: '#JJ #NN', n: '#NNP #NN', r: 'instant-access' },
  // near death experiences, ambitious sales [targets]
  {
    m: '#JJ #NN [%Plural|Verb%]$',
    g: 0,
    t: 'Plur',
    n: '#PRP',
    r: 'near-death',
  },
  // your guild [colors]
  { m: '#Poss #NN [(colors|colours)]$', g: 0, t: 'Plur', r: 'guild-colors' },

  // === verbs/noun-gerund.js ===

  // the [upcoming thank]-you
  { m: '(this|that|the|a|an) [#VBG #Inf]', g: 0, t: 'NNs', r: 'planning' },
  // the [upcoming thank]-you
  { m: '(that|the) [#VBG #Pres]', g: 0, ifNo: '#Cop', t: 'Plur', r: 'paving-stones' },
  // i think [tipping] sucks
  { m: `#PRP #Inf [#VBG] #Pres`, g: 0, t: 'NN', r: 'tipping-sucks' },
  // lexical [tagging]
  { m: '#JJ [#VBG]', g: 0, t: 'NN', n: '(still|even|just)', r: 'early-warning' },
  // [walking] is cool
  { m: '[#VBG] #RB? not? #Cop', g: 0, t: 'Activity', r: 'ger-cop' },
  // are [doing] is
  { m: '#Cop [(#VBG|#Activity)] #Cop', g: 0, t: 'VBG', r: 'are-doing-is' },
  // responsibility for [setting]
  { m: '#NNs for [%Noun|Gerund%]', g: 0, t: 'VBG', r: 'noun-for-ger' },
  // better for [training]
  { m: '#JJR (for|at) [%Noun|Gerund%]', g: 0, t: 'VBG', r: 'better-for-ger' },
  // apologized for [shouting]
  {
    m: '(#Past|#Pres) for [%Noun|Gerund%]',
    g: 0,
    t: 'VBG',
    r: 'for-shouting',
  },
  // he reads the [upcoming]
  { m: '#Pres the [#VBG]', g: 0, t: 'NN', r: 'touching' },

  // === verbs/verb-noun.js ===

  // A final button label is an object, not a second verb.
  ...['click', 'clicks', 'selects', 'pick', 'picks'].map(word => ({
    m: `(#PRP|#NNs|#Plur) [${word} (submit|save|cancel)]$`,
    g: 0,
    t: 'Pres NN',
    r: 'click-button',
  })),
  // Common intransitive predicates after a singular subject. Keep arbitrary
  // plural/verb switches conservative: 'the dog treats' is a noun phrase.
  // the dog [runs]
  ...['runs', 'walks', 'barks', 'swims', 'sleeps'].map(word => ({
    m: `^(#Det|#Poss) #JJ+? #NNs #RB+? [${word}] #RB+?$`,
    g: 0,
    t: 'Pres',
    r: 'sing-subj-verb',
  })),
  // with heads and [arms] rolling around
  { m: '#IN #Plur and [%Plural|Verb%] #VBG', g: 0, t: 'Plur', r: 'coord-pl' },
  // he can solve the [puzzle]
  { m: '#Inf (this|that|the) [#Inf]', g: 0, t: 'NN', r: 'do-this-dance' },
  // keeping the [matter] a secret
  { m: '#VBG #Det [#Inf]', g: 0, t: 'NN', r: 'running-a-show' },
  // the-only-[reason]
  {
    m: '#Det (only|further|just|more|backward) [#Inf]',
    g: 0,
    t: 'NN',
    r: 'only-reason',
  },
  // the [slide] makes noise
  { m: '(the|this|a|an) [#Inf] #RB? #V', g: 0, t: 'NN', r: 'det-verb-subj' },
  // Use a pointed [stick] (a pencil) or a similar tool
  {
    m: '#Det #JJ #JJ? [#Inf]',
    g: 0,
    t: 'NN',
    n: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)',
    r: 'a-nice-inf',
  },
  // the American [thank]-you letter
  { m: '#Det #Dem [#Pres]', g: 0, t: 'NN', r: 'mexican-train' },
  // the next career [read] is brief
  { m: '#JJ #NN+ [#Inf] #Cop', g: 0, t: 'NN', r: 'career-move' },
  // at some [thank]-you party
  { m: 'at some [#Inf]', g: 0, t: 'NN', r: 'at-some-inf' },
  // goes [to sleep]
  { m: '(go|goes|went) [to (sleep|work)]', g: 0, t: 'IN NN', r: 'goes-to-verb' },
  // a dog [retrieve] in the field
  ...['a', 'an'].map(word => ({
    m: `${word} #JJ? #NN [#Inf] (#IN|#NN)`,
    g: 0,
    n: 'from',
    t: 'NN',
    r: 'a-noun-inf',
  })),
  // a software [reinstall]
  { m: '(a|an) #NN [#Inf]$', g: 0, t: 'NN', r: 'noun-inf-end' },
  // working for [thank]-you letters
  { m: '#VBG #JJ? for [#Inf]', g: 0, t: 'NN', r: 'running-for' },
  // artists on [thank]-you cards
  { m: '#Plur on [#Inf]', g: 0, t: 'NN', r: 'on-stage' },
  // number of [thank]-yous
  { m: 'number of [#Pres]', g: 0, t: 'NN', r: 'number-of-x' },
  // make [sense]
  {
    m: '(try|use|attempt|build|make) [%Noun|Verb% #RP?]',
    n: '(#Cop|#NN|sure|fun|up)',
    g: 0,
    t: 'NN',
    r: 'do-verb',
  }, //make sure of
  // [append] is cloned
  { m: '^[#Inf] (is|was)', g: 0, t: 'NN', r: 'checkmate-is' },
  // get much [thank]-you mail
  { m: '#Inf much [#Inf]', g: 0, t: 'NN', r: 'get-much' },
  // [cause] i gotta
  { m: '[cause] #PRP #V', g: 0, t: 'Conj', r: 'cause-cuz' },
  // the US [air] force
  {
    m: 'the #NNs [#Inf] (#NN && !#Poss)',
    g: 0,
    t: 'NN',
    n: '#PRP',
    r: 'cardio-dance',
  },
  // this [rocks]
  { m: 'this [#Plur]', g: 0, t: 'Pres', n: '(#IN|#Date)', r: 'this-verbs' },
  // the thing [that runs]
  {
    m: '#NN [that %Plural|Verb%]',
    g: 0,
    t: 'Conj Pres',
    n: '(#IN|#PRP|way)',
    r: 'that-rocks',
  },
  // that [leads] to
  { m: 'that [#Plur] to', g: 0, t: 'Pres', n: '#IN', r: 'that-leads-to' },
  // let him [father] a child
  ...['let', 'make', 'made'].map(word => ({
    m: `${word} (him|her|it|#Pers|#Place|#Org)+ [#NNs] (a|an|the|it)`,
    g: 0,
    t: 'Inf',
    r: 'let-him-glue',
  })),
  // assign all [tasks]
  {
    m: '#V (all|every|each|most|some|no) [#Pres]',
    n: '#MD',
    g: 0,
    t: 'NN',
    r: 'quant-verb-noun',
  }, // PresentTense/Noun ambiguities
  // big dreams, critical thinking
  // found all [upcoming] words
  {
    m: '(had|have|#Past) #JJ [#Pres]',
    g: 0,
    t: 'NN',
    n: 'better',
    r: 'adj-verb-noun',
  },
  // one big [thank]-you
  { m: '#Value #JJ [#Pres]', g: 0, t: 'NN', n: '#Cop', r: 'one-big-reason' },
  // found all [upcoming] words
  {
    m: '#Past #JJ+ [#Pres]',
    g: 0,
    t: 'NN',
    n: '(#Cop|better)',
    r: 'wide-support',
  },
  // many [thanks]
  { m: '(many|few|several|couple) [#Pres]', g: 0, t: 'NN', n: '#Cop', r: 'many-poses' },
  // a very big [dream]
  {
    m: '#Det #RB #JJ [%Noun|Verb%]',
    g: 0,
    t: 'NN',
    n: '#Cop',
    r: 'very-big-dream',
  },
  // from start to [finish]
  { m: 'from #NN to [%Noun|Verb%]', g: 0, t: 'NN', r: 'start-finish' },
  // for comparison or [contrast]
  {
    m: '(for|with|of) #NN (and|or|not) [%Noun|Verb%]',
    g: 0,
    t: 'NN',
    n: '#PRP',
    r: 'food-and-gas',
  },
  // cute little [thank]-you bags
  { m: '#JJ #JJ [#Pres]', g: 0, t: 'NN', n: '#Cop', r: 'little-store' },
  // writing bigger [thank]-you notes
  {
    m: '#VBG #RB? #JJR [#Pres]',
    g: 0,
    t: 'NN',
    n: '#Cop',
    r: 'higher-costs',
  },
  // to write people [thanks] for helping
  { m: `to #Pres #NN [#Pres] #IN`, g: 0, t: 'NN', r: 'gas-exchange' },
  // waited until [release]
  {
    m: `#Past (until|as|through|without) [(#Pres && !#VBG && !#Cop)]`,
    g: 0,
    t: 'NN',
    r: 'until-release',
  },
  // selling like hot [thank]-you cards
  { m: `#VBG like #JJ? [#Pres]`, g: 0, t: 'Plur', r: 'like-hot-cakes' },
  // some nice [thank]-you notes
  { m: `some #JJ [#Pres]`, g: 0, t: 'NN', r: 'some-reason' },
  // for some [thank]-you letters
  { m: `for some [#Pres]`, g: 0, t: 'NN', r: 'for-some' },
  // same kind of [shouts]
  { m: `(same|some|the|that|a) kind of [#Pres]`, g: 0, t: 'NN', r: 'some-kind-of' },
  // a type of [shout]
  { m: `(same|some|the|that|a) type of [#Pres]`, g: 0, t: 'NN', r: 'some-type-of' },
  // looking good in [thank]-you photos
  { m: `#VBG #JJ #IN [#Pres]`, g: 0, t: 'NN', r: 'better-for' },
  // get better [thank]-you notes
  { m: `(get|got|have) #JJR [#Pres]`, g: 0, t: 'NN', r: 'got-better-aim' },
  // give up on [thank]-you letters
  { m: `#PhrV #RP #IN [#Pres]`, g: 0, t: 'NN', r: 'given-up-on-x' },
  // there are [thank]-you notes
  { m: 'there (are|were) #JJ? [#Pres]', g: 0, t: 'Plur', r: 'there-are' },
  // a thousand [thanks] of gratitude
  {
    m: '#Value [#Pres] of',
    g: 0,
    n: '(one|1|#Cop|#Inf)',
    t: 'Plur',
    r: '2-trains',
  },
  // [thanks] are appreciated
  { m: '[#Pres] (are|were) #JJ', g: 0, t: 'Plur', r: 'compromises' },
  // [hope] i helped
  { m: '^[(hope|guess|thought|think)] #PRP #V', g: 0, t: 'Inf', r: 'suppose-i' },
  // its proper [functioning]
  { m: '#Poss #JJ [#V]', g: 0, t: 'NN', n: '#Cop', r: 'full-support' },
  // [tastes] good
  { m: '[(tastes|smells)] #RB? #JJ', g: 0, t: 'Pres', r: 'tastes-good' },
  // Being introduces a predicate rather than a direct object.
  // she is writing [thank]-you letters
  {
    m: '#Cop (#VBG && !being) [(#Pres && !#VBG)] !by?',
    g: 0,
    t: 'NN',
    n: 'going',
    r: 'ignoring',
  },
  // the [shed]
  { m: '#Det #JJ? [(shed|thought|rose|bid|saw|spelt)]', g: 0, t: 'NN', r: 'noun-past' },
  // how to [watch]
  { m: 'how to [%Noun|Verb%]', g: 0, t: 'Inf', r: 'how-to-noun' },
  // ready to [stream]
  {
    m: '(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]',
    g: 0,
    t: 'Inf',
    r: 'ready-to-noun',
  },
  // bring [to market]
  {
    m: '(bring|went|go|drive|run|bike) [to (market|work|court|school|bed|church|prison)]',
    g: 0,
    t: 'IN NN',
    r: 'bring-to-noun',
  },
  // can i [sleep], would you [look]
  { m: '#MD #NN [%Noun|Verb%]', g: 0, t: 'Inf', r: 'would-you-look' },
  // is just [spam]
  { m: '#Cop just [#Inf]', g: 0, t: 'NN', r: 'is-just-spam' },
  // request copies
  { m: '^%Noun|Verb% %Plural|Verb%', t: 'Imp #Plur', r: 'req-copies' },
  // homemade pickles and [drinks]
  { m: '#JJ #Plur and [%Plural|Verb%]', g: 0, t: '#Plur', r: 'and-drinks' },
  // the 1968 [stand]-off
  { m: '#Det #Year [#V]', g: 0, t: 'NN', r: '1968-film' },
  // the [break up]
  { m: '#Det [#PhrV #RP]', g: 0, t: 'NN', r: 'break-up' },
  // the [individual] goals
  {
    m: '#Det [%Adj|Noun%] #NN',
    g: 0,
    t: 'JJ',
    n: '(#PRP|#Poss|#NNP)',
    r: 'individual',
  },
  // [work] or prepare
  { m: '^[%Noun|Verb%] or #Inf', g: 0, t: 'Inf', r: 'work-or' },
  // to give [thanks]
  {
    m: 'to #Inf [#Pres]',
    g: 0,
    t: 'NN',
    n: '(#VBG|#Cop|help)',
    r: 'to-give-thanks',
  },
  // [Google] me
  { m: '[(#NN && !#PRP)] me', g: 0, t: 'V', r: 'kills-me' },
  // removes wrinkles
  { m: '%Plural|Verb% %Plural|Verb%', t: '#Pres #Plur', r: 'removes' },
  // i [Google] the answer
  { m: 'i [#NN] the #NN', g: 0, t: 'Inf', r: 'i-water' },
  // did the engine [stop]
  {
    m: '(did|does|will) the #NN [%Noun|Verb%]',
    g: 0,
    t: 'Inf',
    r: 'q-noun-verb',
  },
  // 40 gallons of [water]
  {
    m: '#Value #NN of [%Noun|Verb%]',
    g: 0,
    t: 'NN',
    r: 'qty-of-noun',
  },
  // When the rain [stops], we will leave. Whenever the bell [rings], the dog barks.
  // when the dog [looks]
  ...['stops', 'looks', 'rings'].map(word => ({
    m: `(when|whenever|before|after|until|since|as|while|than) (#Det|#Poss) #JJ+? #NN [(%Plural|Verb% && ${word})]$`,
    g: 0,
    t: 'Pres',
    r: `${word}-clause-verb`,
  })),
  // The sun [rose]. The river [rose] quickly.
  {
    m: '(sun|moon|river|water|tide|temperature|prices|he|she|we|they|i) [rose] #RB+?$',
    g: 0,
    t: 'Past',
    r: 'sun-rose',
  },
  // The cat [woke]. Before the dog and the cat [woke], she left.
  { m: '(#NN && !#Poss) [woke] #RB+?$', g: 0, t: 'Past', r: 'cat-woke' },

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
  { m: '[half] of? (a|an)', g: 0, t: 'Frac', r: 'half-a' },
  // [quarter] of a dollar
  { m: '[quarter] of? (a|an)', g: 0, t: 'Frac', r: 'quarter-a' },
  // two and a half
  { m: '#CD and a half', t: 'Frac', r: 'and-a-half' },
  // two-halves
  { m: '#Value (halves|halfs|quarters)', t: 'Frac', r: 'two-halves' },

  // [seven] fifths
  { m: '[#CD+] (#Frac && /s$/)', g: 0, t: 'Frac', r: 'seven-fifths' },
  // [one third] of it
  { m: '[#CD+ #Ord] of .', g: 0, t: 'Frac', r: 'ord-of' },
  // [100th] of it
  { m: '[(#Num && #Ord)] of .', g: 0, t: 'Frac', r: 'num-ord-of' },
  // [a twenty fifth] of it
  { m: '[(a|one) #CD?+ #Ord] of', g: 0, t: 'Frac', r: 'a-ord' },

  // a sixteenth, one twenty fifth (without a following noun)
  {
    m: '[(a|one) #CD+? (#Ord && !first && !second)]$',
    g: 0,
    t: 'Frac',
    r: 'solo-fraction',
  },

  // 3 out of 5
  { m: '#CD+ out? of every? #CD', t: 'Frac', r: 'out-of' },

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
  { m: '#Num #PhoneNumber', t: 'PhoneNumber', r: 'area-code' },

  // ==== Currency ====
  // chinese yuan
  { m: '#Dem #Currency', t: 'Currency', r: 'demonym-curr' },
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
  { m: '#CD percent', t: '#Percent #Unit', r: 'value-percent' },

  // === person/person-phrase.js ===

  // ==== FirstNames ====
  // is [foo] Smith
  {
    m: '#Cop [(#NN|#Pres)] #LN',
    g: 0,
    t: 'FN',
    n: '#VBG',
    r: 'cop-noun-last',
  },
  // pope francis
  {
    m: '(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #NNP',
    t: 'Pers',
    r: 'lady-title',
    safe: true,
  },

  // ==== Nickname ====
  // Dwayne '[the rock]' Johnson
  { m: '#FN [#Det #NN] #LN', g: 0, t: 'Pers', r: 'first-noun-last' },
  // John b Smith
  {
    m: '#NNP (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #NNP',
    t: 'Pers',
    r: 'name-init-name',
    safe: true,
  },
  // J. Smith
  { m: '#Acronym #LN', t: 'Pers', r: 'acro-last', safe: true },
  // John jr
  { m: '#Pers (jr|sr|md)', t: 'Pers', r: 'person-hon' },
  // Dr. J.
  { m: '#Hon #Acronym', t: 'Pers', r: 'hon-init' },
  // John Smith III
  { m: '#Pers #Pers the? #RomanNumeral', t: 'Pers', r: 'roman-numeral' },
  // John [b]
  { m: '#FN [/^[bdefghjlmnopqstvwxyz]$/]', g: 0, t: ['Acronym', 'Pers'], r: 'john-e' },
  // Ludwig van Beethoven
  { m: '#NN van der? #NN', t: 'Pers', r: 'van-der-noun', safe: true },
  // king of spain
  { m: '(king|queen|prince|saint|lady) of #NN', t: 'Pers', r: 'king-of-noun', safe: true },
  // prince Paris
  { m: '(prince|lady) #Place', t: 'Pers', r: 'lady-place' },
  // saint Foo
  { m: '(king|queen|prince|saint) #NNP', t: 'Pers', n: '#Place', r: 'saint-foo' },

  // al Smith
  { m: 'al (#Pers|#NNP)', t: 'Pers', r: 'al-borlen', safe: true },
  // ferdinand de almar
  { m: '#FN de #NN', t: 'Pers', r: 'bill-de-noun' },
  // Osama bin Laden
  { m: '#FN (bin|al) #NN', t: 'Pers', r: 'bill-al-noun' },
  // John L. Foo
  { m: '#FN #Acronym #NNP', t: 'Pers', r: 'bill-acro-title' },
  // Andrew Lloyd Webber
  { m: '#FN #FN #NNP', t: 'Pers', r: 'bill-first-title' },
  // Mr Foo
  { m: '#Hon #FN? #NNP', t: 'Pers', r: 'dr-john-title' },
  // peter the great
  { m: '#FN the #JJ', t: 'Pers', r: 'name-the-great' },

  // John van Smith
  { m: '#NNP (van|al|bin) #NNP', t: 'Pers', r: 'title-van-title', safe: true },
  // jose de Sucre
  { m: '#NNP (de|du) la? #NNP', t: 'Pers', n: '#Place', r: 'title-de-title' },
  // Jani K. Smith
  { m: '#NNs #Acronym #LN', t: '#FN #Pers .', r: 'title-acro-noun', safe: true },
  // [Toronto] John
  { m: '[#NNP] #Pers', g: 0, t: 'Pers', r: 'proper-person', safe: true },
  // john [keith jones]
  {
    m: '#Pers [#NNP #NNP]',
    g: 0,
    t: 'Pers',
    n: '#Poss',
    r: 'three-names',
    safe: true,
  },
  // John [Foo]
  {
    m: '#FN #Acronym? [#NNP]',
    g: 0,
    t: 'LN',
    n: '#Poss',
    r: 'first-title',
  },
  // Joe K. Sombrero
  { m: '#FN #Acronym #NN', t: 'Pers', r: 'n-acro-noun', safe: true },
  // Anthony [de] Marco
  { m: '#FN [(de|di|du|van|von)] #Pers', g: 0, t: 'LN', r: 'de-first' },

  // baker jenna smith
  // { match: '[#Actor+] #Person', group: 0, tag: 'Person', reason: 'baker-sam' },
  // [sergeant] major Harold
  {
    m: '[(lieutenant|corporal|sergeant|captain|qeen|king|admiral|major|colonel|marshal|president|queen|king)+] #NNP',
    g: 0,
    t: 'Hon',
    r: 'sergeant-john',
  },
  // ==== Honorics ====
  // [general] John
  {
    m: '[(private|general|major|rear|prime|field|count)] #Hon? #Pers',
    g: 0,
    t: ['Hon', 'Pers'],
    r: 'ambg-hon',
  },
  // [Miss] John
  { m: '[(miss && @isTitleCase)] #Pers', g: 0, t: ['Hon', 'Pers'], r: 'miss-hon' },
  // dr john [foobar]
  {
    m: '#Hon #FN [#NNs]',
    g: 0,
    t: 'LN',
    n: '#Poss',
    r: 'dr-john-foo',
    safe: true,
  },
  // [his excellency] John
  {
    m: '[(his|her) (majesty|honour|worship|excellency|honorable)] #Pers',
    g: 0,
    t: 'Hon',
    r: 'his-excellency',
  },
  // Dr teacher
  { m: '#Hon #Actor', t: 'Hon', r: 'lt-colonel' },
  // [first lady] michelle obama
  { m: '[first lady] #Pers', g: 0, t: 'Hon', r: 'first-lady' },
  // first lady, second admiral
  { m: '(first|second|third|1st|2nd|3rd) lieutenant', t: 'Hon', r: 'ord-lt' },
  // Louis IV
  { m: '#Pers #RomanNumeral', t: 'Pers', r: 'louis-iv' },

  // === person/ambig-name.js ===
  // const personAdj = '(misty|rusty|dusty|rich|randy|sandy|young|earnest|frank|brown)'

  // ebenezer scrooge
  {
    m: '#FN #NN$',
    t: '. #LN',
    n: '(#Poss|#Org|#Place|#PRP|@hasTitleCase)',
    r: 'first-noun',
  },

  // June Smith
  { m: '%Person|Date% #Acronym? #NNP', t: 'Pers', r: 'jan-thierson' },
  // ===person-noun===
  // Cliff Clavin
  { m: '%Person|Noun% #Acronym? #NNP', t: 'Pers', r: 'switch-person', safe: true },
  // Rose Microsoft
  { m: '%Person|Noun% #Org', t: 'Org', r: 'olive-garden' },
  // ===person-verb===
  // Ollie Faroo
  { m: '(%Person|Verb% && #Pers) #Acronym? #NNP', t: 'Pers', r: 'verb-proper', ifNo: '#Actor' },

  // ===person-verb===
  // really [wade]
  { m: `#RB [(%Person|Verb% && !@isTitleCase)]`, g: 0, t: 'V', r: 'really-mark' },
  // [drew] closer
  { m: `[%Person|Verb%] (#RB|#JJR)`, g: 0, t: 'V', r: 'drew-closer' },
  // wade smith
  { m: `(%Person|Verb% && #Pers) #Pers`, t: 'Pers', r: 'rob-smith' },
  // Wade G. Slapgoop
  { m: `%Person|Verb% #Acronym #NNP`, t: 'Pers', r: 'rob-a-smith' },
  // Will Smith
  { m: '(will && @isTitleCase) #NNP', t: 'Pers', r: 'will-name' },
  // jack [layton] won
  {
    m: '(#FN && !#Poss) [#NNs] #V',
    g: 0,
    safe: true,
    t: 'LN',
    r: 'jack-layton',
  },
  // [captain] John walks
  { m: '^[#NNs] #Pers #V', g: 0, safe: true, t: 'Pers', r: 'sherwood' },

  // === verbs/verbs.js ===

  // is [pretty] good
  {
    m: '#Cop [(pretty|dead|full|well|sure)] #JJ',
    g: 0,
    t: 'RB',
    r: 'sometimes-adv',
  },
  // i [better] go
  { m: '(#PRP|#Pers) (had|#RB)? [better] #Pres', g: 0, t: 'MD', r: 'i-better' },
  // adj -> gerund
  // i [like]
  { m: '(#MD|i|they|we|do) not? [like]', g: 0, t: 'Pres', r: 'modal-like' },
  // ==== Tense ====
  // he [left]
  { m: '(#NN && !#Poss) #RB? [left]', g: 0, t: 'Past', r: 'left-verb' },
  // she [bit] her tongue
  { m: '#NN #RB? [(bit && #Inf)]', g: 0, t: 'Past', r: 'bit-past' },
  // will [be] running
  { m: 'will #RB? not? #RB? [be] #VBG', g: 0, t: 'Cop', r: 'will-be-cop' },
  // will [be] nice
  { m: 'will #RB? not? #RB? [be] #JJ', g: 0, t: 'Cop', r: 'be-cop' },
  // [march] up
  { m: '[march] (up|down|back|toward)', n: '#Date', g: 0, t: 'Inf', r: 'march-to' },
  // birds [home] to their nest
  { m: '(#PRP|#Plur|#MD) #RB+? [home] to', g: 0, t: 'Inf', r: 'birds-home-to' },
  // is [home] to birds
  { m: '(#Cop|be|been|being) #RB+? [home] to', g: 0, t: 'NN', r: 'is-home-to' },
  // is [subject] to change
  {
    m: '(#Cop|be|been|being|remain|remains|remained) #RB+? [subject] to',
    g: 0,
    t: 'JJ',
    r: 'is-subj-to',
  },
  // is subject [to]
  {
    m: '(#Cop|be|been|being|remain|remains|remained) #RB+? subject [to]',
    g: 0,
    u: 'Conj',
    t: 'IN',
    r: 'pred-to',
  },
  // is subject to [change]
  {
    m: '(#Cop|be|been|being|remain|remains|remained) #RB+? subject to [%Noun|Verb%]',
    g: 0,
    t: 'NN',
    r: 'pred-to-noun',
  },

  // is home [to] dogs
  {
    m: '(#Cop|be|been|being) #RB+? home [to] #JJ+? #NN',
    g: 0,
    u: 'Conj',
    t: 'IN',
    r: 'home-to-noun',
  },

  // === misc==
  // were being [run]
  { m: `(were|was) being [#Pres]`, g: 0, t: 'Past', r: 'was-being' },
  // had [been broken]
  {
    m: `(had|has|have) [been (#Past && /en$/)]`,
    g: 0,
    t: 'Aux Part',
    r: 'been-broken',
  },
  // had [been smoked]
  { m: `(had|has|have) [been (#Past && /ed$/)]`, g: 0, t: 'Aux Past', r: 'been-smoked' },
  // had [been] eaten
  { m: `(had|has) #RB? [been] #RB? #Past`, g: 0, t: 'Aux', r: 'had-been-adj' },
  // had to [Google] the answer
  ...['had', 'has'].map(word => ({
    m: `${word} to [#NN] (#Det|#Poss)`,
    g: 0,
    t: 'Inf',
    r: 'had-to-noun',
  })),
  // does that [work]
  {
    m: `(do|does|did|#MD) (this|that|these|those) [work]`,
    g: 0,
    t: 'Inf',
    r: 'does-that-work',
  },
  // have read
  { m: `(has|have|had) read`, t: 'Aux Part', r: 'read-read' },
  // were [under paid]
  ...['under', 'over'].map(word => ({
    m: `(is|was|were) [${word} #Past]`,
    g: 0,
    t: 'RB JJ',
    r: 'under-cooked',
  })),

  // [shit] them
  { m: '[shit] (#Det|#Poss|them)', g: 0, t: 'V', r: 'shit-verb' },
  // [damn] them
  { m: '[damn] (#Det|#Poss|them)', g: 0, t: 'V', r: 'damn-verb' },
  // [fuck] them
  { m: '[fuck] (#Det|#Poss|them)', g: 0, t: 'V', r: 'fuck-verb' },

  // jobs that fit
  { m: '#Plur that %Noun|Verb%', t: '. #IN #Inf', r: 'jobs-that-work' },
  // [works] for me
  { m: '[works] for me', g: 0, t: 'Pres', r: 'works-for-me' },
  // as we [please]
  { m: 'as #PRP [please]', g: 0, t: 'Inf', r: 'as-we-please' },
  // verb-prefixes - '[co] write'
  // [co] write
  {
    m: '[(co|mis|de|inter|intra|pre|re|un|counter)] #V',
    g: 0,
    t: ['V', 'Prefix'],
    n: '(#Cop|#PhrV)',
    r: 'co-write',
  },
  // [out] run
  { m: '[(out|under|over)] #Inf', g: 0, t: ['V', 'Prefix'], r: 'dir-verb-pre' },
  // dressed and [left]
  { m: '#Past and [%Adj|Past%]', g: 0, t: 'Past', r: 'past-and-ambig' },
  // [melted] and fallen
  { m: '[(%Adj|Past% && !#JJ)] and #Past', g: 0, t: 'Past', r: 'ambig-and-past' },
  // is he [stoked]
  { m: '#Cop #PRP [%Adj|Past%]', g: 0, t: 'JJ', r: 'is-he-stoked' },
  // to [dream] of
  { m: 'to [%Noun|Verb%] #IN', g: 0, t: 'Inf', r: 'to-dream-of' },

  // === adjective/adj-verb.js ===

  // Resume fragments: developed [scalable React] architecture.
  {
    m: '^[developed] (#JJ|#NNP)+? (backend|frontend|software|architecture|applications|apps|systems)',
    g: 0,
    t: 'Past',
    n: '(#Pres|#Cop|#MD)',
    r: 'developed',
  },
  // does [mean]
  { m: 'does (#RB|not)? [%Adj|Present%]', g: 0, t: 'Inf', r: 'does-mean' },
  // [okay] by me
  { m: '[(fine|okay|cool|ok)] by me', g: 0, t: 'JJ', r: 'okay-by-me' },
  // i [mean]
  { m: 'i (#RB|do)? not? [mean]', g: 0, t: 'Pres', r: 'i-mean' },
  // the ship will near the coast
  { m: 'will #JJ', t: 'Aux Inf', r: 'will-adj' },
  // I [frequent] this restaurant
  { m: '#PRP [#JJ] #Det #JJ? #NN', g: 0, t: 'V', r: 'he-adj-the' },
  // rude and [insulting]
  {
    m: '#JJ and [(%Adj|Gerund% && #VBG)] !#IN?',
    g: 0,
    t: 'JJ',
    r: 'rude-and-x',
  },
  // was under [paid]
  { m: '#Cop #RB? (over|under) [#Past]', g: 0, t: 'JJ', r: 'over-cooked' },
  // got [tired] of
  { m: 'got #RB? [%Adj|Past%] of', g: 0, t: 'JJ', r: 'got-tired-of' },
  // felt [cheated]
  {
    m: '(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#RB|#JJ)? [#Past]',
    g: 0,
    t: 'JJ',
    r: 'felt-loved',
  },
  // felt [cheated]
  { m: '(seem|feel|seemed|felt) [#Past #RP?]', g: 0, t: 'JJ', r: 'seem-confused' },
  // a bit [confused]
  { m: 'a (bit|little|tad) [#Past #RP?]', g: 0, t: 'JJ', r: 'a-bit-confused' },
  // do not be [embarrassed]
  { m: 'not be [%Adj|Past% #RP?]', g: 0, t: 'JJ', r: 'not-be-adj' },
  // is just [tired]
  { m: '#Cop just [%Adj|Past% #RP?]', g: 0, t: 'JJ', r: 'is-just-right' },
  // [failed] and oppressive
  { m: '[%Adj|Past%] and #JJ', g: 0, t: 'JJ', r: 'failed-and' },
  // the fear or [heightened] emotion
  {
    m: '(#Det|#IN) #JJ? #NN or [#Past] #NN',
    g: 0,
    t: 'JJ',
    n: '(#Cop|#PRP)',
    r: 'or-heightened',
  },
  // tired and overworked describes a state after a copula
  {
    m: '#Cop #RB? #JJ and [(overworked|overwhelmed|overpaid|underpaid|overqualified|underqualified|understaffed)]$',
    g: 0,
    t: 'JJ',
    r: 'coord-state',
  },
  // their [declared] intentions
  { m: '#Poss [#Past] #NN', g: 0, n: '#Cop', t: 'JJ', r: 'declared' },
  // is he [cool]
  { m: '#Cop #PRP [%Adj|Present%]', g: 0, t: 'JJ', r: 'is-he-cool' },
  // is [crowded] with
  {
    m: '#Cop [%Adj|Past%] with',
    g: 0,
    t: 'JJ',
    n: '(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)',
    r: 'crowded-with',
  },
  // is [empty]
  { m: '#Cop #RB? [%Adj|Present%]$', g: 0, t: 'JJ', r: 'cop-adj' },
  // she is being [cool]
  { m: 'being #RB? [%Adj|Present%]', g: 0, t: 'JJ', r: 'being-adj' },
  // does the store [open]
  {
    m: '(does|will) #Det #NN [%Adj|Present%]$',
    g: 0,
    t: 'Inf',
    r: 'q-adj-verb',
  },

  // === verbs/auxiliary.js ===
  // these are some of our heaviest-used matches

  // ought not [to] walk
  {
    m: 'ought (#RB|not)+? [to] (#RB|not)+? #V',
    g: 0,
    t: 'Aux',
    r: 'ought-to',
  },
  // ought to [be] walking
  {
    m: 'ought (#RB|not)+? to (#RB|not)+? [be] (#RB|not)+? #V',
    g: 0,
    t: 'Aux',
    r: 'ought-to-be',
  },
  // will [have] walked
  { m: `will (#RB|not)+? [have] (#RB|not)+? #V`, g: 0, t: 'Aux', r: 'will-have-vb' },
  // [was] walking
  { m: `[#Cop] (#RB|not)+? (#VBG|#Past)`, g: 0, t: 'Aux', r: 'cop-walking' },
  // [would] walk
  { m: `[(#MD|did)+] (#RB|not)+? #V`, g: 0, t: 'Aux', r: 'modal-verb' },
  // would [have] [had] to go
  {
    m: `#MD (#RB|not)+? [have] (#RB|not)+? [had] (#RB|not)+? #V`,
    g: 0,
    t: 'Aux',
    r: 'would-have',
  },
  // [has] walked
  { m: `[(has|had)] (#RB|not)+? #Past`, g: 0, t: 'Aux', r: 'had-walked' },
  // [will] walk
  {
    m: '[(do|does|did|will|have|had|has|got)] (not|#RB)+? #V',
    g: 0,
    t: 'Aux',
    r: 'have-had',
  },
  // [about to] go
  { m: '[about to] #RB? #V', g: 0, t: ['Aux', 'V'], r: 'about-to' },
  // would [be] walking
  { m: `#MD (#RB|not)+? [be] (#RB|not)+? #V`, g: 0, t: 'Aux', r: 'would-be' },
  // was [being] driven
  { m: '[(be|being|been)] #Part', g: 0, t: 'Aux', r: 'being-driven' },
  // [may] want
  { m: '[may] #RB? #Inf', g: 0, t: 'Aux', r: 'may-want' },
  // was [being] walked
  {
    m: '#Cop (#RB|not)+? [(be|being|been)] #RB+? #Past',
    g: 0,
    t: 'Aux',
    r: 'being-walked',
  },
  // [been] walking
  { m: '[(be|been)] (#RB|not)+? #VBG', g: 0, t: 'Aux', r: 'been-walking' },
  // [used to] walk
  { m: '[used to] #Pres', g: 0, t: 'Aux', r: 'used-to-walk' },
  // was [going to] walk
  {
    m: '#Cop (#RB|not)+? [going to] #RB+? #Pres',
    g: 0,
    t: 'Aux',
    r: 'going-to-walk',
  },
  // going to [be] watched
  {
    m: 'going to (#RB|not)+? [be] (#RB|not)+? #Past',
    g: 0,
    t: 'Aux',
    r: 'to-be-watched',
  },
  // there is [no] x
  { m: '(is|was) #RB? [no]', g: 0, t: 'Neg', r: 'is-no' },
  // [been] told
  {
    m: '[(been|had|became|came)] #Past',
    g: 0,
    n: '#PhrV',
    t: 'Aux',
    r: 'been-told',
  },
  // [being] born
  { m: '[(being|having|getting)] #V', g: 0, t: 'Aux', r: 'being-born' },
  // [better] go
  { m: '[better] #Pres', g: 0, t: 'MD', n: '(#Cop|#VBG)', r: 'better-go' },
  // even better
  { m: 'even better', t: 'RB #JJR', r: 'even-better' },

  // === verbs/phrasal.js ===

  // walk-up
  { m: '(#V && @hasHyphen) up', t: 'PhrV', r: 'foo-up' },
  // walk-off
  { m: '(#V && @hasHyphen) off', t: 'PhrV', r: 'foo-off' },
  // walk-over
  { m: '(#V && @hasHyphen) over', t: 'PhrV', r: 'foo-over' },
  // walk-out
  { m: '(#V && @hasHyphen) out', t: 'PhrV', r: 'foo-out' },
  // [walk in] on
  {
    m: '[#V (in|out|up|down|off|back)] (on|in)',
    g: 0,
    n: '#Cop',
    t: 'PhrV RP',
    r: 'walk-in-on',
  },
  // went [on] for
  { m: '(lived|went|crept|go) [on] for', g: 0, t: 'PhrV', r: 'went-on' },
  // the curtains come down
  { m: '#V (up|down|in|on|for)$', t: 'PhrV #RP', n: '#PhrV', r: 'come-down' },
  // work in the office
  {
    m: '#PhrV (in && #RP) #Det',
    t: '#V #IN #Det',
    u: 'PhrV',
    r: 'work-in-the',
  },
  // back it [up]
  ...['up', 'down'].map(word => ({
    m: `#V (him|her|it|us|himself|herself|itself|everything|something) [${word}]`,
    g: 0,
    t: 'RB',
    r: 'phr-pron-adv',
  })),
  // runs [around] the lake
  {
    m: '#PhrV [around] the #NN',
    g: 0,
    t: 'IN', //(breaks the phrasal)
    r: 'around-noun',
  },

  // === verbs/imperative.js ===
  // this is really hard to do
  //we do not go

  // do not [go]
  { m: '^do not? [#Inf #RP?]', n: notIf, g: 0, t: 'Imp', r: 'do-eat' },
  // please [go]
  { m: '^please do? not? [#Inf #RP?]', g: 0, t: 'Imp', r: 'please-go' },
  // just [go]
  { m: '^just do? not? [#Inf #RP?]', g: 0, t: 'Imp', r: 'just-go' },
  // [go] quickly.
  {
    m: '^[#Inf] (#JJ|#RB|hard|high|fast|slow)$',
    g: 0,
    t: 'Imp',
    n: '(so|such|rather|enough)',
    r: 'go-quickly',
  },
  // [turn] down the noise
  { m: '^[#Inf] (up|down|over) #Det', g: 0, t: 'Imp', r: 'turn-down' },
  // [eat] my shorts
  {
    m: '^[#Inf] (your|my|the|a|an|any|each|every|some|more|with|on)',
    g: 0,
    n: 'like',
    t: 'Imp',
    r: 'eat-my-shorts',
  },
  // [tell] him the story
  { m: '^[#Inf] (him|her|it|us|me|there)', g: 0, t: 'Imp', r: 'tell-him' },
  // [avoid] loud noises
  { m: '^[#Inf] #JJ #NN$', g: 0, t: 'Imp', r: 'loud-noises' },
  // [come] and have a drink
  { m: '^[#Inf] (#JJ|#RB)? and #Inf', g: 0, t: 'Imp', r: 'and-reserve' },
  // [go]
  { m: '^[go] please?$', g: 0, t: 'Imp', r: 'go-imp' },
  // [stop]
  { m: '^[stop] please?$', g: 0, t: 'Imp', r: 'stop-imp' },
  // [wait]
  { m: '^[wait] please?$', g: 0, t: 'Imp', r: 'wait-imp' },
  // [hurry]
  { m: '^[hurry] please?$', g: 0, t: 'Imp', r: 'hurry-imp' },
  // let's [leave]
  { m: '^let (us|me) [#Inf]', g: 0, t: 'Imp', r: 'lets-leave' },
  // [shut] the door
  {
    m: '^[(shut|close|open|start|stop|end|keep)] #Det #NN',
    g: 0,
    t: 'Imp',
    r: 'shut-the-door',
  },
  // [turn off] the light
  { m: '^[#PhrV #RP] #Det #NN', g: 0, t: 'Imp', r: 'turn-off' },
  // [go] to toronto
  { m: '^[go] to .', g: 0, t: 'Imp', r: 'go-to-toronto' },
  // A modal question alone may ask about ability or knowledge. Require an
  // explicit request marker before treating it as an imperative.
  // can you please [walk]
  {
    m: '^(can|could|will|would) you (#RB|not)+? please (#RB|not)+? [#Inf]',
    g: 0,
    t: 'Imp',
    r: 'would-please',
  },
  // please can you [walk]
  {
    m: '^please (can|could|will|would) you (#RB|not)+? [#Inf]',
    g: 0,
    t: 'Imp',
    r: 'please-you',
  },
  // can you [walk] please
  {
    m: '^(can|could|will|would) you (#RB|not)+? [#Inf] .+? please$',
    g: 0,
    t: 'Imp',
    r: 'please-end',
  },
  // come have a drink
  { m: '^come #Inf', t: 'Imp', n: 'on', r: 'come-have' },
  // come and have a drink
  { m: '^come and #Inf', t: 'Imp . Imp', r: 'come-and-have' },
  // [keep] it silent
  { m: '^[keep] it #JJ', g: 0, t: 'Imp', r: 'keep-it-cool' },
  // [allow] yourself
  {
    m: '^(and|but)? (then|please)? [#Inf] (yourself|yourselves)',
    g: 0,
    t: 'Imp',
    r: 'allow-yourself',
  },
  // [look] what happened
  { m: '^[#Inf] what .', g: 0, t: 'Imp', r: 'look-what' },
  // [go] to it
  { m: '^[#Inf] (to|for|into|toward|here|there)', g: 0, t: 'Imp', r: 'go-to' },
  // [come] and have a drink
  { m: '^[#Inf] (and|or) #Inf', g: 0, t: 'Imp', r: 'inf-and-inf' },
  // [maintain] eye contact
  { m: '^[#Inf] #JJ? #NNs #NNs', g: 0, t: 'Imp', r: 'eye-contact' },
  // don't forget to [clean]
  { m: '^do not (forget|omit|neglect) to [#Inf]', g: 0, t: 'Imp', r: 'do-not-forget' },
  // [add] 2 eggs
  { m: '^[#Inf] #Value #NN', g: 0, t: 'Imp', r: 'add-2-eggs' },

  // === verbs/adj-gerund.js ===

  // The station was [closing]. The shop is [closing] soon.
  { m: '#Cop #RB+? [closing] (#RB|soon)+?$', g: 0, t: 'VBG', r: 'closing' },
  // that were [growing]
  { m: '(that|which) were [%Adj|Gerund%]', g: 0, t: 'VBG', r: 'were-growing' },

  // === _misc.js ===
  // order matters

  // u r cool
  { m: 'u r', t: '#PRP #Cop', r: 'u-r' },
  // the captain [who]
  { m: '#NN [(who|whom)]', g: 0, t: 'Det', r: 'captain-who' },
  // who is [that]?
  {
    m: '^#QW #RB+? #Cop #RB+? [(this|that|these|those)] #RB+?$',
    g: 0,
    t: 'PRP',
    r: 'who-is-that',
  },
  // I like [this]
  {
    m: '#V [(this|that|these|those)] #RB+? (yesterday|today|tonight|tomorrow)?$',
    g: 0,
    t: 'PRP',
    r: 'dem-obj',
  },
  // some sort of
  { m: 'some sort of', t: 'Det NN IN', r: 'some-sort-of' },
  // of some sort
  { m: 'of some sort', t: 'IN Det NN', r: 'of-some-sort' },
  // [some] eat apples
  { m: '^[some] #Inf #NN', g: 0, t: 'PRP', r: 'some-subj' },
  // put it [there]
  {
    m: '(put|puts|putting|place|placed|leave|left) #PRP [there]',
    g: 0,
    t: 'RB',
    r: 'loc-there',
  },
  // [such] skill
  { m: '[such] (a|an|is)? #NN', g: 0, t: 'Det', r: 'such-skill' },
  // are [ya]
  { m: '(are|#MD|see|do|for) [ya]', g: 0, t: 'PRP', r: 'are-ya' },
  // [long live] the king
  { m: '[long live] .', g: 0, t: '#RB #Inf', r: 'long-live' },
  // [there] she is
  { m: '[there] (#RB|#PRP)? #Cop', g: 0, t: 'There', r: 'there-is' },
  // is [there] food
  { m: '#Cop [there] .', g: 0, t: 'There', r: 'is-there' },
  // should [there]
  { m: '#MD #RB? [there]', g: 0, t: 'There', r: 'should-there' },
  // [do] you
  { m: '^[do] (you|we|they)', g: 0, t: 'QW', r: 'do-you' },
  // [does] he
  { m: '^[does] (he|she|it|#NNP)', g: 0, t: 'QW', r: 'does-he' },
  // the person [who] runs
  { m: '#Det #NN+ [who] #V', g: 0, t: 'IN', r: 'x-who' },
  // the person [which] eats
  { m: '#Det #NN+ [which] #V', g: 0, t: 'IN', r: 'x-which' },
  // guess who
  { m: 'guess who', t: '#Inf #QW', r: 'guess-who' },
  // [fucking] ridiculous
  { m: '[fucking] !#V', g: 0, t: '#VBG', r: 'f-as-ger' },

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
  { m: 'university of #Place', t: 'Org', r: 'uni-place' },
  // Name pairs can be business names without a known organization suffix.
  { m: '#NNP & #NNP', t: 'NNP', r: 'name-and-name' },
  // John & Mary Ltd
  { m: `#Pers & #Pers ${companySuffix}`, t: 'Org', r: 'person-and' },
  // Smith & Rogers
  { m: '#LN & #LN', t: 'Org', r: 'last-and-last' },
  // Microsoft of Canada
  { m: '#Org of the? #NNP', t: 'Org', r: 'org-of-place', safe: true },
  // walmart USA
  { m: '#Org #Country', t: 'Org', r: 'org-country' },
  // Toronto Microsoft
  { m: '#NNP #Org', t: 'Org', n: '#FN', r: 'title-org' },
  // FitBit Inc
  { m: '#NNP (ltd|co|inc|dept|assn|bros)', t: 'Org', r: 'org-abbrv' },
  // the [XYZ corporation]
  { m: `the [#Acronym ${companySuffix}]`, g: 0, t: 'Org', r: 'acro', safe: true },
  // [government of india]
  { m: '[government of the? #Place+]', g: 0, t: 'Org', r: 'gov-of-x' },
  // school board
  { m: '(health|school|commerce) board', t: 'Org', r: 'school-board' },
  // special committee
  {
    m: '(nominating|special|conference|executive|steering|central|congressional) committee',
    t: 'Org',
    r: 'special',
  },
  // global Microsoft
  {
    m: '(world|global|international|national|#Dem) #Org',
    t: 'Org',
    r: 'global-org',
  },
  // Toronto public school
  { m: '#NN+ (public|private) school', t: 'School', r: 'public-school' },
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
    m: '#Place+ #NN{0,2} (club|society|group|team|committee|commission|association|guild|crew)',
    t: 'Org',
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
    m: '#NNP+ (cliff|place|range|pit|place|point|room|grounds|ruins)',
    t: 'Place',
    r: 'foo-point',
  },
  // 123 main street
  {
    m: '#Value #NN+ (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave|lane|boulevard|blvd|drive|dr|parkway|way)',
    t: 'Address',
    r: 'address-st',
  },
  // port dover
  { m: '(port|mount|mt) #NNP', t: 'Place', r: 'port-name' },

  // === conjunctions.js ===

  // [how] he is driving
  ...['who', 'what', 'where', 'why', 'how', 'when'].map(word => ({
    m: `[${word}] #NN #Cop #RB? (#V|#JJ)`,
    g: 0,
    t: 'Conj',
    r: 'how-he-is-x',
  })),
  // is [when] he
  { m: '#Cop [(who|what|where|why|how|when)] #NN', g: 0, t: 'Conj', r: 'when-he' },
  // things [that] seem cool
  { m: '#NN [that] #V #JJ', g: 0, t: 'Conj', r: 'that-seem' },
  // he was [that] wide
  { m: '#NN #Cop not? [that] #JJ', g: 0, t: 'RB', r: 'that-adj' },
  // [to] the store - a determiner/possessive/pronoun opens a noun-phrase, so this 'to' is never an infinitive-marker
  // [to] the store
  {
    m: '[to] (#Det|#Poss|#PRP|#Email|#Url)',
    g: 0,
    u: 'Conj',
    t: 'IN',
    r: 'to-the-store',
  },
  // [to] lunch
  { m: '[to] (#NN && !#V)', g: 0, u: 'Conj', t: 'IN', r: 'to-noun' },
  // well [above] the clouds, directly [under] the bridge
  ...['above', 'below', 'under', 'over'].flatMap(prep =>
    ['well', 'just', 'right', 'directly'].map(word => ({
      m: `${word} [${prep}] (#Det|#Poss|#PRP|#NNP)`,
      g: 0,
      t: 'IN',
      r: `well-${prep}`,
    }))
  ),
  // I heard rumors [that] drivers save gas
  { m: '#V #RB? #NN [(that|which)]', g: 0, t: 'IN', r: 'that-prep' },
  // Tuesday, [which] he liked
  { m: '@hasComma [which] (#PRP|#V)', g: 0, t: 'IN', r: 'which-cop' },
  // treated them [like] sons
  { m: '(me|him|her|us|them|it) [like] #NN', g: 0, t: 'IN', r: 'noun-like' },
  // a day [like] this
  { m: 'a #NN [like] (#NN|#Det)', g: 0, t: 'IN', r: 'a-noun-like' },
  // really [like]
  { m: '(#RB && !lot) [like]', g: 0, t: 'V', r: 'really-like' },
  // is not [like] me
  { m: '(#Cop|be|been|being) (not|never) [like]', g: 0, t: 'IN', r: 'neg-like' },
  // a lot [like] ours
  { m: 'a lot [like] #NN', g: 0, t: 'IN', r: 'lot-like' },
  // treat them [like]
  { m: '#Inf #PRP [like]', g: 0, t: 'IN', r: 'treat-like' },
  // [before] dinner
  {
    m: '[before] (#Det|#Poss|#NN|#VBG|#Date)',
    g: 0,
    t: 'IN',
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
  { m: '[#QW] (#PRP|#Det)', g: 0, t: 'IN', r: 'how-he' },
  // [when] stolen
  { m: '[#QW] #Part', g: 0, t: 'IN', r: 'when-stolen' },
  // [how] is
  { m: '[how] (#Det|#Cop|#MD|#Past)', g: 0, t: 'QW', r: 'how-is' },
  // children [who] dance
  { m: '#Plur [(who|which|when)] .', g: 0, t: 'IN', r: 'people-who' },

  // === expressions.js ===

  // holy shit
  { m: 'holy (shit|fuck|hell)', t: 'Expr', r: 'swears-expr' },
  // [well]..
  { m: '^[well] !#JJ?', g: 0, t: 'Expr', r: 'well-expr' },
  // [so]
  { m: '^[so] !#JJ?', g: 0, t: 'Expr', r: 'so-expr' },
  // [okay]
  { m: '^[okay] !#JJ?', g: 0, t: 'Expr', r: 'okay-expr' },
  // [now]
  { m: '^[now] !#JJ?', g: 0, t: 'Expr', r: 'now-expr' },
  // come on
  { m: '^come on', t: 'Expr', r: 'come-on' },
  // shoot,
  { m: '^(shoot && @hasComma)', t: 'Expr', r: 'shoot-comma-expr' },
  // say,
  { m: '^(say && @hasComma)', t: 'Expr', r: 'say-expr' },
  // like, hello
  { m: '^(like && @hasComma)', t: 'Expr', r: 'like-expr' },

  // === second-pass.js ===
  // Corrections matched against the main sweep's output, before any are applied.
  // const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'

  // Which chair did she [sit] [on]?

  // veggies, [like] kale
  (secondPassStart = {
    m: '(#NN && @hasComma) [like] #NN',
    g: 0,
    t: 'IN',
    r: 'comma-like-ex',
  }),
  // Keep comma context, but don't turn unambiguous verbs into list items.
  ...['%Noun|Verb%', '%Plural|Verb%', 'thanks'].map(target => ({
    m: `(#NN && @hasComma) #NN (and|or) [(${target} && #Pres)]`,
    g: 0,
    t: 'NN',
    n: '#Cop',
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
    { m: `[${word}] ${subject} ${predicate}`, g: 0, t: 'Conj', r: `${word}-clause` },
    // [Before] the guests from the village arrived, we ate.
    // [After] the guests from the village arrived, we ate.
    // [Since] the guests from the village arrived, we ate. ...
    {
      m: `[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`,
      g: 0,
      t: 'Conj',
      r: `${word}-mod-subj`,
    },
  ]),
  // [Before] the dog and the cat woke, she left.
  // [before] the dog and the cat woke
  // [after] the dog and the cat woke...
  ...['before', 'after', 'until', 'when', 'while'].map(word => ({
    m: `^[${word}] ${subject} and ${subject} ${predicate}`,
    g: 0,
    t: 'Conj',
    r: `${word}-joint-subj`,
  })),
  // She bought flowers, [for] I was ill.
  { m: `@hasComma [for] ${subject} ${predicate}`, g: 0, t: 'Conj', r: 'causal-for' },
  // Everyone [but] me agreed.
  ...['everyone', 'everybody', 'everything', 'anyone', 'anybody', 'anything', 'nobody', 'nothing', 'all'].map(word => ({
    m: `${word} [but] (me|him|her|us|them|#Det|#Poss|#NNP)`,
    g: 0,
    t: 'IN',
    r: 'exceptive-but',
  })),

  // The cat slept [under] the table. He sat [beside] me.
  // the plane flew well [above] the clouds
  // she stood directly [below] the window...
  ...['above', 'below', 'under', 'over', 'beside', 'behind', 'against', 'outside', 'inside', 'near'].map(word => ({
    m: `[(${word} && !#V)] (#Det|#Poss|#PRP|#NNP)`,
    g: 0,
    t: 'IN',
    r: `${word}-space-obj`,
  })),
  // We looked [under] the bed.
  { m: '#V [under] (#Det|#Poss|#PRP)', g: 0, t: 'IN', r: 'under-obj' },
  // She sings [like] her mother
  {
    m: '(#V && !#Aux && !#MD && !do && !does && !did && !have && !has && !had) [like] (#NN|#Det|#Poss)',
    g: 0,
    t: 'IN',
    r: 'like-like',
  },
  // images on a screen [like] humans do
  { m: '#NN [like] #NN+ (do|does|did)$', g: 0, t: 'IN', r: 'noun-like-cmp' },
  // cities [like] New York, Boston
  ...['', '#Place ', '#Place #Place '].map(prefix => ({
    m: `#Plur [like] ${prefix}(#Place && @hasComma) #Place`,
    g: 0,
    t: 'IN',
    r: 'like-place',
  })),
  // [Like] his brother, he enjoys chess
  {
    m: '^[like] (#Det|#Poss)? #JJ+? (#NN && @hasComma)',
    g: 0,
    t: 'IN',
    r: 'init-like',
  },
  // She sings [like] her mother does
  {
    m: `(#V && !#Aux && !#MD && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`,
    g: 0,
    t: 'Conj',
    r: 'manner-like',
  },
  // I like tea, [like] my sister does.
  { m: `@hasComma [like] ${subject} ${predicate}`, g: 0, t: 'Conj', r: 'comma-like-cl' },
  // We talked about the fact [that] she resigned.
  { m: `#NN [that] ${subject} ${predicate}`, g: 0, t: 'Conj', r: 'noun-that' },
  // I have heard that story [before]
  {
    m: '#V (#Det|#Poss)? #NN+? [(before|since)]$',
    g: 0,
    t: 'RB',
    n: '@hasQuestionMark',
    r: 'time-adv',
  },
  // We met shortly [after].
  { m: '(shortly|soon|long) [after]$', g: 0, t: 'RB', r: 'after-adv' },
  // She has [since] moved.
  { m: '(has|have|had) [since] #Past', g: 0, t: 'RB', r: 'perf-since-adv' },
  // She has not arrived [yet].
  { m: '#Past [yet]$', g: 0, t: 'RB', r: 'yet-adv' },
  // Who did she arrive [before]?
  {
    m: '^(who|whom) #V #PRP #V [before]$',
    g: 0,
    t: 'IN',
    r: 'before-end',
  },
  // We will leave [when] the rain stops.
  {
    m: '#MD #Inf [when] #Det',
    g: 0,
    t: 'Conj',
    r: 'leave-when',
  },

  // Possession of running water and enduring noun phrases are not progressives.
  { m: '[(have|has|had)] running water', g: 0, u: 'Aux', r: 'have-water' },
  { m: '[#Cop] (enduring && #JJ) #NN', g: 0, u: 'Aux', r: 'enduring-cop' },
  // Although he [was] [tired], he smiled. He [was] [tired].
  ...[
    // He [was] [tired].
    { match: '[(#Cop|been)] #RB+? [tired]$', position: 'end' },
    // Although he [was] [tired], he smiled.
    { match: '[(#Cop|been)] #RB+? [(tired && @hasComma)]', position: 'comma' },
  ].flatMap(({ match, position }) => [
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 0, t: 'Cop', u: 'Pass', r: `tired-${position}-cop` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 0, u: 'Aux', r: `tired-${position}-unaux` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 1, t: 'JJ', r: `tired-${position}-adj` },
  ]),
  // had been tired
  { m: '(has|have|had) (#RB|not)+? been #RB+? tired$', u: 'Pass', r: 'tired-unpass' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 0, u: 'PhrV', r: 'sit-q-unphr' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 1, t: 'IN', r: 'sit-q-prep' },
  // “May twenty five”
  { m: '(#TxtNum && #Date) #TxtNum', t: 'Date', r: 'textvalue-date' },
  // 23 Main Street in Toronto
  { m: '#Address in #Place', t: 'Place', r: 'address-place' },
  // the very [professional] actor
  {
    m: '#Det (very|remarkably|extremely|quite|unusually) [%Adj|Noun%] #Actor',
    g: 0,
    t: 'JJ',
    r: 'degree-actor',
  },
  // the [sleeping] dog
  {
    m: '#Det [sleeping] (#Actor|#Pers|puppy|kitten|dog|cat|baby|babies|child|children)',
    g: 0,
    t: 'JJ',
    r: 'sleeping-mod',
  },
  // he ate, and [left]
  {
    m: '(#Past && @hasComma) and [%Adj|Past%] #RB+?$',
    g: 0,
    t: 'Past',
    r: 'past-list',
  },
  // [water] broke the pipe
  {
    m: '^[%Noun|Verb%] #Past (#Det|#Poss) #JJ+? #NN',
    g: 0,
    t: 'NN',
    r: 'bare-subj-past',
  },
  // the [present] immediately
  { m: '#Det [present] #RB+$', g: 0, t: 'NN', r: 'present-obj' },
  // [falls in] June
  { m: '[(fall|falls|fell) in] #Month', g: 0, t: '#V #IN', r: 'fall-in-month' },
  // [had] he walked
  {
    m: '^[had] #NN+ (#RB|not)+? #Past',
    g: 0,
    t: 'Condition',
    r: 'had-cond',
    n: '@hasQuestionMark',
  },
  // [were] he to walk
  {
    m: '^[were] #NN+ to #Inf *$',
    g: 0,
    t: 'Condition',
    r: 'were-he',
    n: '@hasQuestionMark',
  },
  // [had] he walked?
  {
    m: '^[had] #NN+ (#RB|not)+? (#Past && @hasQuestionMark)$',
    g: 0,
    t: 'Aux',
    r: 'had-q-end',
    n: '@hasComma',
  },
  // [had] he walked the dog?
  {
    m: '^[had] #NN+ (#RB|not)+? #Past * @hasQuestionMark$',
    g: 0,
    t: 'Aux',
    r: 'had-q-obj',
    n: '@hasComma',
  },
  // then, [had] he walked
  {
    m: '@hasComma [had] #NN+ (#RB|not)+? #Past',
    g: 0,
    t: 'Condition',
    r: 'had-comma-cond',
    n: '@hasQuestionMark',
  },
  // does [this] work
  {
    m: '(do|does|did|#MD) [(this|that|these|those)] #RB+? #Inf',
    g: 0,
    t: 'PRP',
    r: 'dem-q',
  },
  // [This] is useful. Hope [this] helps. [This] really rocks.
  {
    m: '[this] #RB+? (#Pres && !#Inf && !#VBG)',
    g: 0,
    t: 'PRP',
    r: 'this-finite-subj',
  },
  // [This] will be one sentence. [This] might help.
  { m: '[this] #RB+? #MD #RB+? #Inf', g: 0, t: 'PRP', r: 'this-modal-subj' },
  // has [read], had [put]
  ...['read', 'put'].map(word => ({
    m: `(has|have|had) (#RB|not)+? [${word}]`,
    g: 0,
    t: 'Part',
    r: 'perf-invar',
  })),
  // what [work] he did
  { m: '(which|what|whose) [%Noun|Verb%] #PRP', g: 0, t: 'NN', r: 'embed-wh-obj' },
  // what [walks] he took
  { m: '(which|what|whose) [%Plural|Verb%] #PRP', g: 0, t: 'Plur', r: 'embed-wh-pl' },
  // John and Mary [walk]
  {
    m: '#Pers and #Pers [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$',
    g: 0,
    t: 'Inf',
    r: 'joint-subj-verb',
  },
  // dogs [near] the house [bark]
  // near|on|under|beside|behind
  ...['near', 'on', 'under', 'beside', 'behind'].flatMap(word => [
    {
      m: `#Plur [${word}] #Det #JJ+? #NN [%Noun|Verb%]$`,
      g: 0,
      t: 'IN',
      r: 'subj-loc',
    },
    {
      m: `#Plur [${word}] #Det #JJ+? #NN [%Noun|Verb%]$`,
      g: 1,
      t: 'Inf',
      r: 'subj-loc-verb',
    },
  ]),
  // { match: locative, group: 0, tag: 'Preposition', reason: 'subj-loc' },
  // { match: locative, group: 1, tag: 'Infinitive', reason: 'subj-loc-verb' },
  // being [injured] and treated
  {
    m: 'being #RB+? [%Adj|Past%] (and|or) #RB+? (#Past|#Part)',
    g: 0,
    t: 'Past',
    r: 'coord-pass',
  },
  // has eaten and [drunk]
  {
    m: '(has|have|had) (#RB|not)+? #Past (and|or) #RB+? [drunk]',
    g: 0,
    t: 'Part',
    r: 'coord-drunk',
  },
  // dogs, [including] the poodle
  {
    m: '(#NN && @hasComma) [including] all? #Det? #CD+? #RB+? #JJ+? #NN',
    g: 0,
    t: 'IN',
    r: 'including-list',
  },
  // can you [walk], please?
  {
    m: '^(can|could|will|would) you (#RB|not)+? [(#Inf && @hasComma)] please$',
    g: 0,
    t: 'Imp',
    r: 'req-verb-comma',
  },
  // can you [walk] the dog, please?
  {
    m: '^(can|could|will|would) you (#RB|not)+? [#Inf] * @hasComma please$',
    g: 0,
    t: 'Imp',
    r: 'req-obj-comma',
  },
  // [Will] walked home
  { m: '[(will && @isTitleCase)] #Past', g: 0, t: 'FN', r: 'will-past-subj' },
  // jack the ripper
  { m: '%Person|Verb% (the && #Pers) #Pers', t: 'Pers', r: 'known-nickname' },
  // she drew a picture
  { m: '(drew && #V)', t: 'Past', r: 'drew-a-picture' },
  // keep the lid [closed]
  {
    m: '#Imp #Det #NN+ [%Adj|Past%]',
    g: 0,
    t: 'JJ',
    r: 'lid-closed',
  },
  // console.log('  ', rules.length, 'matches second-pass\n\n')
]

// Expand compact rule keys once, preserving the pass-boundary object.
const keys = { m: 'match', g: 'group', t: 'tag', r: 'reason', n: 'notIf', u: 'unTag' }
rules.forEach(rule => {
  Object.keys(rule).forEach(key => {
    rule[key] = expandTags(rule[key], key === 't' || key === 'u')
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
