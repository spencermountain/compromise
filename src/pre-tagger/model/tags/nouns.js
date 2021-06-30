const entity = ['Person', 'Place', 'Organization']
export const Noun = {
  not: ['Verb', 'Adjective', 'Adverb'],
}
export const Singular = {
  parents: 'Noun',
  not: 'Plural',
}
export const ProperNoun = {
  parents: 'Noun',
}
export const Person = {
  parents: ['ProperNoun', 'Singular'],
  not: ['Place', 'Organization', 'Date'],
}
export const FirstName = {
  parents: 'Person',
}
export const MaleName = {
  parents: 'FirstName',
  not: ['FemaleName', 'LastName'],
}
export const FemaleName = {
  parents: 'FirstName',
  not: ['MaleName', 'LastName'],
}
export const LastName = {
  parents: 'Person',
  not: ['FirstName'],
}
export const NickName = {
  parents: 'Person',
  not: ['FirstName', 'LastName'],
}
export const Honorific = {
  parents: 'Noun',
  not: ['FirstName', 'LastName', 'Value'],
}
export const Place = {
  parents: 'Singular',
  not: ['Person', 'Organization'],
}
export const Country = {
  parents: ['Place', 'ProperNoun'],
  not: ['City'],
}
export const City = {
  parents: ['Place', 'ProperNoun'],
  not: ['Country'],
}
export const Region = {
  parents: ['Place', 'ProperNoun'],
}
export const Address = {
  parents: 'Place',
}
export const Organization = {
  parents: ['Singular', 'ProperNoun'],
  not: ['Person', 'Place'],
}
export const SportsTeam = {
  parents: 'Organization',
}
export const School = {
  parents: 'Organization',
}
export const Company = {
  parents: 'Organization',
}
export const Plural = {
  parents: 'Noun',
  not: ['Singular'],
}
export const Uncountable = {
  parents: 'Noun',
}
export const Pronoun = {
  parents: 'Noun',
  not: entity,
}
export const Actor = {
  parents: 'Noun',
  not: entity,
}
export const Activity = {
  parents: 'Noun',
  not: ['Person', 'Place'],
}
export const Unit = {
  parents: 'Noun',
  not: entity,
}
export const Demonym = {
  parents: ['Noun', 'ProperNoun'],
  not: entity,
}
export const Possessive = {
  parents: 'Noun',
  // not: 'Pronoun',
}
export default {
  Noun,
  Singular,
  ProperNoun,
  Person,
  FirstName,
  MaleName,
  FemaleName,
  LastName,
  NickName,
  Honorific,
  Place,
  Country,
  City,
  Region,
  Address,
  Organization,
  SportsTeam,
  School,
  Company,
  Plural,
  Uncountable,
  Pronoun,
  Actor,
  Activity,
  Unit,
  Demonym,
  Possessive,
}
