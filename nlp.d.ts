// Type Definitons for nlp_compromise
// Project: https://github.com/nlp-compromise/nlp_compromise
// Definitions by:
// 2426021684 and Eshan Singh <eshansingh@gmail.com>
// Found a bug? Create an issue on nlp-compromise/nlp_compromise and mention @2426021684 and @eshansingh.

export function plugin(plugin: any): void
export function lexicon(): Lexicon
export function text(string: string, options?: any): Text
export function sentence(string: string): Sentence
export function statement(string: string, options?: any): Statement
export function question(string: string): Question
export function term(string: string): Term
export function verb(string: string): Verb
export function abjective(string: string): Abjective
export function noun(string: string): Noun
export function value(string: string): Value
export function person(string: string): Person
export function date(string: string): _Date
export function place(string: string): Place
export function organization(string: string): Organization

export type VerbTense = "present" | "past" | "future"
export type QuestionType = "how" | "when" | "where" | "who" | "why" | "what" | "which" | "number" | "yesNo"
export type SentenceTerminator = "." | "?" | "!"
export type SentenceType = "declarative" | "interrogative" | "exclamative"
export type Gender = "Male" | "Female"
export type ValueMeasurement = "Temperature" | "Volume" | "Distance" | "Weight" | "Area" | "Frequency" | "Speed" | "Data" | "Energy" | "Time" | "Money"

export type PersonPronoun = "he" | "she" | "they"
export type NounPronoun = "it" | "they" | "he" | "she"

export type PersonArticle = "he" | "she" | "they"
export type NounArticle = "a" | "an" | "he" | "she" | "they"

export type DateTag = "Date"
export type PersonTag = "Person"
export type ValueTag = "Value"
export type PlaceTag = "Place"
export type OrganizationTag = "Organization"
export type NounTag = "Pronoun" | "Acronym" | "Plural" | "Noun" | "Possessive" | "Actor" | "Condition" | DateTag | PersonTag | ValueTag | PlaceTag | OrganizationTag
export type VerbTag = "Verb" | "PastTense" | "FutureTense" | "Infinitive" | "PresentTense" | "Gerund" | "Verb" | "Copula" | "Modal"
export type AbjectiveTag = "Adjective" | "Comparative" | "Superlative"
export type AdverbTag = "Adverb"
export type OtherTag = "Possessive" | "Expression" |  "Determiner" | "Conjunction" | "Preposition"
export type TermTag = "?" | OtherTag | NounTag | VerbTag | AbjectiveTag | AdverbTag

export type NounForm = {
  singular: string
  plural: string
}

export type VerbForm = {
  infinitive: string,
  present: string,
  past: string,
  gerund: string
}

export type AbjectiveForm = {
  comparative: string,
  superlative: string,
  adverb: string,
  noun: string
}

export type AdverbForm = {
  abjective: string
}

export interface POS {
  [key: string]: boolean

  Acronym: boolean
  Plural: boolean
  Noun: boolean
  Value: boolean
  Place: boolean
  Organization: boolean

  Currency: boolean
  Actor: boolean
  Date: boolean
  Condition: boolean
  Person: boolean

  Possessive: boolean
  Pronoun: boolean
  Expression: boolean //interjection
  Determiner: boolean
  Conjunction: boolean
  Preposition: boolean

  //verbs
  Verb: boolean
  PastTense: boolean
  FutureTense: boolean
  Infinitive: boolean
  PresentTense: boolean
  Gerund: boolean
  Copula: boolean
  Modal: boolean
  Adjective: boolean
  Comparative: boolean
  Superlative: boolean
  Adverb: boolean
}

export interface Lexicon {
  [key: string]: TermTag
}

export interface Result {
  terms: Term[]
  match(string: string, options?: any): Result[]
  normal(): string
  replace(words: string[]): Result
  text(): string
}

