const rules = {
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
  ],
  even: [
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
  ],
  half: [
    // nearly [half]
    '#Adv _ -> #Frac',
    // [half] the
    '_ the -> #Frac',
    // a [half] second
    '#Det _ #Ord -> #Value',
  ],
  second: [
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
    '_ (before|after|in|into|to|toward) -> #Adv',
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
    '(in|by|before|during|on|until|after|of|within|all) _ -> #WeekDay',
  ],
  quarter: [
    // a [half] second
    '#Det _ #Ord -> #Value',
  ],
  kind: [
    // same [kind] of shouts
    'same _ of -> #NN',
    // a new [kind]
    '(#Det|#Comp|new|different) _ $ -> #NN',
  ],
  close: [
    // came to a [close]
    '#Det _ $ -> #NN',
  ],
  sat: [
    // [sat] november
    '^ _ #Date -> #WeekDay',
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
    // the shop is closing [soon]
    'closing _ $ -> #Adv',
  ],
  penny: [
    // half a [penny]
    'a _ $ -> #Currency',
  ],
}

const compounds = {
  // [much] appreciated
  // [super] strong
  'much|super|pretty': '_ #Adj -> #Adv',
  // a [bit]
  // a [must]
  // a [while]
  'bit|must|while': 'a _ -> #Sing',
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
  'eastern|mountain|pacific|central|est|pst|gmt': '#Time _ -> #Timezone',
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

  // 'do|does|did': '_ (this|that|these|those) -> #Imp',
  // ...['do', 'does', 'did', '#Mod'].map(aux => ({
  //   m: `${aux} [(this|that|these|those)] #Adv+? #Inf`,
  // Does this machine work
  'this|those|that|these': '(did|can|do) _ (#NN|#Adv) -> #Pron',
  //  Can that bird really fly
  'this|that': '(did|can|does) _ (#NN|#Adv) -> #Pron',
}

Object.entries(compounds).forEach(([words, rule]) => {
  words.split('|').forEach(word => {
    rules[word] ||= []
    rules[word].push(rule)
  })
})
export default rules
