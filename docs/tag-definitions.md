# Tagset reference

Short definitions and current parser behavior. See [the hierarchy](tags.md) and
[POS perspectives](pos-perspectives.md) for broader conventions.

Examples use [spec syntax](spec-format.md): one slot per term; `|` means **both**
tags. Slots show relevant tags, not every inherited tag. Contractions and some
number/unit forms expand into multiple terms. Unless marked otherwise, examples
use `nlp(text)` from the full `compromise` build.

## Nouns and entities

### #Noun

Things, people, and concepts, such as `cat, teacher, idea`. Includes pronouns and noun uses of other words.

```text
apple juice {Noun,Noun}
Swimming is fun. {Noun,Copula,Adj}
She is swimming. {Pronoun,Aux,Ger}
```

### #Singular

A `Noun` subtype for singular forms, such as `cat, book`. Excludes `Plural` and `Uncountable`.

```text
a cat {Det,Singular}
the Netherlands {Det,Country|Singular}
```

### #Plural

A `Noun` subtype for plural forms, such as `cats, children, CPUs`.

```text
two children {Cardinal,Plural}
CPUs {Acronym|Plural}
```

### #Uncountable

A `Noun` subtype for mass or number-invariant nouns, such as `money, sheep`.

```text
the money {Det,Uncountable}
sheep {Uncountable}
```

### #ProperNoun

A `Noun` subtype for names, such as `John, Google`. Capitalization alone does not guarantee this tag.

```text
John Smith {Prop|Person,Prop|Person}
Google {Prop|Org}
The cat slept. {Det,Noun,Past}
```

### #Person

A `Singular` subtype, also `ProperNoun`, for people's names and titles, such as `John Smith, Dr. Smith`.

```text
John Smith {Person,Person}
Dr. Smith {Person|Hon,Person}
the plumber {Det,Actor} # occupation, not a name
```

### #FirstName

A `Person` subtype for given names, such as `John, Jane`, distinguished from surnames in context.

```text
John Smith {FirstName,LastName}
Jane Smith {FirstName,LastName}
```

### #MaleName

A `FirstName` subtype for lexicon-classified names, such as `John, William`; not evidence of someone's gender.

```text
John Smith {MaleName|FirstName,LastName}
```

### #FemaleName

A `FirstName` subtype for lexicon-classified names, such as `Jane, Mary`; not evidence of someone's gender.

```text
Jane Smith {FemaleName|FirstName,LastName}
```

### #LastName

A `Person` subtype for surnames, such as `Smith, Jones`. Excludes `FirstName` on the same term.

```text
John Smith {FirstName,LastName}
Dr. Smith {Hon,LastName}
```

### #Honorific

A `Person` subtype for titles, such as `Dr., Mrs., Prof.`.

```text
Dr. Smith {Hon|Abbr,LastName}
```

### #Place

A `Singular` subtype for locations, such as `Paris, California`; does not itself require `ProperNoun`.

```text
Paris {Place|City}
California {Place|Region}
```

### #Country

A `Place` subtype, also `ProperNoun`, for countries, such as `Canada, France`.

```text
Canada {Country}
the Netherlands {Det,Country}
```

### #City

A `Place` subtype, also `ProperNoun`, for cities, such as `Paris, San Francisco`. Multiword names tag each term.

```text
Paris {City}
San Francisco {City,City}
```

### #Region

A `Place` subtype, also `ProperNoun`, for regions, such as `California, Ontario`.

```text
California {Region}
New York {Region,Region} # this phrase alone is treated as a region
```

### #Address

A street-address span, such as `123 Main Street, 42 Elm Road`. Can overlap number and place tags.

```text
123 Main Street {Addr|Numeric,Addr|Place,Addr|Place}
```

### #Organization

A `ProperNoun` subtype for organizations, such as `Google, Harvard University, FBI`.

```text
Google {Org}
Harvard University {Org,Org}
the FBI {Det,Org|Acronym}
```

### #SportsTeam

An `Organization` subtype for sports teams, such as `Toronto Raptors, Chicago Bears`.

