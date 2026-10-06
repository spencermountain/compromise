const rules = {
  here: [
    // come [here], leave the bowls [here], is [here]
    '(#Verb|#Noun) _ $ -> #Adv',
    '#Verb _ (#Date|now) -> #Adv',
  ],
  too: [
    '_ much -> #Adv',
  ],
  much: [
    '_ #Adj -> #Adv',
    '(too|bit) _ -> #Adj',
  ],
  bit: [
    'a _ -> #Sing',
    // a [bit] much
    'a _ much -> #Adv',
  ],
  live: [
    'long _ -> #Inf',
  ],
  rights: [
    '_ of -> #NN',
  ],
  under: [
    // looked [under] the bed
    '#V _ (#Det|#Poss|#Pron) -> #Prep',
  ],
  am: [
    // five [am]
    '#Value _ -> #Time',
  ],
  pm: [
    '#Value _ -> #Time',
  ],
  well: [
    // a [well] made table
    '_ #Past -> #Adv',
  ],
  cool: [
    // keep it [cool]
    'it _ $ -> #Adj',
  ],
  long: [
    '_ after$ -> #Adv',
    '_ live -> #Adv',
  ],
  minus: [
    // [minus] seven
    '_ #Value -> #Value',
  ],
  negative: [
    '_ #Value -> #Value',
  ],
  point: [
    // seven [point] five
    '#Value _ #Value -> #Value',
  ],
  decimal: [
    '#Value _ #Value -> #Value',
  ],
  fine: [
    // pay his [fine]; it works out [fine]
    '#Poss _ $ -> #Singular',
    '#PhrasalVerb _ $ -> #Adjective',
  ],
  lieutenant: [
    // 1st [lieutenant]
    '(1st|2nd|3rd) _ -> #Hon',
  ],
  dozen: [
    // two [dozen] eggs
    '(a|#Cardinal) _ -> #Multiple | #Cardinal',
  ],
  how: [
    // [how] is she?
    '_ (#Det|#Cop|#Mod|#Past) -> #QW',
  ],
  rival: [
    // a [rival] company
    '(#Det|#Poss) _ #Noun -> #Adjective',
  ],
  bill: [
    // the [bill] is a common noun, despite its name default
    '(#Det|#Poss) _ -> #Singular | !#Person | !#ProperNoun',
  ],
  air: [
    // the [air] force
    '_ force -> #NN',
  ],
  said: [
    // the [said] dog
    'the _ #NN -> #Adj',
  ],
  still: [
    // was [still] in
    '#Cop _ (in|#Ger|#Adj) -> #Adv',
    // [still] good
    // [still] make
    '_ (#Adj|#V) -> #Adv',
  ],
  so: [
    // [so] hot
    '_ #Adj -> #Adv',
    // do [so]
    'do _ -> #Adv',
    // [so] he
    '_ #NN -> #Conj',
  ],
  way: [
    // [way] hotter
    // [way] over
    '_ (#Comp|#Adj) -> #Adv',
  ],
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
  later: [
    // [later] say
    '_ #Pres -> #Adv',
  ],
  enough: [
    // high [enough]
    '#Adj _ -> #Adv',
  ],
  least: [
    // [least] expensive
    '_ #Adj -> #Adv',
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
  r: [
    // u [r] cool
    'u _ -> #Cop',
  ],
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
  open: [
    // [open] the door
    '_ #Det -> #Inf',
  ],
  be: [
    // will [be] walked
    'will _ #Past -> #Aux',
    // [stay] cool
    '^ _ #Adj -> #Imp',
  ],
  about: [
    // at [about]
    '#Prep _ -> #Adv',
  ],
  plenty: [
    // [plenty] of
    '_ of -> #Uncountable',
  ],
  no: [
    // see [no]
    '#V _ -> #Neg',
  ],
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
  enduring: [
    // enduring symbols, running water
    '_ (symbols|legacy|legacies|appeal|influence|value|values) -> #Adj',
  ],
  running: [
    // enduring symbols, running water
    '(have|has|had|#Det|#Poss) _ water -> #Adj',
  ],
  wit: [
    // [wit] it
    '_ (me|it) -> #Prep',
  ],
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
    '^ _ #NN -> #Imp',
  ],
  finish: [
    // [start] listening
    '_ #Ger -> #Inf',
  ],
  help: [
    // [start] listening
    '_ #Ger -> #Inf',
    // [pay] attention
    '^ _ #NN -> #Imp',
  ],
  right: [
    // [right] after
    '_ (before|after|in|into|to|toward|above|below|under|over) -> #Adv',
    '_ of -> #NN',
  ],
  there: [
    // always [there]
    '(always|nearly|barely|practically) _ -> #Adj',
  ],
  mine: [
    // than [mine]
    '(then|than) _ -> #Poss',
  ],
  sorry: [
    // said [sorry]
    '(say|says|said) _ -> #Expr',
  ],
  wed: [
    // on [wed]
    '(in|by|before|during|on|until|after|of|within|all) _ -> #WeekDay | #Singular',
  ],
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
  read: [
    // he [read]
    '^(he|she|it|#Pers) _ -> #Past',
  ],
  stay: [
    // [stay] away
    '^ _ (out|away|back) -> #Imp',
    // [stay] cool
    '^ _ #Adj -> #Imp',
  ],
  keep: [
    // [stay] cool
    '^ _ #Adj -> #Imp',
  ],
  shoot: [
    // shoot
    '^ _ $ -> #Expr',
  ],
  seconds: [
    // 10 [seconds]
    '#Value _ -> #Plur | !#Value',
  ],
  premier: [
    // This is the [premier] university in Virginia
    'the _ #NN -> #Adj',
    // { m: '#Cop the [%Adj|Noun%] #NN', g: 0, t: 'Adj', r: 'premier-uni' },
  ],
  frequent: [
    // i [frequent] this restaurant
    '#Pron _ #Det -> #Inf',
  ],
  google: [
    // [google] me
    '^ _ #Pron -> #Inf',
  ],
  left: [
    // she even [left]
    'even _ $ -> #Past',
  ],
  since: [
    // she has [since] moved
    '(has|have|had) _ #Past -> #Adv',
  ],
  time: [
    // she had [time]
    'had _ $ -> #NN',
  ],
  closing: [
    // the station was [closing]
    '#Cop _ -> #Ger',
  ],
  growing: [
    // plants that were [growing]
    '#Cop _ -> #Ger',
  ],
  soon: [
    '_ after$ -> #Adv',
    // the shop is closing [soon]
    'closing _ $ -> #Adv',
  ],
  penny: [
    // half a [penny]
    'a _ $ -> #Currency',
  ],
  next: [
    // 1pm [next] sun
    '#Time _ (sun|#WeekDay) -> #Date',
  ],
  to: [
    // from start [to] finish
    'start _ finish -> #Prep',
    // [to] the store
    '_ (#Det|#Poss|#Pron|#Email|#Url) -> #Prep | !#Conj',
  ],
  in: [
    // bowed his head [in] prayer
    '_ prayer -> #Prep',
  ],
  pope: [
    // [pope] francis
    '_ #Pers -> #Hon',
  ],
  prince: [
    // [prince] paris
    '_ #Prop -> #Hon',
  ],
  born: [
    // being [born]
    'being _ -> #Past',
  ],
  ya: [
    // are [ya]
    '(are|#Mod|see|do|for) _ -> #Pron',
  ],
  after: [
    // we met shortly [after]
    '(shortly|soon|long) _ $ -> #Adv',
  ],
  yet: [
    // she has not arrived [yet]
    '#Past _ $ -> #Adv',
  ],
  before: [
    // [before] dinner
    '_ (#Det|#Poss|#NN|#Ger|#Date) -> #Prep',
  ],
  below: [
    // dropped [below] zero
    '_ #Value -> #Prep',
  ],
  alongside: [
    // runs [alongside] the river
    '_ (#Det|#Poss|#Pron|#Prop) -> #Prep',
  ],
  behind: [
    // fell [behind] the sofa, but fell behind
    '#Past _ (#Det|#Poss|#Pron) -> #Prep',
  ],
  do: [
    // [do] you swim?
    '^ _ (you|we|they) -> #QW',
  ],
  does: [
    // [does] he swim?
    '^ _ (he|she|it|#Prop) -> #QW',
  ],
  me: [
    // i ate [me] sandwich (scottish slang)
    '#Past _ #NN -> #Poss',
  ],

}

