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
};

// turn "David" to "David's"
const toPossessive = function(t) {
  t.tag('Possessive', 'toPossessive');
  // exceptions
  if (exceptions.hasOwnProperty(t.normal)) {
    t.text = exceptions[t.normal];
    return t;
  }
  // flanders'
  if (/s$/.test(t.normal)) {
    t.text += '\'';
    return t;
  }
  //normal form:
  t.text += '\'s';
  return t;
};
module.exports = toPossessive;