```text
Toronto Raptors {SportsTeam,SportsTeam}
```

### #School

An `Organization` subtype for school-name patterns, such as `Lincoln public school, Oak private school`.

```text
Lincoln public school {School,School,School}
Harvard University {Org,Org} # not every institution gets School
```

### #Company

An `Organization` subtype for businesses, such as `Acme, Google` when explicitly tagged. Core recognition usually assigns `Organization`.

```text
Google {Org}
```

With `nlp('Acme', { acme: 'Company' })`:

```text
Acme {Company|Org} # custom lexicon
```

### #Pronoun

A `Noun` subtype for pronouns, such as `I, him, they`. Can overlap `Possessive`.

```text
I saw him. {Pronoun,Past,Pronoun}
her book {Pronoun|Poss,Noun}
```

### #Reflexive

A `Pronoun` subtype for self-forms, such as `himself, themselves`.

```text
She blamed herself. {Pronoun,Past,Reflexive|Pronoun}
```

### #Possessive

A `Noun` subtype for possessive forms, such as `John's, her, theirs`. An apostrophe-s contraction need not be possessive.

```text
John's book {Poss,Noun}
her book {Poss,Noun}
She's walking. {Pronoun,Aux,Ger} # she + is
```

### #Actor

A `Noun` subtype for roles and doers, such as `plumber, accountant, prime minister`; not necessarily a named person.

```text
the plumber {Det,Actor}
the prime minister {Det,Actor,Actor}
```

### #Activity

A `Noun` subtype for -ing activities, such as `skiing, walking` in “skiing can hurt” or “walking can help.” Not every noun use receives this subtype.

```text
Skiing can hurt. {Activity,Modal,Inf}
Swimming is fun. {Noun,Copula,Adj}
She is swimming. {Pronoun,Aux,Ger}
```

### #Unit

A `Noun` subtype for measurement units, such as `km, metres, percent`. Compact measurements can split into number and unit.

```text
10km {Numeric,Unit} # 10 + km
five percent {Percent,Unit}
```

### #Demonym

A `Noun` subtype, also `ProperNoun`, for regional labels, such as `Canadian, Belgian`; retains these tags when modifying a noun.

```text
Canadian bacon {Demonym,Noun}
Canadians are here. {Demonym|Plural,Copula,Noun}
```

### #Currency

A `Noun` subtype for currency names, such as `dollar, euros`. The amount receives `Money`.

```text
one dollar {Money,Currency}
five hundred dollars {Money,Money,Currency}
```

## Verbs

### #Verb

Verbs, such as `walk, slept, have`, including helpers and phrasal-verb particles.

```text
They walk. {Pronoun,Vb}
They walked. {Pronoun,Vb|Past}
```

### #PresentTense

A `Verb` subtype for present forms, such as `walks, eats`; also the parent of `Infinitive` and `Gerund`, regardless of clause tense.

```text
She walks. {Pronoun,Pres}
She will walk. {Pronoun,Modal,Pres|Inf}
She was walking. {Pronoun,Aux,Pres|Ger}
```

### #Infinitive

A `PresentTense` subtype for base forms, such as `walk, eat`, including ordinary present uses and modal complements.

```text
They walk. {Pronoun,Inf}
She can walk. {Pronoun,Modal,Inf}
She walks. {Pronoun,Pres} # inflected form
```

### #Imperative

A `Verb` subtype for commands, such as `open, go` in “Open the door” or “Go there”; can also retain `Infinitive`.

```text
Open the door. {Imp,Det,Noun}
Go there. {Imp|Inf,Noun}
```

### #Gerund

A `PresentTense` subtype for -ing verbs, such as `swimming, walking`. Noun uses receive `Noun` or `Activity` instead.

```text
She is swimming. {Pronoun,Aux,Ger}
Skiing can hurt. {Activity,Modal,Inf}
```

### #PastTense

A `Verb` subtype for past forms, such as `walked, slept`, including regular forms in perfect and passive constructions.

```text
She walked. {Pronoun,Past}
She has walked. {Pronoun,Aux,Past}
```