export interface Text {
  to_past(): Sentence[]
  to_present(): Sentence[]
  to_future(): Sentence[]
  negate(): Sentence[]
  tags(): TermTag[][]
  to_past(): Text
  to_present(): Text
  to_future(): Text
  negate(): Text
  tags(): TermTag[][]
  terms(): Term[]
  normal(): string
  contractions: Contractions<this>
  root(): string
  match(str: string, options?: any): Result[]
  replace(str: string, replacement: string, options?: any): this
  people(): Person[]
  places(): Place[]
  organizations(): Organization[]
  dates(): _Date[]
  values(): Value[]
  topics(): Topic[]
  nouns(): Noun[]
  adjectives(): Abjective[]
  verbs(): Verb[]
  adverbs(): Adverb[]
  text(): string
  sentences: Sentence[]
  raw_text: string
}

export interface Contractions<T> {
  expand: () => T
  contract: () => T
}

export interface Sentence {
  sentence_type(): SentenceType
  terminator(): SentenceTerminator
  to_past(): Sentence
  to_present(): Sentence
  to_future(): Sentence
  negate(): this
  tags(): Term[]
  normal(): string
  text(): string
  contractions: Contractions<this>
  root(): string
  terms: Term[]
  addBefore(i: number, string: string): void
  addAfter(i: number, string: string): void
  match(match: string, options?: any): Result[]
  replace(match: string, replacement: string, options?: any): this
  tag(): TermTag
  is_passive(): boolean
  people(): Person[]
  places(): Place[]
  dates(): _Date[]
  organization(): Organization[]
  values(): Value[]
  nouns(): Noun[]
  adjectives(): Abjective[]
  verbs(): Verb[]
  adverbs(): Adverb[]
  strip_conditions(): this
  topics: Topic[]
  str: string
}

export interface Question extends Sentence {
  from(): QuestionType
}

export interface Statement extends Sentence {

}

export interface Term {
  is_capital(): boolean
  is_acronym(): boolean
  normalize(): string
  changeTo(replacement: string): void
  root(): string
  expansion: string
  normal: string
  reason: string
  pos: POS
  tag: TermTag
  whitespace: {
    preceding: string,
    trailing: string
  }
  has_abbreviation(): boolean
  has_comma(): boolean
  is_acronym(): boolean
  is_capital(): boolean
  is_word(): boolean
  match(match: string, options?: any): boolean
  rebuild(): void
  forms(): NounForm|VerbForm|AbjectiveForm|AdverbForm|AbjectiveForm
  text: string
}

export interface Verb extends Term {
  to_past(): string
  to_present(): string
  to_future(): string
  conjugate(): VerbForm
  conjugation(): VerbTag
  negate(): Verb
  isNegative(): boolean
  tag: VerbTag
  tense(): VerbTense
  forms(): VerbForm
  to_adjective(): string
}

export interface Abjective extends Term {
  to_comparative(): string
  to_superlative(): string
  to_noun(): string
  to_adverb(): string
  conjugate(): AbjectiveForm
  tag: AbjectiveTag
  forms(): AbjectiveForm
}

export interface Adverb extends Term {
  to_adjective(): string
  tag: AdverbTag
  forms(): AdverbForm
}

export interface Noun extends Term {
  article(): NounArticle
  is_uncountable(): boolean
  pluralize(): string
  singularize(): string
  is_plural(): boolean
  is_person(): boolean
  is_place(): boolean
  is_organization(): boolean
  is_date(): boolean
  is_value(): boolean
  pronoun(): NounPronoun
  tag: NounTag
  forms(): NounForm
}

export interface Value extends Noun {
  number: number
  unit: string
  unit_name: string
  measurement: ValueMeasurement
  of_what: string
  is_number(string: string): boolean
  is_ordinal(): boolean
  to_ordinal(number: number): string
  is_unit(string: string): boolean
  parse(): void
  tag: ValueTag
  textual(): string
}

export interface Person extends Noun {
  gender(): Gender
  honourific: string
  firstName: string
  middleName: string
  lastName: string
  root(): string
  parse(): void
  pronoun(): PersonPronoun
  isPronoun(): boolean
  tag: PersonTag
}

export interface _Date extends Noun {
  data: {
    day: number
    month: number
    year: number
  }
  date(): Date
  is_date(): boolean
  tag: DateTag
}

export interface Place extends Noun {
  city: string
  region: string
  country: string
  title: string
  tag: PlaceTag
}

export interface Organization extends Noun {
  tag: OrganizationTag
}

export interface Topic {
  count: number
  text: string
}
