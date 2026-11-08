const some = {
  whitespace: 'some',
  punctuation: 'some',
  unicode: 'some',
}
const fmts = {
  text: {
    form: 'text',
  },
  normal: {
    ...some,
    case: 'some',
    form: 'normal',
  },
  machine: {
    ...some,
    keepSpace: false,
    case: 'none',
    form: 'machine',
  },
  root: {
    ...some,
    keepSpace: false,
    case: 'some',
    form: 'root',
  },
  implicit: {
    form: 'implicit',
  }
}
fmts.clean = fmts.normal
fmts.reduced = fmts.root
export default fmts
