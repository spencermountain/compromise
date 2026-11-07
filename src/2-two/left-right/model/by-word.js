const adverbBeforeAdjective = '_ #Adj -> #Adv'
const imperativeBeforeAdjective = '^ _ #Adj -> #Imp'
const imperativeBeforeNoun = '^ _ #NN -> #Imp'
const infinitiveBeforeGerund = '_ #Ger -> #Inf'
// is [lasting] longer
const copGer = post => `#Cop _ ${post} -> #Ger`

const rules = {
  // a bit [cold]; ice [cold]
  cold: '(bit|ice) _ -> #Adj',
  // entirely [unknown], from the un-known switch
  unknown: '#Adv _ -> #Adj',
  lunatic: '_ fringe -> #Adj',
  fringe: 'lunatic _ -> #Noun',
  here: [
    // come [here], leave the bowls [here], is [here]
    '(#Verb|#Noun) _ $ -> #Adv',
    '#Verb _ (#Date|now) -> #Adv',
  ],
  too: '_ much -> #Adv',
  much: [
    adverbBeforeAdjective,
    '(too|bit) _ -> #Adj',
  ],
  bit: [
    'a _ -> #Sing',
    // a [bit] much
    'a _ much -> #Adv',
  ],
  live: 'long _ -> #Inf',
  rights: [
    '_ of -> #NN',
    'equal _ -> #Plural',
  ],
  // geek out [over] computers
  over: '#Particle _ #NN -> #Prep',
  under: [
    // looked [under] the bed
    '#V _ (#Det|#Poss|#Pron) -> #Prep',
    // labor [under] difficult conditions; panic [under] pressure
    '(labor|labour|panic|labors|labours|panics|labored|laboured|panicked|laboring|labouring|panicking) _ (#Adj|#Noun) -> #Prep',
    // wimp out [under] pressure
    '#Particle _ #NN -> #Prep',
  ],
  // five [am]
  'am|pm': '#Value _ -> #Time',
  // a [well] made table
  well: '_ #Past -> #Adv',
  // keep it [cool]
  cool: 'it _ $ -> #Adj',
  long: [
    '_ after$ -> #Adv',
    '_ live -> #Adv',
  ],
  // [minus] seven
  'minus|negative': '_ #Value -> #Value',
  // seven [point] five
  'point|decimal': '#Value _ #Value -> #Value',
  fine: [
    // pay his [fine]; it works out [fine]
    '#Poss _ $ -> #Singular',
    '#PhrasalVerb _ $ -> #Adjective',
  ],
  // 1st [lieutenant]
  lieutenant: '(1st|2nd|3rd) _ -> #Hon',
  // two [dozen] eggs
  dozen: '(a|#Cardinal) _ -> #Multiple | #Cardinal',
  // [how] is she?
  how: '_ (#Det|#Cop|#Mod|#Past) -> #QW',
  // a [rival] company
  rival: '(#Det|#Poss) _ #Noun -> #Adjective',
  // the [bill] is a common noun, despite its name default
  bill: '(#Det|#Poss) _ -> #Singular | !#Person | !#ProperNoun',
  // the [air] force
  air: '_ force -> #NN',
  // the [said] dog
  said: 'the _ #NN -> #Adj',
  // this [still] water, the pond's [still] water
  still: '(#Determiner|#Possessive) _ #Noun -> #Adjective',
  so: [
    // [so] hot
    adverbBeforeAdjective,
    // do [so]
    'do _ -> #Adv',
    // [so] he
    '_ #NN -> #Conj',
  ],
  // [way] hotter
  // [way] over
  way: '_ (#Comp|#Adj) -> #Adv',
  all: [
    // they [all] swim
    '_ #V -> #Adv',
    // assign [all] tasks
    'assign _ (#Pres|#Plur) -> #Det',
    // we [all]
    '(we|us) _ -> #NN',
  ],
  even: [
    '#Det _ #NN -> #Adj',
    // barely [even] noticed
    '(barely|hardly) _ -> #Adv',
    // [even] held
    // [even] worse
    // [even] the greatest
    '_ (#V|#Comp|#Det|#Poss) -> #Adv',
  ],
  // [later] say
  later: '_ #Pres -> #Adv',
  enough: [
    // high [enough]
    '#Adj _ -> #Adv',
    'soon _ -> #Adv',
  ],
  // [pretty] soon
  pretty: '_ soon -> #Adv',
  least: [
    // [least] expensive
    adverbBeforeAdjective,
    // the [least]
    '#Det _ -> #Adv',
  ],
  sun: [
    // [sun] feb 2
    '_ #Date -> #WeekDay',
    // the [sun]
    '#Det _ -> #Sing',
  ],
  more: [
    // [more] players
    '_ #NN -> #Adj',
    // any [more]
    '(the|any) _ -> #Sing',
  ],
  u: [
    // and [u]
    '#Conj _ -> #Pron',
    // [u] made me smile
    '_ #V -> #Pron',
    '_ r -> #Pron',
  ],
  // u [r] cool
  r: 'u _ -> #Cop',
  half: [
    '^ _ $ -> #Frac',
    '#Det _ #Unit -> #Value',
    // nearly [half]
    '#Adv _ -> #Frac',
    // [half] the
    '_ the -> #Frac',
    // a [half] second
    '#Det _ #Ord -> #Value',
  ],
  second: [
    '(half|quarter) _ -> #Unit | #Singular',
    // one [second]
    '#Card _ -> #Unit',
    // twenty [second] - a unit after it would be 'seconds'
    '(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety) _ -> #Ord',
    // [second] dog
    '_ #NN -> #Ord',
  ],
  will: [
    // [will] go
    '_ #Inf -> #Mod',
    // [will] walked to the park
    '^ _ #Past -> #First',
  ],
  march: [
    // must [march]
    '#Mod _ -> #Inf',
    // in [march]
    '(in|by|before|during|on|until|after|of|within|all) _ -> #Month',
    // early [May]
    '(early|late|mid) _ -> #Month',
    // [march] quickly
    '_ #Adv -> #V',
  ],
  may: [
    // [may] be
    '_ be -> #V',
    // early [May]
    '(early|late|mid) _ -> #Month',
    // [march] quickly
    '_ #Adv -> #V',
  ],
  // [open] the door
  open: '_ #Det -> #Inf',
  be: [
    // will [be] walked
    'will _ #Past -> #Aux',
    // [stay] cool
    imperativeBeforeAdjective,
  ],
  // at [about]
  about: '#Prep _ -> #Adv',
  // [plenty] of
  plenty: '_ of -> #Uncountable',
  // see [no]
  no: '#V _ -> #Neg',
  turkey: [
    // i ate [turkey]
    '(eat|ate|eating|roast|roasted|thanksgiving) _ -> #Uncountable | !#Place',
    // [turkey] dinner
    '_ (roast|dinner|sandwich|burger) -> #Uncountable | !#Place',
    // ankara [turkey]
    // in [turkey]
    '(#Place|in|near|nearby|to|from) _ -> #Country',
  ],
  that: [
    // [that] is all
    '^ _ #Cop -> #Pron',
    // says [that] he
    '#V _ #Pron -> #Conj',
    // things [that] are required
    '#NN _ #Cop -> #Conj',
  ],
  like: [
    // nothing [like]
    'nothing _ -> #Prep',
    // [like] the time
    '^ _ #Det -> #Prep',
  ],
  // enduring symbols, running water
  enduring: '_ (symbols|legacy|legacies|appeal|influence|value|values) -> #Adj',
  // enduring symbols, running water
  running: '(have|has|had|#Det|#Poss) _ water -> #Adj',
  // [wit] it
  wit: '_ (me|it) -> #Prep',
  leads: [
    // it [leads] to
    '_ (to|from) -> #Pres',
    // that [leads]
    '(that|this) _ -> #Pres',
  ],
  look: [
    // [look] good
    '_ #Adj -> #Pres',
    // [pay] attention
    imperativeBeforeNoun,
  ],
  // [start] listening
  finish: infinitiveBeforeGerund,
  help: [
    // [start] listening
    infinitiveBeforeGerund,
    // [pay] attention
    imperativeBeforeNoun,
  ],
  right: [
    // [right] after
    '_ (before|after|in|into|to|toward|above|below|under|over) -> #Adv',
    '_ of -> #NN',
    // the [right] to vote
    '(#Det|#Poss) _ to -> #NN',
  ],
  // always [there]
  there: '(always|nearly|barely|practically) _ -> #Adj',
  // than [mine]
  mine: '(then|than) _ -> #Poss',
  // said [sorry]
  sorry: '(say|says|said) _ -> #Expr',
  // on [wed]
  wed: '(in|by|before|during|on|until|after|of|within|all) _ -> #WeekDay | #Singular',
  quarter: [
    '#Det _ #Unit -> #Value',
    // a [half] second
    '#Det _ #Ord -> #Value',
  ],
  kind: [
    // some [kind] of teacher
    '(#Det|#Comp|new|different) _ of -> #NN',
    // same [kind] of shouts
    'same _ of -> #NN',
    // a new [kind]
    '(#Det|#Comp|new|different) _ $ -> #NN',
  ],
  close: [
    // a close friend
    '#Det _ #NN -> #Adj',
    // came to a [close]
    '#Det _ $ -> #NN',
  ],
  sat: [
    // on [sat]
    '(in|by|before|during|on|until|after|of|within|all) _ -> #WeekDay | #Singular',
    // [sat] november
    '^ _ #Date -> #WeekDay | #Singular',
  ],
  // he [read]
  read: '^(he|she|it|#Pers) _ -> #Past',
  stay: [
    // [stay] away
    '^ _ (out|away|back) -> #Imp',
    // [stay] cool
    imperativeBeforeAdjective,
  ],
  // [stay] cool
  keep: imperativeBeforeAdjective,
  // shoot
  shoot: '^ _ $ -> #Expr',
  // 10 [seconds]
  seconds: '#Value _ -> #Plur | !#Value',
  premier: [
    // This is the [premier] university in Virginia
    'the _ #NN -> #Adj',
    // { m: '#Cop the [%Adj|Noun%] #NN', g: 0, t: 'Adj', r: 'premier-uni' },
  ],
  // i [frequent] this restaurant
  frequent: '#Pron _ #Det -> #Inf',
  // [google] me
  google: '^ _ #Pron -> #Inf',
  // she even [left]
  left: 'even _ $ -> #Past',
  // she has [since] moved
  since: '(has|have|had) _ #Past -> #Adv',
  // she had [time]
  time: 'had _ $ -> #NN',
  // the station was [closing]; plants that were [growing]
  'closing|growing': '#Cop _ -> #Ger',
  // half a [penny]
  penny: 'a _ $ -> #Currency',
  // 1pm [next] sun
  next: '#Time _ (sun|#WeekDay) -> #Date',
  to: [
    // from start [to] finish
    'start _ finish -> #Prep',
    // [to] the store
    '_ (#Det|#Poss|#Pron|#Email|#Url) -> #Prep | !#Conj',
    // went [to] 888 (but not 3 to 5)
    '#V _ #Value -> #Prep | !#Conj',
  ],
  in: [
    // bowed his head [in] prayer
    '_ prayer -> #Prep',
    // closed [in] july
    '_ #Month -> #Prep',
  ],
  // [pope] francis
  pope: '_ #Pers -> #Hon',
  // [prince] paris
  prince: '_ #Prop -> #Hon',
  // being [born]
  born: 'being _ -> #Past',
  // are [ya]
  ya: '(are|#Mod|see|do|for) _ -> #Pron',
  // we met shortly [after]
  after: '(shortly|soon|long) _ $ -> #Adv',
  // she has not arrived [yet]
  yet: '#Past _ $ -> #Adv',
  // [before] dinner
  before: '_ (#Det|#Poss|#NN|#Ger|#Date) -> #Prep',
  // dropped [below] zero
  below: '_ #Value -> #Prep',
  // runs [alongside] the river
  alongside: '_ (#Det|#Poss|#Pron|#Prop) -> #Prep',
  // fell [behind] the sofa, but fell behind
  behind: '#Past _ (#Det|#Poss|#Pron) -> #Prep',
  // [do] you swim?
  do: '^ _ (you|we|they) -> #QW',
  // [does] he swim?
  does: '^ _ (he|she|it|#Prop) -> #QW',
  // i ate [me] sandwich (scottish slang)
  me: '#Past _ #NN -> #Poss',

  // Shared rules follow, so a word's own rules stay first in its bucket.
  // travel by [train]; benefit from [exercise]
  train: 'by _ -> #Noun',
  exercise: '(after|from) _ -> #Noun',
  // zoom [past] the house; rage [against] injustice
  past: '#V _ #Det -> #Prep',
  against: '#V _ #Noun -> #Prep',
  // deserving such [praise]
  praise: 'such _ -> #Noun',
  // spoke [concerning] the budget
  concerning: '(spoke|talked|wrote) _ #Det -> #Prep',
  // is [lasting] [longer]
  lasting: copGer('longer'),
  longer: 'lasting _ $ -> #Adv',
  // is [empowering] local women
  empowering: copGer('#Adj'),
  // attempts at [escape]; waited [pending] approval
  escape: 'at _ -> #Noun',
  pending: '#Past _ #Noun -> #Prep',
  // is [lagging] behind
  lagging: copGer('behind'),
  // anyone [owing] money; was sadly [lacking]
  owing: '_ #Noun -> #Ger',
  lacking: '(sadly|sorely) _ $ -> #Adj',
  // is [absorbing] water
  'absorbing|baffling|contributing|exacting|foreboding': copGer('#Noun'),
  // is [booming] again; is flowering [early]
  'booming|skyrocketing': copGer('again'),
  'budding|flowering': copGer('early'),
  screeching: copGer('outside'),
  early: '(budding|flowering) _ $ -> #Adv',
  // is [drifting] toward the shore
  'accelerating|dashing|drifting|rushing|sloping|staggering': copGer('toward'),
  // is [meandering] through the village
  'meandering|rambling|speeding|surging': copGer('through'),
  // is [decaying] in the rain; is [smiling] at the baby
  'decaying|fading|flaming|gleaming|maturing|sparkling|swelling|thriving': copGer('in'),
  'glaring|remaining|roaring|smiling': copGer('at'),
  // is [appealing] against the verdict; is [trembling] with fear
  'appealing|conspiring|intriguing|leaning|raging': copGer('against'),
  'conflicting|corresponding|trembling|trifling': copGer('with'),
  'agonizing|reigning': copGer('over'),
  'aching|ensuing': copGer('after'),
  'bustling|revolving': copGer('around'),
  'dissenting|emerging': copGer('from'),
  living: copGer('near'),
  prevailing: copGer('despite'),
  plunging: copGer('into'),
  flowing: copGer('under'),
  soaring: copGer('above'),
  sprawling: copGer('across'),
  // [1st] lieutenant
  '1st|2nd|3rd': '_ lieutenant -> #Hon',
  // is [when] he left
  'who|what|where|why|how|when': '#Cop _ #NN -> #Conj',
  // [dark] green
  'dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all': adverbBeforeAdjective,
  // in [march]
  'march|may': '#Prep _ -> #Month',
  // what the [hell]
  'shit|damn|hell': '#Det _ -> #NN',
  // go to [hell]
  'shit|hell': 'to _ -> #NN',
  // the [can]
  'can|will|may': 'the _ -> #Sing',
  // five [feet]; 5 [k]; 5 [gb]
  'foot|feet|k|gb|pa|ft|m': '#Value _ -> #Unit',
  // [damn] them
  'shit|damn': '^ _ them -> #Inf',
  // [super] strong
  'super|pretty': adverbBeforeAdjective,
  // a [must]
  // a [while]
  'must|while': 'a _ -> #Sing',
  // [sounds] fun
  // [look] good
  'sound|sounds|looks': '_ #Adj -> #Pres',
  // [stops] thinking
  'start|stop|starts|stops|begin|begins': '_ #Ger -> #V',
  // help [stop]
  'start|stop|end|make': 'help _ -> #Inf',
  // [start] listening
  'start|stop': infinitiveBeforeGerund,
  // [pay] attention
  'start|stop|ask|wear|pay|show|watch|act|fix|kill|turn|try|win': imperativeBeforeNoun,
  // 5pm [central]
  'eastern|mountain|pacific|central|est|pst|gmt': '#Time _ -> #Timezone | #Singular',
  // [dance] music
  'dance|rock|rap|swing': '_ (music|class|lesson|night|party|festival|league|ceremony) -> #NN',
  // ten [bucks]
  'buck|bucks|grand': '#Value _ -> #Currency',
  // 5 [square] miles
  'square|cubic': '#Value _ #Unit -> #Unit',
  // is [alone]
  'just|alone': '#Cop _ $ -> #Adj',
  // [go] home
  'go|come': '^ _ home -> #Imp',
  // ok,
  // alright
  // hell
  // anyways
  'ok|alright|hell|anyways': '^ _ -> #Expr',
  // [dude] we should
  'dude|man|girl': '^ _ #Pron -> #Expr',
  // [un] skilled
  'un|contra|extra|inter|intra|macro|micro|mid|mis|mono|multi|pre|sub|tri|ex': '_ #Adj -> #Adj | #Prefix',

  'over|under': '(is|was|were) _ #Past -> #Adv',
  // ...['under', 'over'].map(word => ({
  // m: `(is|was|were) [${word} #Past]`,
  'shit|damn|fuck': '_ (#Det|#Poss|them) -> #Verb',
// the poor
  'poor|weary|public': 'the _ #Verb-> #Noun',
}

export default rules
