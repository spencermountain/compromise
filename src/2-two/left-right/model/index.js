import compile from './_lib.js'

const rules = {
  said: [
    // the [said] dog
    'the _ #Noun -> #Adjective',
  ],
  still: [
    // was [still] in
    '#Copula _ in -> #Adverb',
    // was [still] in
    '#Copula _ #Gerund -> #Adverb',
    // was [still] in
    '#Copula _ #Adjective -> #Adverb',
    // [still] good
    '_ #Adjective -> #Adverb',
    // [still] make
    '_ #Verb -> #Adverb',
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
    '_ #Comparative -> #Adverb',
    // [way] over
    '_ #Adjective -> #Adverb',
  ],
  all: [
    // they [all] swim
    '_ #Verb -> #Adverb',
  ],
  even: [
    // [even] held
    '_ #Verb -> #Adverb',
    // [even] worse
    '_ #Comparative -> #Adverb',
    // [even] the greatest
    '_ #Determiner -> #Adverb',
    // [even] the greatest
    '_ #Possessive -> #Adverb',
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
    'the _ -> #Singular',
    // any [more]
    'any _ -> #Singular',
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
    '#Place _ -> #Country',
    // in [turkey]
    'in _ -> #Country',
    // in [turkey]
    'near _ -> #Country',
    // in [turkey]
    'nearby _ -> #Country',
    // in [turkey]
    'to _ -> #Country',
    // in [turkey]
    'from _ -> #Country',
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
    '_ symbols -> #Adjective',
    // enduring symbols, running water
    '_ legacy -> #Adjective',
    // enduring symbols, running water
    '_ legacies -> #Adjective',
    // enduring symbols, running water
    '_ appeal -> #Adjective',
    // enduring symbols, running water
    '_ influence -> #Adjective',
    // enduring symbols, running water
    '_ value -> #Adjective',
    // enduring symbols, running water
    '_ values -> #Adjective',
  ],
  running: [
    // enduring symbols, running water
    'have _ water -> #Adjective',
    // enduring symbols, running water
    'has _ water -> #Adjective',
    // enduring symbols, running water
    'had _ water -> #Adjective',
    // enduring symbols, running water
    '#Determiner _ water -> #Adjective',
    // enduring symbols, running water
    '#Possessive _ water -> #Adjective',
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
    '_ me -> #Preposition',
    // [wit] it
    '_ it -> #Preposition',
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
    '_ before -> #Adverb',
    // [right] after
    '_ after -> #Adverb',
    // [right] after
    '_ in -> #Adverb',
    // [right] after
    '_ into -> #Adverb',
    // [right] after
    '_ to -> #Adverb',
    // [right] after
    '_ toward -> #Adverb',
  ],
  there: [
    // always [there]
    'always _ -> #Adjective',
    // always [there]
    'nearly _ -> #Adjective',
    // always [there]
    'barely _ -> #Adjective',
    // always [there]
    'practically _ -> #Adjective',
  ],
  mine: [
    // than [mine]
    'then _ -> #Possessive',
    // than [mine]
    'than _ -> #Possessive',
  ],
  sorry: [
    // said [sorry]
    'say _ -> #Expression',
    // said [sorry]
    'says _ -> #Expression',
    // said [sorry]
    'said _ -> #Expression',
  ],
}

export default {
  two: {
    leftRight: compile(rules),
  },
}
