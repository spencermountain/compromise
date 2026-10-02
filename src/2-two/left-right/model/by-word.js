const rules = {
  said: [
    // the [said] dog
    'the _ #Noun -> #Adjective',
  ],
  still: [
    // was [still] in
    '#Copula _ (in|#Gerund|#Adjective) -> #Adverb',
    // [still] good
    // [still] make
    '_ (#Adjective|#Verb) -> #Adverb',
  ],
  so: [
    // [so] hot
    '_ #Adjective -> #Adverb',
    // do [so]
    'do _ -> #Adverb',
    // [so] he
    '_ #Noun -> #Conjunction',
  ],
  way: [
    // [way] hotter
    // [way] over
    '_ (#Comparative|#Adjective) -> #Adverb',
  ],
  all: [
    // they [all] swim
    '_ #Verb -> #Adverb',
  ],
  even: [
    // [even] held
    // [even] worse
    // [even] the greatest
    '_ (#Verb|#Comparative|#Determiner|#Possessive) -> #Adverb',
  ],
  later: [
    // [later] say
    '_ #PresentTense -> #Adverb',
  ],
  enough: [
    // high [enough]
    '#Adjective _ -> #Adverb',
  ],
  least: [
    // [least] expensive
    '_ #Adjective -> #Adverb',
    // the [least]
    '#Determiner _ -> #Adverb',
  ],
  sun: [
    // [sun] feb 2
    '_ #Date -> #WeekDay',
    // the [sun]
    '#Determiner _ -> #Singular',
  ],
  more: [
    // [more] players
    '_ #Noun -> #Adjective',
    // any [more]
    '(the|any) _ -> #Singular',
  ],
  u: [
    // and [u]
    '#Conjunction _ -> #Pronoun',
    // [u] made me smile
    '_ #Verb -> #Pronoun',
  ],
  half: [
    // nearly [half]
    '#Adverb _ -> #Fraction',
    // [half] the
    '_ the -> #Fraction',
    // a [half] second
    '#Determiner _ #Ordinal -> #Value',
  ],
  second: [
    // one [second]
    '#Cardinal _ -> #Unit',
    // [second] dog
    '_ #Noun -> #Ordinal',
  ],
  will: [
    // [will] go
    '_ #Infinitive -> #Modal',
  ],
  march: [
    // must [march]
    '#Modal _ -> #Infinitive',
    // in [march]
    '(in|by|before|during|on|until|after|of|within|all) _ -> #Month',
    // early [May]
    '(early|late|mid) _ -> #Month',
    // [march] quickly
    '_ #Adverb -> #Verb',
  ],
  may: [
    // [may] be
    '_ be -> #Verb',
    // early [May]
    '(early|late|mid) _ -> #Month',
    // [march] quickly
    '_ #Adverb -> #Verb',
  ],
  open: [
    // [open] the door
    '_ #Determiner -> #Infinitive',
  ],
  be: [
    // will [be] walked
    'will _ #PastTense -> #Auxiliary',
    // [stay] cool
    '^ _ #Adjective -> #Imperative',
  ],
  about: [
    // at [about]
    '#Preposition _ -> #Adverb',
  ],
  plenty: [
    // [plenty] of
    '_ of -> #Uncountable',
  ],
  no: [
    // see [no]
    '#Verb _ -> #Negative',
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
    // says [that] he
    '#Verb _ #Pronoun -> #Conjunction',
    // things [that] are required
    '#Noun _ #Copula -> #Conjunction',
  ],
  like: [
    // nothing [like]
    'nothing _ -> #Preposition',
    // [like] the time
    '^ _ #Determiner -> #Preposition',
  ],
  enduring: [
    // enduring symbols, running water
    '_ (symbols|legacy|legacies|appeal|influence|value|values) -> #Adjective',
  ],
  running: [
    // enduring symbols, running water
    '(have|has|had|#Determiner|#Possessive) _ water -> #Adjective',
  ],
  wit: [
    // [wit] it
    '_ (me|it) -> #Preposition',
  ],
  look: [
    // [look] good
    '_ #Adjective -> #PresentTense',
    // [pay] attention
    '^ _ #Noun -> #Imperative',
  ],
  finish: [
    // [start] listening
    '_ #Gerund -> #Infinitive',
  ],
  help: [
    // [start] listening
    '_ #Gerund -> #Infinitive',
    // [pay] attention
    '^ _ #Noun -> #Imperative',
  ],
  right: [
    // [right] after
    '_ (before|after|in|into|to|toward) -> #Adverb',
  ],
  there: [
    // always [there]
    '(always|nearly|barely|practically) _ -> #Adjective',
  ],
  mine: [
    // than [mine]
    '(then|than) _ -> #Possessive',
  ],
  sorry: [
    // said [sorry]
    '(say|says|said) _ -> #Expression',
  ],
  wed: [
    // on [wed]
    '(in|by|before|during|on|until|after|of|within|all) _ -> #WeekDay',
  ],
  quarter: [
    // a [half] second
    '#Determiner _ #Ordinal -> #Value',
  ],
  kind: [
    // a new [kind]
    '(#Determiner|#Comparative|new|different) _ $ -> #Noun',
  ],
  close: [
    // came to a [close]
    '#Determiner _ $ -> #Noun',
  ],
  sat: [
    // [sat] november
    '^ _ #Date -> #WeekDay',
  ],
  read: [
    // he [read]
    '^(he|she|it|#Person) _ -> #PastTense',
  ],
  stay: [
    // [stay] away
    '^ _ (out|away|back) -> #Imperative',
    // [stay] cool
    '^ _ #Adjective -> #Imperative',
  ],
  keep: [
    // [stay] cool
    '^ _ #Adjective -> #Imperative',
  ],
  shoot: [
    // shoot
    '^ _ $ -> #Expression',
  ],
  seconds: [
    // 10 [seconds]
    '#Value _ -> #Plural | !#Value',
  ],
}

