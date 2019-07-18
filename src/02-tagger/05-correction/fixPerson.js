const fixPerson = function(doc) {
  // 'john E rockefeller'
  doc.match('#FirstName /^[^aiurck]$/').tag(['Acronym', 'Person'], 'john-e')

  //Doctor john smith jr
  doc.match('#Honorific #Person').tag('Person', 'honorific-person')
  doc.match('#Person (jr|sr|md)').tag('Person', 'person-honorific')
  return doc
}
module.exports = fixPerson
