const fixPerson = function(doc) {
  //methods requiring a titlecase
  let title = doc.if('@titleCase')
  if (title.found === true) {
    //Foo U Ford
    title
      .match('[#ProperNoun] #Person', 0)
      .notIf('@hasComma')
      .tagSafe('Person', 'proper-person')

    //pope francis
    title
      .match('(lady|queen|sister) @titleCase')
      .ifNo('#Date')
      .ifNo('#Honorific')
      .tag('#FemaleName', 'lady-titlecase')
    title
      .match('(king|pope|father) @titleCase')
      .ifNo('#Date')
      .tag('#MaleName', 'poe')
  }

  let person = doc.if('#Person')
  if (person.found === true) {
    //Morgan Shlkjsfne
    title
      .match('#Person @titleCase')
      .match('@titleCase #Noun')
      .tagSafe('Person', 'person-titlecase')
    //a bunch of ambiguous first names

    let firstName = person.if('#FirstName')
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

    let lastName = person.if('#LastName')
    if (lastName.found === true) {
      // x Lastname
      lastName
        .match('[#Noun] #LastName', 0)
        .canBe('#FirstName')
        .tag('#FirstName', 'noun-lastname')

      //Jani K. Smith
      lastName
        .match('(@titleCase|#Singular) #Acronym? #LastName')
        .ifNo('#Date')
        .tag('#Person', 'title-acro-noun')
        .lastTerm()
        .tag('#LastName', 'title-acro-noun')
    }
  }

  return doc
}
module.exports = fixPerson
