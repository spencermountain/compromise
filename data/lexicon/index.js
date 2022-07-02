//directory of files to pack with `node scripts/pack.js`
//they are stored in compressed form
import lex from './misc.js'

import demonyms from './nouns/demonyms.js'
import organizations from './nouns/organizations.js'
import possessives from './nouns/possessives.js'
import professions from './nouns/professions.js'
import pronouns from './nouns/pronouns.js'
import singulars from './nouns/singulars.js'
import sportsTeams from './nouns/sportsTeams.js'
import uncountables from './nouns/uncountables.js'
import properNouns from './nouns/properNouns.js'

import cities from './places/cities.js'
import countries from './places/countries.js'
import femaleNames from './people/femaleNames.js'
import firstnames from './people/firstnames.js'
import honorifics from './people/honorifics.js'
import lastnames from './people/lastnames.js'
import maleNames from './people/maleNames.js'
import people from './people/people.js'
import places from './places/places.js'
import regions from './places/regions.js'

import dates from './dates/dates.js'
import months from './dates/months.js'
import weekdays from './dates/weekdays.js'
import durations from './dates/durations.js'

import infinitives from './verbs/infinitives.js'
import modals from './verbs/modals.js'
import phrasals from './verbs/phrasals.js'
import verbs from './verbs/verbs.js'
import participles from './verbs/participles.js'

import adjectives from './adjectives/adjectives.js'
import comparables from './adjectives/comparables.js'

import units from './numbers/units.js'
import ordinals from './numbers/ordinals.js'
import cardinals from './numbers/cardinals.js'
import multiples from './numbers/multiples.js'

import adverbs from './misc/adverbs.js'
import conjunctions from './misc/conjunctions.js'
import currencies from './misc/currencies.js'
import determiners from './misc/determiners.js'
import expressions from './misc/expressions.js'
import prepositions from './misc/prepositions.js'


import adjGerund from './switches/adj-gerund.js'
import adjNoun from './switches/adj-noun.js'
import adjPast from './switches/adj-past.js'
import adjPresent from './switches/adj-present.js'
import nounVerb from './switches/noun-verb.js'
import nounGerund from './switches/noun-gerund.js'
import personNoun from './switches/person-noun.js'
import personDate from './switches/person-date.js'
import personVerb from './switches/person-verb.js'
import personPlace from './switches/person-place.js'
import unitNoun from './switches/unit-noun.js'

//add-in the generic, flat word-lists
const data = [
  // nouns
  [demonyms, 'Demonym'],
  [organizations, 'Organization'],
  [possessives, 'Possessive'],
  [professions, 'Actor'],
  [pronouns, 'Pronoun'],
  [singulars, 'Singular'],
  [sportsTeams, 'SportsTeam'],
  [uncountables, 'Uncountable'],
  [properNouns, 'ProperNoun'],

  // numbers
  [ordinals, 'Ordinal'],
  [cardinals, 'Cardinal'],
  [units, 'Unit'],
  [multiples, 'Multiple'],

  [cities, 'City'],
  [countries, 'Country'],
  [places, 'Place'],
  [regions, 'Region'],

  [weekdays, 'WeekDay'],
  [months, 'Month'],
  [dates, 'Date'],
  [durations, 'Duration'],

  [femaleNames, 'FemaleName'],
  [firstnames, 'FirstName'],
  [honorifics, 'Honorific'],
  [lastnames, 'LastName'],
  [maleNames, 'MaleName'],
  [people, 'Person'],

  [adjectives, 'Adjective'],
  [adverbs, 'Adverb'],
  [conjunctions, 'Conjunction'],
  [currencies, 'Currency'],
  [determiners, 'Determiner'],
  [expressions, 'Expression'],
  [prepositions, 'Preposition'],
  [comparables, 'Comparable'],

  [infinitives, 'Infinitive'],//3kb
  [modals, 'Modal'],
  [verbs, 'Verb'],
  [participles, 'Participle'],
  [phrasals, 'PhrasalVerb'], //5kb

  // switches
  [adjGerund, 'Adj|Gerund'],
  [adjNoun, 'Adj|Noun'],
  [adjPast, 'Adj|Past'],
  [adjPresent, 'Adj|Present'],
  [nounVerb, 'Noun|Verb'],
  [nounGerund, 'Noun|Gerund'],
  [personNoun, 'Person|Noun'],
  [personPlace, 'Person|Place'],
  [personDate, 'Person|Date'],
  [personVerb, 'Person|Verb'],
  [unitNoun, 'Unit|Noun'],
]
for (let i = 0; i < data.length; i++) {
  const list = data[i][0]
  for (let o = 0; o < list.length; o++) {
    // log duplicates
    // if (lex[list[o]]) {
    //   console.log(list[o] + '  ' + lex[list[o]] + ' ' + data[i][1])
    // }
    lex[list[o]] = data[i][1]
  }
}

export default lex
// console.log(Object.keys(lex).length);
// console.log(lex[`size`])