const compounds = {
  // [much] appreciated
  // [super] strong
  'much|super|pretty': '_ #Adjective -> #Adverb',
  // a [bit]
  // a [must]
  // a [while]
  'bit|must|while': 'a _ -> #Singular',
  // 5 [k]
  // 5 [gb]
  'k|gb|pa|ft|m': '#Value _ -> #Unit',
  // [sounds] fun
  // [look] good
  'sound|sounds|looks': '_ #Adjective -> #PresentTense',
  // [stops] thinking
  'start|stop|starts|stops|begin|begins': '_ #Gerund -> #Verb',
  // help [stop]
  'start|stop|end|make': 'help _ -> #Infinitive',
  // [start] listening
  'start|stop': '_ #Gerund -> #Infinitive',
  // [pay] attention
  'start|stop|ask|wear|pay|show|watch|act|fix|kill|turn|try|win': '^ _ #Noun -> #Imperative',
  // 5pm [central]
  'eastern|mountain|pacific|central|est|pst|gmt': '#Time _ -> #Timezone',
  // [dance] music
  'dance|rock|rap|swing': '_ (music|class|lesson|night|party|festival|league|ceremony) -> #Noun',
  // ten [bucks]
  'buck|bucks|grand': '#Value _ -> #Currency',
  // 5 [square] miles
  'square|cubic': '#Value _ #Unit -> #Unit',
  // is [alone]
  'just|alone': '#Copula _ $ -> #Adjective',
  // [go] home
  'go|come': '^ _ home -> #Imperative',
  // ok,
  // alright
  // hell
  // anyways
  'ok|alright|hell|anyways': '^ _ -> #Expression',
  // [dude] we should
  'dude|man|girl': '^ _ #Pronoun -> #Expression',
  // [un] skilled
  'un|contra|extra|inter|intra|macro|micro|mid|mis|mono|multi|pre|sub|tri|ex': '_ #Adjective -> #Adjective | #Prefix',
}

Object.entries(compounds).forEach(([words, rule]) => {
  words.split('|').forEach(word => {
    rules[word] ||= []
    rules[word].push(rule)
  })
})

export default rules
