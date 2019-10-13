const exceptions = {
  he: 'his',
  she: 'hers',
  they: 'theirs',
  we: 'ours',
  i: 'mine',
  you: 'yours',

  her: 'hers',
  their: 'theirs',
  our: 'ours',
  my: 'mine',
  your: 'yours',
}

// turn "David" to "David's"
const toPossessive = function(doc) {
  let str = doc.text('normal').trim()
  // exceptions
  if (exceptions.hasOwnProperty(str)) {
    doc.replace(exceptions[str], doc)
    doc.tag('Possessive', 'toPossessive')
    return
  }
  // flanders'
  if (/s$/.test(str)) {
    str += "'"
    doc.replace(str, doc)
    doc.tag('Possessive', 'toPossessive')
    return
  }
  //normal form:
  str += "'s"
  doc.replace(str, doc)
  doc.tag('Possessive', 'toPossessive')
  return
}
module.exports = toPossessive
