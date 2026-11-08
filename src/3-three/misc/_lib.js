import eachTerm from '../../1-one/tokenize/compute/_lib.js'

// remove a regex match from the text of each term
const stripper = reg => view => {
  eachTerm(view.docs, term => {
    term.text = term.text.replace(reg, '')
    term.normal = term.normal.replace(reg, '')
  })
  return view
}

export default stripper
