const createCache = function (document) {
  let cache = document.map(terms => {
    let stuff = new Set()
    terms.forEach(term => {
      // add words
      if (term.normal !== '') {
        stuff.add(term.normal)
      }
      // cache switch-status - '%Noun|Verb%'
      if (term.switch) {
        stuff.add(`%${term.switch}%`)
      }
      // cache implicit words, too
      if (term.implicit) {
        stuff.add(term.implicit)
      }
      if (term.machine) {
        stuff.add(term.machine)
      }
      if (term.root) {
        stuff.add(term.root)
      }
      // cache slashes words, etc
      if (term.alias) {
        term.alias.forEach(str => stuff.add(str))
      }
      let tags = Array.from(term.tags)
      for (let t = 0; t < tags.length; t += 1) {
        stuff.add('#' + tags[t])
      }
    })
    return stuff
  })
  return cache
}
export default createCache
