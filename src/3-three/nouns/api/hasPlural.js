
const hasPlural = function (root) {
  if (root.has('^(#Uncountable|#Prop|#Place|#Pron|#Acronym)+$')) {
    return false
  }
  return true
}
export default hasPlural