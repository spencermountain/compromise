const keep = { tags: true }

const toSingular = function (m, parsed) {
  // already singular?
  if (parsed.isPlural === false) {
    return m
  }
  const { methods, model } = m.world
  const { nounToSingular } = methods.two.transform
  // inflect the root noun
  let str = parsed.root.text('normal')
  let single = nounToSingular(str, model)
  m.replace(parsed.root, single, keep).tag('Singular', 'toPlural')

  // should we change the determiner/article?

  return m
}
export default toSingular
