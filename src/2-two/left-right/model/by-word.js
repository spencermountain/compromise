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
  much: [
    // [much] appreciated
    '_ #Adjective -> #Adverb',
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
  bit: [
    // a [bit]
    'a _ -> #Singular',
  ],
  must: [
    // a [must]
    'a _ -> #Singular',
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
  ],
  second: [
    // one [second]
    '#Cardinal _ -> #Unit',
    // [second] dog
    '_ #Noun -> #Ordinal',
  ],
  k: [
    // 5 [k]
    '#Value _ -> #Unit',
  ],
  will: [
    // [will] go
    '_ #Infinitive -> #Modal',
  ],
  march: [
    // must [march]
    '#Modal _ -> #Infinitive',
  ],
  may: [
    // [may] be
    '_ be -> #Verb',
  ],
  open: [
    // [open] the door
    '_ #Determiner -> #Infinitive',
  ],
  be: [
    // will [be] walked
    'will _ #PastTense -> #Auxiliary',
  ],
  about: [
    // at [about]
    '#Preposition _ -> #Adverb',
  ],
  plenty: [
    // [plenty] of
    '_ of -> #Uncountable',
  ],
  while: [
    // a [while]
    'a _ -> #Singular',
  ],
  no: [
    // see [no]
    '#Verb _ -> #Negative',
  ],
  turkey: [
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
  ],
  enduring: [
    // enduring symbols, running water
    '_ (symbols|legacy|legacies|appeal|influence|value|values) -> #Adjective',
  ],
  running: [
    // enduring symbols, running water
    '(have|has|had|#Determiner|#Possessive) _ water -> #Adjective',
  ],
  super: [
    // [super] strong
    '_ #Adjective -> #Adverb',
  ],
  pretty: [
    // [super] strong
    '_ #Adjective -> #Adverb',
  ],
  wit: [
    // [wit] it
    '_ (me|it) -> #Preposition',
  ],
  sound: [
    // [sounds] fun
    '_ #Adjective -> #PresentTense',
  ],
  sounds: [
    // [sounds] fun
    '_ #Adjective -> #PresentTense',
  ],
  look: [
    // [look] good
    '_ #Adjective -> #PresentTense',
  ],
  looks: [
    // [look] good
    '_ #Adjective -> #PresentTense',
  ],
  start: [
    // [stops] thinking
    '_ #Gerund -> #Verb',
    // help [stop]
    'help _ -> #Infinitive',
    // [start] listening
    '_ #Gerund -> #Infinitive',
  ],
  starts: [
    // [stops] thinking
    '_ #Gerund -> #Verb',
  ],
  stop: [
    // [stops] thinking
    '_ #Gerund -> #Verb',
    // help [stop]
    'help _ -> #Infinitive',
    // [start] listening
    '_ #Gerund -> #Infinitive',
  ],
  stops: [
    // [stops] thinking
    '_ #Gerund -> #Verb',
  ],
  begin: [
    // [stops] thinking
    '_ #Gerund -> #Verb',
  ],
  begins: [
    // [stops] thinking
    '_ #Gerund -> #Verb',
  ],
  end: [
    // help [stop]
    'help _ -> #Infinitive',
  ],
  make: [
    // help [stop]
    'help _ -> #Infinitive',
  ],
  finish: [
    // [start] listening
    '_ #Gerund -> #Infinitive',
  ],
  help: [
    // [start] listening
    '_ #Gerund -> #Infinitive',
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
}

export default rules
