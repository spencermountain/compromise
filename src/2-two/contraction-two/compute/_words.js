import { toSet } from '../../_lib.js'
// word lists shared by the 's steps - the preTagger's 00-possessive.js and ./isPossessive.js
// (the list of steps is in ./index.js)

// never possessive - there's, here's, he's
const never = toSet('that there let here everywhere he she it')
// these only follow 'is' or 'has' - the man in black's gonna
const afterVerb = toSet('gonna gotta got been')
// "Kathy's and Mary's", "a master's of science"
const joiners = toSet('and or nor but & of per')
// an object can't be 'is' - "in sunday's", "of Enron's", "at Moe's"
const beforePossessive = toSet('in by for of at with to on from about into')

// a decade, like the 1990's or the 90's - 2nd-pass/05-year.js has already kept 2020's as a year
const decade = /^[0-9]{1,3}0['’]s$/
const isDecade = term => !term.tags.has('Year') && decade.test(term.normal)

export { never, afterVerb, joiners, beforePossessive, isDecade }