### #Participle

A `PastTense` subtype for recognized participles, such as `driven, eaten`. Ordinary -ed forms often stay `PastTense`.

```text
She has driven. {Pronoun,Aux,Participle|Past}
She has walked. {Pronoun,Aux,Past}
```

### #FutureTense

A defined `Verb` subtype for future forms, such as `will walk, will swim`; ordinary clauses use `Modal` and `Infinitive` instead.

```text
She will walk. {Pronoun,Modal|Aux,Inf}
```

### #Copula

A `Verb` subtype for forms of be, such as `is, are, was`; can coexist with `Auxiliary`.

```text
She is happy. {Pronoun,Copula,Adj}
She was walking. {Pronoun,Copula|Aux,Ger}
```

### #Modal

A `Verb` subtype for modal helpers, such as `can, could, should, will`; may also get `Auxiliary`.

```text
She can swim. {Pronoun,Modal,Inf}
May I go? {Modal,Pronoun,Inf} # May is not a month here
```

### #Auxiliary

A `Verb` subtype for chain helpers, such as `has, been` in “has been walking.” Replaces the helper's present/past form tags.

```text
She has been walking. {Pronoun,Aux,Aux,Ger}
She did not leave. {Pronoun,Aux,Negative,Inf}
Where did she go? {QuestionWord,Past,Pronoun,Inf} # subject breaks the chain
```

### #PhrasalVerb

A `Verb` subtype for combinations such as `turn down, pick up`; both the verb and its particle receive this tag.

```text
She turned down the invitation. {Pronoun,Phrasal,Phrasal,Det,Noun}
```

### #Particle

A `PhrasalVerb` subtype for particles, such as `down, up` in “turn down” or “pick up”; also inherits `Verb`.

```text
She turned down the invitation. {Pronoun,Phrasal,Particle,Det,Noun}
She walked down the street. {Pronoun,Past,Prep,Det,Noun}
```

### #Passive

A `Verb` subtype for passive main verbs, such as `watered, repaired` in “was watered” or “was repaired.”

```text
The roses were watered. {Det,Noun,Aux,Past|Passive}
She watered the roses. {Pronoun,Past,Det,Noun}
```

## Adjectives and adverbs

### #Adjective

Properties and descriptions, such as `red, happy, wooden`; also used for some spatial predicates.

```text
a red car {Det,Adj,Noun}
The cat is inside. {Det,Noun,Copula,Adj}
```

### #Comparable

An `Adjective` subtype and lexicon marker for comparable adjectives, such as `tall, bright`. Ordinary output usually keeps `Adjective`.

```text
a tall tree {Det,Adj,Noun}
```

With `nlp('bright', { bright: 'Comparable' })`:

```text
bright {Comparable|Adj} # custom lexicon
```

### #Comparative

An `Adjective` subtype for comparative forms, such as `taller, better`. A preceding more need not make the adjective `Comparative`.

```text
John is taller. {Person,Copula,Comparative}
more careful {Adv,Adj}
```

### #Superlative

An `Adjective` subtype for superlatives, such as `fastest, best`; excludes `Comparative`.

```text
the fastest car {Det,Superlative,Noun}
```

### #Adverb

Modifiers of verbs, adjectives, or adverbs, such as `slowly, very, remarkably`.

```text
She walked slowly. {Pronoun,Past,Adv}
very happy {Adv,Adj}
```

## Numbers

### #Value

Numeric quantities, such as `three, 21, first, 1/2`, including fractions and ordinals.

```text
three red apples {Val,Adj,Plural}
the first train {Det,Val|Ordinal,Noun}
```

### #Cardinal

A `Value` subtype for counting numbers, such as `three, 21`; excludes `Ordinal`.

```text
three apples {Cardinal,Plural}
21 apples {Cardinal|Numeric,Plural}
```

### #Ordinal

A `Value` subtype for sequence positions, such as `first, 21st`.

```text
the first train {Det,Ordinal,Noun}
the 21st train {Det,Ordinal|Numeric,Noun}
```

### #TextValue

