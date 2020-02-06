const maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
const maybeAdj = '(misty|rusty|dusty|rich|randy)'
const maybeDate = '(april|june|may|jan|august|eve)'
const maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)'

const fixPerson = function(doc) {
  //pope francis
  doc
    .match('(lady|queen|sister) @titleCase')
    .ifNo('#Date')
    .ifNo('#Honorific')
    .tag('#FemaleName', 'lady-titlecase')
  doc
    .match('(king|pope|father) @titleCase')
    .ifNo('#Date')
    .tag('#MaleName', 'poe')

  // let person = doc.if('#Person')
  // if (person.found === true) {
  //   person.match('(#Modal|#Adverb) [' + maybeVerb + ']', 0).tag('Verb', 'would-mark')
  //   person.match('#Adverb [' + maybeAdj + ']', 0).tag('Adjective', 'really-rich')
  //   //Dates: 'june' or 'may'
  //   let ambigDate = person.if(maybeDate)
  //   if (ambigDate.found === true) {
  //     ambigDate.match(maybeDate + ' #ProperNoun').tag(['FirstName', 'Person'], 'june-smith')
  //     ambigDate.match('(in|during|on|by|before|#Date) [' + maybeDate + ']', 0).tag('Date', 'in-june')
  //     ambigDate.match(maybeDate + ' (#Date|#Value)').tag('Date', 'june-5th')
  //   }
  //   //Places: paris or syndey
  //   let ambigPlace = person.if(maybePlace)
  //   if (ambigPlace.found === true) {
  //     ambigPlace.match('(in|near|at|from|to|#Place) [' + maybePlace + ']', 0).tagSafe('Place', 'in-paris')
  //     ambigPlace.match('[' + maybePlace + '] #Place', 0).tagSafe('Place', 'paris-france')
  //   }
  // }

  //a bunch of ambiguous first names

  let firstName = doc.if('#FirstName')
  if (firstName.found === true) {
    //Joe K. Sombrero
    firstName
      .match('#FirstName #Acronym #Noun')
      .ifNo('#Date')
      .tag('#Person', 'n-acro-noun')
      .lastTerm()
      .tag('#LastName', 'n-acro-noun')

    // Firstname x (dangerous)
    let tmp = firstName
      .match('#FirstName (#Noun|@titleCase)')
      .ifNo('^#Possessive')
      .ifNo('#ClauseEnd .')
      .ifNo('#Pronoun')
    tmp.lastTerm().tag('#LastName', 'firstname-noun')
  }

  return doc
}
module.exports = fixPerson
