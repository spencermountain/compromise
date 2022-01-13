const fmts = {
  text: {
    use: 'text',
  },
  normal: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'some',
    unicode: 'some',
    use: 'normal',
  },
  machine: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'none',
    unicode: 'some',
    use: 'machine',
  },
  root: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'some',
    unicode: 'some',
    use: 'root',
  },
  implicit: {
    use: 'implicit',
  }
}
fmts.clean = fmts.normal
fmts.reduced = fmts.root
export default fmts