A `Value` subtype for numbers written as words, such as `five, twenty one`.

```text
twenty one {TextValue,TextValue}
one million {TextValue,TextValue|Multiple}
```

### #NumericValue

A `Value` subtype for digit forms, such as `3.5, 21st`; excludes `TextValue`.

```text
3.5 {Numeric}
21st {Numeric|Ordinal}
```

### #Multiple

A `TextValue` subtype for written multipliers, such as `hundred, million`.

```text
one hundred {Cardinal,Multiple}
two million {Cardinal,Multiple}
```

### #Fraction

A `Value` subtype for fractions, such as `1/2, half` in “half a cup.”

```text
1/2 {Fraction|Numeric}
half a cup {Fraction,Det,Noun}
```

### #RomanNumeral

A `Cardinal` subtype for recognized Roman numerals, such as `IV, XIV`.

```text
Chapter IV {Noun,RomanNumeral}
XIV {RomanNumeral|Cardinal}
```

### #Money

A `Cardinal` subtype for monetary amounts, such as `$5, £20`; currency words receive `Currency`.

```text
I paid $5. {Pronoun,Past,Money}
five hundred dollars {Money,Money,Currency}
```

### #Percent

A `Value` subtype for percentage amounts, such as `5%, twenty` in “twenty percent.”

```text
5% {Percent|Numeric}
five percent {Percent|TextValue,Unit}
```

### #NumberRange

A compact numeric or time range, such as `3-4, 3-4pm`, including its implicit connector.

```text
3-4 {NumberRange|Numeric,NumberRange|Conj,NumberRange|Numeric} # 3 + to + 4
3-4pm {NumberRange|Time,NumberRange|Conj,NumberRange|Time}
```

## Dates and times

Some recognition needs [compromise-dates](../plugins/dates); those examples are marked.

### #Date

Calendar and time expressions, such as `tomorrow, Monday, 3pm`. Can overlap `Value` or `Noun`.

```text
tomorrow {Date}
May 5 {Month|Date,Numeric|Date}
```

### #Month

A `Date` subtype, also `Noun`, for months in date context, such as `May, March` in “May 5” or “March 5.”

```text
May 5 {Month,Numeric|Date}
May I go? {Modal,Pronoun,Inf}
```

### #WeekDay

A `Date` subtype, also `Noun`, for weekdays, such as `Monday, Friday`.

```text
Monday {WeekDay|Noun}
```

### #Year

A `Date` subtype for calendar years, such as `1992, 2020`; can retain numeric tags.

```text
in 2020 {Prep,Year|Numeric}
```

### #FinancialQuarter

A `Date` subtype for calendar/financial quarters, such as `Q2, Q3`. Recognition supplied by the dates plugin.

```text
Q2 2025 {FinancialQuarter,Year} # dates plugin
```

### #Holiday

A `Date` subtype, also `Noun`, for holidays, such as `Christmas, Easter`. Recognition supplied by the dates plugin.

```text
Christmas {Holiday|Noun} # dates plugin
Christmas Day {Holiday,Holiday} # dates plugin
```

### #Season

A `Date` subtype for seasons, such as `summer, winter`. Recognition supplied by the dates plugin.

```text
summer {Noun} # core parser
summer {Season|Date} # dates plugin
```

### #Time

A `Date` subtype for clock times, such as `3pm, 4:30pm`.

```text
3pm {Time}
3pm EST {Time,Timezone}
```

### #Timezone

A `Date` subtype, also `Noun`, for time zones, such as `EST, GMT, pacific standard time`.

```text
3pm EST {Time,Timezone|Abbr}
pacific standard time {Timezone,Timezone,Timezone}
```

### #Duration

A `Date` subtype, also `Noun`, for time units, such as `weeks, minutes`. In a quantity, the number keeps `Value`.

```text
two weeks {Cardinal,Duration|Plural}
20mins {Numeric,Duration} # dates plugin; 20 + mins
```

## Function words

### #Determiner

Words introducing or limiting a noun, such as `the, a, this`.

```text
the cat {Det,Noun}
this book {Det,Noun}
```

