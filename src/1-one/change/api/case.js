// uppercase the first letter - todo: support unicode?
const titleCase = str => str.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase())

// change the text of every term
const mapText = function (view, fn) {
  view.termList().forEach(t => {
    t.text = fn(t.text)
  })
  return view
}

export default {
  /** */
  toLowerCase: function () {
    return mapText(this, str => str.toLowerCase())
  },
  /** */
  toUpperCase: function () {
    return mapText(this, str => str.toUpperCase())
  },
  /** */
  toTitleCase: function () {
    return mapText(this, titleCase)
  },
  /** */
  toCamelCase: function () {
    this.docs.forEach(terms => {
      terms.forEach((t, i) => {
        if (i !== 0) {
          t.text = titleCase(t.text)
        }
        if (i !== terms.length - 1) {
          t.post = ''
        }
      })
    })
    return this
  },
}
