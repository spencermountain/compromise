
const parseNoun = function (chunk) {
  let obj = chunk.nouns().json()[0].noun
  obj.chunk = 'Noun'
  obj.ptr = chunk.ptrs[0]
  return obj
}

export default parseNoun