const anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value', 'QuestionWord']
export const Adjective = {
  not: ['Noun', 'Verb', 'Adverb', 'Value'],
}
export const Comparable = {
  parents: ['Adjective'],
}
export const Comparative = {
  parents: ['Adjective'],
}
export const Superlative = {
  parents: ['Adjective'],
  not: ['Comparative'],
}
export const NumberRange = {
  //parents: ['Contraction'],
}
export const Adverb = {
  not: ['Noun', 'Verb', 'Adjective', 'Value'],
}
export const Date = {
  not: ['Verb', 'Adverb', 'Preposition', 'Adjective'],
}
export const Month = {
  parents: ['Date', 'Singular'],
  not: ['Year', 'WeekDay', 'Time'],
}
export const WeekDay = {
  parents: ['Date', 'Noun'],
}
export const Timezone = {
  parents: ['Date', 'Noun'],
  not: ['Adjective', 'ProperNoun'],
}
export const Time = {
  parents: ['Date'],
  not: ['AtMention'],
}
export const Determiner = {
  not: anything,
}
export const Conjunction = {
  not: anything,
}
export const Preposition = {
  not: anything,
}
export const QuestionWord = {
  not: ['Determiner'],
}
export const Currency = {
  parents: ['Noun'],
}
export const Expression = {
  not: ['Noun', 'Adjective', 'Verb', 'Adverb'],
}
export const Abbreviation = {}
export const Url = {
  not: ['HashTag', 'PhoneNumber', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email'],
}
export const PhoneNumber = {
  not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email'],
}
export const HashTag = {}
export const AtMention = {
  parents: ['Noun'],
  not: ['HashTag', 'Verb', 'Adjective', 'Value', 'Email'],
}
export const Emoji = {
  not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
}
export const Emoticon = {
  not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
}
export const Email = {
  not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
}
export const Acronym = {
  not: ['Plural', 'RomanNumeral'],
}
export const Negative = {
  not: ['Noun', 'Adjective', 'Value'],
}
export const Condition = {
  not: ['Verb', 'Adjective', 'Noun', 'Value'],
}
export default {
  Adjective,
  Comparable,
  Comparative,
  Superlative,
  NumberRange,
  Adverb,
  Date,
  Month,
  WeekDay,
  Timezone,
  Time,
  Determiner,
  Conjunction,
  Preposition,
  QuestionWord,
  Currency,
  Expression,
  Abbreviation,
  Url,
  PhoneNumber,
  HashTag,
  AtMention,
  Emoji,
  Emoticon,
  Email,
  Acronym,
  Negative,
  Condition,
}
