//these are regexes applied to t.text, instead of t.normal
module.exports = [

  ['^#[a-z]+$', 'HashTag'],
  ['[a-z]s\'$', 'Possessive'],
  ['^[0-9,\.]+$', 'Numeric'], //like 5
].map(function(a) {
  return {
    reg: new RegExp(a[0]),
    tag: a[1],
    str: a[0]
  };
});
