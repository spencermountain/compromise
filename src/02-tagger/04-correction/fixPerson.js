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

  //Morgan Shlkjsfne
  doc
    .match('#Person @titleCase')
    .match('@titleCase #Noun')
    .tagSafe('Person', 'person-titlecase')

  let person = doc.if('#Person')
  if (person.found === true) {
    // ['(#Modal|#Adverb) [' + maybeVerb + ']', 0, 'Verb', 'would-mark'],
    person.match('(#Modal|#Adverb) [' + maybeVerb + ']', 0).tag('Verb', 'would-mark')
    // ['#Adverb [' + maybeAdj + ']', 0, 'Adjective', 'really-rich'],
    person.match('#Adverb [' + maybeAdj + ']', 0).tag('Adjective', 'really-rich')
    // [maybeDate + ' #ProperNoun', null, ['FirstName', 'Person'], 'june-smith'],
    // ['(in|during|on|by|before|#Date) [' + maybeDate + ']', 0, 'Date', 'in-june'],
    // [maybeDate + ' (#Date|#Value)', null, 'Date', 'june-5th'],
    //Dates: 'june' or 'may'
    let ambigDate = person.if(maybeDate)
    if (ambigDate.found === true) {
      ambigDate.match(maybeDate + ' #ProperNoun').tag(['FirstName', 'Person'], 'june-smith')
      ambigDate.match('(in|during|on|by|before|#Date) [' + maybeDate + ']', 0).tag('Date', 'in-june')
      ambigDate.match(maybeDate + ' (#Date|#Value)').tag('Date', 'june-5th')
    }
    // ['(in|near|at|from|to|#Place) [' + maybePlace + ']', 0, 'Place', 'in-paris', true],
    // ['[' + maybePlace + '] #Place', 0, 'Place', 'paris-france', true],
    //Places: paris or syndey
    let ambigPlace = person.if(maybePlace)
    if (ambigPlace.found === true) {
      ambigPlace.match('(in|near|at|from|to|#Place) [' + maybePlace + ']', 0).tagSafe('Place', 'in-paris')
      ambigPlace.match('[' + maybePlace + '] #Place', 0).tagSafe('Place', 'paris-france')
      // ambigPlace.match('[' + maybePlace + '] #Person').tagSafe('Person', 'paris-hilton')
    }
  }

  //a bunch of ambiguous first names

  let firstName = doc.if('#FirstName')
  if (firstName.found === true) {
    //John Foo
    firstName
      .match('#FirstName @titleCase @titleCase?')
      .match('#Noun+')
      .tag('Person', 'firstname-titlecase')
    //Joe K. Sombrero
    firstName
      .match('#FirstName #Acronym #Noun')
      .ifNo('#Date')
      .tag('#Person', 'n-acro-noun')
      .lastTerm()
      .tag('#LastName', 'n-acro-noun')
    // Dwayne 'the rock' Johnson
    firstName
      .match('#FirstName [#Determiner #Noun] #LastName', 0)
      .tag('#NickName', 'first-noun-last')
      .tag('#Person', 'first-noun-last')
    //john bodego's
    firstName
      .match('#FirstName (#Singular|#Possessive)')
      .ifNo('(#Date|#Pronoun|#NickName)')
      .tag('#Person', 'first-possessive')
      .lastTerm()
      .tag('#LastName', 'first-possessive')

    // Firstname x (dangerous)
    let tmp = firstName
      .match('#FirstName (#Noun|@titleCase)')
      .ifNo('^#Possessive')
      .ifNo('#ClauseEnd .')
      .ifNo('#Pronoun')
    tmp.lastTerm().tag('#LastName', 'firstname-noun')
  }

  //Jani K. Smith
  doc
    .match('(@titleCase|#Singular) #Acronym? #LastName')
    .ifNo('#Date')
    .tag('#Person', 'title-acro-noun')
    .lastTerm()
    .tag('#LastName', 'title-acro-noun')

  return doc
}
module.exports = fixPerson
