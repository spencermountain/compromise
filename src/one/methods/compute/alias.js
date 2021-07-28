const hasSlash = /\//
// const hasSlash = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/
const hasApostrophe = /['’]s$/

const addAliases = function (term, model) {
  let str = term.normal || term.text
  // lookup known aliases like '&'
  if (model.aliases.hasOwnProperty(str)) {
    term.alias = term.alias || []
    term.alias.push(model.aliases[str])
  }
  // support slashes as aliases
  if (hasSlash.test(str)) {
    str.split(hasSlash).forEach(word => {
      word = word.trim()
      if (word !== '') {
        term.alias = term.alias || []
        term.alias.push(word)
      }
    })
  }
  // aliases for apostrophe-s
  if (hasApostrophe.test(str)) {
    let main = str.replace(hasApostrophe, '').trim()
    term.alias = term.alias || []
    term.alias.push(main)
  }
  return term
}
export default addAliases
