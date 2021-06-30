export const Verb = {
  not: ['Noun', 'Adjective', 'Adverb', 'Value', 'Expression'],
}
export const PresentTense = {
  parents: 'Verb',
  not: ['PastTense', 'FutureTense'],
}
export const Infinitive = {
  parents: 'PresentTense',
  not: ['PastTense', 'Gerund'],
}
export const Imperative = {
  parents: 'Infinitive',
}
export const Gerund = {
  parents: 'PresentTense',
  not: ['PastTense', 'Copula', 'FutureTense'],
}
export const PastTense = {
  parents: 'Verb',
  not: ['FutureTense'],
}
export const FutureTense = {
  parents: 'Verb',
}
export const Copula = {
  parents: 'Verb',
}
export const Modal = {
  parents: 'Verb',
  not: ['Infinitive'],
}
export const PerfectTense = {
  parents: 'Verb',
  not: 'Gerund',
}
export const Pluperfect = {
  parents: 'Verb',
}
export const Participle = {
  parents: 'PastTense',
}
export const PhrasalVerb = {
  parents: 'Verb',
}
export const Particle = {
  parents: 'PhrasalVerb',
}
export const Auxiliary = {
  not: ['Noun', 'Adjective', 'Value'],
}
export default {
  Verb,
  PresentTense,
  Infinitive,
  Imperative,
  Gerund,
  PastTense,
  FutureTense,
  Copula,
  Modal,
  PerfectTense,
  Pluperfect,
  Participle,
  PhrasalVerb,
  Particle,
  Auxiliary,
}
