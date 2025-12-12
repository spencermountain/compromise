import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/person-match] '

const arr = [
  // === people ==
  ['jamie', '#Person'],
  ['Spencer Kelly is in Canada', '#Person #Person #Copula #Preposition #Place'],
  ['John bathe', '#Person #Verb'],
  ['John, John', '#Person #Person'],
  ['John, you', '#FirstName #Pronoun'],
  ['John you', '#MaleName #Pronoun'],
  ['you John you', '#Pronoun #Person #Pronoun'],
  ['boyfriend to Jane', '#Noun #Conjunction #Person'],
  ['boyfriend of Jane', '#Noun . #Person'],

  // famous people names
  ['john stewart', '#MaleName #LastName'],
  ['martha stewart', '#FemaleName #LastName'],
  ['George Bush', '#MaleName #LastName'],
  ['Hillary Clinton', '#FemaleName #LastName'],
  ['Hillary Rodham Clinton', '#FemaleName #Person #Person'],
  ['Margaret Thatcher', '#FemaleName #LastName'],
  ['Messiaen', '#Person'],
  ['Mozart', '#LastName'],
  ['Nixon', '#LastName'],
  ['Pope John Paul II', '#Person+'],
  ['Richard Nixon', '#MaleName #LastName'],
  ['Ronald Reagan', '#MaleName #LastName'],
  ['Saddam Hussain', '#Person+'],
  ['Shostakovich', '#LastName'],
  ['Vivaldi', '#LastName'],
  ['van Gogh', '#Person+'],
  ['Carl Marx', '#MaleName #LastName'],
  ['Lenin', '#LastName'],
  ['Stalin', '#LastName'],
  ['George W. Bush', '#MaleName #Person #LastName'],
  ['Mitt Romney', '#Person+'],
  ['Barack Obama', '#Person+'],
  ['Obama', '#LastName'],
  ['Lady Gaga', '#Person+'],
  ['Kanye West', '#Person+'],
  ['Abu Hamza', '#MaleName #Person'],
  ['Abu Hamza Al - Masri', '#MaleName #Person+'],
  ['Osama bin Laden', '#Person+'],
  ['Mubarek', '#Person'],
  ['Muhammad Ali', '#MaleName #LastName'],
  ['Jennifer Aniston', '#FemaleName #LastName'],
  ['Tyra Banks', '#Person+'],
  ['Mario Batali', '#MaleName #LastName'],
  ['David Beckham', '#MaleName #LastName'],
  ['Halle Berry', '#Person+'],
  ['Tom Brady', '#MaleName #LastName'],
  ['Matthew Broderick', '#MaleName #LastName'],
  ['Mel Brooks', '#Person+'],
  ['Dan Brown', '#MaleName #LastName'],
  ['Jerry Bruckheimer', '#MaleName #LastName'],
  ['Kobe Bryant', '#Person+'],
  ['Gisele Bundchen', '#FemaleName #LastName'],
  ['Jim Carrey', '#MaleName #LastName'],
  ['Dave Chappelle', '#MaleName #LastName'],
  ['Sean Combs', '#MaleName #LastName'],
  ['Katie Couric', '#FemaleName #LastName'],
  ['Simon Cowell', '#MaleName #LastName'],
  ['Tom Cruise', '#MaleName #LastName'],
  ['Johnny Depp', '#MaleName #LastName'],
  ['Cameron Diaz', '#FirstName #LastName'],
  ['Leonardo DiCaprio', '#MaleName #LastName'],
  ['Celine Dion', '#FemaleName #LastName'],
  ['Jodie Foster', '#FemaleName #LastName'],
  ['John Grisham', '#MaleName #LastName'],
  ['Tom Hanks', '#MaleName #LastName'],
  ['Paris Hilton', '#Person+'],
  ['Eric Idle', '#MaleName #LastName'],
  ['Mike Nichols', '#MaleName #LastName'],
  ['John Smith', '#Person+'],
  ['dr. John Smith', '#Honorific #Person+'],
  ['John Smith jr.', '#Person+'],
  ['John Jacob Smith', '#FirstName #Person+'],
  ['Jani K. Smith', '#FirstName #Acronym #LastName'],
  [`charity chapman`, `#Person #Person`],
  [`darwin said`, `#Person #Verb`],
  [`victoria learned`, `#Person #Verb`],
  [`charity said`, '#Person #Verb'],
  [`jordan said`, '#Person #Verb'],
  [`april learned`, '#Person #Verb'],
  [`john k. johnson`, '#Person #Person #Person'],
  [`i met April O'neil`, '#Pronoun #PastTense #Person #Person'],
  // Verbs
  [`bob in the water`, '#Verb in the #Noun'],
  // [`may is`, '#Person is'],
]
test('match:', function (t) {
  arr.forEach(function (a) {
    const [str, match] = a
    const doc = nlp(str).compute('tagRank')
    const tags = doc.json()[0].terms.map(term => term.tagRank[0])
    const m = doc.match(match)
    const msg = `'${(str + "' ").padEnd(20, ' ')}  - '${tags.join(', ')}'`
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})
