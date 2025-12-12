
const parseNoun = function (chunk) {
  const root = chunk.match('#Noun').not('#Demonym').text('root')
  const obj = chunk.nouns().json()[0].noun
  obj.chunk = 'Noun'
  obj.ptr = chunk.ptrs[0]
  obj.root = root
  return obj
}

export default parseNoun