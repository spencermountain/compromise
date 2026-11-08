// Present an attribute as a text source without adding nodes to the HAST tree.
const attributeSource = (node, property, sources) => {
  if (!sources.has(node)) {
    sources.set(node, new Map())
  }
  const attributes = sources.get(node)
  if (!attributes.has(property)) {
    attributes.set(property, {
      type: 'attribute',
      node,
      property,
      get value() {
        return node.properties[property]
      },
      set value(text) {
        node.properties[property] = text
      },
    })
  }
  return attributes.get(property)
}

export default attributeSource
