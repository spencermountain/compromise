// come on
const reason='3-[first-word]'
  // [well]..
  // [so]
  // [okay]
  // [now]
  // shoot,
  // say,
  // like, hello
const expressions = {
  beforeAdj: new Set(['well', 'so', 'okay', 'now']),
  withComma: new Set(['shoot', 'say', 'like']),
}

const firstWord = function (terms, world) {
  const setTag = world.methods.one.setTag
  const str = terms[0].normal
  // "[well] i lose"
  if (expressions.beforeAdj.has(str)) {
    if (terms[1] && !terms[1].tags.has('Adjective')) {
      setTag([terms[0]], 'Expression', world, null, reason)
    }
    if (terms.length === 1) {
      setTag([terms[0]], 'Expression', world, null, reason)
    }
  }
  // "[say], do you"
  if (expressions.withComma.has(str)) {
    if (/,/.test(terms[0].post)) {
      setTag([terms[0]], 'Expression', world, null, reason)
    }
  }
}
export default firstWord
