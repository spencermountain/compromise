// '[place] tea bags in hot water'
const imperative = function (terms, world) {
  const setTag = world.methods.one.setTag
  if (terms.length > 4 && terms[0].switch === 'Noun|Verb') {
    let hasVerb = terms.slice(0, 5).some(t => t.tags.has('Verb'))
    if (hasVerb === false) {
      setTag([terms[0]], 'Imperative', world, null, '3-[imperative]')
    }
  }
}
export default imperative