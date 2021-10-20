// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)
