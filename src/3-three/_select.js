// Some finders retain the caller's document; others use the selected view's.
const select = (View, find, originalDocument = false) => function (n) {
  const matches = typeof find === 'string' ? this.match(find) : find(this)
  const selected = matches.getNth(n)
  return new View(originalDocument ? this.document : selected.document, selected.pointer)
}

export default select
