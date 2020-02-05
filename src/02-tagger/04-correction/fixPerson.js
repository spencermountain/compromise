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
