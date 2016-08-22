//these are regexes applied to t.text, instead of t.normal
module.exports = [
  ['^#[a-z]+$', 'HashTag'],
  ['[a-z]s\'$', 'Possessive'],
].map(function(a) {
  return {
    reg: new RegExp(a[0]),
    tag: a[1],
    str: a[0]
  };
});
