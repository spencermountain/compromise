import expandRules from './expand-rules.js'

const noLy = '(hard|fast|late|early|high|right|deep|close|direct)'
const infNouns =
  '(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)'
const notIf = '(i|we|they)' //we do not go
const companySuffix = '(inc|ltd|llc|co|corp|corporation|company|limited)'

/*
{ m: match
  g: group,
  t: tag}
*/

// order matters top-matches can get overwritten
const noun = '(#NN && !#Poss && !@hasComma)'
const modifiers = '(#Det|#Poss)? #Adv+? #Adj+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#Adv+? not? (#V && !#Ger && !#Particle)'

const rules = [
  // let the dough [rest] overnight
  {
    m: 'let (#Det|#Poss)? #Adj+? #NN [(%Noun|Verb% && !#Plur)] (overnight|outside|inside|here)$',
    g: 0, t: 'Inf',
  },
  // === verbs/passive.js ===

  // got walked
  { m: 'got (#Past|#VBN)', t: 'Pass' },
  // Share the pattern while keeping cheap word-specific hooks.
  ...['were', 'was', 'is', 'are', 'am'].map(word => ({
    m: `${word} (#Past|#VBN)`,
    t: 'Pass',
  })),
  // was being walked
  { m: '(was|were|is|are|am) being (#Past|#VBN)', t: 'Pass' },
  // had been walked
  { m: '(had|have|has) been (#Past|#VBN)', t: 'Pass' },
  // will be cleaned
  { m: 'will be being? (#Past|#VBN)', t: 'Pass' },
  // dog was [walked] by the man
  {
    m: '#NN (am|is|are|was|were) #Adv? [(#Past|#VBN)] by (the|a) #NN',
    g: 0,
    t: 'Pass',
  },

  // === adjective/adjective.js ===

  // Restore the copula when the colour is written without a hyphen.
  // [is] off white
  {
    m: '[(is|are|am|was|were)] off white$',
    g: 0,
    u: 'PhrV',
    t: 'Cop',
  },
  // is [off white]
  { m: '(is|are|am|was|were) [off white]$', g: 0, t: 'Adj' },
  // [all] the dogs
  { m: '[(all|both)] #Det #NN', g: 0, t: 'NN' },
  // the door is [closed]
  { m: '#Sing is #Adv? [%Adj|Past%]$', g: 0, t: 'Adj' },
  // [forgotten] art is rediscovered
  { m: '[#Past] #Sing is', g: 0, t: 'Adj' },
  // [forgotten] stories are lost
  { m: '[#Past] #Plur are', g: 0, t: 'Adj' },
  // is [fucked up]
  { m: '#Cop [fucked up?]', g: 0, t: 'Adj' },
  // the door seems [opened]
  { m: '#Sing (seems|appears) #Adv? [#Past$]', g: 0, t: 'Adj' },
  // jury is out - preposition ➔ adjective
  // jury is [out]
  { m: '#Cop #Adj? [(out|in|through)]$', g: 0, t: 'Adj' },
  // [quiet] the room
  {
    m: '^[(#Adj && !near && !inside && !outside && !opposite)] (the|your) #NN',
    g: 0,
    n: '(all|even)',
    t: 'Inf',
  },
  // blue-[tinted]
  {
    m: '(#Adj && #Hyphenated) [(#Hyphenated && #Past)]$',
    g: 0,
    t: 'Adj',
  },
  // [blue-tinted] glasses
  {
    m: '[#Hyphenated (#Hyphenated && #Past)] (#NN|#Conj)',
    g: 0,
    t: 'Adj',
    n: '#Adv',
  },
  // [non-breaking] spaces
  {
    m: '[#Hyphenated (#Hyphenated && #Ger)] (#NN|#Conj)',
    g: 0,
    t: 'Adj',
    n: '#Adv',
  },
  // [dammed-up] river
  {
    m: '[#Past (#Hyphenated && #PhrV)] (#NN|#Conj)',
    g: 0,
    t: 'Adj',
  },

  // === adjective/adj-adverb.js ===

  // is [far too] cold
  { m: `#Cop [far too] #Adj`, g: 0, t: 'Adv' },
  // shops [direct]
  {
    m: `#V [${noLy}] !#NN?`,
    g: 0,
    n: '(#Cop|be|been|being|get|got|getting|become|became|becoming|feel|feels|feeling|#Det|#Prep)',
    t: 'Adv',
  },
  // Bare 'be' may still be Infinitive rather than Copula in commands.
  // be [late]
  { m: '(be|been|being) (#Adv|not)+? [late]', g: 0, t: 'Adj' },
  // be [early]
  { m: '(be|been|being) (#Adv|not)+? [early]', g: 0, t: 'Adj' },
  // [moons] a lot
  { m: `[#Plur] a lot !like?`, g: 0, t: 'Pres' },

  // === adjective/adj-gerund.js ===
  // Gerund-Adjectives - 'amusing, annoying'

  // found it [interesting]
  { m: 'found it #Adv? [%Adj|Gerund%]', g: 0, t: 'Adj' },
  // found it [isolating], but found it isolating cells
  { m: 'found it #Adv? [isolating]$', g: 0, t: 'Adj' },
  // a little [fuming]
  { m: 'a (little|bit|wee) bit? [#Ger]', g: 0, t: 'Adj' },
  // repairing [crumbling] roads
  {
    m: '#Ger [#Ger] #NN',
    g: 0,
    t: 'Adj',
    n: '(impersonating|practicing|considering|assuming|enjoying|avoiding|stopping|starting|finishing)',
  },
  // looked [amazing]
  {
    m: '(looked|look|looks) #Adv? [%Adj|Gerund%]',
    g: 0,
    t: 'Adj',
    n: '(impersonating|practicing|considering|assuming)',
  },
  // meaning alluring
  { m: '%Noun|Gerund% %Adj|Gerund%', t: 'Ger #Adj' },

  // === adjective/adj-noun.js ===

  // his [fine]
  { m: '(his|its) [%Adj|Noun%] !#NN?', g: 0, t: 'NN', n: '#Hyphenated' },
  // is [all]
  { m: '#Cop #Adv? [all]', g: 0, t: 'NN' },
  // have [fun] with it
  { m: `(have|had) [#Adj] #Prep .`, g: 0, t: 'NN' },
  // brewing giant
  { m: `#Ger (giant|capital|center|zone|application)`, t: 'NN' },
  // in a [perfect]
  { m: `#Prep (a|an) [#Adj]$`, g: 0, t: 'NN' },
  // [brand] new
  { m: `[brand #Ger?] new`, g: 0, t: 'Adv' },
  // must-win
  { m: `(must && #Hyphenated) .`, t: 'Adj' },
  // the [present]
  {
    m: `#Det [#Adj]$`,
    g: 0,
    t: 'NN',
    n: '(this|that|#Comp|#Sup)',
  }, //are that crazy.
  // company-wide
  {
    m: `(#NN && #Hyphenated) (#Adj && #Hyphenated)`,
    t: 'Adj',
    n: '(this|that|#Comp|#Sup)',
  },
  // the [poor] were
  // {
  //   m: `#Det [#Adj] (#Cop|#Det)`,
  //   n: '(#Comp|#Sup)',
  //   g: 0,
  //   t: 'NN',
  // },
  // [professional] bodybuilder
  {
    m: `[(%Adj|Noun% && !#Timezone && !#Value)] #NN`,
    n: '(#Pron|#Prop)',
    g: 0,
    t: 'Adj',
  },

  // === adverb.js ===

  // [way] too hot
  { m: '[way] #Adv #Adj', g: 0, t: 'Adv' },
  // sing [like] an angel
  { m: '#V  [like]', g: 0, n: '(#Mod|#PhrV)', t: 'Adv' },
  // even left
  { m: 'even left', t: '#Adv #V' },
  // cheering [hard]
  {
    m: '#Pres [(hard|quick|bright|slow|fast|backwards|forwards)]',
    n: '(#Cop|feel|feels|look|looks|seem|seems|appear|appears|sound|sounds|smell|smells|taste|tastes|become|becomes|grow|grows|get|gets|stay|stays|remain|remains)',
    g: 0,
    t: 'Adv',
  },
  // a [bit] cold
  { m: 'a [(little|bit|wee) bit?] #Adj', g: 0, t: 'Adv' },
  // become overly [weakened]
  { m: '(become|fall|grow) #Adv? [#Past]', g: 0, t: 'Adj' },
  // a completely [beaten] man
  { m: '(a|an) #Adv [#VBN] #NN', g: 0, t: 'Adj' },
  // a [close] friend
  // { m: '#Det #Adv? [close] #NN', g: 0, t: 'Adj' },
  // does [better]
  { m: '(do|does|did) #Adv? [(better|worse)]', g: 0, t: 'Adv' },
  // walking [close]
  {
    m: '#Ger #Adv? [close]',
    g: 0,
    t: 'Adv',
    n: '(getting|becoming|feeling)',
  },
  // charged [back]
  {
    m: '(#Pres|#Past) [back]',
    g: 0,
    t: 'Adv',
    n: '(#PhrV|#Cop)',
  },
  // the [well]
  { m: '#Det [well] !#Past?', g: 0, t: 'NN', n: 'well made' },
  // sees [well]
  { m: '(#Pres && !#Cop) [well]', g: 0, t: 'Adv' },

  // === dates/date.js ===

  // ==== WeekDay ====
  // [sun] the 5th
  { m: '[sun] the #Ord', g: 0, t: 'WeekDay' },
  // 1pm next [sun]
  { m: '#Date (on|this|next|last|during)? [sun]', g: 0, t: 'WeekDay' },

  // ==== Month ====
  // this march
  { m: '(this|next|last) march !#Inf?', t: '#Date #Month' },
  // this may
  { m: '(this|next|last) may !#Inf?', t: '#Date #Month' },
  // march 5th
  { m: `(march|may) the? #Value`, t: '#Month #Date #Date' },
  // 5th of march
  { m: `#Value of? (march|may)`, t: '#Date #Date #Month' },
  // [march] and feb
  { m: `[(march|may)] .? #Date`, g: 0, t: 'Month' },
  // feb to [march]
  { m: `#Date .? [(march|may)]`, g: 0, t: 'Month' },
  // quickly [march]
  { m: `#Adv [(march|may)]`, g: 0, t: 'V', n: '(early|late)' },

  // === dates/date-phrase.js ===

  // 5th of June
  { m: '#Value of #Month', t: 'Date' },
  // 5 June
  // { m: '#Card #Month', t: 'Date' },
  // June 5 to 7
  { m: '#Month #Value to #Value', t: 'Date' },
  // June the 12th
  { m: '#Month the #Value', t: 'Date' },
  // june 7
  { m: '(#WeekDay|#Month) #Value', t: 'Date' },
  // 7 june
  { m: '#Value (#WeekDay|#Month)', t: 'Date' },
  // aug 5th 2021
  { m: `#Month #Ord #Card`, t: 'Date' },

  // === timezones ===
  // china standard time
  { m: `(#Place|#Dem) (standard|daylight|central|mountain)? time`, t: 'Timezone' },

  // === nouns/nouns.js ===

  //'more' is not always an adverb
  // due to [weather]
  { m: 'due to [#V]', g: 0, t: 'NN' },

  // my first [thought]
  { m: '#Poss #Ord [#Past]', g: 0, t: 'NN' },
  // the nice [walk]
  {
    m: '(the|this|those|these) #Adj [%Noun|Verb%]',
    g: 0,
    t: 'NN',
    n: '#Cop',
  },
  // the truly nice [swim]
  { m: '(the|this|those|these) #Adv #Adj [#V]', g: 0, t: 'NN' },
  // the [message] from Danny
  { m: 'the [#V] #Prep .', g: 0, t: 'NN' },
  // a type of [shout]
  { m: '#Det #NN of [#V]', g: 0, t: 'NN', n: '#Ger' },
  // waited until [release]
  {
    m: '#Past #Prep [#Pres]',
    g: 0,
    n: '#Ger',
    t: 'NN',
  },
  // water-flows
  { m: '(#Sing && @hasHyphen && !must) #Pres', t: 'NN' },
  // is no [going] back
  { m: 'is no [#V]', g: 0, t: 'NN' },
  // and check this out! a [walk-in] microwave.
  {
    m: '(the|those|these|a|an) #Adj? [(#Pres && !#Ger && !#Cop && !seem && !appear && !include) #Particle?]',
    g: 0,
    t: 'NN',
    n: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)',
  },

  // ==== Actor ====
  // Aircraft designer
  { m: '#NN #Actor', t: 'Actor', n: '(#Pers|#Pron)' },
  // lighting designer
  { m: '#Ger #Actor', t: 'Actor' },
  // captain sanders
  // { match: '[#Actor+] #ProperNoun', group: 0, tag: 'Honorific' },
  // co founder
  { m: `co #Sing`, t: 'Actor' },
  // [aircraft] designer
  {
    m: `[#NN+] #Actor`,
    g: 0,
    t: 'Actor',
    n: '(#Hon|#Pron|#Poss)',
  },
  // fine-artist
  {
    m: `(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #NN? #Actor`,
    t: 'Actor',
  },
  // dance coach
  {
    m: `(#NN && !#Pron)+ (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)`,
    t: 'Actor',
  },
  // chief design officer
  { m: `chief . officer`, t: 'Actor' },
  // chief of police
  { m: `chief of #NN+`, t: 'Actor' },
  // president of marketing
  { m: `senior? vice? president of #NN+`, t: 'Actor' },

  // ==== Singular ====
  // did a [900], paid a [20]
  { m: '#V (a|an) [#Value]$', g: 0, t: 'Sing' },

  // ==== Possessive ====
  // John Smith's
  { m: '#First #Acronym? (#Poss && #Last)', t: 'Poss' },
  // Microsoft Research's office
  { m: '#Org+ #Poss', t: 'Poss' },
  // Los Angeles's fundraiser
  { m: '#Place+ #Poss', t: 'Poss' },
  // my butt smells
  { m: '#Poss #Pres #Particle?', n: '(#Ger|#Copula|her)', t: 'NN' }, // anna's eating vs anna's eating lunch
  // my [teachers] dog
  { m: '(my|our|their|her|his|its) [(#Plur && #Actor)] #NN', g: 0, t: 'Poss' },

  // 10th of a [second]
  { m: '#Value of a [second]', g: 0, u: 'Value', t: 'Sing' },
  // the euro [sense]
  {
    m: `#Det #NN [${infNouns}] !(#Prep|to|#Adv)?`,
    g: 0,
    t: 'NN',
  },
  // [thanks] for the gift are overdue
  { m: '[#Pres] (of|by|for) (a|an|the) #NN #Cop', g: 0, t: 'Plur' },
  // You eat and [sleep]
  { m: '#Inf and [%Noun|Verb%]', g: 0, t: 'Inf' },
  // dogs and [running] and cats
  { m: '#NN and [#V] and #NN', g: 0, t: 'NN' },
  // the 1992 [classic]
  { m: 'the #Card [%Adj|Noun%]', g: 0, t: 'NN' },
  // This is the [premier] university in Virginia
  { m: '#Cop the [%Adj|Noun%] #NN', g: 0, t: 'Adj' },

  // i ate [me] sandwich (scottish slang)
  // { m: 'i #V [me] #NN', g: 0, t: 'Poss' },
  // He bowed his [head] in prayer
  { m: '#Past #Poss [#V]', g: 0, t: 'NN', n: '(saw|made)' },
  // 35 [signs]
  { m: '#Value [%Plural|Verb%]', g: 0, t: 'Plur', n: '(one|1|a|an)' },
  // had [time]
  { m: 'had [%Noun|Verb%]', g: 0, t: 'NN', n: '(#Ger|come|become)' },
  // instant access
  { m: '(%Adj|Noun% && !#Timezone) %Noun|Verb%', t: '#Adj #NN', n: '#Prop #NN' },
  // near death experiences, ambitious sales [targets]
  {
    m: '#Adj #NN [%Plural|Verb%]$',
    g: 0,
    t: 'Plur',
    n: '#Pron',
  },
  // your guild [colors]
  { m: '#Poss #NN [(colors|colours)]$', g: 0, t: 'Plur' },

  // === verbs/noun-gerund.js ===

  // the [upcoming thank]-you
  { m: '(this|that|the|a|an) [#Ger #Inf]', g: 0, t: 'Sing' },
  // the [upcoming thank]-you
  { m: '(that|the) [#Ger #Pres]', g: 0, ifNo: '#Cop', t: 'Plur' },
  // lexical [tagging]
  { m: '#Adj [#Ger]', g: 0, t: 'NN', n: '(still|even|just)' },
  // [walking] is cool
  { m: '[#Ger] #Adv? not? #Cop', g: 0, t: 'Activity' },
  // are [doing] is
  { m: '#Cop [(#Ger|#Activity)] #Cop', g: 0, t: 'Ger' },
  // responsibility for [setting]
  { m: '#Sing for [%Noun|Gerund%]', g: 0, t: 'Ger' },
  // better for [training]
  { m: '#Comp (for|at) [%Noun|Gerund%]', g: 0, t: 'Ger' },
  // apologized for [shouting]
  {
    m: '(#Past|#Pres) for [%Noun|Gerund%]',
    g: 0,
    t: 'Ger',
  },
  // he reads the [upcoming]
  { m: '#Pres the [#Ger]', g: 0, t: 'NN' },

  // === verbs/verb-noun.js ===

  // A final button label is an object, not a second verb.
  ...['click', 'clicks', 'selects', 'pick', 'picks'].map(word => ({
    m: `(#Pron|#Sing|#Plur) [${word} (submit|save|cancel)]$`,
    g: 0,
    t: 'Pres NN',
  })),
  // Common intransitive predicates after a singular subject. Keep arbitrary
  // plural/verb switches conservative: 'the dog treats' is a noun phrase.
  // the dog [runs]
  ...['runs', 'walks', 'barks', 'swims', 'sleeps'].map(word => ({
    m: `^(#Det|#Poss) #Adj+? #Sing #Adv+? [${word}] #Adv+?$`,
    g: 0,
    t: 'Pres',
  })),
  // with heads and [arms] rolling around
  // { m: '#Prep #Plur and [%Plural|Verb%] #Ger', g: 0, t: 'Plur' },
  // he can solve the [puzzle]
  { m: '#Inf (this|that|the) [#Inf]', g: 0, t: 'NN' },
  // keeping the [matter] a secret
  { m: '#Ger #Det [#Inf]', g: 0, t: 'NN' },
  // the-only-[reason]
  {
    m: '#Det (only|further|just|more|backward) [#Inf]',
    g: 0,
    t: 'NN',
  },
  // the [slide] makes noise
  { m: '(the|this|a|an) [#Inf] #Adv? #V', g: 0, t: 'NN' },
  // Use a pointed [stick] (a pencil) or a similar tool
  {
    m: '#Det #Adj #Adj? [#Inf]',
    g: 0,
    t: 'NN',
    n: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)',
  },
  // the American [thank]-you letter
  { m: '#Det #Dem [#Pres]', g: 0, t: 'NN' },
  // the next career [read] is brief
  { m: '#Adj #NN+ [#Inf] #Cop', g: 0, t: 'NN' },
  // at some [thank]-you party
  { m: 'at some [#Inf]', g: 0, t: 'NN' },
  // goes [to sleep]
  { m: '(go|goes|went) [to (sleep|work)]', g: 0, t: 'Prep NN' },
  // a dog [retrieve] in the field
  ...['a', 'an'].map(word => ({
    m: `${word} #Adj? #NN [#Inf] (#Prep|#NN)`,
    g: 0,
    n: 'from',
    t: 'NN',
  })),
  // a software [reinstall]
  { m: '(a|an) #NN [#Inf]$', g: 0, t: 'NN' },
  // working for [thank]-you letters
  { m: '#Ger #Adj? for [#Inf]', g: 0, t: 'NN' },
  // artists on [thank]-you cards
  { m: '#Plur on [#Inf]', g: 0, t: 'NN' },
  // number of [thank]-yous
  { m: 'number of [#Pres]', g: 0, t: 'NN' },
  // make [sense]
  {
    m: '(try|use|attempt|build|make) [%Noun|Verb% #Particle?]',
    n: '(#Cop|#NN|sure|fun|up)',
    g: 0,
    t: 'NN',
  }, //make sure of
  // [append] is cloned
  { m: '^[#Inf] (is|was)', g: 0, t: 'NN' },
  // get much [thank]-you mail
  // { m: '#Inf much [#Inf]', g: 0, t: 'NN' },
  // [cause] i gotta
  { m: '[cause] #Pron #V', g: 0, t: 'Conj' },
  // the US [air] force
  // {
  //   m: 'the #Sing [#Inf] (#NN && !#Poss)',
  //   g: 0,
  //   t: 'NN',
  //   n: '#Pron',
  // },
  // this [rocks]
  { m: 'this [#Plur]', g: 0, t: 'Pres', n: '(#Prep|#Date)' },
  // the thing [that runs]
  {
    m: '#NN [that %Plural|Verb%]',
    g: 0,
    t: 'Conj Pres',
    n: '(#Prep|#Pron|way)',
  },
  // that [leads] to
  // { m: 'that [#Plur] to', g: 0, t: 'Pres', n: '#Prep' },
  // let him [father] a child
  ...['let', 'make', 'made'].map(word => ({
    m: `${word} (him|her|it|#Pers|#Place|#Org)+ [#Sing] (a|an|the|it)`,
    g: 0,
    t: 'Inf',
  })),
  // assign all [tasks]
  {
    m: '#V (all|every|each|most|some|no) [#Pres]',
    n: '#Mod',
    g: 0,
    t: 'NN',
  }, // PresentTense/Noun ambiguities
  // Possession and copulas; other past verbs use wide-support below.
  {
    m: '(had|have|was|were) #Adj [#Pres]',
    g: 0,
    t: 'NN',
    n: 'better',
  },
  // one big [thank]-you
  { m: '#Value #Adj [#Pres]', g: 0, t: 'NN', n: '#Cop' },
  // found all [upcoming] words
  {
    m: '#Past #Adj+ [#Pres]',
    g: 0,
    t: 'NN',
    n: '(#Cop|better)',
  },
  // many [thanks]
  { m: '(many|few|several|couple) [#Pres]', g: 0, t: 'NN', n: '#Cop' },
  // a very big [dream]
  {
    m: '#Det #Adv #Adj [%Noun|Verb%]',
    g: 0,
    t: 'NN',
    n: '#Cop',
  },
  // from start to [finish]
  { m: 'from #NN to [%Noun|Verb%]', g: 0, t: 'NN' },
  // for comparison or [contrast]
  {
    m: '(for|with|of) #NN (and|or|not) [%Noun|Verb%]',
    g: 0,
    t: 'NN',
    n: '#Pron',
  },
  // cute little [thank]-you bags
  { m: '#Adj #Adj [#Pres]', g: 0, t: 'NN', n: '#Cop' },
  // writing bigger [thank]-you notes
  {
    m: '#Ger #Adv? #Comp [#Pres]',
    g: 0,
    t: 'NN',
    n: '#Cop',
  },
  // to write people [thanks] for helping
  { m: `to #Pres #NN [#Pres] #Prep`, g: 0, t: 'NN' },
  // waited until [release]
  // {
  //   m: `#Past (until|as|through|without) [(#Pres && !#Ger && !#Cop)]`,
  //   g: 0,
  //   t: 'NN',
  // },
  // selling like hot [thank]-you cards
  { m: `#Ger like #Adj? [#Pres]`, g: 0, t: 'Plur' },
  // some nice [thank]-you notes
  { m: `some #Adj [#Pres]`, g: 0, t: 'NN' },
  // for some [thank]-you letters
  { m: `for some [#Pres]`, g: 0, t: 'NN' },
  // same kind of [shouts]
  { m: `(same|some|the|that|a) kind of [#Pres]`, g: 0, t: 'NN' },
  // a type of [shout]
  { m: `(same|some|the|that|a) type of [#Pres]`, g: 0, t: 'NN' },
  // looking good in [thank]-you photos
  { m: `#Ger #Adj #Prep [#Pres]`, g: 0, t: 'NN' },
  // get better [thank]-you notes
  { m: `(get|got|have) #Comp [#Pres]`, g: 0, t: 'NN' },
  // give up on [thank]-you letters
  { m: `#PhrV #Particle #Prep [#Pres]`, g: 0, t: 'NN' },
  // there are [thank]-you notes
  { m: 'there (are|were) #Adj? [#Pres]', g: 0, t: 'Plur' },
  // a thousand [thanks] of gratitude
  {
    m: '#Value [#Pres] of',
    g: 0,
    n: '(one|1|#Cop|#Inf)',
    t: 'Plur',
  },
  // [thanks] are appreciated
  { m: '[#Pres] (are|were) #Adj', g: 0, t: 'Plur' },
  // [hope] i helped
  { m: '^[(hope|guess|thought|think)] #Pron #V', g: 0, t: 'Inf' },
  // its proper [functioning]
  { m: '#Poss #Adj [#V]', g: 0, t: 'NN', n: '#Cop' },
  // [tastes] good
  { m: '[(tastes|smells)] #Adv? #Adj', g: 0, t: 'Pres' },
  // Being introduces a predicate rather than a direct object.
  // she is writing [thank]-you letters
  {
    m: '#Cop (#Ger && !being) [(#Pres && !#Ger && !#Cop)] !by?',
    g: 0,
    t: 'NN',
    n: 'going',
  },
  // the [shed]
  { m: '#Det #Adj? [(shed|thought|rose|bid|saw|spelt)]', g: 0, t: 'NN' },
  // how to [watch]
  { m: 'how to [%Noun|Verb%]', g: 0, t: 'Inf' },
  // ready to [stream]
  {
    m: '(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]',
    g: 0,
    t: 'Inf',
  },
  // bring [to market]
  {
    m: '(bring|went|go|drive|run|bike) [to (market|work|court|school|bed|church|prison)]',
    g: 0,
    t: 'Prep NN',
  },
  // can i [sleep], would you [look]
  { m: '#Mod #NN [%Noun|Verb%]', g: 0, t: 'Inf' },
  // is just [spam]
  { m: '#Cop just [#Inf]', g: 0, t: 'NN' },
  // request copies
  { m: '^%Noun|Verb% %Plural|Verb%', t: 'Imp #Plur' },
  // homemade pickles and [drinks]
  { m: '#Adj #Plur and [%Plural|Verb%]', g: 0, t: '#Plur' },
  // the 1968 [stand]-off
  { m: '#Det #Year [#V]', g: 0, t: 'NN' },
  // the [break up]
  { m: '#Det [(#PhrV && !#Past) #Particle]', g: 0, t: 'NN' },
  // the [individual] goals
  {
    m: '#Det [(%Adj|Noun% && !#Value)] #NN',
    g: 0,
    t: 'Adj',
    n: '(#Pron|#Poss|#Prop)',
  },
  // [work] or prepare
  { m: '^[%Noun|Verb%] or #Inf', g: 0, t: 'Inf' },
  // to give [thanks]
  {
    m: 'to #Inf [#Pres]',
    g: 0,
    t: 'NN',
    n: '(#Ger|#Cop|help)',
  },
  // [Google] me
  { m: '[(#NN && !#Pron)] me', g: 0, t: 'V' },
  // removes wrinkles
  { m: '%Plural|Verb% %Plural|Verb%', t: '#Pres #Plur' },
  // i [Google] the answer
  { m: 'i [#NN] the #NN', g: 0, t: 'Inf' },
  // did the engine [stop]
  {
    m: '(did|does|will) the #NN [%Noun|Verb%]',
    g: 0,
    t: 'Inf',
  },
  // 40 gallons of [water]
  {
    m: '#Value #NN of [%Noun|Verb%]',
    g: 0,
    t: 'NN',
  },
  // When the rain [stops], we will leave. Whenever the bell [rings], the dog barks.
  // when the dog [looks]
  ...['stops', 'looks', 'rings'].map(word => ({
    m: `(when|whenever|before|after|until|since|as|while|than) (#Det|#Poss) #Adj+? #NN [(%Plural|Verb% && ${word})]$`,
    g: 0,
    t: 'Pres',
  })),
  // The sun [rose]. The river [rose] quickly.
  {
    m: '(sun|moon|river|water|tide|temperature|prices|he|she|we|they|i) [rose] #Adv+?$',
    g: 0,
    t: 'Past',
  },

  // === numbers/money.js ===

  // $5 and $6
  { m: '#Money and #Money #Currency?', t: 'Money' },
  // 6 dollars [and] 5 cents
  { m: '#Value #Currency [and] #Value (cents|ore|centavos|sens)', g: 0, t: 'Money' },
  // 5 rand
  { m: '#Value (mark|rand|won|rub|ore)', t: '#Money #Currency' },
  // a pound
  { m: 'a pound', t: '#Money #Unit' },
  // 3 pounds
  { m: '#Value (pound|pounds)', t: '#Money #Unit' },

  // === numbers/fractions.js ===

  // [half] a penny
  { m: '[(a|one)? half] of? (a|an|the)', g: 0, t: 'Frac' },
  // [quarter] of a dollar
  { m: '[(a|one)? quarter] of? (a|an|the)', g: 0, t: 'Frac' },
  // two and a half
  { m: '#Card and a half', t: 'Frac' },
  // two-halves
  { m: '#Value (halves|halfs|quarters)', t: 'Frac' },

  // [seven] fifths
  { m: '[#Card+] (#Frac && /s$/)', g: 0, t: 'Frac' },
  // [one third] of it
  { m: '[#Card+ #Ord] of .', g: 0, t: 'Frac' },
  // [100th] of it
  { m: '[(#Numeric && #Ord)] of .', g: 0, t: 'Frac' },
  // [a twenty fifth] of it
  { m: '[(a|one) #Card?+ #Ord] of', g: 0, t: 'Frac' },

  // a sixteenth, one twenty fifth (without a following noun)
  {
    m: '[(a|one) #Card+? (#Ord && !first && !second)]$',
    g: 0,
    t: 'Frac',
  },
  { m: '(a|one) (half|quarter)$', t: 'Frac' },

  // 3 out of 5
  { m: '#Card+ out? of every? #Card', t: 'Frac' },

  // === numbers/numbers.js ===

  // ==== Ambiguous numbers ====
  // with [a] hundred jobs
  {
    m: '!once? [(a|an)] hundred',
    g: 0,
    t: 'Value',
  },
  // with [a] thousand jobs
  {
    m: '!once? [(a|an)] thousand',
    g: 0,
    t: 'Value',
  },
  // with [a] million jobs
  {
    m: '!once? [(a|an)] million',
    g: 0,
    t: 'Value',
  },
  // with [a] billion jobs
  {
    m: '!once? [(a|an)] billion',
    g: 0,
    t: 'Value',
  },
  // with [a] trillion jobs
  {
    m: '!once? [(a|an)] trillion',
    g: 0,
    t: 'Value',
  },
  // with [a] dozen eggs
  {
    match: '!once? [a] dozen',
    hook: 'dozen',
    group: 0,
    tag: 'Value',
  },
  // ==== PhoneNumber ====
  // 1 800 555-1234
  { m: '(1|+1) #Value #PhoneNumber', t: 'PhoneNumber' },
  // (454) 232-9873
  { m: '#Numeric #PhoneNumber', t: 'PhoneNumber' },

  // ==== Currency ====
  // chinese yuan
  { m: '#Dem #Currency', t: 'Currency' },
  // ==== Money ====
  // [5] dollars
  { m: '[#Value+] #Currency', g: 0, t: 'Money' },

  // ==== Ordinal ====

  // ==== Units ====
  // Currency can be assigned by left/right rules, so keep this correction late.
  // 5 [dollars]
  { m: '#Value+ [#Currency]', g: 0, t: 'Unit' },
  // kilometers an hour
  { m: '#Unit an hour', t: 'Unit' },

  // ==== Magnitudes ====
  // thousand and two
  { m: `#Multiple+ and #Value`, t: 'Value' },
  // 5 miles [per hour]
  { m: '#Value #Unit [(per|an) (hr|hour|sec|second|min|minute)]', g: 0, t: 'Unit' },
  // twelve percent
  { m: '#Card percent', t: '#Percent #Unit' },

  // === person/person-phrase.js ===

  // ==== FirstNames ====
  // is [foo] Smith
  {
    m: '#Cop [(#NN|#Pres)] #Last',
    g: 0,
    t: 'First',
    n: '#Ger',
  },
  // pope francis
  {
    m: '(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #Prop',
    t: 'Pers',
    safe: true,
  },

  // ==== Nickname ====
  // Dwayne '[the rock]' Johnson
  { m: '#First [#Det #NN] #Last', g: 0, t: 'Pers' },
  // John b Smith
  {
    m: '#Prop (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #Prop',
    t: 'Pers',
    safe: true,
  },
  // J. Smith
  { m: '#Acronym #Last', t: 'Pers', safe: true },
  // John jr
  { m: '#Pers (jr|sr|md)', t: 'Pers' },
  // Dr. J.
  { m: '#Hon #Acronym', t: 'Pers' },
  // John [b]
  { m: '#First [/^[bdefghjlmnopqstvwxyz]$/]', g: 0, t: ['Acronym', 'Pers'] },
  // Ludwig van Beethoven
  { m: '#NN van der? #NN', t: 'Pers', safe: true },
  // king of spain
  { m: '(king|queen|prince|saint|lady) of #NN', t: 'Pers', safe: true },
  // prince Paris
  { m: '(prince|lady) #Place', t: 'Pers' },
  // saint Foo
  { m: '(king|queen|prince|saint) #Prop', t: 'Pers', n: '#Place' },

  // al Smith
  { m: 'al (#Pers|#Prop)', t: 'Pers', safe: true },
  // ferdinand de almar
  { m: '#First de #NN', t: 'Pers' },
  // Osama bin Laden
  { m: '#First (bin|al) #NN', t: 'Pers' },
  // John L. Foo
  { m: '#First #Acronym #Prop', t: 'Pers' },
  // Mr Foo
  { m: '#Hon #First? #Prop', t: 'Pers' },
  // peter the great
  { m: '#First the #Adj', t: 'Pers' },

  // John van Smith
  { m: '#Prop (van|al|bin) #Prop', t: 'Pers', safe: true },
  // jose de Sucre
  { m: '#Prop (de|du) la? #Prop', t: 'Pers', n: '#Place' },
  // Jani K. Smith
  { m: '#Sing #Acronym #Last', t: '#First #Pers .', safe: true },
  // [Toronto] John
  { m: '[#Prop] #Pers', g: 0, t: 'Pers', safe: true },
  // john [keith jones]
  {
    m: '#Pers [#Prop #Prop]',
    g: 0,
    t: 'Pers',
    n: '#Poss',
    safe: true,
  },
  // John [Foo]
  {
    m: '#First #Acronym? [#Prop]',
    g: 0,
    t: 'Last',
    n: '#Poss',
  },
  // Joe K. Sombrero
  { m: '#First #Acronym #NN', t: 'Pers', safe: true },
  // Anthony [de] Marco
  { m: '#First [(de|di|du|van|von)] #Pers', g: 0, t: 'Last' },

  // baker jenna smith
  // { match: '[#Actor+] #Person', group: 0, tag: 'Person' },
  // [sergeant] major Harold
  {
    m: '[(lieutenant|corporal|sergeant|captain|qeen|king|admiral|major|colonel|marshal|president|queen|king)+] #Prop',
    g: 0,
    t: 'Hon',
  },
  // ==== Honorics ====
  // [general] John
  {
    m: '[(private|general|major|rear|prime|field|count)] #Hon? #Pers',
    g: 0,
    t: ['Hon', 'Pers'],
  },
  // [Miss] John
  { m: '[(miss && @isTitleCase)] #Pers', g: 0, t: ['Hon', 'Pers'] },
  // dr john [foobar]
  {
    m: '#Hon #First [#Sing]',
    g: 0,
    t: 'Last',
    n: '#Poss',
    safe: true,
  },
  // [his excellency] John
  {
    m: '[(his|her) (majesty|honour|worship|excellency|honorable)] #Pers',
    g: 0,
    t: 'Hon',
  },
  // Dr teacher
  { m: '#Hon #Actor', t: 'Hon' },
  // [first lady] michelle obama
  { m: '[first lady] #Pers', g: 0, t: 'Hon' },
  // Louis IV
  { m: '#Pers the? #RomanNumeral', t: 'Pers' },

  // === person/ambig-name.js ===
  // const personAdj = '(misty|rusty|dusty|rich|randy|sandy|young|earnest|frank|brown)'

  // ebenezer scrooge
  {
    m: '#First #NN$',
    t: '. #Last',
    n: '(#Poss|#Org|#Place|#Pron|@hasTitleCase)',
  },

  // June Smith
  { m: '%Person|Date% #Acronym? #Prop', t: 'Pers' },
  // ===person-noun===
  // Cliff Clavin
  { m: '%Person|Noun% #Acronym? #Prop', t: 'Pers', safe: true },
  // Rose Microsoft
  { m: '%Person|Noun% #Org', t: 'Org' },
  // ===person-verb===
  // Ollie Faroo
  { m: '(%Person|Verb% && #Pers) #Acronym? #Prop', t: 'Pers', ifNo: '#Actor' },

  // ===person-verb===
  // really [wade]
  { m: `#Adv [(%Person|Verb% && !@isTitleCase)]`, g: 0, t: 'V' },
  // [drew] closer
  { m: `[%Person|Verb%] (#Adv|#Comp)`, g: 0, t: 'V' },
  // wade smith
  { m: `(%Person|Verb% && #Pers) #Pers`, t: 'Pers' },
  // Wade G. Slapgoop
  { m: `%Person|Verb% #Acronym #Prop`, t: 'Pers' },
  // Will Smith
  { m: '(will && @isTitleCase) #Prop', t: 'Pers' },
  // jack [layton] won
  {
    m: '(#First && !#Poss) [#Sing] #V',
    g: 0,
    safe: true,
    t: 'Last',
  },
  // [captain] John walks
  { m: '^[#Sing] #Pers #V', g: 0, safe: true, t: 'Pers' },

  // === verbs/verbs.js ===

  // is [pretty] good
  {
    m: '#Cop [(pretty|dead|full|well|sure)] #Adj',
    g: 0,
    t: 'Adv',
  },
  // adj -> gerund
  // i [like]
  { m: '(#Mod|i|they|we|do) not? [like]', g: 0, t: 'Pres' },
  // ==== Tense ====
  // he [left]
  { m: '(#NN && !#Poss) #Adv? [left]', g: 0, t: 'Past' },
  // she [bit] her tongue
  { m: '#NN #Adv? [(bit && #Inf)]', g: 0, t: 'Past' },
  // will [be] running
  { m: 'will #Adv? not? #Adv? [be] #Ger', g: 0, t: 'Cop' },
  // will [be] nice
  { m: 'will #Adv? not? #Adv? [be] #Adj', g: 0, t: 'Cop' },
  // [march] up
  { m: '[march] (up|down|back|toward)', n: '#Date', g: 0, t: 'Inf' },
  // birds [home] to their nest
  { m: '(#Pron|#Plur|#Mod) #Adv+? [home] to', g: 0, t: 'Inf' },
  // is [home] to birds
  { m: '(#Cop|be|been|being) #Adv+? [home] to', g: 0, t: 'NN' },
  // is [subject] to change
  {
    m: '(#Cop|be|been|being|remain|remains|remained) #Adv+? [subject] to',
    g: 0,
    t: 'Adj',
  },
  // is subject [to]
  {
    m: '(#Cop|be|been|being|remain|remains|remained) #Adv+? subject [to]',
    g: 0,
    u: 'Conj',
    t: 'Prep',
  },
  // is subject to [change]
  {
    m: '(#Cop|be|been|being|remain|remains|remained) #Adv+? subject to [%Noun|Verb%]',
    g: 0,
    t: 'NN',
  },

  // is home [to] dogs
  {
    m: '(#Cop|be|been|being) #Adv+? home [to] #Adj+? #NN',
    g: 0,
    u: 'Conj',
    t: 'Prep',
  },

  // === misc==
  // were being [run]
  { m: `(were|was) being [#Pres]`, g: 0, t: 'Past' },
  // had [been broken]
  {
    m: `(had|has|have) [been (#Past && /en$/)]`,
    g: 0,
    t: 'Aux VBN',
  },
  // had [been] eaten
  { m: `(had|has) #Adv? [been] #Adv? #Past`, g: 0, t: 'Aux' },
  // had to [Google] the answer
  ...['had', 'has'].map(word => ({
    m: `${word} to [#NN] (#Det|#Poss)`,
    g: 0,
    t: 'Inf',
  })),
  // does that [work]
  {
    m: `(do|does|did|#Mod) (this|that|these|those) [work]`,
    g: 0,
    t: 'Inf',
  },
  // have read
  { m: `(has|have|had) read`, t: 'Aux VBN' },
  // jobs that fit
  { m: '#Plur that %Noun|Verb%', t: '. #Prep #Inf' },
  // [works] for me
  { m: '[works] for me', g: 0, t: 'Pres' },
  // as we [please]
  { m: 'as #Pron [please]', g: 0, t: 'Inf' },
  // verb-prefixes - '[co] write'
  // [co] write
  {
    m: '[(co|mis|de|inter|intra|pre|re|un|counter)] (#V && !#Cop && !#PhrV)',
    g: 0,
    t: ['V', 'Prefix'],
    n: '(#Acronym && @isUpperCase)',
  },
  // Keep verb prefixes late: early tagging hides prepositions in left-out-type.
  // [out] run
  { m: '[(out|under|over)] #Inf', g: 0, t: ['V', 'Prefix'] },
  // dressed and [left]
  { m: '#Past and [%Adj|Past%]', g: 0, t: 'Past' },
  // [melted] and fallen
  { m: '[(%Adj|Past% && !#Adj)] and #Past', g: 0, t: 'Past' },
  // is he [stoked]
  { m: '#Cop #Pron [%Adj|Past%]', g: 0, t: 'Adj' },

  // === adjective/adj-verb.js ===

  // Resume fragments: developed [scalable React] architecture.
  {
    m: '^[developed] (#Adj|#Prop)+? (backend|frontend|software|architecture|applications|apps|systems)',
    g: 0,
    t: 'Past',
    n: '(#Pres|#Cop|#Mod)',
  },
  // does [mean]
  { m: 'does (#Adv|not)? [%Adj|Present%]', g: 0, t: 'Inf' },
  // [okay] by me
  { m: '[(fine|okay|cool|ok)] by me', g: 0, t: 'Adj' },
  // i [mean]
  { m: 'i (#Adv|do)? not? [mean]', g: 0, t: 'Pres' },
  // the ship will near the coast
  { m: 'will #Adj', t: 'Aux Inf' },
  // I [frequent] this restaurant
  { m: '#Pron [#Adj] #Det #Adj? #NN', g: 0, t: 'V' },
  // rude and [insulting]
  {
    m: '#Adj and [(%Adj|Gerund% && #Ger)] !#Prep?',
    g: 0,
    t: 'Adj',
  },
  // got [tired] of
  { m: 'got #Adv? [%Adj|Past%] of', g: 0, t: 'Adj' },
  // felt [cheated]
  {
    m: '(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#Adv|#Adj)? [#Past]',
    g: 0,
    t: 'Adj',
  },
  // felt [cheated]
  // { m: '(seem|feel|seemed|felt) [#Past #Particle?]', g: 0, t: 'Adj' },
  // a bit [confused]
  { m: 'a (bit|little|tad) [#Past #Particle?]', g: 0, t: 'Adj' },
  // do not be [embarrassed]
  { m: 'not be [%Adj|Past% #Particle?]', g: 0, t: 'Adj' },
  // is just [tired]
  { m: '#Cop just [%Adj|Past% #Particle?]', g: 0, t: 'Adj' },
  // [failed] and oppressive
  { m: '[%Adj|Past%] and #Adj', g: 0, t: 'Adj' },
  // the fear or [heightened] emotion
  {
    m: '(#Det|#Prep) #Adj? #NN or [#Past] #NN',
    g: 0,
    t: 'Adj',
    n: '(#Cop|#Pron)',
  },
  // tired and overworked describes a state after a copula
  {
    m: '#Cop #Adv? #Adj and [(overworked|overwhelmed|overpaid|underpaid|overqualified|underqualified|understaffed)]$',
    g: 0,
    t: 'Adj',
  },
  // their [declared] intentions
  { m: '#Poss [#Past] #NN', g: 0, n: '#Cop', t: 'Adj' },
  // is he [cool]
  { m: '#Cop #Pron [%Adj|Present%]', g: 0, t: 'Adj' },
  // is [crowded] with
  {
    m: '#Cop [%Adj|Past%] with',
    g: 0,
    t: 'Adj',
    n: '(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)',
  },
  // is [empty]
  { m: '#Cop #Adv? [%Adj|Present%]$', g: 0, t: 'Adj' },
  // she is being [cool]
  { m: 'being #Adv? [%Adj|Present%]', g: 0, t: 'Adj' },
  // does the store [open]
  {
    m: '(does|will) #Det #NN [%Adj|Present%]$',
    g: 0,
    t: 'Inf',
  },

  // === verbs/auxiliary.js ===
  // these are some of our heaviest-used matches

  // ought not [to] walk
  {
    m: 'ought (#Adv|not)+? [to] (#Adv|not)+? #V',
    g: 0,
    t: 'Aux',
  },
  // ought to [be] walking
  {
    m: 'ought (#Adv|not)+? to (#Adv|not)+? [be] (#Adv|not)+? #V',
    g: 0,
    t: 'Aux',
  },
  // will [have] walked
  { m: `will (#Adv|not)+? [have] (#Adv|not)+? #V`, g: 0, t: 'Aux' },
  // [was] walking
  { m: `[#Cop] (#Adv|not)+? (#Ger|#Past)`, g: 0, t: 'Aux' },
  // [would] walk
  { m: `[(#Mod|did)+] (#Adv|not)+? #V`, g: 0, t: 'Aux' },
  // would [have] [had] to go
  {
    m: `#Mod (#Adv|not)+? [have] (#Adv|not)+? [had] (#Adv|not)+? #V`,
    g: 1,
    t: 'Aux',
  },
  // [will] walk
  {
    m: '[(do|does|did|will|have|had|has|got)] (not|#Adv)+? #V',
    g: 0,
    t: 'Aux',
    n: '#Prop',
  },
  // [about to] go
  { m: '[about to] #Adv? #V', g: 0, t: ['Aux', 'V'] },
  // would [be] walking
  { m: `#Mod (#Adv|not)+? [be] (#Adv|not)+? #V`, g: 0, t: 'Aux' },
  // was [being] driven
  { m: '[(be|being|been)] #VBN', g: 0, t: 'Aux' },
  // was [being] walked
  {
    m: '#Cop (#Adv|not)+? [(be|being|been)] #Adv+? #Past',
    g: 0,
    t: 'Aux',
  },
  // [been] walking
  { m: '[(be|been)] (#Adv|not)+? #Ger', g: 0, t: 'Aux' },
  // [used to] walk
  { m: '[used to] #Pres', g: 0, t: 'Aux' },
  // was [going to] walk
  {
    m: '#Cop (#Adv|not)+? [going to] #Adv+? #Pres',
    g: 0,
    t: 'Aux',
  },
  // going to [be] watched
  {
    m: 'going to (#Adv|not)+? [be] (#Adv|not)+? #Past',
    g: 0,
    t: 'Aux',
  },
  // there is [no] x
  { m: '(is|was) #Adv? [no]', g: 0, t: 'Neg' },
  // [been] told
  {
    m: '[(been|had|became|came)] #Past',
    g: 0,
    n: '#PhrV',
    t: 'Aux',
  },
  // [being] born
  { m: '[(being|having|getting)] #V', g: 0, t: 'Aux' },
  // [better] go
  { m: '[better] #Pres', g: 0, t: 'Mod', n: '(#Cop|#Ger)' },

  // === verbs/phrasal.js ===

  // walk-up
  { m: '(#V && @hasHyphen && !#Past) up', t: 'PhrV' },
  // walk-off
  { m: '(#V && @hasHyphen) off', t: 'PhrV' },
  // walk-over
  { m: '(#V && @hasHyphen) over', t: 'PhrV' },
  // walk-out
  { m: '(#V && @hasHyphen) out', t: 'PhrV' },
  // [walk in] on
  {
    m: '[#V (in|out|up|down|off|back)] (on|in)',
    g: 0,
    n: '#Cop',
    t: 'PhrV Particle',
  },
  // went [on] for
  { m: '(lived|went|crept|go) [on] for', g: 0, t: 'PhrV' },
  // the curtains come down
  { m: '#V (up|down|in|on|for)$', t: 'PhrV #Particle', n: '#PhrV' },
  // work in the office
  {
    m: '#PhrV (in && #Particle) #Det',
    t: '#V #Prep #Det',
    u: 'PhrV',
  },
  // back it [up]
  ...['up', 'down'].map(word => ({
    m: `#V (him|her|it|us|himself|herself|itself|everything|something) [${word}]`,
    g: 0,
    t: 'Adv',
  })),
  // runs [around] the lake
  {
    m: '#PhrV [around] the #NN',
    g: 0,
    t: 'Prep', //(breaks the phrasal)
  },

  // === verbs/imperative.js ===
  // this is really hard to do
  //we do not go

  // do not [go]
  { m: '^do not? [#Inf #Particle?]', n: notIf, g: 0, t: 'Imp' },
  // please [go]
  { m: '^please do? not? [#Inf #Particle?]', g: 0, t: 'Imp' },
  // just [go]
  { m: '^just do? not? [#Inf #Particle?]', g: 0, t: 'Imp' },
  // [go] quickly.
  {
    m: '^[(#Inf && !#Hyphenated)] (#Adj|#Adv|hard|high|fast|slow)$',
    g: 0,
    t: 'Imp',
    n: '(so|such|rather|enough)',
  },
  // [turn] down the noise
  { m: '^[#Inf] (up|down|over) #Det', g: 0, t: 'Imp' },
  // [eat] my shorts
  {
    m: '^[#Inf] (your|my|the|a|an|any|each|every|some|more|with|on)',
    g: 0,
    n: 'like',
    t: 'Imp',
  },
  // Wait for word-specific corrections such as 'wit me' before tagging commands.
  // [tell] him the story
  { m: '^[#Inf] (him|her|it|us|me|there)', g: 0, t: 'Imp' },
  // [avoid] loud noises
  { m: '^[#Inf] #Adj #NN$', g: 0, t: 'Imp' },
  // [come] and have a drink
  { m: '^[#Inf] (#Adj|#Adv)? (and|or) #Inf', g: 0, t: 'Imp' },
  // Keep isolated commands here: pre-tagging also runs on replacement words.
  { m: '^[go] please?$', g: 0, t: 'Imp' },
  { m: '^[stop] please?$', g: 0, t: 'Imp' },
  { m: '^[wait] please?$', g: 0, t: 'Imp' },
  { m: '^[hurry] please?$', g: 0, t: 'Imp' },
  // let's [leave]
  { m: '^let (us|me) [#Inf]', g: 0, t: 'Imp' },
  // [shut] the door
  {
    m: '^[(shut|close|open|start|stop|end|keep)] #Det #NN',
    g: 0,
    t: 'Imp',
  },
  // [turn off] the light
  { m: '^[#PhrV #Particle] #Det #NN', g: 0, t: 'Imp' },
  // A modal question alone may ask about ability or knowledge. Require an
  // explicit request marker before treating it as an imperative.
  // can you please [walk]
  {
    m: '^(can|could|will|would) you (#Adv|not)+? please (#Adv|not)+? [#Inf]',
    g: 0,
    t: 'Imp',
  },
  // please can you [walk]
  {
    m: '^please (can|could|will|would) you (#Adv|not)+? [#Inf]',
    g: 0,
    t: 'Imp',
  },
  // can you [walk] please
  {
    m: '^(can|could|will|would) you (#Adv|not)+? [#Inf] .+? please$',
    g: 0,
    t: 'Imp',
  },
  // come have a drink
  { m: '^come #Inf', t: 'Imp', n: 'on' },
  // come and have a drink
  { m: '^come and #Inf', t: 'Imp . Imp' },
  // [allow] yourself
  {
    m: '^(and|but)? (then|please)? [#Inf] (yourself|yourselves)',
    g: 0,
    t: 'Imp',
  },
  // [look] what happened
  { m: '^[#Inf] what .', g: 0, t: 'Imp' },
  // [go] to it
  { m: '^[#Inf] (to|for|into|toward|here|there)', g: 0, t: 'Imp' },
  // [maintain] eye contact
  { m: '^[#Inf] #Adj? #Sing #Sing', g: 0, t: 'Imp' },
  // don't forget to [clean]
  { m: '^do not (forget|omit|neglect) to [#Inf]', g: 0, t: 'Imp' },
  // [add] 2 eggs
  { m: '^[#Inf] #Value #NN', g: 0, t: 'Imp' },

  // === verbs/adj-gerund.js ===

  // The station was [closing]. The shop is [closing] soon.
  { m: '#Cop #Adv+? [closing] (#Adv|soon)+?$', g: 0, t: 'Ger' },
  // that were [growing]
  { m: '(that|which) were [%Adj|Gerund%]', g: 0, t: 'Ger' },

  // === _misc.js ===
  // order matters

  // the captain [who]
  { m: '#NN [(who|whom)]', g: 0, t: 'Det' },
  // who is [that]?
  {
    m: '^#QW #Adv+? #Cop #Adv+? [(this|that|these|those)] #Adv+?$',
    g: 0,
    t: 'Pron',
  },
  // I like [this]
  {
    m: '#V [(this|that|these|those)] #Adv+? (yesterday|today|tonight|tomorrow)?$',
    g: 0,
    t: 'Pron',
  },
  // some sort of
  { m: 'some sort of', t: 'Det NN Prep' },
  // of some sort
  { m: 'of some sort', t: 'Prep Det NN' },
  // [some] eat apples
  { m: '^[some] #Inf #NN', g: 0, t: 'Pron' },
  // put it [there]
  {
    m: '(put|puts|putting|place|placed|leave|left) #Pron [there]',
    g: 0,
    t: 'Adv',
  },
  // [such] skill
  { m: '[such] (a|an|is)? #NN', g: 0, t: 'Det' },
  // [there] she is
  { m: '[there] (#Adv|#Pron)? #Cop', g: 0, t: 'There' },
  // is [there] food
  { m: '#Cop [there] .', g: 0, t: 'There' },
  // should [there]
  { m: '#Mod #Adv? [there]', g: 0, t: 'There' },
  // the person [who] runs
  { m: '#Det #NN+ [who] #V', g: 0, t: 'Prep' },
  // the person [which] eats
  { m: '#Det #NN+ [which] #V', g: 0, t: 'Prep' },
  // guess who
  { m: 'guess who', t: '#Inf #QW' },
  // [fucking] ridiculous
  { m: '[fucking] !#V', g: 0, t: '#Ger' },

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
  { m: 'university of #Place', t: 'Org' },
  // Name pairs can be business names without a known organization suffix.
  { m: '#Prop & #Prop', t: 'Prop' },
  // John & Mary Ltd
  { m: `#Pers & #Pers ${companySuffix}`, t: 'Org' },
  // Smith & Rogers
  { m: '#Last & #Last', t: 'Org' },
  // Microsoft of Canada
  // { m: '#Org of the? #Prop', t: 'Org', safe: true },
  // walmart USA
  { m: '#Org #Country', t: 'Org' },
  // Toronto Microsoft
  { m: '#Prop #Org', t: 'Org', n: '#First' },
  // FitBit Inc
  { m: '#Prop (ltd|co|inc|dept|assn|bros)', t: 'Org' },
  // the [XYZ corporation]
  { m: `the [#Acronym ${companySuffix}]`, g: 0, t: 'Org', safe: true },
  // [government of india]
  { m: '[government of the? #Place+]', g: 0, t: 'Org' },
  // global Microsoft
  {
    m: '(world|global|international|national|#Dem) #Org',
    t: 'Org',
  },
  // Toronto public school
  { m: '#NN+ (public|private) school', t: 'School' },
  // Toronto Yankees
  { m: '#Place+ #SportsTeam', t: 'SportsTeam' },
  // 'toronto fc'
  { m: '#Place+ fc', t: 'SportsTeam' },

  // the new orleans basketball team
  {
    m: '#Place+ #NN{0,2} (club|society|group|team|committee|commission|association|guild|crew)',
    t: 'Org',
  },

  // === nouns/places.js ===

  // ==== Region ====
  // west Toronto
  { m: '(west|north|south|east|western|northern|southern|eastern)+ #Place', t: 'Region' },
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  // Toronto [ca]
  {
    m: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]',
    g: 0,
    t: 'Region',
  },
  // Portland [OR]
  { m: 'portland [(or && @isUpperCase)]', g: 0, t: 'Region' },
  // with [turkey]
  { m: 'with [(turkey && !@isTitleCase)]', g: 0, u: 'Place', t: 'Uncountable' },
  // Toronto point
  {
    m: '#Prop+ (cliff|place|range|pit|place|point|room|grounds|ruins)',
    t: 'Place',
  },
  // 123 main street
  {
    m: '#Value #NN+ (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave|lane|boulevard|blvd|drive|dr|parkway|way)',
    t: 'Address',
  },
  // port dover
  { m: '(port|mount|mt) #Prop', t: 'Place' },

  // === conjunctions.js ===

  // [how] he is driving
  ...['who', 'what', 'where', 'why', 'how', 'when'].map(word => ({
    m: `[${word}] #NN #Cop #Adv? (#V|#Adj)`,
    g: 0,
    t: 'Conj',
  })),
  // things [that] seem cool
  { m: '#NN [that] #V #Adj', g: 0, t: 'Conj' },
  // he was [that] wide
  { m: '#NN #Cop not? [that] #Adj', g: 0, t: 'Adv' },
  // [to] lunch
  { m: '[to] (#NN && !#V)', g: 0, u: 'Conj', t: 'Prep' },
  // I heard rumors [that] drivers save gas
  { m: '#V #Adv? #NN [(that|which)]', g: 0, t: 'Prep' },
  // Tuesday, [which] he liked
  { m: '@hasComma [which] (#Pron|#V)', g: 0, t: 'Prep' },
  // treated them [like] sons
  { m: '(me|him|her|us|them|it) [like] #NN', g: 0, t: 'Prep' },
  // a day [like] this
  { m: 'a #NN [like] (#NN|#Det)', g: 0, t: 'Prep' },
  // really [like]
  { m: '(#Adv && !lot) [like]', g: 0, t: 'V' },
  // is not [like] me
  { m: '(#Cop|be|been|being) (not|never) [like]', g: 0, t: 'Prep' },
  // a lot [like] ours
  { m: 'a lot [like] #NN', g: 0, t: 'Prep' },
  // treat them [like]
  { m: '#Inf #Pron [like]', g: 0, t: 'Prep' },
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
  // [how] he
  { m: '[(#QW && !do && !does)] (#Pron|#Det) !#Cop', g: 0, t: 'Prep', n: 'what the (hell|heck)' },
  // children [who] dance
  { m: '#Plur [(who|which|when)] .', g: 0, t: 'Prep' },

  // === expressions.js ===

  // come on
  { m: '^come on', t: 'Expr' },
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

  // veggies, [like] kale
  {
    m: '(#NN && @hasComma) [like] #NN',
    g: 0,
    t: 'Prep',
  },
  // Everyone [but] me agreed.
  ...['everyone', 'everybody', 'everything', 'anyone', 'anybody', 'anything', 'nobody', 'nothing', 'all'].map(word => ({
    m: `${word} [but] (me|him|her|us|them|#Det|#Poss|#Prop)`,
    g: 0,
    t: 'Prep',
  })),
  // images on a screen [like] humans do
  { m: '#NN [like] #NN+ (do|does|did)$', g: 0, t: 'Prep' },
  // cities [like] New York, Boston
  ...['', '#Place ', '#Place #Place '].map(prefix => ({
    m: `#Plur [like] ${prefix}(#Place && @hasComma) #Place`,
    g: 0,
    t: 'Prep',
  })),
  // [Like] his brother, he enjoys chess
  {
    m: '^[like] (#Det|#Poss)? #Adj+? (#NN && @hasComma)',
    g: 0,
    t: 'Prep',
  },
  // I like tea, [like] my sister does.
  { m: `@hasComma [like] ${subject} ${predicate}`, g: 0, t: 'Conj' },
  // We talked about the fact [that] she resigned.
  { m: `#NN [that] ${subject} ${predicate}`, g: 0, t: 'Conj' },
  // I have heard that story [before]
  {
    m: '#V (#Det|#Poss)? #NN+? [(before|since)]$',
    g: 0,
    t: 'Adv',
    n: '@hasQuestionMark',
  },
  // Who did she arrive [before]?
  {
    m: '^(who|whom) #V #Pron #V [before]$',
    g: 0,
    t: 'Prep',
  },
  // We will leave [when] the rain stops.
  {
    m: '#Mod #Inf [when] #Det',
    g: 0,
    t: 'Conj',
  },

  // Possession of running water and enduring noun phrases are not progressives.
  { m: '[(have|has|had)] running water', g: 0, u: 'Aux' },
  { m: '[#Cop] (enduring && #Adj) #NN', g: 0, u: 'Aux' },
  // Although he [was] [tired], he smiled. He [was] [tired].
  ...[
    // He [was] [tired].
    '[(#Cop|been)] #Adv+? [tired]$',
    // Although he [was] [tired], he smiled.
    '[(#Cop|been)] #Adv+? [(tired && @hasComma)]',
  ].flatMap(match => [
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 0, t: 'Cop', u: 'Pass' },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 0, u: 'Aux' },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 1, t: 'Adj' },
  ]),
  // had been tired
  { m: '(has|have|had) (#Adv|not)+? been #Adv+? tired$', u: 'Pass' },
  // 23 Main Street in Toronto
  { m: '#Address in #Place', t: 'Place' },
  // the [sleeping] dog
  {
    m: '#Det [sleeping] (#Actor|#Pers|puppy|kitten|dog|cat|baby|babies|child|children)',
    g: 0,
    t: 'Adj',
  },
  // [water] broke the pipe
  {
    m: '^[%Noun|Verb%] #Past (#Det|#Poss) #Adj+? #NN',
    g: 0,
    t: 'NN',
  },
  // the [present] immediately
  { m: '#Det [present] #Adv+$', g: 0, t: 'NN' },
  // [falls in] June
  { m: '[(fall|falls|fell) in] #Month', g: 0, t: '#V #Prep' },
  // [had] he walked
  {
    m: '^[had] #NN+ (#Adv|not)+? #Past',
    g: 0,
    t: 'Condition',
    n: '@hasQuestionMark',
  },
  // [were] he to walk
  {
    m: '^[were] #NN+ to #Inf *$',
    g: 0,
    t: 'Condition',
    n: '@hasQuestionMark',
  },
  // [had] he walked?
  {
    m: '^[had] #NN+ (#Adv|not)+? (#Past && @hasQuestionMark)$',
    g: 0,
    t: 'Aux',
    n: '@hasComma',
  },
  // [had] he walked the dog?
  {
    m: '^[had] #NN+ (#Adv|not)+? #Past * @hasQuestionMark$',
    g: 0,
    t: 'Aux',
    n: '@hasComma',
  },
  // [This] will be one sentence. [This] might help.
  { m: '[this] #Adv+? #Mod #Adv+? #Inf', g: 0, t: 'Pron' },
  // has [read], had [put]
  ...['read', 'put'].map(word => ({
    m: `(has|have|had) (#Adv|not)+? [${word}]`,
    g: 0,
    t: 'VBN',
  })),
  // John and Mary [walk]
  {
    m: '#Pers and #Pers [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$',
    g: 0,
    t: 'Inf',
  },
  // dogs [near] the house [bark]
  // near|on|under|beside|behind
  ...['near', 'on', 'under', 'beside', 'behind'].flatMap(word => [
    {
      m: `#Plur [${word}] #Det #Adj+? #NN [%Noun|Verb%]$`,
      g: 0,
      t: 'Prep',
    },
    {
      m: `#Plur [${word}] #Det #Adj+? #NN [%Noun|Verb%]$`,
      g: 1,
      t: 'Inf',
    },
  ]),
  // has eaten and [drunk]
  {
    m: '(has|have|had) (#Adv|not)+? #Past (and|or) #Adv+? [drunk]',
    g: 0,
    t: 'VBN',
  },
  // officers and [kids] would leave
  { m: '#Plur and [%Plural|Verb%] #Mod', g: 0, t: 'Plur' },
]

const matches = expandRules(rules)

// console.log('  ', matches.length, 'matches first-pass')

export default {
  two: {
    matches,
  },
}
