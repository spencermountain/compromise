import regexes from './regexes.js'

const reason = 'european-number'
// leave these to the language's own tagger - '12.05.2020', '15.30', '555-1234'
const skip = ['Date', 'PhoneNumber', 'NumberRange']

// tag numbers written in digits, from their raw text - '1.234,56', '3,5%', '5,30€'
const tagNumbers = function (view) {
  const { world, model, methods } = view
  const regs = regexes(model.two.europeanNumbers)
  const setTag = methods.one.setTag
  view.docs.forEach(terms => {
    terms.forEach(term => {
      if (!/[0-9]/.test(term.text) || skip.some(tag => term.tags.has(tag))) {
        return
      }
      const found = regs.find(a => a[0].test(term.text))
      if (found) {
        setTag([term], found[1], world, false, reason)
      }
    })
  })
}
export default tagNumbers