const compounds = {
  // [1st] lieutenant
  '1st|2nd|3rd': '_ lieutenant -> #Hon',
  // is [when] he left
  'who|what|where|why|how|when': '#Cop _ #NN -> #Conj',
  // [dark] green
  'dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all': '_ #Adj -> #Adv',
  // in [march]
  'march|may': '#Prep _ -> #Month',
  // what the [hell]
  'shit|damn|hell': '#Det _ -> #NN',
  // go to [hell]
  'shit|hell': 'to _ -> #NN',
  // the [can]
  'can|will|may': 'the _ -> #Sing',
  // five [feet]
  'foot|feet': '#Value _ -> #Unit',
  // [damn] them
  'shit|damn': '^ _ them -> #Inf',
  // [super] strong
  'super|pretty': '_ #Adj -> #Adv',
  // a [must]
  // a [while]
  'must|while': 'a _ -> #Sing',
  // 5 [k]
  // 5 [gb]
  'k|gb|pa|ft|m': '#Value _ -> #Unit',
  // [sounds] fun
  // [look] good
  'sound|sounds|looks': '_ #Adj -> #Pres',
  // [stops] thinking
  'start|stop|starts|stops|begin|begins': '_ #Ger -> #V',
  // help [stop]
  'start|stop|end|make': 'help _ -> #Inf',
  // [start] listening
  'start|stop': '_ #Ger -> #Inf',
  // [pay] attention
  'start|stop|ask|wear|pay|show|watch|act|fix|kill|turn|try|win': '^ _ #NN -> #Imp',
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

Object.entries(compounds).forEach(([words, rule]) => {
  words.split('|').forEach(word => {
    rules[word] ||= []
    rules[word].push(rule)
  })
})
export default rules