### #Preposition

Relations such as `to, of, under`; also some clause-introducing words.

```text
She walked to school. {Pronoun,Past,Prep,Noun}
The woman who called. {Det,Noun,Prep,Past}
```

### #Conjunction

Words joining terms or clauses, such as `and, but, if`. Excludes `Preposition`.

```text
cats and dogs {Plural,Conj,Plural}
If it rains {Conj|Condition,Pronoun,Pres}
```

### #QuestionWord

Question markers, such as `who, where, why, how`. Context can select another tag.

```text
Where did she go? {QuestionWord,Past,Pronoun,Inf}
I was cooking when you called. {Pronoun,Aux,Ger,Conj,Pronoun,Past}
```

### #Negative

Negation such as `not, never`; independent of the main POS hierarchy.

```text
She didn't leave. {Pronoun,Aux,Negative,Inf} # did + not
no money {Expr,Uncountable} # no is Expression here
```

### #Condition

Conditional markers, such as `if, unless`. Can overlap `Conjunction`.

```text
If it rains {Condition|Conj,Pronoun,Pres}
Unless it rains {Condition,Pronoun,Pres}
```

### #There

Existential there, as in `there is, there was`, distinguished from a location.

```text
There is a problem. {There,Copula,Det,Noun}
Go there. {Imp,Noun}
```

### #Expression

Conversational words, such as `hello, wow, yes, please`.

```text
Hello, Alice! {Expr,Person}
No. {Expr}
Please close the door. {Expr,Imp,Det,Noun}
```

## Text forms and markers

### #Abbreviation

Shortened words or abbreviations, such as `etc., Dr., Mrs.`; can overlap other tags.

```text
etc. {Abbr}
Dr. Smith {Abbr|Hon,LastName}
```

### #Acronym

Acronyms and initialisms, such as `FBI, NASA, CPUs`. Can coexist with entity and plural tags.

```text
the FBI {Det,Acronym|Org}
CPUs {Acronym|Plural}
```

### #Url

Web addresses, such as `example.com, https://example.com`; excludes `Email`.

```text
https://example.com {Url}
example.com {Url}
```

### #Email

Email addresses, such as `alice@example.com, team@example.org`; excludes `Url` and `AtMention`.

```text
alice@example.com {Email}
```

### #PhoneNumber

Telephone numbers, such as `(555) 123-4567, 555-123-4567`, possibly spanning several terms.

```text
(555) 123-4567 {PhoneNumber,PhoneNumber}
```

### #HashTag

Hashtag markers, such as `#hiking, #news`; the underlying word can retain grammatical tags.

```text
I love #hiking. {Pronoun,Inf,HashTag|Ger}
```

### #AtMention

A `Noun` subtype for @-handles, such as `@nlp, @alice`. A recognized name can retain `Person`.

```text
@nlp {AtMention|Noun}
@alice {AtMention|Person}
```

### #Emoji

Emoji characters or sequences, such as `🥳, 💋`.

```text
🥳 {Emoji}
```

### #Emoticon

Punctuation-based faces, such as `:-), :)`.

```text
:-) {Emoticon}
```

### #SlashedTerm

Retained slash-joined forms, such as `love/hate, and/or`; can keep grammatical tags.

```text
love/hate {SlashedTerm|Vb}
and/or {SlashedTerm|Conj}
```

### #Prefix

Separately tokenized prefixes, such as `co, re` in “co write” or “re write.” A prefixed word need not split or receive this tag.

```text
co write {Prefix|Vb,Inf}
She re-wrote it. {Pronoun,Past,Pronoun} # re-wrote stays one term
```

### #Hyphenated

Terms in split hyphenated expressions, such as `well-known, non-smoker`; grammatical tags remain.

```text
well-known {Hyphenated|Adv,Hyphenated|Adj}
```

### #Redacted

A marker added by `.redact()` to replacements such as `██████████` (default) or `[hidden]` (custom), not by recognizing those characters.

After `nlp('John Smith left.').redact()`:

```text
██████████ left. {Redacted|Person,Past} # after redaction
```
