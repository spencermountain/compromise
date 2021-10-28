const find = function (doc) {
  let m = doc.match('#Honorific+? #Person+')
  return m
}
export default find
