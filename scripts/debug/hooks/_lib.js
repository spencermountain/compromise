import * as cli from '../../../src/API/_color.js'

const colorSpec = doc => {
  const tagSet = doc.model.one.tagSet
  return doc.docs.map((terms, i) => {
    const plain = terms.map(t => t.pre + t.text + t.post).join('').trim()
    const text = terms.map(term => {
      const tag = [...term.tags][0]
      const color = tag ? tagSet[tag]?.color || 'blue' : 'dim'
      return term.pre + (term.text ? cli[color](term.text) : '') + term.post
    }).join('').trim()
    const spec = doc.update([[i]]).out('spec')
    return text + cli.dim(spec.slice(plain.length))
  }).join('\n')
}

export default colorSpec
