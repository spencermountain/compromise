// remove a regex match from the text of each term
const stripper = reg => view => {
  view.docs.forEach(terms => {
    terms.forEach(term => {
      term.text = term.text.replace(reg, '')
      term.normal = term.normal.replace(reg, '')
    })
  })
  return view
}

export default stripper
