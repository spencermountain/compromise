module.exports = [
  ['^#[a-z]+$', 'HashTag'],
  ['[a-z]s\'$', 'Possessive'],
].map(function(a) {
  return {
    reg: new RegExp(a[0]),
    pos: a[1],
    str: a[0]
  };
});
